import app from "./app.js";
import { dbConnect } from "./lib/db.js";
import { ENV } from "./lib/env.js";

const PORT = ENV.PORT;

app.listen(PORT, async () => {
  console.log("✔ Stacker HTTP Server is running on port", PORT);
  await dbConnect();
});
