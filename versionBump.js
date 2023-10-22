const fs = require("fs");
const path = require("path");

const pkgPath = path.join(__dirname, "package.json");
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
  const commitMsgPath = path.join(__dirname, ".git/COMMIT_EDITMSG");
  const commitMsg = fs.readFileSync(commitMsgPath, "utf8");

  const match = commitMsg.match(/^(Fet|Fix|Build):/);

  if (match) {
    const newVersion = bumpVersion(pkg.version, match[1]);
    pkg.version = newVersion;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  }
};

main();
