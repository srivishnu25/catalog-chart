import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs";
import ChartTab from "./ChartTab";
import { memo } from "react";

const TABS = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];

const DashboardTabs = memo(({ onUpdate }) => {
  const [activeTab, setActiveTab] = useState("Chart");

  const getTabContent = (tab) => {
    switch (tab) {
      case "Chart":
        return <ChartTab onUpdate={onUpdate} />;

      default:
        return tab;
    }
  };
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="flex justify-start gap-10 px-10 py-0 w-full border-b border-[#EFF1F3] h-[42px]">
        {TABS.map((tab) => (
          <TabsTrigger
            className="p-0 px-2 h-full text-lg relative items-start cursor-pointer"
            key={tab}
            value={tab}
          >
            {tab}
            {activeTab === tab && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 border-primary border-b-3"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      {TABS.map((tab) => (
        <TabsContent key={tab} value={tab} className="px-10">
          {getTabContent(tab)}
        </TabsContent>
      ))}
    </Tabs>
  );
});

export { DashboardTabs };
