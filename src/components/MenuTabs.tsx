import React from "react";
import { Button } from "./Button";
import { GitHubLink } from "./GitHubLink";

interface TabNavigationProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  selectedTab,
  onTabChange,
}) => {
  const renderTab = (name: string, label: string) => (
    <Button
      className={`rounded-md px-4 py-2 ${
        selectedTab === name
          ? "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900"
          : "bg-white dark:bg-transparent text-gray-700 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-slate-700"
      }`}
      onClick={() => onTabChange(name)}
    >
      {label}
    </Button>
  );

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-2">
        {renderTab("simulation", "Simulation")}
        {renderTab("settings", "Settings")}
        {renderTab("help", "Help")}
      </div>
      <GitHubLink repoUrl="https://github.com/petersolopov/non-ergodic-coin-game" />
    </div>
  );
};
