type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  requestId?: string;
  userId?: string;
  endpoint?: string;
  duration?: number;
  statusCode?: number;
  metadata?: Record<string, unknown>;
}

function createLogEntry(
  level: LogLevel,
  message: string,
  meta?: Partial<Omit<LogEntry, "timestamp" | "level" | "message">>
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };
}

function emit(entry: LogEntry) {
  const output = JSON.stringify(entry);
  switch (entry.level) {
    case "error":
    case "fatal":
      console.error(output);
      break;
    case "warn":
      console.warn(output);
      break;
    case "debug":
      if (process.env.NODE_ENV !== "production") {
        console.debug(output);
      }
      break;
    default:
      console.log(output);
  }
}

export const logger = {
  debug(message: string, meta?: Partial<LogEntry>) {
    emit(createLogEntry("debug", message, meta));
  },
  info(message: string, meta?: Partial<LogEntry>) {
    emit(createLogEntry("info", message, meta));
  },
  warn(message: string, meta?: Partial<LogEntry>) {
    emit(createLogEntry("warn", message, meta));
  },
  error(message: string, meta?: Partial<LogEntry>) {
    emit(createLogEntry("error", message, meta));
  },
  fatal(message: string, meta?: Partial<LogEntry>) {
    emit(createLogEntry("fatal", message, meta));
  },
};
