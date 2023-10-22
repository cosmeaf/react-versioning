const fs = require("fs");

const bumpVersion = (currentVersion, type) => {
  const parts = currentVersion.split(".").map((part) => parseInt(part));

  switch (type) {
    case "Fet":
      parts[0] += 1; // Incrementa major
      parts[1] = 0; // Reset minor
      parts[2] = 0; // Reset patch
      break;
    case "Fix":
      parts[1] += 1; // Incrementa minor
      parts[2] = 0; // Reset patch
      break;
    case "Build":
      parts[2] += 1; // Incrementa patch
      break;
  }

  return parts.join(".");
};

const main = () => {
  const pkg = require("./package.json");

  // Obtenha a última mensagem de commit
  const lastCommitMsg = fs.readFileSync(".git/COMMIT_EDITMSG", "utf-8").trim();
  const match = lastCommitMsg.match(/^(Fet|Fix|Build):/);

  if (match) {
    const newVersion = bumpVersion(pkg.version, match[1]);
    pkg.version = newVersion;

    fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 2));
  }
};

main();
