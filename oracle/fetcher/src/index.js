// src/index.js
import dotenv from "dotenv";
dotenv.config();

console.log("🚀 index.js starting...");

import { createServer } from "./server.js";
import * as fetcher from "./fetcher.js";

const PORT = parseInt(process.env.PORT || "5000", 10);
const INTERVAL = parseInt(process.env.FETCH_INTERVAL_SEC || "60", 10);
const SOURCE = (process.env.SOURCE_TYPE || "mock").toLowerCase();
const API_KEY = process.env.API_KEY;

console.log("⚡ Config loaded:", { PORT, INTERVAL, SOURCE });

try {
  const app = createServer({ apiKey: API_KEY });
  console.log("✅ Server created");

  app.listen(PORT, () => console.log(`Fetcher listening on http://localhost:${PORT}`));

  async function runOnce() {
    try {
      let res;
      if (SOURCE === "iex-scraper") res = await fetcher.fetchIEXDayAheadSnapshot();
      else if (SOURCE === "opendatadsl") res = await fetcher.fetchFromOpenDataDSL();
      else if (SOURCE === "eia") res = await fetcher.fetchFromEIA(process.env.EIA_API_KEY);
      else res = await fetcher.fetchMock();

      console.log("Fetched:", res || fetcher.getLatest());
    } catch (err) {
      console.error("❌ Fetch error:", err?.message || err);
    }
  }

  await runOnce();
  setInterval(runOnce, INTERVAL * 1000);
} catch (err) {
  console.error("🔥 Fatal startup error:", err);
  process.exit(1);
}

// graceful shutdown
process.on("SIGINT", () => { console.log("SIGINT — exiting"); process.exit(0); });
process.on("SIGTERM", () => { console.log("SIGTERM — exiting"); process.exit(0); });
