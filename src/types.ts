export type VisitedLink = {
  /**
   * A list of URLs refers to the link.
   */
  readonly referredBy: readonly string[];
} & (
  | {
      readonly type: "visited";

      /**
       * HTTP status code for the link.
       */
      readonly status: number;

      /**
       * Some HTTP headers in a response.
       */
      readonly headers: Record<string, string>;
    }
  | {
      /**
       * Failed to fetch the link. (e.g. Network Error)
       */
      readonly type: "error";

      readonly error: Error | string;
    }
);

export interface VisitResult {
  /**
   * A list of URLs the link refers to. This may include already visited links.
   */
  readonly next: readonly string[];
}

export interface Crawler {
  /**
   * Visit a link.
   * @param url URL of the link
   * @param visitedLinks A list of URLs visited. `visit` should mutate this
   * instead of return visited links.
   */
  visit(
    url: string,
    visitedLinks: Map<string, VisitedLink>
  ): Promise<VisitResult>;

  /**
   * Free resources.
   */
  destroy(): Promise<void>;
}

export type Severity = "danger" | "warning" | "info" | "debug";

export type CheckResultLinkItem = {
  readonly url: string;
  readonly severity: Severity;

  /**
   * A list of URLs refers to the link.
   */
  readonly referredBy: readonly string[];
} & (
  | {
      /**
       * The link returns an expected status code.
       */
      type: "ok";
      statusCode: number;
    }
  | {
      /**
       * The link is redirected to somewhere.
       */
      type: "redirect";
      redirectTo: string;
      statusCode: number;
    }
  | {
      /**
       * The link returns unexpected status code.
       */
      type: "unexpected_status";
      statusCode: number;
      expected?: string;
    }
  | {
      /**
       * An error occurred. (e.g. failed to connect to a server)
       */
      type: "error";
      reason: string;
    }
);

export interface CheckResult {
  links: readonly CheckResultLinkItem[];
}

export interface Reporter {
  /**
   * Format visit results into string. Checker will print the return value to
   * standard output.
   */
  report(result: CheckResult): Promise<string>;
}

export type MatchPattern = string | RegExp | ((url: string) => boolean);

export interface CheckOptions {
  /**
   * A list of URL patterns for links to check.
   */
  includeUrls: readonly MatchPattern[];

  /**
   * A list of URL patterns for links NOT to check.
   */
  excludeUrls: readonly MatchPattern[];

  /**
   * Expected HTTP status code
   */
  expectedStatus:
    | number[]
    | string[]
    | ((statusCode: number) => boolean)
    | RegExp;

  reportTypes?: CheckResultLinkItem["type"][];
  reportSeverities: readonly Severity[];

  exitErrorSeverities: readonly Severity[];
}
