import { writeFile } from "fs/promises";
import fs from "fs";
import { resolve } from "path";
import { getKeysFromResult } from "./getKeys.js";
/**
 * Exporta as chaves para um arquivo no formato JSON.
 * @param {Array<Object>} keyData - Array de objetos retornados pelo createKey(). (Se o caminho não for valido, ele vai ser criado automatico, com base no repeatCount e data atual)
 * @param {string} path - Caminho do arquivo de destino (ex: './chaves.json').
 * @param {boolean} [onlyKeys] - Se verdadeiro, exporta apenas os valores das chaves.
 */

export const exportToJson = async (keyData, path = null, onlyKeys = false) => {
  try {
    const timeStamp = new Date().toDateString().replace(/[ ]/g, "_");
    const defaultPath = `./chaves-${timeStamp}.json`;
    const filePath = resolve(path || defaultPath);

    const keys = Array.isArray(keyData) ? keyData : getKeysFromResult(keyData);

    let data;
    if (onlyKeys) {
      data = JSON.stringify(
        keys.map((obj) => obj.key || obj),
        null,
        2
      );
    } else {
      const config =
        Array.isArray(keyData) && keyData[0]?.appliedModifiers
          ? keyData[0].appliedModifiers
          : {};

      data = JSON.stringify(
        {
          chaves: keys.map((obj) => obj.key || obj),
          config,
        },
        null,
        2
      );
    }
    await writeFile(filePath, data, "utf8");
    return `✅ Arquivo exportado com sucesso: ${filePath}`;
  } catch (error) {
    return `❌ Falha ao exportar: ${error.message}`;
  }
};

