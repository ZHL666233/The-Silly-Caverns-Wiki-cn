/**
 * 批量抓取 The Silly Caverns Wiki 全部页面 WikiText
 * 用法: npx tsx scripts/fetch-all.ts
 */
import * as fs from "node:fs";
import * as path from "node:path";

const API = "https://the-silly-caverns.fandom.com/api.php";
const OUT = path.join(import.meta.dirname ?? __dirname, "..", "data");

// 已知的完整页面列表（来自 allpages API）
const ALL_PAGES: string[] = [
  "77 Leaf Destroyer", "Antique", "Apatite", "Ballast Breaker",
  "Cat Face", "Celestial", "Checkmark ✅", "Corfu",
  "Coronary Catastrophe", "Corundum Caver", "Crypt Smasher",
  "Crystalline Excavator", "Dirt Ravager", "Earth Soiler",
  "Ethereal", "Events", "Extreme Echolocator", "Galactica",
  "Gambler's Fallacy", "Gear", "Gears", "Gemstone Engraver",
  "Geode Staff", "God of the Mine (GOTM)", "Hypermark Checkminator",
  "John 🤽‍♂️", "Labyrinthian Tide", "Lunar Lightsabre",
  "Main Page", "Mud Sickle", "Mulch Mallet", "Null Chroma",
  "Nyabomb", "Omnipotent God of the Mine", "Ore", "Ore tiers",
  "Pickaxes", "Planet Buster", "Rock 🪨", "Starborne Slasher",
  "Subrealm One", "Syracuse, Sicily", "The Key",
  "The Silly Caverns Wiki", "The Silly Cavers Wiki",
  "Tropical Carver", "Undersea Eviscerator", "Void Crusher",
  "Watr Watr", "Watr World", "Whirlpool of Fate",
  "Wings of Glory", "World One", "World Two", "Your Reward!"
];

async function fetchWikitext(title: string): Promise<string | null> {
  const url = `${API}?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json`;
  try {
    const res = await fetch(url);
    const json = await res.json() as any;
    if (json.error) {
      console.error(`  ❌ ${title}: ${json.error.info}`);
      return null;
    }
    return json.parse?.wikitext?.["*"] ?? null;
  } catch (e: any) {
    console.error(`  ❌ ${title}: ${e.message}`);
    return null;
  }
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  console.log(`📥 开始抓取 ${ALL_PAGES.length} 个页面...\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < ALL_PAGES.length; i++) {
    const title = ALL_PAGES[i];
    const safeName = title.replace(/[/\\?%*:|"<>]/g, "_");
    console.log(`[${i + 1}/${ALL_PAGES.length}] ${title}`);

    const wikitext = await fetchWikitext(title);
    if (wikitext !== null) {
      fs.writeFileSync(path.join(OUT, `${safeName}.wikitext`), wikitext, "utf-8");
      console.log(`  ✅ ${wikitext.length} 字符`);
      success++;
    } else {
      failed++;
    }

    await sleep(400); // 礼貌延迟
  }

  console.log(`\n📊 完成: ${success} 成功, ${failed} 失败`);
}

main();
