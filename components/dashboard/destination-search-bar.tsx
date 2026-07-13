import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { TextInput, View } from "react-native";

export function DestinationSearchBar({
  value,
  onChangeText,
  disabled,
}: {
  value: string;
  onChangeText: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <View
      style={{
        flex: 1,
        minWidth: 0,
        minHeight: 58,
        borderRadius: 29,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: colors.surface,
        paddingLeft: 18,
        paddingRight: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        opacity: disabled ? 0.55 : 1,
        boxShadow: "0 10px 22px rgba(15, 23, 42, 0.07)",
      }}
    >
      <TextInput
        editable={!disabled}
        value={value}
        onChangeText={onChangeText}
        placeholder="Where are you going?"
        placeholderTextColor="#4B5563"
        style={[typography.body, { color: colors.dark, flex: 1, minHeight: 50 }]}
      />
      <Feather name="search" size={25} color={colors.primary} />
    </View>
  );
}
