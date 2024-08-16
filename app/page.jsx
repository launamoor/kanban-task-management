"use client";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import LayoutWrapper from "@/components/LayoutWrapper";
import Sidebar from "@/components/Sidebar";
import MainViewWrapper from "@/components/MainViewWrapper";
import TopBar from "@/components/TopBar";
import MainView from "@/components/MainView";

const HomePage = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    async function fetchBoards() {
      try {
        const response = await fetch("/api/boards");
        const data = await response.json();
        setBoards(data);
      } catch (error) {
        console.error("Error fetching boards: ", error);
      }
    }

    fetchBoards();
  }, []);

  const [activeBoard, setActiveBoard] = useState(1);
  return (
    <ThemeProvider>
      <LayoutWrapper>
        <Sidebar
          activeBoard={activeBoard}
          setActiveBoard={setActiveBoard}
          boards={boards}
        />
        <MainViewWrapper>
          <TopBar activeBoard={activeBoard} boards={boards} />
          <MainView
            boards={boards.filter((board) => board.id === activeBoard)}
          />
        </MainViewWrapper>
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default HomePage;
