import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Menu'>;
};

function makeBounce(value: Animated.Value) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(value, { toValue: 8, duration: 1100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      Animated.timing(value, { toValue: -8, duration: 1100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    ])
  );
}

export default function MenuScreen({ navigation }: Props) {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const titleY = useRef(new Animated.Value(-8)).current;
  const modalTitleY = useRef(new Animated.Value(-8)).current;

  // Restart title bounce every time this screen comes into focus
  useFocusEffect(
    useCallback(() => {
      titleY.setValue(-8);
      const anim = makeBounce(titleY);
      anim.start();
      return () => anim.stop();
    }, [])
  );

  // Restart modal title bounce whenever the modal opens
  useEffect(() => {
    if (!showHowToPlay) return;
    modalTitleY.setValue(-8);
    const anim = makeBounce(modalTitleY);
    anim.start();
    return () => anim.stop();
  }, [showHowToPlay]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.titleContainer}>
        <Animated.Text
          style={[styles.title, { transform: [{ translateY: titleY }, { rotate: '-10deg' }] }]}
        >
          chaboo!
        </Animated.Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => navigation.navigate('Game')}
          activeOpacity={0.85}
        >
          <Text style={styles.playButtonText}>play!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.howToPlayButton}
          onPress={() => setShowHowToPlay(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.howToPlayButtonText}>how to play!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.85}
        >
          <Text style={styles.settingsButtonText}>settings!</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showHowToPlay}
        transparent
        animationType="fade"
        onRequestClose={() => setShowHowToPlay(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.Text
            style={[styles.modalTitle, { transform: [{ translateY: modalTitleY }, { rotate: '-10deg' }] }]}
          >
            how to play!
          </Animated.Text>
          <View style={styles.modalCard}>
            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalLine}>
                act out the clue on the top of the card.
              </Text>
              <Text style={styles.modalLine}>
                you are not allowed to act out any actions in{' '}
                <Text style={styles.modalRed}>red</Text>.
              </Text>
              <Text style={styles.modalLine}>
                swipe right if your team guesses correctly.
              </Text>
              <Text style={styles.modalLine}>
                swipe left if you want to skip the current clue.
              </Text>
              <Text style={styles.modalLine}>
                try to get your team to guess as many clues as possible!
              </Text>
              <Text style={styles.modalLine}>
                challenge yourself by limiting how many times you can skip!
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowHowToPlay(false)}
              activeOpacity={0.85}
            >
              <Text style={styles.modalCloseButtonText}>got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const BLUE = '#0077B6';
const BG = '#023047';
const SURFACE = '#013A5C';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 72,
    fontFamily: 'FjallaOne_400Regular',
    color: '#ffffff',
    letterSpacing: 2,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  playButton: {
    backgroundColor: BLUE,
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  playButtonText: {
    fontSize: 32,
    fontFamily: 'FjallaOne_400Regular',
    color: '#ffffff',
    letterSpacing: 1,
  },
  howToPlayButton: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8ECAE6',
  },
  howToPlayButtonText: {
    fontSize: 18,
    fontFamily: 'FjallaOne_400Regular',
    color: '#8ECAE6',
    letterSpacing: 1,
  },
  settingsButton: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8ECAE6',
  },
  settingsButtonText: {
    fontSize: 18,
    fontFamily: 'FjallaOne_400Regular',
    color: '#8ECAE6',
    letterSpacing: 1,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 28,
  },
  modalCard: {
    backgroundColor: SURFACE,
    borderRadius: 24,
    padding: 28,
    width: '100%',
    borderWidth: 2,
    borderColor: BLUE,
  },
  modalTitle: {
    fontSize: 52,
    fontFamily: 'FjallaOne_400Regular',
    color: '#ffffff',
    letterSpacing: 2,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: 300,
  },
  modalLine: {
    fontSize: 16,
    fontFamily: 'FjallaOne_400Regular',
    color: '#CAF0F8',
    lineHeight: 26,
    marginBottom: 12,
  },
  modalRed: {
    color: '#e94560',
    fontFamily: 'FjallaOne_400Regular',
  },
  modalCloseButton: {
    backgroundColor: BLUE,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  modalCloseButtonText: {
    fontSize: 18,
    fontFamily: 'FjallaOne_400Regular',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
});
