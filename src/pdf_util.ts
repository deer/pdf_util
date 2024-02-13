import {
  Command,
  CompletionsCommand,
  GithubProvider,
  UpgradeCommand,
} from "./deps.ts";
import { generateCommand } from "./generateCommand.ts";
import { mergeCommand } from "./mergeCommand.ts";
import { getLatestVersion } from "./version.ts";

await new Command()
  .name("PDF Util")
  .version(getLatestVersion())
  .description(
    "A CLI utility for managing PDFs: easily merge PDFs together.",
  )
  .action(() => {
    console.log("PDF Util CLI. Use --help for more information on commands.");
  })
  .command("completions", new CompletionsCommand())
  .command("generate", generateCommand)
  .command("merge", mergeCommand)
  .command(
    "upgrade",
    new UpgradeCommand({
      main: "./src/pdf_util.ts",
      args: ["--allow-read", "--allow-write"],
      provider: new GithubProvider({ repository: "deer/pdf_util" }),
    }),
  )
  .parse(Deno.args);
