import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSettings } from '../context/SettingsContext';
import { RootStackParamList } from '../../App';
import { useYBounce } from '../hooks/useYBounce';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

const DURATION_OPTIONS = [30, 60, 90, 120];
const SKIP_OPTIONS = [0, 1, 2, 3, -1]; // -1 = infinite

export default function SettingsScreen({ navigation }: Props) {
  const { settings, updateSettings } = useSettings();
  const headerY = useYBounce(8, 1100);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.Text
          style={[styles.heading, { transform: [{ translateY: headerY }, { rotate: '-10deg' }] }]}
        >
          settings!
        </Animated.Text>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>round length</Text>
          <View style={styles.optionRow}>
            {DURATION_OPTIONS.map((d) => (
              <TouchableOpacity
                key={d}
                style={[styles.optionChip, settings.roundDuration === d && styles.optionChipSelected]}
                onPress={() => updateSettings({ roundDuration: d })}
                activeOpacity={0.8}
              >
                <Text style={[styles.optionChipText, settings.roundDuration === d && styles.optionChipTextSelected]}>
                  {d}s
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>skips allowed</Text>
          <View style={styles.optionRow}>
            {SKIP_OPTIONS.map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.optionChip, settings.maxSkips === s && styles.optionChipSelected]}
                onPress={() => updateSettings({ maxSkips: s })}
                activeOpacity={0.8}
              >
                <Text style={[styles.optionChipText, settings.maxSkips === s && styles.optionChipTextSelected]}>
                  {s === -1 ? '∞' : s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>sound &amp; feel</Text>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => updateSettings({ sfxEnabled: !settings.sfxEnabled })}
            activeOpacity={0.8}
          >
            <Text style={styles.toggleLabel}>sound effects</Text>
            <View style={[styles.toggle, settings.sfxEnabled && styles.toggleOn]}>
              <View style={[styles.toggleThumb, settings.sfxEnabled && styles.toggleThumbOn]} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => updateSettings({ vibrationEnabled: !settings.vibrationEnabled })}
            activeOpacity={0.8}
          >
            <Text style={styles.toggleLabel}>vibration</Text>
            <View style={[styles.toggle, settings.vibrationEnabled && styles.toggleOn]}>
              <View style={[styles.toggleThumb, settings.vibrationEnabled && styles.toggleThumbOn]} />
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <Text style={styles.previewText}>
            {settings.roundDuration}s rounds · {settings.maxSkips === -1 ? '∞' : settings.maxSkips} skip{settings.maxSkips !== 1 ? 's' : ''}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.doneButtonText}>done!</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 60,
    gap: 28,
  },
  heading: {
    fontSize: 52,
    fontFamily: 'FjallaOne_400Regular',
    color: '#ffffff',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
  },
  card: {
    backgroundColor: SURFACE,
    borderRadius: 24,
    padding: 28,
    width: '100%',
    borderWidth: 2,
    borderColor: BLUE,
    gap: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontFamily: 'FjallaOne_400Regular',
    color: MUTED,
    letterSpacing: 2,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: BLUE,
    backgroundColor: BG,
  },
  optionChipSelected: {
    borderColor: BLUE,
    backgroundColor: BLUE,
  },
  optionChipText: {
    fontSize: 16,
    fontFamily: 'FjallaOne_400Regular',
    color: MUTED,
  },
  optionChipTextSelected: {
    color: '#ffffff',
  },
  divider: {
    height: 1,
    backgroundColor: BLUE,
    opacity: 0.3,
  },
  previewText: {
    fontSize: 16,
    fontFamily: 'FjallaOne_400Regular',
    color: BLUE_LIGHT,
    textAlign: 'center',
  },
  doneButton: {
    backgroundColor: BLUE,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  doneButtonText: {
    fontSize: 18,
    fontFamily: 'FjallaOne_400Regular',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabel: {
    fontSize: 16,
    fontFamily: 'FjallaOne_400Regular',
    color: MUTED,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: BG,
    borderWidth: 2,
    borderColor: BLUE,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleOn: {
    backgroundColor: BLUE,
    borderColor: BLUE,
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: MUTED,
    alignSelf: 'flex-start',
  },
  toggleThumbOn: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-end',
  },
});
