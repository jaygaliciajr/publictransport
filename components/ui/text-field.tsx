import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  label: string;
};

export function TextField({ label, style, ...props }: Props) {
  return (
    <View style={{ gap: 7 }}>
      <Text style={[typography.small, { color: colors.dark }]}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.muted}
        style={[
          typography.body,
          {
            minHeight: 54,
            borderRadius: 18,
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: colors.line,
            backgroundColor: colors.surface,
            paddingHorizontal: 16,
            color: colors.dark,
          },
          style,
        ]}
        {...props}
      />
    </View>
  );
}
