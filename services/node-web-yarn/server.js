const express = require("express");
const app = express();
const PORT = 3000;

const API_URL = process.env.API_URL || "http://python-api:5000";

app.get("/", async (req, res) => {
  let apiData = null;
  let error = null;

  try {
    const response = await fetch(`${API_URL}/api/data`);
    apiData = await response.json();
  } catch (err) {
    error = err.message;
  }

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cloudsmith Demo</title>
      <style>
        body { font-family: system-ui, sans-serif; max-width: 640px; margin: 60px auto; padding: 0 20px; }
        h1 { color: #1a1a2e; }
        .card { background: #f4f4f8; border-radius: 8px; padding: 20px; margin: 16px 0; }
        .badge { display: inline-block; background: #4361ee; color: #fff; padding: 4px 10px; border-radius: 4px; font-size: 13px; }
        .error { background: #ffe0e0; color: #c00; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        td, th { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
      </style>
    </head>
    <body>
      <h1>🚀 Cloudsmith Demo</h1>
      <p><span class="badge">Node/Express</span> web server → <span class="badge">Python/Flask</span> API</p>

      <div class="card">
        <h3>API Response</h3>
        ${error
          ? `<p class="error">Error connecting to API: ${error}</p>`
          : `<p>${apiData.message}</p>
             <table>
               <tr><th>ID</th><th>Name</th></tr>
               ${apiData.items.map(i => `<tr><td>${i.id}</td><td>${i.name}</td></tr>`).join("")}
             </table>`
        }
      </div>

      <div class="card">
        <h3>Architecture</h3>
        <p>Both containers are built via GitHub Actions, dependencies pulled from
           <strong>Cloudsmith</strong> (upstream proxy), and images pushed to
           <strong>Cloudsmith Docker Registry</strong>.</p>
      </div>
    </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "node-web" });
});

app.listen(PORT, () => {
  console.log(`Node web server running on port ${PORT}`);
});
