import { createServer } from "node:http";
import { readFileSync } from "node:fs";

const port = Number(process.argv[2] || 8792);
const page = readFileSync(new URL("./index.html", import.meta.url));

createServer((request, response) => {
  if (request.url === "/healthz") {
    response.setHeader("content-type", "application/json; charset=utf-8");
    response.end(JSON.stringify({ ok: true }));
    return;
  }
  response.setHeader("content-type", "text/html; charset=utf-8");
  response.setHeader("cache-control", "no-store");
  response.end(page);
}).listen(port, "127.0.0.1", () => {
  console.log("Local: http://127.0.0.1:" + port + "/");
});
