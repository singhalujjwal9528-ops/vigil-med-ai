import { Area, AreaChart, ResponsiveContainer } from "recharts";

export function MiniChart({
  data,
  dataKey,
  color = "var(--primary)",
  height = 48,
}: {
  data: Array<Record<string, number | string>>;
  dataKey: string;
  color?: string;
  height?: number;
}) {
  const id = `g-${dataKey}-${color.replace(/[^a-z]/gi, "")}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.5} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#${id})`}
          isAnimationActive={false}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
