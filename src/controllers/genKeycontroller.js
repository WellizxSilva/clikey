import readline from "readline";
import { getKeysFromResult } from "../utils/getKeys.js";
import {
  QUESTIONS,
  ERRORS,
  BOOLEAN_ACCEPTS,
  BOOLEAN_NOT_ACCEPTS,
} from "../configs/options.js";
import { KeyGenerator } from "../core/keyGenerator.js";
import { toNumber, inRange } from "../utils/validator.js";

const OPTIONS = {};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const createInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });
};
const VALIDATORS = {
  length: (input) => {
    const num = toNumber(input);
    return inRange(8, 256, num) ? num : null;
  },
  repeatCount: (input) => {
    const count = toNumber(input);
    return inRange(1, Number.MAX_SAFE_INTEGER, count) ? count : null;
  },
  prefix: (input) => input,
  suffix: (input) => input,
  boolean: (input) => {
    const lowered = input.toLowerCase();
    if (BOOLEAN_ACCEPTS.includes(lowered)) return true;
    if (BOOLEAN_NOT_ACCEPTS.includes(lowered)) return false;
    return null;
  },
};

const askQuestions = (rl, question, key) => {
  return new Promise((resolve) => {
    const ask = () => {
      rl.question(question, (answer) => {
        const input = answer.trim();

        const type = ["prefix", "suffix"].includes(key)
          ? "prefix"
          : ["length", "repeatCount"].includes(key)
          ? key
          : "boolean";

        const result = VALIDATORS[type](input);

        if (result !== null && result !== undefined) return resolve(result);

        console.log(`⚠️  ${ERRORS[key]}`);
        ask();
      });
    };
    ask();
  });
};

const askAll = async (rl) => {
  for (const key of Object.keys(QUESTIONS)) {
    const response = await askQuestions(rl, QUESTIONS[key], key);
    OPTIONS[key] = response;
  }
  const modifiers = [
    OPTIONS.upperCase,
    OPTIONS.lowerCase,
    OPTIONS.numbers,
    OPTIONS.symbols,
  ];
  const atLeastOne = modifiers.some(Boolean);

  if (!atLeastOne) {
    console.log(
      `Nenhuma tipo de caractére foi selecionado, selecione no mínimo uma`
    );
    return askAll(rl);
  }
};

let lastCall = Promise.resolve();

/**
 * Gera uma chave com base nas opções fornecidas.
 * Por padrão, o resultado é exibido diretamente no terminal (modo interativo).
 * @param {object} options
 * @param {boolean} options.toOutput - Define se o resultado deve ser exibido no terminal. Quando 'false' apenas retorna o valor da chave. (padrão: true)
 * @param {boolean} options.clearTerminal - Limpa o terminal antes de executar o `genKey`
 * @returns {Promise<string>}
 */

export const genKey = (options = {}) => {
  lastCall = lastCall.then(() => keyGenerator(options));
  return lastCall;
};

export const keyGenerator = async ({ toOutput = true, clearTerminal }) => {
  if (clearTerminal) process.stdout.write("\x1Bc");

  console.log(`
╔═══════════════════════╗
║   🔐 CLIKEY v1.0      ║
╚═══════════════════════╝

📌 Gerador de Chaves Personalizadas

👉 Responda às perguntas abaixo para gerar sua chave
`);

  await sleep(500);
  const rl = createInterface();
  await askAll(rl);
  rl.close();
  const key = new KeyGenerator(OPTIONS).generate();
  const keys = getKeysFromResult(key);

  if (toOutput) {
    console.log(`
╔═══════════════════╗
║ 🔐 Chaves Gerada${OPTIONS.repeatCount > 1 ? "s" : " "} ║
╚═══════════════════╝
`);

    keys.forEach((key, index) => {
      const formatted = `🔐 Chave ${index + 1}: ${key}`;
      console.log(formatted);
    });

    console.log(`
╔══════════════════════╗
║ ✅ Geração Concluída ║
╚══════════════════════╝
`);
  }
  return keys;
};
