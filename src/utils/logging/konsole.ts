const log = (...args: unknown[]) => {
  if (process.env.NEXT_PUBLIC_NODE_ENV?.toLowerCase() === "development") {
  }
};

const warn = (...args: unknown[]) => {
  if (process.env.NEXT_PUBLIC_NODE_ENV?.toLowerCase() === "development") {
    console.warn(...args);
  }
};

const error = (...args: unknown[]) => {
  if (process.env.NEXT_PUBLIC_NODE_ENV?.toLowerCase() === "development") {
    console.error(...args);
  } else {
    console.error("An error occurred. Check server logs for details.");
  }
};

const konsole = {
  log,
  warn,
  error,
};

export default konsole;
