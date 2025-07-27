import { genKey } from "./controllers/genKeycontroller.js";
import { createKey, } from "./controllers/createKeyController.js";
import { getKeysFromResult } from "./utils/getKeys.js";
import { defaultOptions } from "./utils/defaultOptions.js";
import { exportToJson } from "./utils/exportToJson.js";
/**
 * Módulo de geração de chaves.
 * 
 * ___Modos:___
 * - `genKey`: modo interativo via terminal, realiza perguntas e exibe a chave.
 * - `createKey`: para uso como biblioteca, retorna a chave com base nas opções fornecidas.
 *
 * @namespace clikey
 */
const clikey = { genKey , createKey, getKeysFromResult, defaultOptions, exportToJson };

export default clikey;

export {
    genKey,
    createKey,
    getKeysFromResult,
    defaultOptions,
    exportToJson
}