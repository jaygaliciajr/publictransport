import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "react-native";

export function HeroBusSection() {
  return (
    <View
      style={{
        minHeight: 184,
        borderRadius: 28,
        borderCurve: "continuous",
        overflow: "hidden",
        backgroundColor: "rgba(255,255,255,0.24)",
      }}
    >
      <View style={{ position: "absolute", left: 14, top: 14, gap: 4, zIndex: 2 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Feather name="battery-charging" size={14} color={colors.primary} />
          <Text style={[typography.small, { color: colors.primary }]}>Electric minibus</Text>
        </View>
        <Text style={[typography.h2, { color: colors.dark, maxWidth: 205 }]}>Nearest bus arriving soon</Text>
      </View>
      <Skyline />
      <View style={{ position: "absolute", left: 0, right: 0, bottom: 34, height: 30, backgroundColor: "#59606A" }} />
      <Bus />
    </View>
  );
}

function Skyline() {
  const buildings = [
    { left: 12, width: 36, height: 68, color: "#45A6CE" },
    { left: 52, width: 48, height: 92, color: "#64CAE0" },
    { left: 104, width: 42, height: 76, color: "#2C9DCA" },
    { left: 168, width: 50, height: 108, color: "#5FC7DE" },
    { left: 226, width: 44, height: 80, color: "#33A7D1" },
    { left: 286, width: 38, height: 98, color: "#73D9EA" },
  ];

  return (
    <View style={{ position: "absolute", left: 0, right: 0, bottom: 54, height: 112 }}>
      {buildings.map((building) => (
        <View
          key={`${building.left}-${building.height}`}
          style={{
            position: "absolute",
            left: building.left,
            bottom: 0,
            width: building.width,
            height: building.height,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            backgroundColor: building.color,
            opacity: 0.82,
          }}
        />
      ))}
    </View>
  );
}

function Bus() {
  return (
    <View
      style={{
        position: "absolute",
        right: 6,
        bottom: 27,
        width: 234,
        height: 88,
        borderRadius: 20,
        borderCurve: "continuous",
        backgroundColor: "#FBFEFF",
        borderWidth: 3,
        borderColor: "#1C9ECE",
        boxShadow: "0 18px 26px rgba(15, 23, 42, 0.2)",
      }}
    >
      <View style={{ position: "absolute", left: 13, right: 66, top: 14, height: 32, flexDirection: "row", gap: 7 }}>
        {[0, 1, 2].map((item) => (
          <View key={item} style={{ flex: 1, borderRadius: 7, backgroundColor: "#173C50" }} />
        ))}
      </View>
      <View style={{ position: "absolute", right: 14, top: 14, width: 46, height: 32, borderRadius: 8, backgroundColor: "#14384E" }} />
      <View style={{ position: "absolute", left: 16, bottom: 18, flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Feather name="zap" size={13} color={colors.secondary} />
        <Text style={[typography.small, { color: colors.primary, fontWeight: "800" }]}>PUTI COMET</Text>
      </View>
      <Wheel left={35} />
      <Wheel left={186} />
    </View>
  );
}

function Wheel({ left }: { left: number }) {
  return (
    <View
      style={{
        position: "absolute",
        left,
        bottom: -12,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.dark,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ width: 13, height: 13, borderRadius: 7, backgroundColor: colors.surface }} />
    </View>
  );
}
