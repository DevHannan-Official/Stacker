const processErrorHandlers = () => {
  // Handle graceful shutdown on SIGINT (Ctrl+C)
  process.on("SIGINT", () => {
    console.log("❌ SIGINT received, shutting down gracefully!");
    process.exit(0);
  });

  // Handle graceful shutdown on SIGTERM (e.g., kill command, Heroku dyno shutdown)
  process.on("SIGTERM", () => {
    console.log("❌ SIGTERM received, shutting down gracefully!");
    process.exit(0);
  });

  // Handle uncaught exceptions
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    // Sentry integration placeholder
    if (global.Sentry && typeof global.Sentry.captureException === "function") {
      global.Sentry.captureException(err);
    }
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    // Sentry integration placeholder
    if (global.Sentry && typeof global.Sentry.captureException === "function") {
      global.Sentry.captureException(reason);
    }
    process.exit(1);
  });

  // Optional: Handle warnings
  process.on("warning", (warning) => {
    console.warn("⚠ Process Warning:", warning);
  });
};

export default processErrorHandlers;
