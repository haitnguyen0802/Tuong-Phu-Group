"use client";

import * as React from "react";

/**
 * Detect constrained devices to scale down non-essential animation work.
 */
export function useLowEndDevice() {
  return React.useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const cpuThreads = navigator.hardwareConcurrency ?? 8;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const prefersSaveData =
      typeof connection === "object" && !!connection.saveData;

    return prefersSaveData || cpuThreads <= 4 || memory <= 4;
  }, []);
}
