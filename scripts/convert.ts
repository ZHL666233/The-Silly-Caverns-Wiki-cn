/**
 * WikiText → 中文 Markdown v5 — 输出 VitePress 自定义组件 (Tabber/Infobox/TierBadge)
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { GLOSSARY, translateText } from "./glossary";

const BASE = import.meta.dirname ?? __dirname;
const DATA_DIR = path.join(BASE, "..", "data");
const OUT_DIR = path.join(BASE, "..", "docs");

function TL(text: string): string {
  let r = translateText(text);
  r = r.replace(/世界 One\b/g, "世界一").replace(/世界 Two\b/g, "世界二")
    .replace(/\bWorld One\b/g, "世界一").replace(/\bWorld Two\b/g, "世界二")
    .replace(/\bSubrealm One\b/g, "子领域一")
    .replace(/\bThe Silly Caverns\b/g, "笨猫探穴").replace(/\bSilly Caverns\b/g, "笨猫探穴")
    .replace(/\bThe Key to World Two\b/g, "通往世界二的钥匙").replace(/\bThe Key\b/g, "钥匙")
    .replace(/钥匙 to 世界二/g, "通往世界二的钥匙")
    .replace(/\band\b(?![a-z])/g, "和").replace(/\bbut\b(?![a-z])/g, "但")
    .replace(/\bDirt Layer\b/g, "泥土层").replace(/\bDirt\b/g, "泥土")
    .replace(/\bBrick Layer\b/g, "砖块层").replace(/\bBrick\b/g, "砖块")
    .replace(/\bFog Layer\b/g, "迷雾层").replace(/\bFog\b/g, "迷雾")
    .replace(/\bWater Layer\b/g, "水域层").replace(/\bWater\b/g, "水域")
    .replace(/\bRock Layer\b/g, "岩石层").replace(/\bRock\b/g, "岩石")
    .replace(/\bRadioactive Layer\b/g, "辐射层").replace(/\bRadioactive\b/g, "辐射")
    .replace(/\bCactus Layer\b/g, "仙人掌层").replace(/\bCactus\b/g, "仙人掌")
    .replace(/\bNewspaper Layer\b/g, "报纸层").replace(/\bNewspaper\b/g, "报纸")
    .replace(/\bPresent Layer\b/g, "礼物层").replace(/\bPresent\b/g, "礼物")
    .replace(/\bSilly Layer\b/g, "愚蠢层").replace(/\bSilly\b/g, "愚蠢")
    .replace(/\bFlute Layer\b/g, "笛子层").replace(/\bFlute\b/g, "笛子")
    .replace(/层级/g, "地层")
    .replace(/The  +/g, "").replace(/\bthe  +/g, "").replace(/1倍(?![\u4e00-\u9fa0])/g, "1倍幸运")
    .replace(/  +/g, " ").replace(/\| \|/g, "|");
  return r;
}

function tierBadge(tier: string): string {
  const cn = GLOSSARY[tier] ?? tier;
  return `<TierBadge tier="${cn}">${cn}</TierBadge>`;
}

function stripWiki(text: string): string {
  return text.replace(/'''(.+?)'''/g, "$1").replace(/''(.+?)''/g, "$1")
    .replace(/\[\[File:[^\]]+\]\]/gi, "").replace(/\[\[([^\]|]+?)(?:\|[^\]]+?)?\]\]/g, "$1")
    .replace(/\{\{Color\|(.+?)\}\}/g, (_, c) => tierBadge(c)).replace(/<[^>]+>/g, "").trim();
}

function convert(wikitext: string): string {
  const L = wikitext.split("\n");
  const O: string[] = [];
  let inTemplate = false, inTable = false, inTabber = false;
  let tabData = "", inTab = false, tabTitle = "";
  let hdrBuf: string[] = [], needHdr = false;
  let infoboxRows: string[] = [];
  let templateRows: string[] = [];

  function flushHdr() {
    if (hdrBuf.length > 0 && needHdr) {
      const h = hdrBuf.map(x => {
        let c = stripWiki(x.replace(/\{\{!\}\}/g, "|")
          .replace(/scope="[^"]*"/gi, "").replace(/style="[^"]*"/gi, "").replace(/^\|\s*/, ""));
        return TL(c) || c;
      }).filter(x => x.trim());
      if (h.length > 0) {
        O.push("| " + h.join(" | ") + " |");
        O.push("| " + h.map(() => "---").join(" | ") + " |");
      }
      hdrBuf = []; needHdr = false;
    }
  }

  let tabAccum = ""; // tabber 累积输出
  function flushTab() {
    if (inTab && tabData.trim()) {
      tabAccum += `\n\n#### ${tabTitle}\n\n${tabData.trim()}\n\n---\n`;
      tabTitle = ""; tabData = ""; inTab = false;
    }
  }

  for (let i = 0; i < L.length; i++) {
    const raw = L[i]; let ln = raw.trim(); if (!ln) continue;
    if (/^#redirect/i.test(ln)) { O.push("> 📄 重定向页面"); continue; }
    if (ln.startsWith("[[Category:")) continue;

    // Infobox template - 收集为 Infobox 组件
    if (/^\{\{(PickaxeInfoBox|Infobox|Gear|Event|World|Ore)/.test(ln)) {
      inTemplate = true; templateRows = []; continue;
    }
    if (inTemplate) {
      if (/\}\}\s*$/.test(ln) && !/^\{\{/.test(ln)) {
        const b = ln.replace(/\}\}\s*$/, "").trim();
        if (b.startsWith("|")) { const m = b.match(/^\|\s*(\w+)\s*=\s*(.+)/); if (m) templateRows.push(`${m[1]}: ${m[2]}`); }
        inTemplate = false;
        if (templateRows.length) O.push(`<Infobox data="${templateRows.join('\n').replace(/"/g, '&quot;')}" />`);
        O.push(""); continue;
      }
      if (ln === "}}") { inTemplate = false; if (templateRows.length) O.push(`<Infobox data="${templateRows.join('\n').replace(/"/g, '&quot;')}" />`); O.push(""); continue; }
      if (ln.startsWith("|")) { const m = ln.match(/^\|\s*(\w+)\s*=\s*(.+)/); if (m) templateRows.push(`${m[1]}: ${m[2]}`); }
      continue;
    }

    // Tabber
    if (ln === "<tabber>") { inTabber = true; continue; }
    if (ln === "</tabber>") {
      // 清理 tabber 内残留的表头
      if (needHdr && hdrBuf.length) {
        const h = hdrBuf.map(x => TL(stripWiki(x)) || x).filter(x => x.trim());
        if (h.length) { tabData += "| " + h.join(" | ") + " |\n"; tabData += "| " + h.map(() => "---").join(" | ") + " |\n"; }
        hdrBuf = []; needHdr = false;
      }
      flushTab();
      if (tabAccum) O.push(tabAccum);
      inTabber = false; inTable = false; inTab = false; tabAccum = ""; O.push(""); continue;
    }
    if (inTabber && ln.startsWith("|-|")) {
      flushTab(); flushHdr();
      tabTitle = TL(stripWiki(ln.replace(/^\|-+\|?\s*/, "").replace(/\s*=\s*$/, "")));
      inTab = true; continue;
    }
    if (inTabber && /^.+=\s*$/.test(ln) && /^[^|!{<]/.test(ln)) {
      flushTab();
      tabTitle = TL(stripWiki(ln.replace(/=\s*$/, "")));
      inTab = true; continue;
    }
    if (inTabber) {
      if (inTab) {
        // 即时转换：在 tabber 内将 WikiText 表格转为 Markdown
        if (ln.startsWith("{|")) { inTable = true; hdrBuf = []; needHdr = false; continue; }
        if (ln === "|}") {
          if (needHdr) {
            const h = hdrBuf.map(x => TL(stripWiki(x)) || x).filter(x => x.trim());
            if (h.length) { tabData += "| " + h.join(" | ") + " |\n"; tabData += "| " + h.map(() => "---").join(" | ") + " |\n"; }
            hdrBuf = []; needHdr = false;
          }
          inTable = false; continue;
        }
        if (inTable) {
          if (ln === "|-" || /^\|-[\s-]*$/.test(ln)) {
            if (needHdr) {
              const h = hdrBuf.map(x => TL(stripWiki(x)) || x).filter(x => x.trim());
              if (h.length) { tabData += "| " + h.join(" | ") + " |\n"; tabData += "| " + h.map(() => "---").join(" | ") + " |\n"; }
              hdrBuf = []; needHdr = false;
            }
            continue;
          }
          if (ln.startsWith("!")) {
            let h = ln.replace(/^!\s*/, "").replace(/\{\{!\}\}/g, "|")
              .replace(/scope="[^"]*"/gi, "").replace(/style="[^"]*"/gi, "").replace(/^\|\s*/, "").trim();
            if (h) { hdrBuf.push(h); needHdr = true; }
            continue;
          }
          if (ln.startsWith("|")) {
            if (needHdr) {
              const h = hdrBuf.map(x => TL(stripWiki(x)) || x).filter(x => x.trim());
              if (h.length) { tabData += "| " + h.join(" | ") + " |\n"; tabData += "| " + h.map(() => "---").join(" | ") + " |\n"; }
              hdrBuf = []; needHdr = false;
            }
            const cells = ln.replace(/^\|\s*/, "").split("||").map(c =>
              c.trim().replace(/\{\{Color\|(.+?)\}\}/g, (_, t) => `<TierBadge tier="${GLOSSARY[t] ?? t}" />`)
                .replace(/\[\[File:([^\]|]+?)(?:\|[^\]]*)?\]\]/gi, (_, name) => name.replace(/\.[^.]+$/, '').trim())
                .replace(/\[\[([^\]|]+?)\]\]/g, "$1")
            );
            tabData += "| " + cells.join(" | ") + " |\n";
            continue;
          }
        }
        tabData += raw + "\n";
      }
      continue;
    }

    // Gallery
    if (ln === "<gallery>" || ln === "</gallery>") continue;
    if (/^File:/.test(ln)) {
      const parts = ln.split("|"); const fn = parts[0].replace(/^File:/, "").trim();
      O.push(`![${fn}](https://static.wikia.nocookie.net/the-silly-cavers/images/${fn.replace(/ /g, "_")})`);
      continue;
    }

    // 表格 (tabber 内由 tabber 处理器处理)
    if (!inTabber && ln.startsWith("{|")) { inTable = true; hdrBuf = []; needHdr = false; continue; }
    if (!inTabber && ln === "|}") { flushHdr(); inTable = false; O.push(""); continue; }
    if (!inTabber && inTable) {
      if (ln === "|-" || /^\|-[\s-]*$/.test(ln)) { flushHdr(); continue; }
      if (ln.startsWith("!")) {
        let h = ln.replace(/^!\s*/, "").replace(/\{\{!\}\}/g, "|")
          .replace(/scope="[^"]*"/gi, "").replace(/style="[^"]*"/gi, "").replace(/^\|\s*/, "").trim();
        if (h) { hdrBuf.push(h); needHdr = true; } continue;
      }
      if (ln.startsWith("|")) {
        if (needHdr) flushHdr();
        const cells = ln.replace(/^\|\s*/, "").split("||")
          .map(c => c.replace(/\{\{Color\|(.+?)\}\}/g, (_, x) => tierBadge(x))
            .replace(/\[\[File:([^\]|]+?)(?:\|[^\]]*)?\]\]/gi, (_, name) => name.replace(/\.[^.]+$/, '').trim())
            .replace(/\[\[([^\]|]+?)\]\]/g, "$1").trim());
        O.push("| " + cells.join(" | ") + " |");
        continue;
      }
      continue;
    }

    // 标题
    if (/^=+.+=+$/.test(ln)) {
      const lvl = Math.min((ln.match(/^=+/)?.[0].length || 2), 3);
      const txt = TL(stripWiki(ln.replace(/^=+\s*/, "").replace(/\s*=+$/, "")));
      if (inTab && inTabber) tabData += `${"#".repeat(lvl + 1)} ${txt}\n\n`;
      else { O.push(`${"#".repeat(lvl + 1)} ${txt}`); O.push(""); }
      continue;
    }

    // 图片
    if (ln.startsWith("[[File:") || ln.startsWith("[[file:")) {
      const m = ln.match(/\[\[File:(.+?)(?:\|(.+?))?\]\]/i);
      if (m) {
        const img = `<img src="https://static.wikia.nocookie.net/the-silly-cavers/images/${m[1].replace(/ /g, "_")}" alt="${m[1]}" loading="lazy" style="max-width:400px;border-radius:8px" />`;
        if (inTab && inTabber) tabData += img + "\n"; else { O.push(img); O.push(""); }
      }
      continue;
    }

    // HTML + Color
    ln = ln.replace(/<br\s*\/?>/gi, "").replace(/<\/?(span|div)[^>]*>/gi, "")
      .replace(/<b>/gi, "**").replace(/<\/b>/gi, "**")
      .replace(/<i>/gi, "*").replace(/<\/i>/gi, "*");
    ln = ln.replace(/\{\{Color\|(.+?)\}\}/g, (_, c) => tierBadge(c));

    // 链接
    if (ln.includes("[[")) ln = ln.replace(/\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g,
      (_, p, d) => `[${d || p}](./${p.replace(/ /g, "-").toLowerCase().replace(/[/\\?%*:|"<>]/g, "")}.md)`);

    // 列表
    if (/^[*#]+\s/.test(ln)) {
      const pf = ln.match(/^[*#]+/)![0]; const txt = TL(stripWiki(ln.slice(pf.length)));
      if (inTab && inTabber) tabData += `${pf} ${txt}\n`; else O.push(`${pf} ${txt}`);
      continue;
    }

    // 外链
    if (ln.startsWith("[http")) { const m = ln.match(/\[(https?:\/\/[^\s\]]+)\s+(.+?)\]/); O.push(m ? `[${m[2]}](${m[1]})` : ln); continue; }

    // 纯文本
    if (ln && !/^[\{\|\!\<\[]/.test(ln) && !ln.startsWith("|-")) {
      const clean = stripWiki(ln);
      if (clean) {
        const txt = TL(clean);
        if (inTab && inTabber) tabData += txt + "\n\n";
        else { O.push(txt); O.push(""); }
      }
    }
  }
  flushHdr(); flushTab();
  if (tabAccum) O.push(tabAccum);
  return `\n${O.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}

// === 主程序 ===
function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".wikitext"));
  console.log(`📝 转换 ${files.length} 页 (v5 组件版)...\n`);

  // 手动精翻页面，转换器跳过
  const SKIP = new Set([
    "The Silly Cavers Wiki", "Main Page", "Syracuse, Sicily", "Watr World",
    "World One", "World Two", "Subrealm One", "Watr Watr", "Galactica",
    "Antique", "Ore", "Ore tiers", "Checkmark ✅",
    "Mulch Mallet", "Mud Sickle", "Dirt Ravager", "Crystalline Excavator",
    "Ballast Breaker", "Tropical Carver", "Void Crusher", "Geode Staff",
    "Earth Soiler", "Crypt Smasher", "Labyrinthian Tide", "77 Leaf Destroyer",
    "Planet Buster", "Whirlpool of Fate", "Wings of Glory", "The Key",
    "Extreme Echolocator", "Corundum Caver", "Starborne Slasher", "Nyabomb",
    "Lunar Lightsabre", "Gemstone Engraver", "Gambler's Fallacy", "Coronary Catastrophe",
    "Undersea Eviscerator",
  ]);

  for (const file of files) {
    const title = file.replace(/\.wikitext$/, "");
    const slug = title.toLowerCase().replace(/[/\\?%*:|"<>]/g, "").replace(/\s+/g, "-");
    const wt = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");

    let md = `# ${title}\n`;
    md += SKIP.has(title) ? `\n> 📄 引用/重定向页面。\n` : convert(wt);
    md += `\n\n---\n*由 [笨猫探穴 Wiki](https://the-silly-caverns.fandom.com/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}) 汉化*\n`;

    fs.writeFileSync(path.join(OUT_DIR, `${slug}.md`), md, "utf-8");
    console.log(`  ${title} → ${slug}.md`);
  }
  console.log(`\n✅ 完成`);
}

main();
