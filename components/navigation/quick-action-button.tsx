import { colors } from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export function QuickActionButton({ onPress, open = false }: { onPress: () => void; open?: boolean }) {
  const progress = useSharedValue(open ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(open ? 1 : 0, { duration: 180 });
  }, [open, progress]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 45}deg` }],
  }));

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={open ? "Close quick actions" : "Open quick actions"} onPress={onPress}>
      {({ pressed }) => (
        <LinearGradient
          colors={open ? ["#0F8F91", "#176B8A"] : [colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 58,
            height: 58,
            borderRadius: 29,
            alignItems: "center",
            justifyContent: "center",
            transform: [{ scale: pressed ? 0.95 : 1 }],
            boxShadow: open ? "0 14px 30px rgba(15, 143, 145, 0.3)" : "0 14px 28px rgba(40, 189, 191, 0.3)",
          }}
        >
          <Animated.View style={iconStyle}>
            <Feather name="plus" size={25} color={colors.surface} />
          </Animated.View>
        </LinearGradient>
      )}
    </Pressable>
  );
}
