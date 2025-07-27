## 🔐 clikey - Gerador de Chaves Personalizadas

Desafio #1 da **CODIFY**. Gerador de chaves personalizável.

O clikey pode ser usado de três formas:

1. **Como biblioteca:** importação e uso direto em código JavaScript/Node.js
2. **Modo Interativo:** executando pelo terminal com perguntas guiadas
3. **Como aplicação CLI:** usando comandos com argumentos direto na linha de comando

---

## 📦 Recursos

- ✅ Inclusão opcional de:
  - Letras maiúsculas
  - Letras minúsculas
  - Números
  - Símbolos
  - Estilo das chaves
  - Numero de chaves a ser criada
- 🔢 Tamanho da chave configurável (entre 8 e 256)
- 🎯 Validação das entradas do usuário
- 🚀 Interface interativa via CLI
- 📋 Opção de salvar as chaves geradas em um arquivo json

---

## 🚀 Instalação

```bash
git clone https://github.com/WellizxSilva/clikey.git
# dentro da pasta, execute:
npm install
# para instalar as dependências
```

---

## 📁 Exemplo de uso

> Use `genKey()` -> para usar interatividade no terminal.
> Use `createKey()` -> para usar como modulo.

##### 🔹 Importando:

```js
//Default import
import clikey from "./caminho/onde/esta/o/clikey.js";

// padrão para testar o projeto:
import clikey from "./src/clikey"; // por ser um default export, pode ser renomeado. Ex:
import ckey from "./src/clikey";

// Funções individuais:
import {
  genKey,
  createKey,
  defaultOptions,
  getKeysFromResult,
} from "./src/clikey";
```

#### 🔎 Propriedades do retorno da função createKey()

| Propriedade      | Tipo   | Descrição                                                        |
| ---------------- | ------ | ---------------------------------------------------------------- |
| key              | string | A chave gerada, já com estilo, agrupamentos, prefixo/sufixo etc. |
| appliedModifiers | object | As opções utilizadas para gerar a chave, incluindo defaults      |

---

## 🔧 Funções Auxiliares

| Funcão              | Descrição                                                           |
| ------------------- | ------------------------------------------------------------------- |
| defaultOptions()    | Retorna as opções padrão de geração de chave.                       |
| getKeysFromResult() | Extrai uma Array de chaves a partir de um resultado de createKey(). |
| exportToJson()      | Exporta o Array de chaves para um arquivo no formato JSON           |

---

##### 🔹 Usando como módulo

```js
// index.js --> arquivo que vem junto no projeto para testar
import clikey from "./src/clikey";

// Geração básica com configurações padrão
const chave1 = clikey.createKey();

//  Como o retorno pode conter múltiplas chaves (via propriedade do `createkey()`: repeatCount),
// utilize o índice [0], [1], etc. para acessar individualmente:
console.log("🔐 Primeira chave:", chave1[0].key);

// Ou use o helper `getKeysFromResult()` para extrair todas as chaves direto:
const chaves = getKeysFromResult(chave1);

console.log("🔑 Chaves:", chaves); // ex: [ 'Fct21c7OlworWaSs']
// Geração personalizada com opções
const chave2 = clikey.createKey({
  upperCase: true,
  lowerCase: true,
  numbers: true,
  symbols: false,
  grouped: true,
  styledOutput: false,
  prefix: "KEY:_",
  repeatCount: 10,
});

// Acessando chave gerada e suas opções
console.log("🔐 Chave personalizada:", chave2[0].key);
// com o helper:
const todasChaves = getKeysFromResult(chave2)
console.log("🔑 Todas as chaves:" todasChaves) // ex: ['0xvazsy4mSrb0BY1', '7OPlxpIlTnCf7SGR','eRFLm9J7zLhbdvfJ'... mais 7 ]
// acessando os modifiers:
console.log("🛠️ Opções aplicadas:", chave2[0].appliedModifiers);
```

##### Saida dos `Modifiers`:

```bash
{
  upperCase: true,
  lowerCase: true,
  numbers: true,
  symbols: false,
  length: 16,
  grouped: true,
  styledOutput: false,
  prefix: 'KEY:_',
  suffix: '',
  repeatCount: 10
}
```

## 💾 Exportando chaves para JSON

##### Usando a função auxiliar `exportToJson()`, é possivel exportar as chaves para um arquivo json:

```js
import clikey from "./src/clikey.js";

const resultado = clikey.createKey({
  upperCase: true,
  lowerCase: true,
  numbers: true,
  symbols: false,
  repeatCount: 5,
});
await clikey.exportToJson(resultado, "./minhas-chaves.json", true);
// No ultimo argumento se marcado como true, exporta somente as chaves, não incluindo os modificadores.
```

##### 🔹 Executando modo interativo (via terminal)

```js
import clikey from "./src/clikey";

const chave = clikey.genKey(); // ou genKey({toOutput: true}) para mostrar a chave diretamente no terminal
console.log("🔐 Chave gerada:", await chave); // `await` porque o retorno do genKey é uma promise.

// Você tambem pode passar a option `clearTerminal` ao genKey como true, se quiser limpar o terminal antes de executar o gerador de chave :

const chave2 = clikey.genKey({ toOutput: true, clearTerminal: true }); // imprimi direto no console. e limpa o terminal antes de executar
```

Rode com

```bash
node caminho/do/seu/arquivo

# com npm
npm run start
# ou
yarn start
# para rodar o index padrão de teste que vem no projeto
```

Durante a execução, o programa fará as seguintes perguntas:

```bash
🧩 Incluir letras maiúsculas ? (S / N):
🔡 Incluir letras minúsculas ? (S / N):
🔢 Incluir números ? (S / N):
🔣 incluir símbolos ? (S / N):
📏 Tamanho da chave:
🎨 Deseja dividir a chave em blocos agrupados? (S / N):
💠 Deseja exibir a chave com estilo visual? (S / N):
🔠 Adicione um prefixo à chave (deixe vazio para ignorar):,
🔚 Adicione um sufixo à chave (deixe vazio para ignorar):,
🔁 Qual a quantidade de chaves a ser gerada ? (numero > 0 ):
```

Após responder, a chave será exibida diretamente no terminal caso a `opção genKey(true)` esteja ativada.

---

##### 🔹 Usando via CLI (linha de comando com argumentos)

```bash
# com npm
npm install -g .
# ou
npm link

# com yarn
yarn link
```

instala o cli globalmente

### 🧪 Executando o CLI diretamente

```bash
# uso com flags longas
clikey --maiusculas --minusculas --simbolos --tamanho 12 --grouped

# versão abreviada
clikey --ma --mi --si -t 12 -g
```

### 🚧 Se o comando clikey não for reconhecido

##### Use o CLI via script definido no package.json:

```bash
# usando npm
npm run cli -- --ma --mi -t 24 --grouped

# usando yarn
yarn cli --ma --mi -t 24 --grouped


# para ver todos os comandos disponíveis use as flags:
--ajuda
# ou
-h
```

O uso de `--` no `npm` separa os argumentos do comando principal para que sejam passados corretamente.

### ⚙️ Minha Abordagem:

##### Em vez de utilizar loops preferi usar promises, para praticar um novo formato de programação e melhor legibilidade.
