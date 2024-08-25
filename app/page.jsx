"use client";
import React, { useState, useEffect } from "react";
import { AppProvider } from "@/context/appContext";
import { ThemeProvider } from "next-themes";
import LayoutWrapper from "@/components/LayoutWrapper";
import Sidebar from "@/components/Sidebar";
import MainViewWrapper from "@/components/MainViewWrapper";
import TopBar from "@/components/TopBar";
import MainView from "@/components/MainView";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [activeBoard, setActiveBoard] = useState(1);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    async function fetchBoards() {
      try {
        const response = await fetch("/api/boards");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching boards: ", error);
      }
    }

    fetchBoards();
  }, [activeTask]);

  return (
    <AppProvider>
      <ThemeProvider>
        <LayoutWrapper>
          <Sidebar
            activeBoard={activeBoard}
            setActiveBoard={setActiveBoard}
            boards={data}
          />
          <MainViewWrapper>
            <TopBar
              setData={setData}
              setActiveBoard={setActiveBoard}
              activeBoard={activeBoard}
              boards={data}
            />
            <MainView
              activeTask={activeTask}
              setActiveTask={setActiveTask}
              boards={data?.filter((board) => board.id === activeBoard)}
              setData={setData}
              data={data}
            />
          </MainViewWrapper>
        </LayoutWrapper>
      </ThemeProvider>
    </AppProvider>
  );
};

export default HomePage;
