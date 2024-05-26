"use client";
import { FC, PropsWithChildren, useState } from "react";
import { ThemeProvider } from "styled-components";
export const theme = {
  primary: "#0a1629",
  secondary: "#91929e",
  tertiary: "#713fff",
  success: "#0ac947",
  warning: "#ffbd21",
  error: "#f73446",
  white: "#ffffff",
  black: "#000000",
  gray: "#7d8592",
};
export const Theme: FC<PropsWithChildren> = ({ children }) => {
  const themeDark = {
    primary: "#0a1629",
    secondary: "#91929e",
    tertiary: "#713fff",
    success: "blue",
    warning: "#ffbd21",
    error: "#f73446",
    white: "#ffffff",
    black: "#000000",
    gray: "#7d8592",
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
