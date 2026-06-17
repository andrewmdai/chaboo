import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  maxSkips: number;
  skipsUsed: number;
  isInfinite: boolean;
}

const BLUE = '#0077B6';
const MUTED = '#8ECAE6';

export default function SkipIndicators({ maxSkips, skipsUsed, isInfinite }: Props) {
  if (isInfinite) {
    return (
      <View style={styles.container}>
        <View style={[styles.indicator, styles.indicatorAvailable]}>
          <Text style={[styles.symbol, styles.symbolAvailable]}>∞</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Array.from({ length: maxSkips }).map((_, i) => {
        const used = i < skipsUsed;
        return (
          <View
            key={i}
            style={[styles.indicator, used ? styles.indicatorUsed : styles.indicatorAvailable]}
          >
            <Text style={[styles.symbol, used ? styles.symbolUsed : styles.symbolAvailable]}>✕</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  indicator: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  indicatorAvailable: {
    borderColor: BLUE,
    backgroundColor: 'transparent',
  },
  indicatorUsed: {
    borderColor: '#e94560',
    backgroundColor: '#e9456022',
  },
  symbol: {
    fontSize: 14,
    fontFamily: 'FjallaOne_400Regular',
  },
  symbolAvailable: {
    color: MUTED,
  },
  symbolUsed: {
    color: '#e94560',
  },
});
