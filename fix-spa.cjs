const fs = require("fs");
const path = require("path");

const SCRIPT = `<script>(function(){document.addEventListener('click',function(e){var a=e.target.closest('a');if(a&&a.href&&a.href.startsWith(location.origin)&&!a.hash&&!a.target&&!a.href.endsWith('.css')&&!a.href.endsWith('.js')&&!a.href.endsWith('.woff2')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();location.href=a.href}},!0)})()</script>`;

// Patch all HTML files at root and in dist/
const roots = [".", "dist"];
for (const dir of roots) {
  for (const f of fs.readdirSync("wiki-cn/" + dir)) {
    if (!f.endsWith(".html")) continue;
    const fp = path.join("wiki-cn", dir, f);
    let html = fs.readFileSync(fp, "utf-8");
    if (html.includes("stopImmediatePropagation")) continue; // already patched
    html = html.replace("<head>", "<head>" + SCRIPT);
    fs.writeFileSync(fp, html);
    console.log("  patched:", path.join(dir, f));
  }
}
console.log("\nDone!");
