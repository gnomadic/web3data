"use client";

import { useProjects } from "@/contexts/ProjectContext";
import useGetMetricData from "@/hooks/useGetMetricData";
import { bigIntReplacer } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Button } from "../ui/button";
import { Edit } from "lucide-react";

type Props = {
  projectAddress: Address;
};

export default function ProjectDetails({ projectAddress }: Props) {

  const { findProject } = useProjects();
  const project = findProject(projectAddress);

  const { data: metrics } = useGetMetricData(project?.metadata?.contracts?.[0]);

  // type MetricPoint = [string, number];
  // Group and count transactions per day
  const formatData = (data: unknown): { date: string; count: number }[] => {
    if (!Array.isArray(data)) return [];

    const counts: Record<string, number> = {};

    for (const item of data) {
      if (!Array.isArray(item) || typeof item[0] !== 'string') continue;
      const timestamp = item[0];
      const day = format(new Date(timestamp), 'yyyy-MM-dd');
      counts[day] = (counts[day] || 0) + 1;
    }

    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  };


  const [chartData, setChartData] = useState<{ date: string; count: number }[]>([]);
  useEffect(() => {
    console.log("got metrics data, creating chart data")
    const metric = metrics?.metrics[0];
    console.log("metric is:", JSON.stringify(metric, null, 2));

    const chartData = formatData(metric && metric.value ? metric.value : []);
    setChartData(chartData);

  }, [metrics]);

  return (
    <section>


      {/* header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100/20 to-gray-100/20" />
        <div className="relative px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start justify-between mb-8">
              <div className="space-y-4 flex-1">
                <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                  Project Overview
                </div>
                <h1 className="text-4xl font-light text-slate-900 tracking-tight">
                  {project?.metadata?.name}
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed max-w-2xl font-light">
                  {project?.metadata?.description}
                </p>
                <SocialLinks project={project} />
              </div>
              <Button
                size="sm"
                variant="ghost"
                // onClick={() => setModalOpen(true)} 
                className="flex items-center gap-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 border border-slate-200/50"
              >
                <Edit className="w-4 h-4" /> Edit
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* end header */}

      <div>project is defined at: {projectAddress}</div>

      <div>ipfs data is: {JSON.stringify(project, bigIntReplacer)}</div>

      {/* <div>metric data is: {JSON.stringify(metrics)}</div> */}
      {/* <div>chart data is: {JSON.stringify(chartData)}</div> */}
      <Card>
        <CardHeader>
          <CardTitle>{metrics?.metrics[0]?.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>
  );
}
