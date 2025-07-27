/**
 * Extrai uma lista de valores `key` a partir de um resultado retornado pela função `createKey`.
 * *
 * @param {KeyData | KeyData[]} result - Resultado retornado por `createKey`.
 * @returns {string[]} Array das chaves extraidas
 *
 */

export const getKeysFromResult = (result) => {
  const array = Array.isArray(result) ? result : [result];
  return array.map((item) => item.key);
};