"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";

// 中文注释：浅色/暗色切换按钮（与语言切换并排显示）
export default function ThemeToggle() {
  // 中文注释：主题状态（light / dark），默认读取本地缓存，否则为 light
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // 中文注释：初始化时同步 html 的 dark 类，保证刷新后仍保持用户选择
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      const initial = saved === "dark" ? "dark" : "light";
      setTheme(initial);
      const root = document.documentElement;
      if (initial === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
    } catch {}
  }, []);

  // 中文注释：切换主题并写入本地缓存
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      const root = document.documentElement;
      if (next === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
      try {
        localStorage.setItem("theme", next);
      } catch {}
      return next;
    });
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="w-8 h-8 p-0 flex items-center justify-center"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "切换为浅色" : "切换为暗色"}
      title={theme === "dark" ? "切换为浅色" : "切换为暗色"}
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  );
}