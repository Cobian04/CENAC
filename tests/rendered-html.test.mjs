import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the CENAC homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>CENAC<\/title>/i);
  assert.match(html, /Arte, comunidad y aprendizaje/);
  assert.match(html, /Quienes somos/);
  assert.match(html, /Clases y cursos/);
  assert.match(html, /Donaciones/);
  assert.match(html, /Clases de computacion/);
  assert.match(html, /cenac-logo-symbol\.png/);
  assert.doesNotMatch(html, /cenac-logo-full\.png/);
  assert.doesNotMatch(html, /\[object Object\]/);
  assert.match(html, /ornament-field/);
});
