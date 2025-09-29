import {
  Log,
  LogCollector,
  LogFunction,
  LogLevel,
  LogLevels,
} from "@/types/LogCollector";

export const createLogCollector = (): LogCollector => {
  const logs: Log[] = [];
  const getAll = () => logs;

  const logFunction = {} as Record<LogLevel, LogFunction>;
  LogLevels.forEach(
    (level) =>
      (logFunction[level] = (message: string) => {
        logs.push({
          message,
          level,
          timestamp: new Date(),
        });
      })
  );
  return {
    getAll,
    ...logFunction,
  };
};
