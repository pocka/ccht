import chalk from "chalk";

import type { Reporter, CheckResult, Severity } from "../types";

const severities: Severity[] = ["danger", "warning", "info", "debug"];
const severityColumnWidth = severities.reduce(
  (longest, current) => Math.max(longest, current.length),
  0
);

export interface CodeFrameReporterOptions {
  showFullUrl?: boolean;
}

export class CodeFrameReporter implements Reporter {
  #showFullUrl: boolean;

  constructor({ showFullUrl = false }: CodeFrameReporterOptions) {
    this.#showFullUrl = showFullUrl;
  }

  async report({ links }: CheckResult) {
    return (
      links
        .map((link) => {
          if (link.type === "ok") {
            return this.print(link, [`(${link.statusCode}) ${link.url}`]);
          }

          if (link.type === "redirect") {
            return this.print(link, [
              chalk.bold("Redirect"),
              chalk.gray("from: ") + link.url,
              chalk.gray("to:   ") + link.redirectTo,
            ]);
          }

          if (link.type === "unexpected_status") {
            return this.print(link, [
              chalk.bold("Unexpected status code"),
              chalk.gray("url: ") + link.url,
              link.expected &&
                chalk.gray("expected: ") +
                  chalk.green.bold(`HTTP ${link.expected}`),
              chalk.gray("actual:   ") +
                chalk.red.bold(`HTTP ${link.statusCode}`),
            ]);
          }

          if (link.type === "error") {
            return this.print(link, [
              chalk.bold("Failed to load the resource") +
                chalk.gray(` at ${link.url}`),
              link.reason,
            ]);
          }
        })
        .join("\n\n") + "\n"
    );
  }

  print(
    result: CheckResult["links"][number],
    lines: (string | false | null | undefined)[]
  ) {
    // Marker + Space + [Severity] + Space = 3
    const indent = " ".repeat(severityColumnWidth + 3);
    const severityString = (
      result.severity.toUpperCase() + " ".repeat(severityColumnWidth)
    ).slice(0, severityColumnWidth);

    const refferedBy = formatReferredBy(result.referredBy, this.#showFullUrl);

    let header: string;
    switch (result.severity) {
      case "danger":
        header = `${chalk.bgRed(" ")} ${chalk.red.bold(severityString)} `;
        break;
      case "warning":
        header = `${chalk.bgYellow(" ")} ${chalk.yellow.bold(severityString)} `;
        break;
      case "info":
        header = `${chalk.bgBlue(" ")} ${chalk.blue.bold(severityString)} `;
        break;
      case "debug":
        header = `${chalk.bgGray(" ")} ${chalk.gray.bold(severityString)} `;
        break;
    }

    return (
      header + [...lines, refferedBy].filter((s) => !!s).join("\n" + indent)
    );
  }
}

function formatReferredBy(
  referredBy: readonly string[],
  full: boolean
): string {
  if (full) {
    return `Referred by: ${referredBy.join(", ")}`;
  }

  const shown = referredBy
    .slice(0, 2)
    .map((url) => (url.length > 40 ? url.slice(0, 40) + "..." : url));

  const hidden = Math.max(referredBy.length - 2, 0);

  return chalk.gray(
    `Referred by: ${shown.join(", ")}${
      hidden > 0 ? `, and ${hidden} more` : ""
    }`
  );
}
