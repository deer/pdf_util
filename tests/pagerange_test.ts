import { parsePageRanges } from "../src/mergeCommand.ts";
import { assertEquals } from "./test_deps.ts";

Deno.test("Single Page", () => {
  const result = parsePageRanges("3");
  assertEquals(result, [2]); // Expecting page 3 (zero-based index: 2)
});

Deno.test("Multiple Single Pages", () => {
  const result = parsePageRanges("3,5,7");
  assertEquals(result, [2, 4, 6]); // Expecting pages 3, 5, 7
});

Deno.test("Range of Pages", () => {
  const result = parsePageRanges("1-5");
  assertEquals(result, [0, 1, 2, 3, 4]); // Expecting pages 1 through 5
});

Deno.test("Combinations of Single Pages and Ranges", () => {
  const result = parsePageRanges("1-5,7,9-12");
  assertEquals(result, [0, 1, 2, 3, 4, 6, 8, 9, 10, 11]); // Expecting a combination
});
