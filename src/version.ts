import { format, increment, parse, ReleaseType } from "./deps.ts";
import VERSIONS from "./versions.json" with { type: "json" };

type Versions = {
  versions: string[];
};

export function getVersions() {
  const versions = VERSIONS as Versions;
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
