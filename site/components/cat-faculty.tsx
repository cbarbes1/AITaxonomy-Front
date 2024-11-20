"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"


import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  Faculty: {
    label: "Faculty",
    color: "#2563eb",
  },
} satisfies ChartConfig


interface catData {
  category: string;
  faculty: number;
}

interface catFacultyProps {
  data: catData[];
}

export function CategoryFaculty({ data }:catFacultyProps) {

  return (
    <ChartContainer config={chartConfig} className="min-h-full w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="faculty" fill="var(--color-desktop)" radius={4}/>
        </BarChart>
    </ChartContainer>
  );
}