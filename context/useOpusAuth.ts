"use client";
import { useContext } from "react";
import { OpusAuthContext } from "./OpusAuthContext";

export const useOpusAuth = () => {
  const context = useContext(OpusAuthContext);
  if (!context) {
    throw new Error("useOpusAuth must be used within an OpusAuthProvider");
  }
  return context;
};
