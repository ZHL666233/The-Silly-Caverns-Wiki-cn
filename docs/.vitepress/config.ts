import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "笨猫探穴 Wiki 中文站",
  description: "The Silly Caverns 游戏 Wiki 中文汉化版",
  ignoreDeadLinks: true,
  base: "/The-Silly-Caverns-Wiki-cn/",

  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "世界一", link: "/world-one" },
      { text: "世界二", link: "/world-two" },
      { text: "子领域一", link: "/subrealm-one" },
      { text: "水水世界", link: "/watr-watr" },
      { text: "银河", link: "/galactica" },
    ],

    sidebar: [
      {
        text: "✅ 重要文章",
        items: [
          { text: "✅ 对号层", link: "/checkmark-%E2%9C%85" },
          { text: "世界一", link: "/world-one" },
          { text: "世界二", link: "/world-two" },
          { text: "子领域一", link: "/subrealm-one" },
          { text: "水水世界", link: "/watr-watr" },
          { text: "银河", link: "/galactica" },
        ],
      },
      {
        text: "⛏️ 世界一镐子",
        collapsed: true,
        items: [
          { text: "镐子总览", link: "/pickaxes" },
          { text: "腐土槌", link: "/mulch-mallet" },
          { text: "泥浆镰刀", link: "/mud-sickle" },
          { text: "泥土掠夺者", link: "/dirt-ravager" },
          { text: "水晶挖掘机", link: "/crystalline-excavator" },
          { text: "压舱粉碎者", link: "/ballast-breaker" },
          { text: "热带雕刻者", link: "/tropical-carver" },
          { text: "虚空粉碎者", link: "/void-crusher" },
          { text: "晶洞法杖", link: "/geode-staff" },
          { text: "大地污染者", link: "/earth-soiler" },
          { text: "墓穴粉碎者", link: "/crypt-smasher" },
          { text: "迷宫之潮", link: "/labyrinthian-tide" },
          { text: "77叶毁灭者", link: "/77-leaf-destroyer" },
          { text: "行星破坏者", link: "/planet-buster" },
          { text: "命运漩涡", link: "/whirlpool-of-fate" },
          { text: "荣耀之翼", link: "/wings-of-glory" },
          { text: "钥匙", link: "/the-key" },
        ],
      },
      {
        text: "⛏️ 世界二镐子",
        collapsed: true,
        items: [
          { text: "极限回声定位器", link: "/extreme-echolocator" },
          { text: "刚玉洞穴者", link: "/corundum-caver" },
          { text: "星生斩击者", link: "/starborne-slasher" },
          { text: "喵炸弹", link: "/nyabomb" },
          { text: "月光光剑", link: "/lunar-lightsabre" },
          { text: "宝石雕刻者", link: "/gemstone-engraver" },
          { text: "赌徒谬误", link: "/gambler's-fallacy" },
          { text: "冠状动脉灾难", link: "/coronary-catastrophe" },
        ],
      },
      {
        text: "💎 矿石",
        collapsed: true,
        items: [
          { text: "矿石总览", link: "/ore" },
          { text: "矿石等级", link: "/ore-tiers" },
          { text: "古董", link: "/antique" },
          { text: "天界", link: "/celestial" },
          { text: "虚灵", link: "/ethereal" },
        ],
      },
      {
        text: "⚙️ 齿轮",
        collapsed: true,
        items: [
          { text: "齿轮总览", link: "/gears" },
          { text: "齿轮", link: "/gear" },
        ],
      },
      {
        text: "📦 其他",
        collapsed: true,
        items: [
          { text: "事件列表", link: "/events" },
          { text: "Null Chroma", link: "/null-chroma" },
          { text: "岩石 🪨", link: "/rock-%F0%9F%AA%A8" },
          { text: "猫脸", link: "/cat-face" },
          { text: "John 🤽‍♂️", link: "/john-%F0%9F%A4%BD%E2%80%8D%E2%99%82%EF%B8%8F" },
          { text: "你的奖励！", link: "/your-reward!" },
        ],
      },
    ],

    search: { provider: "local" },

    outline: { level: [2, 3], label: "本页目录" },
    docFooter: { prev: "上一页", next: "下一页" },
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "回到顶部",
  },
});