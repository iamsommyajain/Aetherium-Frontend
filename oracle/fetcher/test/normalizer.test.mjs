import assert from "assert";
import { normalizeMWhToOnchain } from "../src/normalizer.js";

assert.strictEqual(normalizeMWhToOnchain(3725), 3725/1000 * 1e8);
try {
  normalizeMWhToOnchain(-1);
  throw new Error("should have thrown");
} catch (e) {
  // expected
}
console.log("normalizer tests passed");
