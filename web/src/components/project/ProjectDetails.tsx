"use client";

import { useProjects } from "@/contexts/ProjectContext";
import useGetMetricData from "@/hooks/useGetMetricData";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { format } from 'date-fns';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from 'recharts';
import { Button } from "../ui/button";
import { Edit, ExternalLink } from "lucide-react";
import { SocialLinks } from "./SocialLinks";
import { BannerImage } from "../global/BannerImage";
import { Avatar } from "@/components/global/Avatar";
import { getScanURL } from "@/lib/deployments";
import Link from "next/link";
import { MetricPoint } from "@/lib/types/types";

type Props = {
  projectAddress: Address;
};

export default function ProjectDetails({ projectAddress }: Props) {

  const { findProject } = useProjects();
  const project = findProject(projectAddress);

  const { data: metrics } = useGetMetricData(project?.metadata?.contracts?.[0]?.address);

  // type MetricPoint = [string, number];
  // Group and count transactions per day
  // const formatData = (data: unknown): { date: string; count: number }[] => {
  //   if (!Array.isArray(data)) return [];

  //   const counts: Record<string, number> = {};

  //   for (const item of data) {
  //     if (!Array.isArray(item) || typeof item[0] !== 'string') continue;
  //     const timestamp = item[0];
  //     const day = format(new Date(timestamp), 'yyyy-MM-dd');
  //     counts[day] = (counts[day] || 0) + 1;
  //   }

  //   return Object.entries(counts).map(([date, count]) => ({ date, count }));
  // };


  const [totalTx, setTotalTx] = useState(0);
  const [tvl, setTVL] = useState(0);
  const [wallets, setWallets] = useState(0);

  // const [chartData, setChartData] = useState<{ date: string; count: number }[]>([]);
  useEffect(() => {
    console.log("got metrics data, formatting")
    if (!metrics || !metrics.metrics || metrics.metrics.length === 0) {
      console.warn("No metrics data available");
      return;
    }

    // "transactions": [
    //   {
    //     "date": "2025-06-30",
    //     "value": "430"
    //   },
    //   {
    //     "date": "2025-06-29",
    //     "value": "164"
    //   },
    //   {
    //     "date": "2025-06-28",
    //     "value": "109"
    //   },
    //   {
    //     "date": "2025-06-27",
    //     "value": "360"
    //   },
    //   {
    //     "date": "2025-06-26",
    //     "value": "124"
    //   },
    //   {
    //     "date": "2025-06-25",
    //     "value": "147"
    //   },
    //   {
    //     "date": "2025-06-24",
    //     "value": "324"
    //   }
    // ],


        const metricData = metrics?.metrics;


    setTotalTx(metricData?.value?.transactions.reduce((acc: number, curr: MetricPoint) => acc + Number(curr.value), 0) || 0);
    setTVL(metricData?.value?.TVL_USD.reduce((acc: number, curr: MetricPoint) => acc + Number(curr.value), 0) || 0);
    setWallets(metricData?.value?.unique_wallets.reduce((acc: number, curr: MetricPoint) => acc + Number(curr.value), 0) || 0);
    // const metric = metrics?.metrics[0];
    console.log("metric is:", JSON.stringify(metricData, null, 2));

    // const chartData = formatData(metric && metric.value ? metric.value : []);
    // setChartData(chartData);

  }, [metrics]);

  return (
    <section className="">
      {/* <ProjectBanner
        fallbackName={project?.metadata?.name}
      // size={1500}
      /> */}

      <div className="flex items-center justify-center">
        <div className="relative mx-auto">
          <BannerImage size={1000} />
          <div className=" z-50 md:left-8 absolute md:bottom-0 md:translate-y-1/2 md:translate-x-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Avatar fallbackName={project?.metadata?.name} />
          </div>
        </div>
      </div>


      {/* header */}
      <section className="relative pt-12">

        <div className="max-w-4xl mx-auto bg-background">
          <div className="flex items-start justify-between mb-8 p-4">
            <div className="space-y-4 flex-1">
              {/* <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                  Project Overview
                </div> */}
              <h1 className="text-4xl font-title text-primary tracking-tight font-extrabold ">
                {project?.metadata?.name}
              </h1>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl font-light">
                {project?.metadata?.description}
              </p>
              <SocialLinks socials={project?.metadata?.socials} />
            </div>
            <Button
              size="sm"
              variant="ghost"
              // onClick={() => setModalOpen(true)} 
              className="flex items-center gap-2 text-slate-500 hover:text-slate-300 border border-slate-200/50 hover:border-primary"
            >
              <Edit className="w-4 h-4" /> Edit
            </Button>
          </div>
        </div>
      </section>
      {/* end header */}
      {/* contracts */}
      <section className="px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm">
            <div className="p-6 border-b border-border/50">
              <h2 className="text-xl font-light text-foreground mb-1">Smart Contracts</h2>
              <p className="text-sm text-muted-foreground">Deployed contract addresses across networks</p>
            </div>

            <div className="p-6">
              {project?.metadata?.contracts?.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-muted-foreground rounded border-dashed" />
                  </div>
                  <p className="text-muted-foreground font-light">No contracts added yet</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {project?.metadata?.contracts?.map((c, index) => (
                    <div
                      key={index}
                      className="group flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 rounded-xl transition-all duration-200 border border-border/30"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <div>
                          <div className="font-medium text-foreground text-sm">{c.name}</div>
                          <div className="text-xs text-muted-foreground capitalize mt-0.5">
                            {c.chainId} network
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Link href={getScanURL(c.chainId, c.address)} target="_blank" rel="noopener noreferrer">
                          <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded font-mono">
                            {c.address.slice(0, 6)}...{c.address.slice(-4)}
                            <span>
                              <ExternalLink className="inline ml-1 w-3 h-3" />
                            </span>
                          </code>
                        </Link>

                        {/* <a
                          href={getScanURL(c.chainId, c.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                        >
                          View on Explorer →
                        </a> */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* end contracts */}


      {/* <div>project is defined at: {projectAddress}</div> */}

      {/* <div>ipfs data is: {JSON.stringify(project, bigIntReplacer)}</div> */}

      {/* <div>metric data is: {JSON.stringify(metrics)}</div> */}
      {/* <div>chart data is: {JSON.stringify(chartData)}</div> */}
      <Card className="grid grid-cols-1 md:grid-cols-3 mx-auto max-w-4xl">
        <div
          // key={chart}
          // data-active={activeChart === chart}
          className=" relative flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
        // onClick={() => setActiveChart(chart)}
        >
          <span className="text-muted-foreground text-xs">
            {/* {chartConfig[chart].label} */}
            Transactions
          </span>
          <span className="text-lg leading-none font-bold sm:text-3xl">
            {/* {total[key as keyof typeof total].toLocaleString()} */}
            {totalTx.toLocaleString() || 0}
          </span>
        </div>
                <div
          // key={chart}
          // data-active={activeChart === chart}
          className=" relative flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
        // onClick={() => setActiveChart(chart)}
        >
          <span className="text-muted-foreground text-xs">
            {/* {chartConfig[chart].label} */}
            Total Value Locked
          </span>
          <span className="text-lg leading-none font-bold sm:text-3xl">
            {/* {total[key as keyof typeof total].toLocaleString()} */}
            ${tvl.toLocaleString() || 0}
          </span>
        </div>
                <div
          // key={chart}
          // data-active={activeChart === chart}
          className=" relative flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
        // onClick={() => setActiveChart(chart)}
        >
          <span className="text-muted-foreground text-xs">
            {/* {chartConfig[chart].label} */}
            Unique Wallet Interactors
          </span>
          <span className="text-lg leading-none font-bold sm:text-3xl">
            {/* {total[key as keyof typeof total].toLocaleString()} */}
            {wallets.toLocaleString() || 0}
          </span>
        </div>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="">{metrics?.metrics[0]?.label}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <ResponsiveContainer width="100%" height={300}> */}
            {/* <LineChart data={chartData}>
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
            </LineChart> */}
          {/* </ResponsiveContainer> */}
        </CardContent>
      </Card>
    </section>
  );
}
