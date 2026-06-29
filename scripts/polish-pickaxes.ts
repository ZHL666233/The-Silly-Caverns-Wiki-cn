/**
 * 批量精翻镐子页面
 */
import * as fs from "fs";
import * as path from "path";

const DATA = "wiki-cn/data";
const OUT = "wiki-cn/docs";

// 镐子中文名 (chs.js)
const PICK_CN: Record<string,string> = {
  "Mulch Mallet":"腐土槌","Mud Sickle":"泥浆镰刀","Dirt Ravager":"泥土掠夺者",
  "Crystalline Excavator":"水晶挖掘机","Ballast Breaker":"压舱粉碎者",
  "Tropical Carver":"热带雕刻者","Void Crusher":"虚空粉碎者","Geode Staff":"晶洞法杖",
  "Earth Soiler":"大地污染者","Crypt Smasher":"墓穴粉碎者",
  "Labyrinthian Tide":"迷宫之潮","77 Leaf Destroyer":"77叶毁灭者",
  "Planet Buster":"行星破坏者","Whirlpool of Fate":"命运漩涡",
  "Wings of Glory":"荣耀之翼","The Key":"钥匙",
  "Extreme Echolocator":"极限回声定位器","Corundum Caver":"刚玉洞穴者",
  "Starborne Slasher":"星生斩击者","Nyabomb":"喵炸弹",
  "Lunar Lightsabre":"月光光剑","Gemstone Engraver":"宝石雕刻者",
  "Gambler's Fallacy":"赌徒谬误","Coronary Catastrophe":"冠状动脉灾难",
  "Exponential Centrifuge":"指数离心机","Singularity Slammer":"奇点重击者",
  "Staff of Binding":"束缚法杖","Stormseer's Superspark Sceptre":"风暴先知超火花权杖",
  "Undersea Eviscerator":"海底剔骨者",
};

// 等级翻译
const TIER: Record<string,string> = {
  "Layer":"地层","Common":"普通","Uncommon":"罕见","Rare":"稀有","Legendary":"传说",
  "Godly":"神级","Antique":"古董","Mystical":"神秘","Divine":"神圣","Flawless":"无瑕",
  "Interstellar":"星际","Metaversal":"元宇宙","Sacred":"圣洁","Celestial":"天界",
  "Ethereal":"虚灵","Imaginary":"幻象","Polychromatical":"多彩","Hyperdimensional":"超维",
  "Infinitesimal":"无穷小",
};

// 颜色: 从原始 WikiText 提取
function pickColor(name: string): string {
  const colors: Record<string,string> = {
    "Mulch Mallet":"#a9a9a9","Mud Sickle":"#8B4513","Dirt Ravager":"#9c5d25",
    "Crystalline Excavator":"#00BFFF","Ballast Breaker":"#708090",
    "Tropical Carver":"#228B22","Void Crusher":"#4B0082","Geode Staff":"#FF69B4",
    "Earth Soiler":"#8B0000","Crypt Smasher":"#2F4F4F","Labyrinthian Tide":"#1E90FF",
    "77 Leaf Destroyer":"#32CD32","Planet Buster":"#FF4500",
    "Whirlpool of Fate":"#00CED1","The Key":"#808080",
  };
  return colors[name] || "#ccc";
}

