import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  PanResponder,
  Modal,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSettings } from '../context/SettingsContext';
import { cards, shuffleCards, Card } from '../data/cards';
import SkipIndicators from '../components/SkipIndicators';
import EndGameModal from '../components/EndGameModal';
import { RootStackParamList } from '../../App';
import { loadSounds, unloadSounds, playCorrect, playSkip } from '../utils/feedback';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Game'>;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.35;

export default function GameScreen({ navigation }: Props) {
  const { settings } = useSettings();

  // Deck state
  const [deck, setDeck] = useState<Card[]>(() => shuffleCards(cards));
  const [cardIndex, setCardIndex] = useState(0);

  // Game state
  const [score, setScore] = useState(0);
  const [skipsUsed, setSkipsUsed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(settings.roundDuration);
  const [gameOver, setGameOver] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  // Load sounds on mount, unload on unmount
  useEffect(() => {
    loadSounds();
    return () => { unloadSounds(); };
  }, []);

  // Countdown (3 → 2 → 1 → 0="go!" → null=started)
  const [countdown, setCountdown] = useState<number | null>(3);
  const countdownRef = useRef<number | null>(3);
  useEffect(() => { countdownRef.current = countdown; }, [countdown]);
  const countdownScale = useRef(new Animated.Value(0.3)).current;
  const countdownOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (countdown === null) return;
    countdownScale.setValue(0.3);
    countdownOpacity.setValue(0);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(countdownScale, { toValue: 1, duration: 120, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(countdownOpacity, { toValue: 1, duration: 120, useNativeDriver: true }),
      ]),
      Animated.delay(700),
      Animated.timing(countdownOpacity, { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start(() => {
      setCountdown(c => (c! > 0 ? c! - 1 : null));
    });
  }, [countdown]);

  // Animation
  const pan = useRef(new Animated.ValueXY()).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const nextCardScale = useRef(new Animated.Value(0.92)).current;
  const nextCardOpacity = useRef(new Animated.Value(1)).current;
  const actionOverlayOpacity = useRef(new Animated.Value(0)).current;
  const actionOverlayColor = useRef(new Animated.Value(0)).current; // 0=skip(red), 1=correct(green)

  const currentCard = deck[cardIndex] ?? null;
  const isInfiniteSkips = settings.maxSkips === -1;
  const skipsExhausted = settings.maxSkips === 0 || (!isInfiniteSkips && settings.maxSkips > 0 && skipsUsed >= settings.maxSkips);

  // Keep a ref so the panResponder (created once) always sees fresh values
  const skipsExhaustedRef = useRef(skipsExhausted);
  useEffect(() => { skipsExhaustedRef.current = skipsExhausted; }, [skipsExhausted]);
  const advanceCardRef = useRef<(direction: 'correct' | 'skip') => void>(() => {});

  // Timer — waits for countdown to finish, pauses on quit confirm
  useEffect(() => {
    if (countdown !== null) return;
    if (gameOver) return;
    if (showQuitConfirm) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, gameOver, countdown, showQuitConfirm]);

  const advanceCard = useCallback(
    (direction: 'correct' | 'skip') => {
      if (direction === 'correct') {
        setScore((s) => s + 1);
        playCorrect(settings.sfxEnabled, settings.vibrationEnabled);
      } else {
        if (skipsExhausted) return;
        setSkipsUsed((s) => s + 1);
        playSkip(settings.sfxEnabled, settings.vibrationEnabled);
      }

      // Animate card out
      const toX = direction === 'correct' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
      Animated.parallel([
        Animated.timing(pan, {
          toValue: { x: toX, y: 0 },
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(cardOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(nextCardScale, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Reset position/scale while both cards are invisible
        pan.setValue({ x: 0, y: 0 });
        nextCardScale.setValue(0.92);
        nextCardOpacity.setValue(0); // hide next card so it can't flash at scale 1
        actionOverlayOpacity.setValue(0);
        // Update index, then wait two frames for React to commit the new
        // card content before making either card visible
        setCardIndex((i) => i + 1);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          cardOpacity.setValue(1);
          nextCardOpacity.setValue(1);
        }));
      });
    },
    [skipsExhausted, pan, cardOpacity, nextCardScale, actionOverlayOpacity]
  );

  // Keep ref in sync every render so panResponder always calls the latest version
  advanceCardRef.current = advanceCard;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => countdownRef.current === null,
      onPanResponderMove: (_, gesture) => {
        // Block leftward drag when skips are exhausted
        const dx = skipsExhaustedRef.current ? Math.max(0, gesture.dx) : gesture.dx;
        pan.setValue({ x: dx, y: gesture.dy * 0.2 });
        const progress = Math.abs(dx) / SWIPE_THRESHOLD;
        actionOverlayOpacity.setValue(Math.min(progress, 1) * 0.6);
        actionOverlayColor.setValue(dx > 0 ? 1 : 0);
      },
      onPanResponderRelease: (_, gesture) => {
        const dx = skipsExhaustedRef.current ? Math.max(0, gesture.dx) : gesture.dx;
        if (dx > SWIPE_THRESHOLD) {
          // Swiped right → correct
          actionOverlayOpacity.setValue(0);
          advanceCardRef.current('correct');
        } else if (dx < -SWIPE_THRESHOLD) {
          // Swiped left → skip
          actionOverlayOpacity.setValue(0);
          advanceCardRef.current('skip');
        } else {
          // Snap back
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            tension: 80,
            friction: 8,
          }).start();
          Animated.timing(actionOverlayOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleNewGame = () => {
    setDeck(shuffleCards(cards));
    setCardIndex(0);
    setScore(0);
    setSkipsUsed(0);
    setTimeLeft(settings.roundDuration);
    setGameOver(false);
    setCountdown(3);
    pan.setValue({ x: 0, y: 0 });
    cardOpacity.setValue(1);
    nextCardScale.setValue(0.92);
    nextCardOpacity.setValue(1);
  };

  const handleMainMenu = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Menu' }] });
  };

  const handleExitGame = () => setShowQuitConfirm(true);

  const timerColor = timeLeft <= 10 ? '#e94560' : timeLeft <= 20 ? '#f5a623' : '#00B4D8';

  const cardRotation = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ['-8deg', '0deg', '8deg'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.timerContainer}>
          <Text style={[styles.timer, { color: timerColor }]}>{timeLeft}</Text>
          <Text style={styles.timerLabel}>sec</Text>
        </View>

        <TouchableOpacity style={styles.exitButton} onPress={handleExitGame} activeOpacity={0.7}>
          <Text style={styles.exitButtonText}>✕ quit</Text>
        </TouchableOpacity>

        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.scoreLabel}>pts</Text>
        </View>
      </View>

      {/* Skip indicators */}
      {settings.maxSkips !== 0 && (
        <View style={styles.skipsRow}>
          <Text style={styles.skipsLabel}>skips:</Text>
          <SkipIndicators maxSkips={settings.maxSkips} skipsUsed={skipsUsed} isInfinite={isInfiniteSkips} />
        </View>
      )}

      {/* Card area */}
      <View style={styles.cardArea}>
        {/* Next card (behind) */}
        {deck[cardIndex + 1] && (
          <Animated.View
            style={[styles.card, styles.nextCard, { opacity: nextCardOpacity, transform: [{ scale: nextCardScale }] }]}
          >
            <Text style={styles.nextCardClue}>{deck[cardIndex + 1].clue}</Text>
          </Animated.View>
        )}

        {/* Current card */}
        {currentCard ? (
          <Animated.View
            style={[
              styles.card,
              styles.currentCard,
              {
                opacity: cardOpacity,
                transform: [
                  { translateX: pan.x },
                  { translateY: pan.y },
                  { rotate: cardRotation },
                ],
              },
            ]}
            {...panResponder.panHandlers}
          >
            {/* Swipe action overlay */}
            <Animated.View
              pointerEvents="none"
              style={[
                styles.actionOverlay,
                styles.actionOverlayCorrect,
                { opacity: pan.x.interpolate({
                    inputRange: [0, SWIPE_THRESHOLD],
                    outputRange: [0, 0.55],
                    extrapolate: 'clamp',
                  }) },
              ]}
            />
            <Animated.View
              pointerEvents="none"
              style={[
                styles.actionOverlay,
                styles.actionOverlaySkip,
                { opacity: pan.x.interpolate({
                    inputRange: [-SWIPE_THRESHOLD, 0],
                    outputRange: [0.55, 0],
                    extrapolate: 'clamp',
                  }) },
              ]}
            />

            {/* Swipe direction hints */}
            <Animated.Text
              style={[styles.swipeHint, styles.swipeHintCorrect, {
                opacity: pan.x.interpolate({
                  inputRange: [20, 80],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                }),
              }]}
            >
              ✓ correct
            </Animated.Text>
            <Animated.Text
              style={[styles.swipeHint, styles.swipeHintSkip, {
                opacity: pan.x.interpolate({
                  inputRange: [-80, -20],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
              }]}
            >
              skip ✕
            </Animated.Text>

            {/* Card content */}
            <View style={styles.cardContent}>
              <Text style={styles.clueWord}>{currentCard.clue}</Text>
              <View style={styles.divider} />
              <View style={styles.tabooList}>
                {currentCard.taboo.map((word, i) => (
                  <Text key={i} style={styles.tabooWord}>{word}</Text>
                ))}
              </View>
            </View>
          </Animated.View>
        ) : (
          <View style={[styles.card, styles.currentCard, styles.emptyCard]}>
            <Text style={styles.emptyText}>no more cards!</Text>
          </View>
        )}
      </View>

      {/* Action buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.skipButton, (skipsExhausted || countdown !== null) && styles.disabledButton]}
          onPress={() => advanceCard('skip')}
          disabled={skipsExhausted || countdown !== null}
          activeOpacity={0.8}
        >
          <Text style={[styles.actionButtonText, (skipsExhausted || countdown !== null) && styles.disabledButtonText]}>
            ✕ skip!
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.correctButton, countdown !== null && styles.disabledButton]}
          onPress={() => advanceCard('correct')}
          disabled={countdown !== null}
          activeOpacity={0.8}
        >
          <Text style={styles.actionButtonText}>✓ got it!</Text>
        </TouchableOpacity>
      </View>

      {/* Countdown overlay */}
      {countdown !== null && (
        <View style={styles.countdownOverlay} pointerEvents="none">
          <Animated.Text
            style={[
              countdown === 0 ? styles.countdownGo : styles.countdownNumber,
              { opacity: countdownOpacity, transform: [{ scale: countdownScale }] },
            ]}
          >
            {countdown === 0 ? 'go!' : countdown}
          </Animated.Text>
        </View>
      )}

      {/* Quit confirmation */}
      <Modal
        visible={showQuitConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowQuitConfirm(false)}
      >
        <View style={styles.quitOverlay}>
          <View style={styles.quitCard}>
            <Text style={styles.quitTitle}>quit game?</Text>
            <View style={styles.quitButtons}>
              <TouchableOpacity
                style={[styles.quitButton, styles.quitButtonNo]}
                onPress={() => setShowQuitConfirm(false)}
                activeOpacity={0.85}
              >
                <Text style={styles.quitButtonTextNo}>keep playing!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quitButton, styles.quitButtonYes]}
                onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Menu' }] })}
                activeOpacity={0.85}
              >
                <Text style={styles.quitButtonTextYes}>quit!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <EndGameModal
        visible={gameOver}
        score={score}
        onNewGame={handleNewGame}
        onMainMenu={handleMainMenu}
      />
    </View>
  );
}

