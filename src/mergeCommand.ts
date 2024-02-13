import { Command, PDFDocument } from "./deps.ts";

export const mergeCommand = new Command()
  .name("merge")
  .description("Merge multiple PDF files into one.")
  .option(
    "-f, --filesAndPages <filesAndPages...:string>",
    "The PDF files to merge with optional page ranges in brackets, e.g., A.pdf[1-2]",
  )
  .option(
    "-o, --output <output:string>",
    "Output filename for the merged PDF",
    { default: "merged.pdf" },
  )
  .action(async ({ filesAndPages, output }) => {
    if (!filesAndPages || filesAndPages.length === 0) {
      console.error("No files provided to merge.");
      return;
    }
    await mergePdfs(filesAndPages, output);
  });

async function mergePdfs(
  filesAndPages: string[],
  outputFilename: string,
) {
  const mergedPdf = await PDFDocument.create();

  for (const fileAndPage of filesAndPages) {
    // Extract filename and page range, e.g., "A.pdf:1-2" -> "A.pdf" and "1-2"
    const [filePath, pageRangeString] = fileAndPage.split(":");
    const pdfBytes = await Deno.readFile(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    let pagesToInclude: number[];

    if (pageRangeString) {
      const pageIndices = parsePageRanges(pageRangeString);
      pagesToInclude = pageIndices.filter((index) =>
        index >= 0 && index < pdfDoc.getPageCount()
      );
    } else {
      pagesToInclude = Array.from(Array(pdfDoc.getPageCount()).keys());
    }

    const copiedPages = await mergedPdf.copyPages(pdfDoc, pagesToInclude);
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  await Deno.writeFile(outputFilename, mergedPdfBytes);
  console.log(`Merged PDF saved as ${outputFilename}`);
}

export function parsePageRanges(pageRange: string): number[] {
  const pageNumbers: number[] = [];

  // Split the pageRange string by comma to handle combinations
  const parts = pageRange.split(",");

  parts.forEach((part) => {
    if (part.includes("-")) {
      // Handle ranges like "1-5"
      const [start, end] = part.split("-").map((num) => parseInt(num, 10) - 1);
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Handle single pages like "3"
      const pageNum = parseInt(part, 10) - 1; // Adjust for zero-based index
      pageNumbers.push(pageNum);
    }
  });

  return pageNumbers;
}