function process(wikitext: string, title: string): string {
  const cn = PICK_CN[title] || title;
  const color = pickColor(title);
  const lines = wikitext.split("\n");
  let intro = "", recipe = "", gallery = "", other = "";
  let inRecipe = false, inGallery = false;
  const recipeRows: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i].trim();
    if (ln.startsWith("{{PickaxeInfoBox")) continue;
    if (ln.startsWith("|") && ln.includes("=") && i < 10) continue; // infobox params
    if (ln === "}}" || ln.startsWith("}}")) continue;

    // Intro
    if (ln.startsWith("==Introduction==") || ln.startsWith("== Introduction")) {
      // skip heading, next lines are intro
      let j = i + 1;
      while (j < lines.length && !lines[j].trim().startsWith("==")) {
        const txt = lines[j].trim();
        if (txt && !txt.startsWith("[[Category:") && !txt.startsWith("<gallery>") && !txt.startsWith("{|")) {
          intro += txt + " ";
        }
        j++;
      }
      continue;
    }

    // Recipe
    if (ln.startsWith("==Recipe==") || ln.startsWith("== Recipe")) {
      inRecipe = true;
      let j = i + 1;
      while (j < lines.length && !lines[j].trim().startsWith("==")) {
        const txt = lines[j].trim();
        if (txt.startsWith("|") && txt.includes("||") && !txt.startsWith("|scope")) {
          const cells = txt.replace(/^\|\s*/, "").split("||").map(c => cleanCell(c.trim()));
          recipeRows.push(`| ${cells.join(" | ")} |`);
        }
        if (txt === "<gallery>" || txt.startsWith("File:")) break;
        j++;
      }
      inRecipe = false;
      continue;
    }

    // Gallery
    if (ln.startsWith("<gallery>")) { inGallery = true; continue; }
    if (ln === "</gallery>") { inGallery = false; continue; }
    if (inGallery && ln.startsWith("File:")) {
      const fn = ln.replace(/^File:/, "").split("|")[0].trim();
      gallery += `![${fn}](https://static.wikia.nocookie.net/the-silly-cavers/images/${fn.replace(/ /g, "_")})\n`;
      continue;
    }

    // Other Info
    if (ln.startsWith("==Other Info==") || ln.startsWith("== Other Info")) {
      let j = i + 1;
      while (j < lines.length && !lines[j].trim().startsWith("==") && !lines[j].trim().startsWith("[[Category:")) {
        const txt = lines[j].trim().replace(/'''/g, "").replace(/<[^>]+>/g, "");
        if (txt) other += txt + " ";
        j++;
      }
      continue;
    }
  }

  // 翻译 intro
  intro = intro
    .replace(/'''/g, "").replace(/<[^>]+>/g, "")
    .replace(/\bWorld One\b/g, "世界一").replace(/\bWorld Two\b/g, "世界二")
    .replace(/\bSilly Caverns Discord\b/g, "Silly Caverns Discord")
    .replace(/\[\[World One\]\]/g, "[世界一](./world-one.md)")
    .replace(/\[\[World Two\]\]/g, "[世界二](./world-two.md)")
    .replace(/\[\[(.+?)\]\]/g, "$1")
    // 镐子名替换
    .replace(/Crypt Smasher/g, "墓穴粉碎者")
    .replace(/Dirt Ravager/g, "泥土掠夺者")
    .replace(/Crystalline Excavator/g, "水晶挖掘机")
    .replace(/Ballast Breaker/g, "压舱粉碎者")
    .replace(/Tropical Carver/g, "热带雕刻者")
    .replace(/Void Crusher/g, "虚空粉碎者")
    .replace(/Geode Staff/g, "晶洞法杖")
    .replace(/Earth Soiler/g, "大地污染者")
    .replace(/Labyrinthian Tide/g, "迷宫之潮")
    .replace(/77 Leaf Destroyer/g, "77叶毁灭者")
    .replace(/Planet Buster/g, "行星破坏者")
    .replace(/Whirlpool of Fate/g, "命运漩涡")
    .replace(/Wings of Glory/g, "荣耀之翼")
    .replace(/The Key/g, "钥匙")
    .replace(/Extreme Echolocator/g, "极限回声定位器")
    .replace(/Corundum Caver/g, "刚玉洞穴者")
    .replace(/Starborne Slasher/g, "星生斩击者")
    .replace(/Nyabomb/g, "喵炸弹")
    .replace(/Lunar Lightsabre/g, "月光光剑")
    .replace(/Gemstone Engraver/g, "宝石雕刻者")
    .replace(/Gambler's Fallacy/g, "赌徒谬误")
    .replace(/Coronary Catastrophe/g, "冠状动脉灾难")
    .replace(/Undersea Eviscerator/g, "海底剔骨者")
    // 句式翻译
    .replace(/The (.+?) is a pickaxe( that can be found)? in/g, "$1 是可在以下地点找到的镐子：")
    .replace(/is a pickaxe( that can be found)? in/g, "是可在以下地点找到的镐子：")
    .replace(/Its ability resembles a steering wheel to a boat, with 8 long lines radiating from the center, as well as a ring surrounding the center point\.?/g, "其技能类似于船只的方向盘，8 条长线从中心辐射而出，周围环绕着一个圆环。")
    .replace(/The ability mines out a (.+?) and mines (\d+) more blocks to each side of the ability\.?/g, "其技能可挖出一个$1，并在技能每侧额外挖掘 $2 个方块。")
    .replace(/The ability mines out a cross-shape\.?/g, "其技能可挖出一个十字形。")
    .replace(/The ability mines out an? (.+?)\.?/g, "其技能可挖出一个$1。")
    .replace(/a cross-shape/g, "十字形")
    .replace(/The ability mines ([\d,]+) blocks, while revealing ([\d,]+) blocks\.?/g, "该技能可挖掘 $1 个方块，同时揭示 $2 个方块。")
    .replace(/the pickaxe has a luck boost of ([\dx.,]+)\.?/g, "拥有 $1 倍幸运。")
    .replace(/a ([\d/,]+) chance to activate the ability when mining a block\.?/g, "挖掘方块时有 $1 概率触发技能。")
    .replace(/This all comes together to make a pickaxe consistency of ([\d.,]+)\.?/g, "综合来看，该镐子的一致性为 $1。")
    .replace(/Its ability/g, "其技能")
    .replace(/and mines (\d+) more blocks to each side\.?/g, "并在每侧额外挖掘 $1 个方块。")
    .replace(/labyrinth-like lines\.?/g, "迷宫般的线条。")
    .replace(/Mines ([\d,]+) blocks, reveals ([\d,]+) blocks, has ([\dx.,]+) luck, ([\d/,]+) ability activation rate\. This makes the pickaxe have ([\d.,]+) consistency\.?/g, "挖掘 $1 个方块，揭示 $2 个方块，拥有 $3 倍幸运，$4 技能触发率。这使得该镐子的一致性为 $5。")
    .replace(/  +/g, " ")
    .replace(/ \. /g, "。")
    .replace(/ \./g, "。");

  other = other
    .replace(/The icon for this pickaxe was made by (.+?) in the Silly Caverns Discord\.?/g, "该镐子图标由 $1 在 Silly Caverns Discord 中制作。")
    .replace(/Silly Caverns Discord/g, "Silly Caverns Discord")
    .replace(/  +/g, " ");

  // 从 intro 中提取 stats
  const statsMatch = intro.match(/该技能可挖掘 (\d+) 个方块.*?一致性为 ([\d.]+)/);
  const luckMatch = intro.match(/拥有 ([\dx.]+) 倍幸运/);
  const rateMatch = intro.match(/(\d+\/\d+) 概率触发/);

  let md = `# ${cn}\n\n`;
  md += `| 属性 | 值 |\n| --- | --- |\n`;
  md += `| 镐子名称 | <span style="color:${color};font-weight:bold">${cn}</span> |\n`;
  md += `| 镐子等级 | <span style="color:#f8480f;font-weight:bold">等级 1</span> |\n`;
  if (statsMatch) md += `| 属性 | 技能挖掘 ${statsMatch[1]} / 技能揭示 ${statsMatch[2] || "?"}`;
  if (luckMatch) md += ` / ${luckMatch[1]}倍幸运`;
  if (rateMatch) md += ` / ${rateMatch[1]} 技能触发率`;
  if (statsMatch) md += ` / 一致性 ${statsMatch[2]}`;
  md += ` |\n\n`;

  md += `### 简介\n\n${intro.trim()}\n\n`;

  if (recipeRows.length) {
    md += `### 配方\n\n| 矿石 | 等级 | 稀有度 | 数量 |\n| --- | --- | --- | --- |\n`;
    md += recipeRows.join("\n") + "\n\n";
  }

  if (gallery) {
    md += `### 技能展示\n\n${gallery}\n`;
  }

  if (other.trim()) {
    md += `### 其他信息\n\n${other.trim()}\n\n`;
  }

  md += `---\n*由 [笨猫探穴 Wiki](https://the-silly-caverns.fandom.com/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}) 汉化*\n`;
  return md;
}

function cleanCell(c: string): string {
  return c.replace(/\{\{Color\|(.+?)\}\}/g, (_, t) => `<TierBadge tier="${TIER[t] || t}" />`)
    .replace(/\[\[File:[^\]]+\]\]/gi, "")
    .replace(/\[\[([^\]|]+?)\]\]/g, "$1");
}

// 主程序
const pickFiles = fs.readdirSync(DATA).filter(f =>
  f.endsWith(".wikitext") && Object.keys(PICK_CN).some(k => f.startsWith(k))
);

console.log(`🔧 处理 ${pickFiles.length} 个镐子页面...\n`);

for (const file of pickFiles) {
  const title = file.replace(".wikitext", "");
  const slug = title.toLowerCase().replace(/[/\\?%*:|"<>]/g, "").replace(/\s+/g, "-");
  const wikitext = fs.readFileSync(path.join(DATA, file), "utf-8");
  const md = process(wikitext, title);
  fs.writeFileSync(path.join(OUT, `${slug}.md`), md, "utf-8");
  console.log(`  ✅ ${title} → ${slug}.md`);
}

console.log(`\n完成!`);
