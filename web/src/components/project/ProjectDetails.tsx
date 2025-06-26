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
