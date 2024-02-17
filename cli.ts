import {
  Command,
  CompletionsCommand,
  DenoLandProvider,
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
      args: [
        "--allow-read", // so it can read PDFs
        "--allow-write", // so it can write PDFs
        "--allow-net=cdn.deno.land,api.github.com", // so it can upgrade
        "--allow-run", // also so it can upgrade
        // "--allow-env=_"  // so it can determine the name of itself -- this isn't implemented in cliffy yet
      ],
      provider: [
        new DenoLandProvider(),
        new GithubProvider({ repository: "deer/pdf_util" }),
      ],
    }),
  )
  .parse(Deno.args);
