import { crawlLinks } from "./node-http";

describe("#crawlLinks", () => {
  it("should return absolute URL as-is", () => {
    const html = `
      <html>
        <body>
          <a href="https://example.com">Foo</a>
          <a href="https://example.com/">Bar</a>
          <a href="https://example.com/baz?qux">Baz</a>
        </body>
      </html>
    `;

    const links = crawlLinks(html, "https://example.com");

    expect(links).toEqual([
      "https://example.com",
      "https://example.com/",
      "https://example.com/baz?qux",
    ]);
  });

  it("should ignore mailto link", () => {
    const html = `
      <html>
        <body>
          <a href="https://example.com">Foo</a>
          <a href="mailto:foo@example.com">Bar</a>
        </body>
      </html>
    `;

    const links = crawlLinks(html, "https://example.com");

    expect(links).toEqual(["https://example.com"]);
  });

  it("should resolve relative URL", () => {
    const html = `
      <html>
        <body>
          <a href="/foo">Foo</a>
          <a href="bar">Bar</a>
          <a href="./baz">Bar</a>
        </body>
      </html>
    `;

    const links = crawlLinks(html, "https://example.com/qux/");

    expect(links).toEqual([
      "https://example.com/foo",
      "https://example.com/qux/bar",
      "https://example.com/qux/baz",
    ]);
  });

  it("should resolve relative URL with absolute base URL", () => {
    const html = `
      <html>
        <head>
          <base href="https://another.example/qux/" />
        </head>
        <body>
          <a href="/foo">Foo</a>
          <a href="bar">Bar</a>
          <a href="./baz">Bar</a>
        </body>
      </html>
    `;

    const links = crawlLinks(html, "https://example.com/");

    expect(links).toEqual([
      "https://another.example/foo",
      "https://another.example/qux/bar",
      "https://another.example/qux/baz",
    ]);
  });

  it("should resolve relative URL with relative base URL", () => {
    const html = `
      <html>
        <head>
          <base href="/qux/" />
        </head>
        <body>
          <a href="/foo">Foo</a>
          <a href="bar">Bar</a>
          <a href="./baz">Bar</a>
        </body>
      </html>
    `;

    const links = crawlLinks(html, "https://example.com/");

    expect(links).toEqual([
      "https://example.com/foo",
      "https://example.com/qux/bar",
      "https://example.com/qux/baz",
    ]);
  });
});
