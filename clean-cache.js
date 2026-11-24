const fs = require("fs");
const path = require("path");

const nextDir = path.join(__dirname, ".next");

if (fs.existsSync(nextDir)) {
  try {
    fs.rmSync(nextDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  } catch (err) {
    // If some server file is locked briefly, clear subdirectories
    const subdirs = ["cache", "server", "static"];
    for (const sub of subdirs) {
      const p = path.join(nextDir, sub);
      if (fs.existsSync(p)) {
        try {
          fs.rmSync(p, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
        } catch (e) {}
      }
    }
  }
}
