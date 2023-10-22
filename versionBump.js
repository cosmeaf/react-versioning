const fs = require("fs");
const { execSync } = require("child_process");

const versionDataPath = "./react-version/versionData.json";
const pkgPath = "./package.json";

const versionData = require(versionDataPath);
const pkg = require(pkgPath);

const bumpVersion = (type) => {
  switch (type) {
    case "build":
      versionData.major += 1;
      versionData.minor = 0;
      versionData.patch = 0;
      break;
    case "fet":
      versionData.minor += 1;
      versionData.patch = 0;
      break;
    case "fix":
      versionData.patch += 1;
      break;
  }

  return `${versionData.major || 0}.${versionData.minor || 0}.${
    versionData.patch || 0
  }`;
};

const main = () => {
  if (pkg.scripts.start.includes("VERSION=true")) {
    const commitMsg = execSync("git log -1 --pretty=%B").toString().trim();
    const match = commitMsg.match(/^(build|fet|fix):/i);

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
