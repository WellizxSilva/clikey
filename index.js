import clikey from "./src/clikey.js";

const chave = clikey.createKey({length: 64, prefix: "clikey", suffix: "v1.0", repeatCount: 12, styledOutput: true})


clikey.ge
//console.log(clikey.getKeysFromResult(chave))

