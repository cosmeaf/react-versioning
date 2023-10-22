const fs = require("fs");
const { execSync } = require("child_process");

const pkgPath = "./package.json";
const pkg = require(pkgPath);

const bumpVersion = (currentVersion, type) => {
  const parts = currentVersion.split(".").map((part) => parseInt(part));

  switch (type) {
    case "Fet":
      parts[0] += 1;
      parts[1] = 0;
      parts[2] = 0;
      break;
    case "Fix":
      parts[1] += 1;
      parts[2] = 0;
      break;
    case "Build":
      parts[2] += 1;
      break;
  }

  return parts.join(".");
};

const main = () => {
  const commitMsg = execSync("git log -1 --pretty=%B").toString().trim();

  const match = commitMsg.match(/^(Fet|Fix|Build):/);

  if (match) {
    const newVersion = bumpVersion(pkg.version, match[1]);
    pkg.version = newVersion;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    console.log(`Version bumped to ${newVersion}`);
  } else {
    console.log("Commit message doesn't match the pattern. No version bump.");
  }
};

main();
