const fs = require("fs");
const https = require("https");
const path = require("path");
const devCerts = require("office-addin-dev-certs");

const root = __dirname;
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".png": "image/png",
};

function sendError(response, statusCode, message) {
  response.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(message);
}

async function start() {
  const options = await devCerts.getHttpsServerOptions();
  const server = https.createServer(options, (request, response) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url, "https://localhost:3000").pathname);
    } catch (error) {
      sendError(response, 400, "Ungültige URL.");
      return;
    }

    const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
    const filePath = path.resolve(root, relativePath);
    if (filePath !== root && !filePath.startsWith(root + path.sep)) {
      sendError(response, 403, "Zugriff verweigert.");
      return;
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === "ENOENT") {
          sendError(response, 404, "Datei nicht gefunden.");
          return;
        }
        console.error("Datei konnte nicht gelesen werden:", error);
        sendError(response, 500, "Datei konnte nicht gelesen werden.");
        return;
      }

      response.writeHead(200, {
        "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
      });
      response.end(content);
    });
  });

  server.on("error", (error) => {
    console.error("HTTPS-Entwicklungsserver konnte nicht gestartet werden:", error);
    process.exitCode = 1;
  });
  server.listen(3000, "localhost", () => {
    console.log("Betreff-Assistent verfügbar unter https://localhost:3000");
  });
}

start().catch((error) => {
  console.error("HTTPS-Zertifikat konnte nicht geladen werden:", error);
  process.exitCode = 1;
});
