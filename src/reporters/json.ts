import type { Reporter, CheckResult } from "../types";

export interface JsonReporterOptions {
  /**
   * Pretty print JSON?
   * @default false
   */
  pretty?: boolean;
}

export class JsonReporter implements Reporter {
  #pretty: boolean;

  constructor({ pretty = false }: JsonReporterOptions) {
    this.#pretty = pretty;
  }

  async report({ links }: CheckResult) {
    return JSON.stringify(links, null, this.#pretty ? 2 : 0);
  }
}
