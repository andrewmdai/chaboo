import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

/** Seamless sine-wave vertical bounce. Starts at -amplitude so every loop
 *  iteration begins from the same natural position with no stutter. */
export function useYBounce(amplitude = 8, duration = 1100) {
  const y = useRef(new Animated.Value(-amplitude)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(y, { toValue: amplitude, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(y, { toValue: -amplitude, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  return y;
}
