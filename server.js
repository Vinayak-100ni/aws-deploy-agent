const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <html>
      <head><title>Node App</title></head>
      <body style="font-family: Arial; text-align:center; margin-top:50px;">
        <h1>🚀 Node.js App Deployed with AWS CodeDeploy</h1>
        <p>Status: Running</p>
      </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

