const fs = require("fs");
const path = require("path");

function walk(dir, fn) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, fn);
    else fn(p);
  }
}

walk("wiki-cn", (f) => {
  if (!f.endsWith(".html")) return;
  if (f.includes("\\node_modules\\")) return;
  if (f.includes("\\docs\\") && !f.includes("dist")) return;

  const c = fs.readFileSync(f, "utf8");
  const nc = c.replace(/href="(\/[^"]+?)"/g, (m, u) => {
    if (
      u === "/" || u.includes("://") || u.includes(".html") ||
      u.includes(".woff") || u.includes(".css") || u.includes(".js") ||
      u.includes(".ico") || u.includes(".svg")
    ) return m;
    return 'href="/The-Silly-Caverns-Wiki-cn' + u + '.html"';
  });

  if (c !== nc) {
    fs.writeFileSync(f, nc);
    console.log("patched:", path.relative("wiki-cn", f));
  }
});

console.log("done");
