import { JsonReporter } from "./json";

it("should emit valid JSON", async () => {
  const reporter = new JsonReporter({});

  const json = await reporter.report({
    links: [
      {
        type: "error",
        severity: "danger",
        url: "https://example.com/foo/bar.baz",
        reason: 'Foo\nBar"Baz"',
        referredBy: ["https://example.com"],
      },
    ],
  });

  expect(() => {
    JSON.parse(json);
  }).not.toThrow();
});

it("should match snapshot", async () => {
  const reporter = new JsonReporter({});

  expect(
    await reporter.report({
      links: [
        {
          type: "error",
          severity: "danger",
          url: "https://example.com/foo/bar.baz",
          reason: 'Foo\nBar"Baz"',
          referredBy: ["https://example.com"],
        },
      ],
    })
  ).toMatchSnapshot();
});
