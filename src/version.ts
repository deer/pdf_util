import { format, increment, parse, ReleaseType } from "./deps.ts";

type Versions = {
  versions: string[];
};

export function getVersions() {
  const versions = JSON.parse(
    Deno.readTextFileSync("./src/versions.json"),
  ) as Versions;
  return versions.versions;
}

export function getLatestVersion() {
  return getVersions()[0];
}

export function increaseVersion(release: ReleaseType) {
  const versions = getVersions();
  const newVersion = increment(parse(versions[0]), release);
  versions.unshift(format(newVersion));
  Deno.writeTextFileSync(
    "./src/versions.json",
    JSON.stringify({ versions }, null, 2) + "\n",
  );
}
