"use client";
import React, { useState } from "react";
import { ThemeProvider } from "next-themes";
import LayoutWrapper from "@/components/LayoutWrapper";
import Sidebar from "@/components/Sidebar";
import MainViewWrapper from "@/components/MainViewWrapper";
import TopBar from "@/components/TopBar";
import MainView from "@/components/MainView";

const HomePage = () => {
  const [activeBoard, setActiveBoard] = useState(1);
  return (
    <ThemeProvider>
      <LayoutWrapper>
        <Sidebar activeBoard={activeBoard} setActiveBoard={setActiveBoard} />
        <MainViewWrapper>
          <TopBar activeBoard={activeBoard} />
          <MainView />
        </MainViewWrapper>
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default HomePage;
