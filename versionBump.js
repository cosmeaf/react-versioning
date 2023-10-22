const fs = require("fs");
const { execSync } = require("child_process");

const versionDataPath = "./react-version/versionData.json";
const pkgPath = "./package.json";

const versionData = require(versionDataPath);
const pkg = require(pkgPath);

const bumpVersion = (type) => {
  versionData[type] += 1;

  if (type === "fet") {
    versionData.fix = 0;
    versionData.build = 0;
  } else if (type === "fix") {
    versionData.build = 0;
  }

  return `${versionData.fet}.${versionData.fix}.${versionData.build}`;
};

const main = () => {
  if (pkg.scripts.start.includes("VERSION=true")) {
    const commitMsg = execSync("git log -1 --pretty=%B").toString().trim();
    const match = commitMsg.match(/^(Fet|Fix|Build):/i);

    if (match) {
      const type = match[1].toLowerCase();
      const newVersion = bumpVersion(type);

      pkg.version = newVersion;

      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
      fs.writeFileSync(
        versionDataPath,
        JSON.stringify(versionData, null, 2) + "\n"
      );

      console.log(`Version bumped to ${newVersion}`);
    }
  } else {
    console.log("Versionamento desativado. Sem alterações.");
  }
};

main();
