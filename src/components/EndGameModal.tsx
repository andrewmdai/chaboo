import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Props {
  visible: boolean;
  score: number;
  onNewGame: () => void;
  onMainMenu: () => void;
}

export default function EndGameModal({ visible, score, onNewGame, onMainMenu }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.title}>time's up!</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>your score</Text>
            <Text style={styles.score}>{score}</Text>
            <Text style={styles.scoreUnit}>{score === 1 ? 'point' : 'points'}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.newGameButton}
              onPress={onNewGame}
              activeOpacity={0.85}
            >
              <Text style={styles.newGameText}>play again!</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={onMainMenu}
              activeOpacity={0.85}
            >
              <Text style={styles.menuText}>main menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const BLUE = '#0077B6';
const BLUE_LIGHT = '#00B4D8';
const BG = '#023047';
const SURFACE = '#013A5C';
const MUTED = '#8ECAE6';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 48, 71, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  card: {
    backgroundColor: SURFACE,
    borderRadius: 24,
    padding: 40,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: BLUE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 32,
    elevation: 16,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontFamily: 'FjallaOne_400Regular',
    color: '#ffffff',
    marginBottom: 32,
    letterSpacing: 1,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: BG,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 48,
    width: '100%',
  },
  scoreLabel: {
    fontSize: 13,
    fontFamily: 'FjallaOne_400Regular',
    color: MUTED,
    letterSpacing: 2,
    marginBottom: 8,
  },
  score: {
    fontSize: 80,
    fontFamily: 'FjallaOne_400Regular',
    color: BLUE_LIGHT,
    lineHeight: 88,
  },
  scoreUnit: {
    fontSize: 18,
    fontFamily: 'FjallaOne_400Regular',
    color: MUTED,
    marginTop: 4,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  newGameButton: {
    backgroundColor: BLUE,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  newGameText: {
    fontSize: 22,
    fontFamily: 'FjallaOne_400Regular',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  menuButton: {
    backgroundColor: 'transparent',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: BLUE_LIGHT,
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'FjallaOne_400Regular',
    color: MUTED,
    letterSpacing: 1,
  },
});
