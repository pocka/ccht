import { isWebUri } from "valid-url";

import type {
  CheckOptions,
  CheckResult,
  CheckResultLinkItem,
  Crawler,
  MatchPattern,
  Reporter,
  VisitedLink,
} from "./types";

export async function checkAndReport(
  crawler: Crawler,
  reporter: Reporter,
  url: string,
  options: CheckOptions
) {
  const results = await check(crawler, url, options);

  console.log(await reporter.report(results));

  if (
    results.links.some((r) => options.exitErrorSeverities.includes(r.severity))
  ) {
    return Promise.reject(new Error("The result is not okay"));
  }
}

export async function check(
  crawler: Crawler,
  url: string,
  options: CheckOptions
): Promise<CheckResult> {
  const validatedUrl = isWebUri(url);

  if (!validatedUrl) {
    return Promise.reject(new Error(`${url} is not a valid URI`));
  }

  const visited = new Map<string, VisitedLink>();

  await visit(crawler, validatedUrl, options, visited);

  await crawler.destroy();

  const links: CheckResultLinkItem[] = [];

  for (const [url, result] of visited.entries()) {
    if (
      options.includeUrls.length &&
      options.includeUrls.every((pat) => !match(url, pat))
    ) {
      continue;
    }

    if (
      options.excludeUrls.length &&
      options.excludeUrls.some((pat) => match(url, pat))
    ) {
      continue;
    }

    if (result.type === "error") {
      links.push({
        severity: "danger",
        type: "error",
        url,
        referredBy: result.referredBy,
        reason:
          result.error instanceof Error ? result.error.message : result.error,
      });
      continue;
    }

    if (isExpectedStatusCode(result.status, options.expectedStatus)) {
      links.push({
        severity: "debug",
        type: "ok",
        url,
        referredBy: result.referredBy,
        statusCode: result.status,
      });
      continue;
    }

    if (result.status >= 300 && result.status < 400) {
      links.push({
        severity: "info",
        type: "redirect",
        url,
        statusCode: result.status,
        referredBy: result.referredBy,
        redirectTo: result.headers.location,
      });
      continue;
    }

    links.push({
      severity: "danger",
      type: "unexpected_status",
      url,
      statusCode: result.status,
      referredBy: result.referredBy,
      expected: formatExpectedStatusCode(options.expectedStatus),
    });
  }

  return {
    links: links.filter((link) => {
      if (options.reportTypes) {
        return options.reportTypes.includes(link.type);
      }

      return options.reportSeverities.includes(link.severity);
    }),
  };
}

function isExpectedStatusCode(
  status: number,
  expected: CheckOptions["expectedStatus"]
): boolean {
  if (expected instanceof Array) {
    return expected.some((e: string | number) => {
      if (typeof e === "number") {
        return status === e;
      }

      return String(status) === e;
    });
  }

  if (expected instanceof RegExp) {
    return expected.test(String(status));
  }

  return expected(status);
}

function formatExpectedStatusCode(
  expected: CheckOptions["expectedStatus"]
): string | undefined {
  if (expected instanceof Array) {
    return expected.join(", ");
  }

  if (expected instanceof RegExp) {
    return String(expected);
  }

  return undefined;
}

async function visit(
  crawler: Crawler,
  url: string,
  {
    includeUrls,
    excludeUrls,
  }: Pick<CheckOptions, "includeUrls" | "excludeUrls">,
  visited: Map<string, VisitedLink>
): Promise<void> {
  const { next } = await crawler.visit(url, visited);

  const availableLinks = next.filter((link) => {
    if (includeUrls.length && includeUrls.every((pat) => !match(link, pat))) {
      return false;
    }

    if (excludeUrls.length && excludeUrls.some((pat) => match(link, pat))) {
      return false;
    }

    return true;
  });

  const unvisitedLinks = availableLinks.filter((link) => !visited.has(link));

  await Promise.all(
    unvisitedLinks.map((link) =>
      visit(crawler, link, { includeUrls, excludeUrls }, visited)
    )
  );

  availableLinks
    .filter((link, i, links) => links.indexOf(link) === i)
    .forEach((link) => {
      const result = visited.get(link);

      if (!result) {
        return;
      }

      visited.set(link, {
        ...result,
        referredBy: [...result.referredBy, url],
      });
    });
}

function match(url: string, pat: MatchPattern): boolean {
  if (typeof pat === "string") {
    return url.indexOf(pat) === 0;
  }

  if (typeof pat === "function") {
    return pat(url);
  }

  return pat.test(url);
}