const BLUE = '#0077B6';
const BLUE_LIGHT = '#00B4D8';
const BG = '#023047';
const SURFACE = '#013A5C';
const MUTED = '#8ECAE6';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingTop: 56,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timerContainer: {
    alignItems: 'center',
    backgroundColor: SURFACE,
    borderRadius: 16,
    paddingVertical: 12,
    width: 96,
  },
  timer: {
    fontSize: 40,
    fontFamily: 'FjallaOne_400Regular',
    lineHeight: 44,
    textAlign: 'center',
  },
  timerLabel: {
    fontSize: 12,
    fontFamily: 'FjallaOne_400Regular',
    color: MUTED,
    letterSpacing: 1,
  },
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: SURFACE,
    borderRadius: 16,
    paddingVertical: 12,
    width: 96,
  },
  score: {
    fontSize: 40,
    fontFamily: 'FjallaOne_400Regular',
    color: BLUE_LIGHT,
    lineHeight: 44,
  },
  scoreLabel: {
    fontSize: 12,
    fontFamily: 'FjallaOne_400Regular',
    color: MUTED,
    letterSpacing: 1,
  },
  exitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BLUE,
  },
  exitButtonText: {
    fontSize: 13,
    fontFamily: 'FjallaOne_400Regular',
    color: MUTED,
    letterSpacing: 1,
  },
  skipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  skipsLabel: {
    fontSize: 13,
    fontFamily: 'FjallaOne_400Regular',
    color: MUTED,
    letterSpacing: 1,
  },
  cardArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    overflow: 'hidden',
  },
  currentCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    aspectRatio: 2.5 / 3.5,
  },
  nextCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    aspectRatio: 2.5 / 3.5,
    opacity: 0.6,
  },
  nextCardClue: {
    fontSize: 40,
    fontFamily: 'FjallaOne_400Regular',
    color: BLUE,
    textAlign: 'center',
    padding: 40,
    paddingTop: 60,
    opacity: 0.3,
  },
  actionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 22,
  },
  actionOverlayCorrect: {
    backgroundColor: BLUE_LIGHT,
  },
  actionOverlaySkip: {
    backgroundColor: '#e94560',
  },
  swipeHint: {
    position: 'absolute',
    top: 24,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'FjallaOne_400Regular',
    letterSpacing: 1,
    zIndex: 10,
  },
  swipeHintCorrect: {
    color: BLUE_LIGHT,
  },
  swipeHintSkip: {
    color: '#e94560',
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 32,
    alignItems: 'center',
  },
  clueWord: {
    fontSize: 52,
    fontFamily: 'FjallaOne_400Regular',
    color: '#000000',
    textAlign: 'center',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  divider: {
    width: 48,
    height: 3,
    backgroundColor: BLUE,
    borderRadius: 2,
  },
  tabooList: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 16,
  },
  tabooWord: {
    fontSize: 24,
    fontFamily: 'FjallaOne_400Regular',
    color: '#e94560',
    textAlign: 'center',
  },
  emptyCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 24,
    fontFamily: 'FjallaOne_400Regular',
    color: MUTED,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButton: {
    backgroundColor: SURFACE,
    borderWidth: 2,
    borderColor: '#e94560',
  },
  correctButton: {
    backgroundColor: BLUE,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
  disabledButton: {
    borderColor: BLUE,
    opacity: 0.3,
  },
  actionButtonText: {
    fontSize: 18,
    fontFamily: 'FjallaOne_400Regular',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  disabledButtonText: {
    color: SURFACE,
  },
  countdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(2, 48, 71, 0.96)',
    zIndex: 100,
  },
  countdownNumber: {
    fontSize: 128,
    fontFamily: 'FjallaOne_400Regular',
    color: '#ffffff',
  },
  countdownGo: {
    fontSize: 80,
    fontFamily: 'FjallaOne_400Regular',
    color: '#00B4D8',
  },
  quitOverlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 48, 71, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  quitCard: {
    backgroundColor: SURFACE,
    borderRadius: 24,
    padding: 28,
    width: '100%',
    borderWidth: 2,
    borderColor: BLUE,
    gap: 12,
  },
  quitTitle: {
    fontSize: 28,
    fontFamily: 'FjallaOne_400Regular',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1,
  },
  quitBody: {
    fontSize: 15,
    fontFamily: 'FjallaOne_400Regular',
    color: MUTED,
    textAlign: 'center',
    marginBottom: 8,
  },
  quitButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  quitButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  quitButtonNo: {
    backgroundColor: BLUE,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  quitButtonYes: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#e94560',
  },
  quitButtonTextNo: {
    fontSize: 16,
    fontFamily: 'FjallaOne_400Regular',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  quitButtonTextYes: {
    fontSize: 16,
    fontFamily: 'FjallaOne_400Regular',
    color: '#e94560',
    letterSpacing: 0.5,
  },
});
