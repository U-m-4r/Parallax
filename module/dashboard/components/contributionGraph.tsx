"use client";
import React from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { getContributionStats } from "@/module/dashboard/actions";
import { useQuery } from "@tanstack/react-query";

const ContributionGraph = () => {
  const { theme } = useTheme();
  const { data, isLoading } = useQuery({
    queryKey: ["contribution-stats"],
    queryFn: async () => await getContributionStats(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justfy-center p-8">
        <div className="animate-pulse text-muted-foreground">
          Loading contribution graph...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full flex flex-col items-center justfy-center p-8">
        <div className="text-muted-foreground">
          No contribution data available.
        </div>
      </div>
    );
  }

  return <div className='w-full flex flex-col items-center gap-4 p-4'>
            <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{data.totalContributions}</span>
                contributions in the last year
            </div>

            <div className='w-full overflow-x-auto'>
                <div className='flex justify-center min-w-max px-4'>
                    <ActivityCalendar
                        data={data.contributions || []}
                        colorScheme={theme === "dark" ? "dark" : "light"}
                        blockSize={11}
                        blockMargin={3}
                        fontSize={14}
                        showWeekdayLabels
                        showMonthLabels
                        theme={{
                            light: [
                            "#ebedf0",
                            "#9be9a8",
                            "#40c463",
                            "#30a14e",
                            "#216e39",
                            ],
                            dark: [
                            "#161b22",
                            "#0e4429",
                            "#006d32",
                            "#26a641",
                            "#39d353",
                            ],
                        }}
                    />
                </div>
            </div>
    </div>;
};

export default ContributionGraph;
