const fs = require("fs");
const path = require("path");

const ROOT = "wiki-cn";

function walk(dir, fn) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") walk(p, fn);
    else if (entry.name.endsWith(".html") || entry.name.endsWith(".js")) fn(p);
  }
}

walk(ROOT, (file) => {
  // Skip source dirs
  if (file.includes("\\docs\\") && !file.includes("dist")) return;
  if (file.includes("\\scripts\\")) return;
  
  let content = fs.readFileSync(file, "utf-8");
  let changed = false;

  if (file.endsWith(".html")) {
    content = content.replace(/href="(\/[^"]*?)"/g, (m, url) => {
      if (url.includes("://") || url.includes(".html") || url.includes(".css") || 
          url.includes(".js") || url.includes(".woff") || url.includes(".ico") ||
          url.startsWith("mailto:") || url.startsWith("#") || url === "/" || url === "/" + path.basename(url)) return m;
      return `href="${url}.html"`;
    });
    changed = true;
  }

  if (file.endsWith(".js")) {
    // Fix internal route paths in JS
    content = content.replace(/"(\/[^"]+?)"/g, (m, url) => {
      if (!url.startsWith("/The-Silly-Caverns-Wiki-cn/")) return m;
      if (url.includes(".html") || url.includes(".css") || url.includes(".js") || 
          url.includes(".woff") || url.includes(".ico") || url.includes(".json") ||
          url === "/The-Silly-Caverns-Wiki-cn/") return m;
      return `"${url}.html"`;
    });
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log("  patched:", path.relative(ROOT, file));
  }
});

console.log("\nDone!");
