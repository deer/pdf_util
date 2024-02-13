import { assertEquals, retry } from "./test_deps.ts";
import { mergePdfs } from "../src/mergeCommand.ts";
import { generatePdf } from "../src/generateCommand.ts";

Deno.test("mergePdfs merges given PDF files correctly", async () => {
  const tmpDirName = await Deno.makeTempDir();

  await generatePdf(`${tmpDirName}/A`, 3);
  await generatePdf(`${tmpDirName}/B`, 4);

  const filesAndPages = [`${tmpDirName}/A.pdf:1-2`, `${tmpDirName}/B.pdf`];
  const outputFilename = `${tmpDirName}/output.pdf`;

  await mergePdfs(filesAndPages, outputFilename);

  const fileInfo = await Deno.stat(outputFilename);
  const fileExists = fileInfo.isFile;
  const fileSizeIsNonZero = fileInfo.size > 0;

  assertEquals(fileExists, true, "The merged PDF file should exist.");
  assertEquals(
    fileSizeIsNonZero,
    true,
    "The merged PDF file's size should be non-zero.",
  );

  await retry(() => Deno.remove(tmpDirName, { recursive: true }));
});
