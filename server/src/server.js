import app from "./app.js";
import { connectDB } from "./lib/db.js";

app.listen(5001, async () => {
  console.log("✔ Stacker HTTP Server is running on port 5001");
  await connectDB();
});
