React Versionamento Semântico Automático

Este projeto facilita o versionamento semântico em projetos React. Ele utiliza um script Node.js e aliases do Git para automatizar o processo de incrementar versões com base no tipo de commit realizado.

Estrutura de Arquivos
react-version/versionData.json: Armazena os números de versão atual para major, minor e patch.
versionBump.js: Script para atualizar a versão com base no tipo de commit.
Modo de Implementar

1. Configurar Arquivos
   Dentro do diretório raiz do seu projeto React, crie uma pasta chamada react-version.
   Dentro de react-version, crie um arquivo chamado versionData.json com o conteúdo:

```
{
  "major": 0,
  "minor": 0,
  "patch": 0
}
```

No diretório raiz, crie um arquivo chamado versionBump.js e adicione o seguinte script:

```
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

  return `${versionData.major || 0}.${versionData.minor || 0}.${versionData.patch || 0}`;
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
      fs.writeFileSync(versionDataPath, JSON.stringify(versionData, null, 2) + "\n");

      console.log(`Version bumped to ${newVersion}`);
    }
  } else {
    console.log("Versionamento desativado. Sem alterações.");
  }
};

main();

```

2. Configurar Aliases do Git
   Abra seu terminal ou prompt de comando e execute o

```
git config --global alias.fet '!f() { git commit -m "fet: $1"; node versionBump.js; }; f'
git config --global alias.fix '!f() { git commit -m "fix: $1"; node versionBump.js; }; f'
git config --global alias.build '!f() { git commit -m "build: $1"; node versionBump.js; }; f'

```

Modo de Usar
Ativar Versionamento no Projeto
No seu package.json, adicione a seguinte linha ao seu script de start:

```
"start": "BROWSER=none, VERSION=true react-scripts start"

```

Fazer Commits e Versionar
Agora, em vez de usar git commit -m "mensagem", use um dos seguintes comandos:

Para features (incrementa a versão minor):

```
git fet "Descrição da nova funcionalidade"
```

Para correções (incrementa a versão patch):

```
git fix "Descrição da correção"

```

Para builds ou lançamentos maiores (incrementa a versão major):

```
git build "Descrição da nova versão ou mudança significativa"
```
