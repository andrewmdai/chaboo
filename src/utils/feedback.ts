import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

let correctSound: Audio.Sound | null = null;
let skipSound: Audio.Sound | null = null;

export async function loadSounds() {
  try {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound: c } = await Audio.Sound.createAsync(
      require('../../assets/sounds/correct.mp3')
    );
    const { sound: s } = await Audio.Sound.createAsync(
      require('../../assets/sounds/skip.mp3')
    );
    correctSound = c;
    skipSound = s;
  } catch {
    // Sound files not present yet — haptics will still work
  }
}

export async function unloadSounds() {
  await correctSound?.unloadAsync();
  await skipSound?.unloadAsync();
  correctSound = null;
  skipSound = null;
}

export async function playCorrect(sfx: boolean, vibration: boolean) {
  if (vibration) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  if (sfx) {
    try { await correctSound?.replayAsync(); } catch {}
  }
}

export async function playSkip(sfx: boolean, vibration: boolean) {
  if (vibration) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 120);
  }
  if (sfx) {
    try { await skipSound?.replayAsync(); } catch {}
  }
}
