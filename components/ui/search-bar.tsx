import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { TextInput, View } from "react-native";

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChangeText, placeholder = "Where are you going?" }: Props) {
  return (
    <View
      style={{
        minHeight: 56,
        borderRadius: 20,
        borderCurve: "continuous",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        boxShadow: "0 8px 20px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Feather name="search" size={20} color={colors.muted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={[typography.body, { flex: 1, color: colors.dark }]}
      />
    </View>
  );
}
