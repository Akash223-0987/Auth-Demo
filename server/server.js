import dotenv from "dotenv";
import app from "./App.js";

dotenv.config();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
