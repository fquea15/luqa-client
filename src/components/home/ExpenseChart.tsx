import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Svg, { G, Path, Circle } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getTransactionsWithCategory } from "@/shared/services/homeService";

const { width: screenWidth } = Dimensions.get("window");
const SIZE = screenWidth * 0.45;
const RADIUS = SIZE / 2;
const INNER_RADIUS = RADIUS * 0.55;


const COLORS: Record<string, string> = {
  Necesidades: "#FFD180",
  Gustos: "#BBDEFB",
  Ahorros: "#C8E6C9",
  default: "#F8BBD0",
};

export default function ExpenseChart() {
  const [segments, setSegments] = useState<
    { label: string; value: number; color: string; percentage: number }[]
  >([]);
  const [total, setTotal] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getTransactionsWithCategory(2);
      const grouped: Record<string, number> = {};
      data.forEach((t: any) => {
        if (t.transactionType === "Debit") {
          grouped[t.categoryName] = (grouped[t.categoryName] || 0) + t.amount;
        }
      });
      const entries = Object.entries(grouped);
      const totalAmount = entries.reduce((sum, [, v]) => sum + v, 0);
      const segs = entries.map(([label, value]) => ({
        label,
        value,
        color: COLORS[label] || COLORS.default,
        percentage: totalAmount ? (value / totalAmount) * 100 : 0,
      }));
      setSegments(segs);
      setTotal(totalAmount);
    })();
  }, []);

  if (!segments.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Distribución de Gastos</Text>
        <Text style={styles.noData}>No hay datos registrados.</Text>
      </View>
    );
  }

  if (segments.length === 1) {
    const s = segments[0];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Distribución de Gastos</Text>
        <Svg width={SIZE} height={SIZE}>
          <Circle cx={RADIUS} cy={RADIUS} r={RADIUS} fill={s.color} />
          <Circle cx={RADIUS} cy={RADIUS} r={INNER_RADIUS} fill="#fff" />
        </Svg>
        <Text style={styles.detailText}>
          Total: S/ {s.value.toFixed(2)}
        </Text>
        <Text style={styles.detailText}>
          Porcentaje: {s.percentage.toFixed(1)}%
        </Text>
      </View>
    );
  }

  let cumulative = 0;
  const paths = segments.map((seg, i) => {
    const startAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    cumulative += seg.value;
    const endAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    const x1 = RADIUS + RADIUS * Math.cos(startAngle);
    const y1 = RADIUS + RADIUS * Math.sin(startAngle);
    const x2 = RADIUS + RADIUS * Math.cos(endAngle);
    const y2 = RADIUS + RADIUS * Math.sin(endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const d = `M ${RADIUS} ${RADIUS} L ${x1} ${y1}
               A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return (
      <Path
        key={i}
        d={d}
        fill={seg.color}
        onPress={() => setSelectedIndex(i)}
      />
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Distribución de Gastos</Text>

      <View style={styles.chartRow}>
        {/* Gráfico */}
        <View style={styles.chartWrapper}>
          <Svg width={SIZE} height={SIZE}>
            <G>{paths}</G>
            <Circle cx={RADIUS} cy={RADIUS} r={INNER_RADIUS} fill="#fff" />
          </Svg>

          {/* Total en el centro */}
          <View style={styles.centerWrapper}>
            <Text style={styles.centerText}>Total Gastado</Text>
            <Text style={styles.centerValue}>S/ {total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Leyenda sin montos */}
        <View style={styles.legend}>
          {segments.map((seg, i) => (
            <TouchableOpacity
              key={i}
              style={styles.legendItem}
              onPress={() => setSelectedIndex(i)}
            >
              <View
                style={[
                  styles.legendColor,
                  {
                    backgroundColor: seg.color,
                    opacity: selectedIndex === null || selectedIndex === i ? 1 : 0.3,
                  },
                ]}
              />
              <Text
                style={[
                  styles.legendText,
                  {
                    opacity: selectedIndex === null || selectedIndex === i ? 1 : 0.3,
                  },
                ]}
              >
                {seg.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tooltip con nombre, monto y porcentaje */}
      {selectedIndex !== null && (
        <View style={styles.tooltip}>
          <Ionicons
            name={
              segments[selectedIndex].label.includes("Necesidad")
                ? "heart-outline"
                : segments[selectedIndex].label.includes("Gusto")
                ? "happy-outline"
                : "wallet-outline"
            }
            size={24}
            color={segments[selectedIndex].color}
            style={{ marginRight: 8 }}
          />
          <View>
            <Text style={[styles.tooltipValue, { fontSize: 16 }]}>
              {segments[selectedIndex].label}
            </Text>
            <Text style={styles.tooltipValue}>
              S/ {segments[selectedIndex].value.toFixed(2)} (
              {segments[selectedIndex].percentage.toFixed(1)}%)
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "left", marginBottom: 12 },
  noData: { color: "#777", textAlign: "center" },
  detailText: { fontSize: 14, color: "#333", textAlign: "center", marginTop: 8 },
  chartRow: { flexDirection: "row", alignItems: "center" },
  chartWrapper: { width: SIZE, height: SIZE, position: "relative" },
  centerWrapper: {
    position: "absolute",
    top: RADIUS - 20,
    left: 0,
    width: SIZE,
    alignItems: "center",
  },
  centerText: { fontSize: 12, color: "#555" },
  centerValue: { fontSize: 16, fontWeight: "bold", color: "#333" },
  legend: { marginLeft: 16, flex: 1 },
  legendItem: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  legendColor: { width: 12, height: 12, borderRadius: 6, marginRight: 6 },
  legendText: { fontSize: 14, color: "#333" },
  tooltip: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  tooltipValue: { fontSize: 14, fontWeight: "bold", color: "#333", marginBottom: 4 },
});
