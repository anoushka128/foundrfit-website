"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Card } from "@/components/ui/card";

export function SeverityChart({
  data,
  title = "Symptom severity trend"
}: {
  data: { day: string; severity: number }[];
  title?: string;
}) {
  return (
    <Card>
      <div className="mb-4">
        <p className="text-sm text-ink/55">Trend</p>
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
      </div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -20, right: 0, top: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="severity" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#60725c" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#60725c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(36,29,23,0.08)" />
            <XAxis axisLine={false} dataKey="day" tickLine={false} tick={{ fill: "#6b635b", fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b635b", fontSize: 12 }}
              domain={[0, 10]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="severity"
              stroke="#32261b"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#severity)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
