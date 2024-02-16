import { $, assertStringIncludes, retry, stripAnsiCode } from "./test_deps.ts";

Deno.test("pdf_util runs", async (t) => {
  const tmpDirName = await Deno.makeTempDir();

  await t.step("help command", async () => {
    const helpOutput =
      await $`deno run --allow-read --allow-net ./cli.ts --help`
        .text();
    assertStringIncludes(stripAnsiCode(helpOutput), "Usage:   pdf_util");
    assertStringIncludes(
      stripAnsiCode(helpOutput),
      `-h, --help     - Show this help.`,
    );
  });

  const pdfUtilLocation = "./cli.ts";
  await t.step("generate command", async () => {
    try {
      await $`deno run -A ${pdfUtilLocation} generate A 3`;
      await $`deno run -A ${pdfUtilLocation} generate B 4`;
      await $`deno run -A ${pdfUtilLocation} merge -f A.pdf B.pdf`;
    } finally {
      await retry(() => Deno.remove("A.pdf"));
      await retry(() => Deno.remove("B.pdf"));
      await retry(() => Deno.remove("merged.pdf"));
    }
  });

  await retry(() => Deno.remove(tmpDirName, { recursive: true }));
});
