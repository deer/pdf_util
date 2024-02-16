import {
  Command,
  CompletionsCommand,
  GithubProvider,
  UpgradeCommand,
} from "./src/deps.ts";
import { generateCommand } from "./src/generateCommand.ts";
import { mergeCommand } from "./src/mergeCommand.ts";
import { getLatestVersion } from "./src/version.ts";

await new Command()
  .name("pdf_util")
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
      main: "./cli.ts",
      args: ["--allow-read", "--allow-write"],
      provider: new GithubProvider({ repository: "deer/pdf_util" }),
    }),
  )
  .parse(Deno.args);
