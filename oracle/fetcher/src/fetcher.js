import axios from "axios";
import fs from "fs";
import * as cheerio from "cheerio";

const PERSIST_FILE = "./data/lastgood.json";

function persistSave(obj) {
  try {
    fs.mkdirSync("./data", { recursive: true });
    fs.writeFileSync(PERSIST_FILE, JSON.stringify(obj), "utf8");
  } catch (e) {
    console.error("Persist save failed:", e.message);
  }
}

function persistLoad() {
  try {
    if (fs.existsSync(PERSIST_FILE)) {
      const raw = fs.readFileSync(PERSIST_FILE, "utf8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Persist load failed:", e.message);
  }
  return null;
}

let lastGood = persistLoad() || null;
let latestData = null;
let allData = [];

export async function fetchIEXDayAheadSnapshot() {
  try {
    const { data } = await axios.get(
      "https://www.iexindia.com/market-data/day-ahead-market/market-snapshot",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
      }
    );

    const $ = cheerio.load(data);
    const tableData = [];

    $("table tbody tr").each((i, row) => {
      const cols = $(row).find("td").map((i, el) => $(el).text().trim()).get();
      if (cols.length >= 7) {
        tableData.push({
          block: cols[0],
          timeRange: cols[1],
          purchaseBid: parseFloat(cols[2]) || 0,
          sellBid: parseFloat(cols[3]) || 0,
          mcv: parseFloat(cols[4]) || 0,
          finalScheduledVolume: parseFloat(cols[5]) || 0,
          mcp: cols[6] && cols[6] !== "-" ? parseFloat(cols[6]) : null,
        });
      }
    });

    allData = tableData;

    // last valid MCP
    const last = [...tableData].reverse().find((r) => r.mcp !== null);
    if (last) {
      latestData = { ...last, updatedAt: Date.now() };
      lastGood = latestData;
      persistSave(lastGood);
    }

    return { latest: latestData, all: allData };
  } catch (err) {
    console.error("Fetch error:", err.message);
    return { latest: lastGood, all: allData };
  }
}

export function getLatest() {
  return latestData || lastGood || { error: "No data yet" };
}

export async function getAll() {
  if (allData.length === 0) {
    await fetchIEXDayAheadSnapshot();
  }
  return allData;
}

