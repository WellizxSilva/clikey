export const upperCase = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
).join("");
export const lowerCase = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
).join("");
export const numbers = Array.from({ length: 10 }, (_, i) =>
  String.fromCharCode(48 + i)
).join("");
export const symbols = Array.from({ length: 15 }, (_, i) =>
  String.fromCharCode(33 + i)
).join("");

export const QUESTIONS = {
  upperCase: "💎 Incluir letras maiúsculas ? (S / N): ",
  lowerCase: "🧩 Incluir letras minúsculas ? (S / N): ",
  numbers: "🔢 Incluir numeros ? (S / N): ",
  symbols: "🔣 incluir símbolos ? (S / N): ",
  length: "📏 Tamanho da chave (8 a 256): ",
  grouped: "🎨 Deseja dividir a chave em blocos agrupados? (S / N): ",
  styledOutput: "💠 Deseja exibir a chave com estilo visual? (S / N): ",
  prefix: `🎯 Adicione um prefixo à chave (deixe vazio para ignorar): `,
  suffix: `🔚 Adicione um sufixo à chave (deixe vazio para ignorar): `,
  repeatCount: "🔁 Qual a quantidade de chaves a ser gerada ? (numero > 0 ): "
};

export const ERRORS = {
  upperCase: `Digite "S" ou "N"`,
  lowerCase: `Digite "S" ou "N"`,
  numbers: `Digite "S" ou "N"`,
  symbols: `Digite "S" ou "N".`,
  length: `Digite um número entre 8 e 256`,
  grouped: `Digite "S" ou "N" `,
  styledOutput: `Digite "S" ou "N" `,
  repeatCount: ` Digite um numero inteiro > 0`
};

export const DEFAULT_OPTIONS = {
  upperCase: true,
  lowerCase: true,
  numbers: true,
  symbols: false,
  length: 16,
  grouped: false,
  styledOutput: false,
  prefix: "",
  suffix: "",
  repeatCount: 1
};

export const BOOLEAN_ACCEPTS = ["s", "sim"];
export const BOOLEAN_NOT_ACCEPTS = ["n", "não", "nao"];
