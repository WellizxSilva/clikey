#!/usr/bin/env node

import { Command } from "commander";
import { DEFAULT_OPTIONS } from "../configs/options.js";
import { createKey } from "../controllers/createKeyController.js";
import { getKeysFromResult } from "../utils/getKeys.js";
import { toNumber } from "../utils/validator.js";
import { exportToJson } from "../utils/exportToJson.js";

const { length, repeatCount } = DEFAULT_OPTIONS;

const program = new Command();

program
  .name("clikey")
  .description(
    `
╔═══════════════════════╗
║   🔐 CLIKEY v1.0      ║
╚═══════════════════════╝`
  )
  .version("1.0");
program
  .option("--ma, --maiusculas", "Incluir letras maiúsculas")
  .option("--mi, --minusculas", "Incluir letras minúsculas")
  .option("-n, --numeros", "Incluir números")
  .option("--si, --simbolos", "Incluir símbolos")
  .option("-t, --tamanho <number>", "Tamanho da chave", length)
  .option("-g, --grouped", "Dividir chaves em blocos agrupados")
  .option("--st, --style", "Chave com estilo visual")
  .option("-p, --prefixo <str>", "Prefixo da chave")
  .option("-s, --sufixo <str>", "Sufixo da chave")
  .option(
    "-q, --quantidade <number>",
    "Número de chaves a ser criada",
    repeatCount
  )
  .option(
    "-e, --export <mode>",
    "Exportar resultados no formato JSON (opções: keys, full)"
  )
  .option("--path [path]", "Caminho onde salvar o JSON", null)
  .option("-o --ocultar", "Não exibe as chaves no terminal diretamente")
  .helpOption("--ajuda, -h", "Mostra as opções disponíveis")
  .showHelpAfterError()
  .configureHelp({ sortOptions: true })
  .action(async (options) => {
    const config = {
      lowerCase: Boolean(options.minusculas),
      upperCase: Boolean(options.maiusculas),
      numbers: Boolean(options.numeros),
      symbols: Boolean(options.simbolos),
      length: Number(options.tamanho),
      prefix: options.prefixo,
      suffix: options.sufixo,
      grouped: Boolean(options.grouped),
      styledOutput: Boolean(options.style),
      repeatCount: toNumber(options.quantidade),
    };
    const charCheck =
      config.upperCase || config.lowerCase || config.numbers || config.symbols;

    if (!charCheck) {
      console.error(
        "⚠️ Nenhum tipo de caractere foi selecionado. Use pelo menos uma opção como --maiusculas, --minusculas, --numeros ou --simbolos."
      );
      process.exit(1);
    }

    const result = createKey(config);
    const keys = getKeysFromResult(result);
    let exportContent = null;
    let onlyKeys = false;

    if (options.export === "keys") {
      exportContent = keys;
      onlyKeys = true;
    } else if (options.export === "full") {
      onlyKeys = false;
      exportContent = result;
    }
    if (!options.ocultar) console.log(JSON.stringify(keys, null, 2));
    if (exportContent) {
      const feedback = await exportToJson(
        exportContent,
        options.path === true ? null : options.path,
        onlyKeys
      );
      console.log(feedback);
    }
  });

program.parse(process.argv);
