import { CodeFrameReporter } from "./code-frame";

it("should match snapshot", async () => {
  const reporter = new CodeFrameReporter({});

  expect(
    await reporter.report({
      links: [
        {
          type: "ok",
          severity: "info",
          url: "https://example.com",
          referredBy: ["https://example.com"],
          statusCode: 200,
        },
        {
          type: "error",
          severity: "danger",
          url: "https://example.com",
          referredBy: ["https://example.com"],
          reason: "Error, Error, Error.",
        },
        {
          type: "unexpected_status",
          severity: "warning",
          url: "https://example.com",
          referredBy: ["https://example.com"],
          statusCode: 200,
          expected: "400",
        },
      ],
    })
  ).toMatchSnapshot();
});
