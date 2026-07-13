import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { ActivityIndicator, Text, View } from "react-native";

type StateProps = {
  title: string;
  body: string;
};

export function LoadingState({ title = "Loading", body = "Getting things ready." }: Partial<StateProps>) {
  return (
    <View
      style={{
        padding: 22,
        borderRadius: 24,
        borderCurve: "continuous",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        alignItems: "center",
        gap: 10,
      }}
    >
      <ActivityIndicator color={colors.primary} />
      <Text style={[typography.body, { color: colors.dark, fontWeight: "800" }]}>{title}</Text>
      <Text style={[typography.small, { color: colors.muted, textAlign: "center" }]}>{body}</Text>
    </View>
  );
}

export function EmptyState({ title, body }: StateProps) {
  return <State icon="inbox" color={colors.muted} title={title} body={body} />;
}

export function ErrorState({ title, body }: StateProps) {
  return <State icon="alert-circle" color={colors.error} title={title} body={body} />;
}

export function SuccessState({ title, body }: StateProps) {
  return <State icon="check-circle" color={colors.success} title={title} body={body} />;
}

function State({
  icon,
  color,
  title,
  body,
}: StateProps & { icon: keyof typeof Feather.glyphMap; color: string }) {
  return (
    <View
      style={{
        padding: 22,
        borderRadius: 24,
        borderCurve: "continuous",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.line,
        alignItems: "center",
        gap: 9,
        boxShadow: "0 12px 24px rgba(16, 24, 40, 0.06)",
      }}
    >
      <Feather name={icon} size={24} color={color} />
      <Text style={[typography.body, { color: colors.dark, fontWeight: "800", textAlign: "center" }]}>{title}</Text>
      <Text style={[typography.small, { color: colors.muted, textAlign: "center" }]}>{body}</Text>
    </View>
  );
}
