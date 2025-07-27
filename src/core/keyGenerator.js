import { upperCase, lowerCase, numbers, symbols } from "../configs/options.js";

/**
 * @class KeyGenerator
 */
export class KeyGenerator {
  constructor(options) {
    this.options = options;
    this.length = options.length || 16;

    this.group = {
      upperCase,
      lowerCase,
      numbers,
      symbols,
    };
  }

  generate() {
    const { repeatCount = 1 } = this.options;
    const results = [];
    for (let i = 0; i < repeatCount; i++) {
      const key = this.createKey();
      results.push(key);
    }

    return repeatCount === 1 ? results[0] : results;
  }

  createKey() {
    const { grouped, styledOutput } = this.options;
    let chars = "";
    for (const key in this.group) {
      if (this.options[key]) {
        chars += this.group[key];
      }
    }

    let randomKey = "";
    for (let i = 0; i < this.length; i++) {
      randomKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const chunks = randomKey.match(/.{1,4}/g);
    const separator = grouped && styledOutput ? " - " : "-";
    const style = {
      grouped: () => chunks.join(separator),
      styledOutput: () => chunks.map((chunk) => `[${chunk}]`).join(separator),
      merge: () => chunks.map((chunk) => `[${chunk}]`).join(separator),
    };

    let finalKey = (() => {
      if (grouped && styledOutput) return style.merge();
      if (grouped) return style.grouped();
      if (styledOutput) return style.styledOutput();
      return randomKey;
    })();

    if (this.options.prefix) {
      finalKey = `${this.options.prefix}${finalKey}`;
    }

    if (this.options.suffix) {
      finalKey = `${finalKey}${this.options.suffix}`;
    }

    return {
      key: finalKey,
      appliedModifiers: this.options,
    };
  }
}
