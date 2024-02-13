import { Command, PDFDocument } from "./deps.ts";

export const generateCommand = new Command()
  .name("generate")
  .description("Generate test PDF documents.")
  .arguments("<identifier:string> <number:number>")
  .action(async (_options, identifier: string, number: number) => {
    await generatePdf(identifier, number);
  })
  .hidden();

export async function generatePdf(identifier: string, numberOfPages: number) {
  const pdfDoc = await PDFDocument.create();

  for (let i = 1; i <= numberOfPages; i++) {
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 90;
    page.drawText(`${identifier}${i}`, {
      x: width / 2 - (fontSize * 0.5 * (`${identifier}${i}`).length),
      y: height / 2 - (fontSize / 2),
      size: fontSize,
    });
  }

  const pdfBytes = await pdfDoc.save();
  await Deno.writeFile(`${identifier}.pdf`, pdfBytes);
  console.log(`Generated ${identifier}.pdf with ${numberOfPages} pages.`);
}
