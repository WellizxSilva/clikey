import { inRange, toNumber } from "../utils/validator.js";
import { KeyGenerator } from "../core/keyGenerator.js";
import { DEFAULT_OPTIONS } from "../configs/options.js";
/**
 * @typedef {Object} KeyData
 * @property {string} key - A chave gerada
 * @property {Object} appliedModifiers - As opções aplicadas
 */

/**
 * @typedef {KeyData[]} KeyResultArray
 * Um array de objetos contendo as chaves geradas e suas modificações aplicadas
 */

/**
 * Gera uma chave baseada nas opções fornecidas.
 *
 * @param {object} options - Configurações personalizadas de geração.
 * @param {boolean} [options.upperCase] - Incluir letras maiúsculas.
 * @param {boolean} [options.lowerCase] - Incluir letras minúsculas.
 * @param {boolean} [options.numbers] - Incluir números.
 * @param {boolean} [options.symbols] - Incluir símbolos.
 * @param {string | number} [options.prefix] - Incluir prefixo.
 * @param {string | number} [options.suffix] - Incluir sufixo.
 * @param {number} [options.length] - Tamanho da chave (mínimo: 8, máximo: 256).
 * @param {boolean} [options.grouped] - Agrupa a chave em blocos visuais.
 * @param {boolean} [options.styledOutput] - Aplica estilo visual à chave.
 * @param {number} [options.repeatCount] - Quantidade de chaves a ser gerada.
 * @returns {KeyResultArray}
 */
export const createKey = (options = {}) => {
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };
  const length = toNumber(mergedOptions.length);
  mergedOptions.length = inRange(8, 256, length)
    ? length
    : DEFAULT_OPTIONS.length;

  const generator = new KeyGenerator(mergedOptions).generate();
  return Array.isArray(generator) ? generator : [generator];
};
