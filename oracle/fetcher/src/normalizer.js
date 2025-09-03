// src/normalizer.js
// converts price in ₹/MWh -> onchain int scaled by 1e8 (₹/kWh * 1e8)
// src/normalizer.js
export function normalizeMWhToOnchain(rawPriceMWh) {
  if (typeof rawPriceMWh !== "number" || rawPriceMWh <= 0) {
    throw new Error("bad price");
  }
  const priceKWh = rawPriceMWh / 1000;  // convert to ₹/kWh
  return Math.round(priceKWh * 1e8);    // scale for on-chain
}

