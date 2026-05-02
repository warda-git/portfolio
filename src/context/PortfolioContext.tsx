import { createContext, useContext, useState, ReactNode } from "react";
import { RESUME_DATA } from "../constants";

type ResumeData = typeof RESUME_DATA;

interface PortfolioContextType {
  data: ResumeData;
  updateData: (newData: ResumeData) => void;
  isEditMode: boolean;
  setEditMode: (mode: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(RESUME_DATA);
  const [isEditMode, setEditMode] = useState(false);

  const updateData = (newData: ResumeData) => {
    setData(newData);
    // Optional: Persist to localStorage
    localStorage.setItem("portfolio_data", JSON.stringify(newData));
  };

  // Load from localStorage on init if exists
  useState(() => {
    const saved = localStorage.getItem("portfolio_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
      } catch (e) {
        console.error("Failed to parse saved data");
      }
    }
  });

  return (
    <PortfolioContext.Provider value={{ data, updateData, isEditMode, setEditMode }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used within PortfolioProvider");
  return context;
}
