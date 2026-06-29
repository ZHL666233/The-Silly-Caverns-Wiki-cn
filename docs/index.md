---
layout: false
---

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'PingFang SC', 'Microsoft YaHei', 'Segoe UI', sans-serif; background: #0d1117; color: #c9d1d9; overflow-x: hidden; }

.hero { position: relative; padding: 100px 20px 80px; text-align: center; background: linear-gradient(135deg, #1a0a2e 0%, #16213e 30%, #0f3460 60%, #1a0a2e 100%); overflow: hidden; }
.hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 70%, rgba(255,140,0,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(138,43,226,0.12) 0%, transparent 50%); animation: pulse 6s ease-in-out infinite; }
@keyframes pulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
.hero-inner { position: relative; z-index: 1; }
.hero-icon { font-size: 64px; margin-bottom: 16px; animation: float 3s ease-in-out infinite; display: block; }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.hero h1 { font-size: clamp(40px, 8vw, 64px); font-weight: 900; background: linear-gradient(135deg, #ff8c00, #ff2d95, #8a2be2, #00d4ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 10px; line-height: 1.3; }
.hero .sub { font-size: 18px; color: rgba(255,255,255,0.55); margin-bottom: 6px; }
.hero .desc { font-size: 14px; color: rgba(255,255,255,0.38); margin-bottom: 32px; }
.hero .btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.btn { display: inline-block; padding: 14px 32px; border-radius: 50px; font-size: 16px; font-weight: 700; text-decoration: none; transition: all .3s; }
.btn-go { background: linear-gradient(135deg, #ff8c00, #ff2d95); color: #fff; box-shadow: 0 4px 20px rgba(255,45,149,0.35); }
.btn-go:hover { transform: translateY(-2px); box-shadow: 0 6px 28px rgba(255,45,149,0.5); }
.btn-play { background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.15); }
.btn-play:hover { background: rgba(255,255,255,0.15); transform: translateY(-2px); }

.sec { padding: 48px 20px; max-width: 1100px; margin: 0 auto; }
.sec h2 { font-size: 24px; font-weight: 800; margin-bottom: 24px; text-align: center; color: #f0f6fc; }
.sec h2 .check { color: #3fb950; }

.grid { display: grid; gap: 16px; }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-5 { grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); }
.grid-6 { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }

.card { display: block; padding: 24px 20px; border-radius: 16px; text-decoration: none; color: inherit; transition: all .3s; border: 1px solid #21262d; background: #161b22; }
.card:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(0,0,0,0.35); border-color: #30363d; }
.card .icon { font-size: 40px; margin-bottom: 12px; display: block; }
.card h3 { font-size: 17px; font-weight: 700; margin-bottom: 8px; color: #f0f6fc; }
.card p { font-size: 13px; color: #8b949e; line-height: 1.6; }
.card .tag { display: inline-block; margin-top: 10px; padding: 3px 10px; border-radius: 14px; font-size: 11px; font-weight: 600; }
.tag-start { background: rgba(212,163,115,0.2); color: #d4a373; }
.tag-adv { background: rgba(135,206,235,0.2); color: #87ceeb; }
.tag-sp { background: rgba(144,238,144,0.2); color: #90ee90; }
.tag-hid { background: rgba(100,181,246,0.2); color: #64b5f6; }
.tag-end { background: rgba(186,104,200,0.2); color: #ba68c8; }
.tag-check { background: rgba(63,185,80,0.2); color: #3fb950; }

.card-world { position: relative; overflow: hidden; min-height: 140px; }
.card-world .thumb { position: absolute; right: -20px; bottom: -20px; font-size: 80px; opacity: 0.15; }
.card-world h3 { position: relative; z-index: 1; }
.card-world p { position: relative; z-index: 1; }
.card-world .tag { position: relative; z-index: 1; }

.card-f { text-align: center; }
.card-f:hover { border-color: #58a6ff; }

.stats { display: flex; justify-content: center; gap: 48px; padding: 32px 20px; background: #161b22; border-bottom: 1px solid #21262d; flex-wrap: wrap; }
.stats .s { text-align: center; }
.stats .n { font-size: 28px; font-weight: 900; background: linear-gradient(135deg, #58a6ff, #ff8c00); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: block; }
.stats .l { font-size: 12px; color: #8b949e; margin-top: 3px; }

.foot { padding: 32px 20px; text-align: center; background: #161b22; border-top: 1px solid #21262d; }
.foot p { font-size: 13px; color: #484f58; margin: 4px 0; }
.foot a { color: #58a6ff; text-decoration: none; }
.foot .play { margin-top: 12px; }
.foot .play a { font-size: 15px; font-weight: 600; }

@media (max-width: 768px) {
  .grid-3 { grid-template-columns: 1fr; }
  .stats { gap: 24px; }
  .hero { padding: 60px 16px 50px; }
}
</style>

<section class="hero">
  <div class="hero-inner">
    <span class="hero-icon">⛏️</span>
    <h1>笨猫探穴</h1>
    <p class="sub">The Silly Caverns 中文 Wiki</p>
    <p class="desc">最全的矿石图鉴 · 镐子数据 · 齿轮指南 · 世界探索</p>
    <div class="btns">
      <a href="/world-one" class="btn btn-go">🌍 开始探索</a>
      <a href="https://gityx.com/g8hh/yihanhua/1355.html" target="_blank" class="btn btn-play">🎮 进入游戏</a>
    </div>
  </div>
</section>

<section class="stats">
  <div class="s"><span class="n">55</span><span class="l">Wiki 页面</span></div>
  <div class="s"><span class="n">29</span><span class="l">镐子图鉴</span></div>
  <div class="s"><span class="n">5</span><span class="l">游戏世界</span></div>
  <div class="s"><span class="n">40</span><span class="l">齿轮数据</span></div>
</section>

<section class="sec">
  <h2><span class="check">✅</span> 重要文章</h2>
  <div class="grid grid-6">
    <a href="/checkmark-%E2%9C%85" class="card card-world">
      <span class="thumb">✅</span>
      <h3>✅ 对号层</h3>
      <span class="tag tag-check">精选</span>
    </a>
    <a href="/world-one" class="card card-world">
      <span class="icon">🌍</span>
      <h3>世界一</h3>
      <p>9 地层 · 15 镐子</p>
      <span class="tag tag-start">起始</span>
    </a>
    <a href="/world-two" class="card card-world">
      <span class="icon">🌏</span>
      <h3>世界二</h3>
      <p>7 地层 · 12 镐子</p>
      <span class="tag tag-adv">进阶</span>
    </a>
    <a href="/subrealm-one" class="card card-world">
      <span class="icon">🌎</span>
      <h3>子领域一</h3>
      <p>7 大洲 · 生命之树</p>
      <span class="tag tag-sp">特殊</span>
    </a>
    <a href="/watr-watr" class="card card-world">
      <span class="icon">🌊</span>
      <h3>水水世界</h3>
      <p>水域传送进入</p>
      <span class="tag tag-hid">隐藏</span>
    </a>
    <a href="/galactica" class="card card-world">
      <span class="icon">🌌</span>
      <h3>银河</h3>
      <p>终极世界</p>
      <span class="tag tag-end">终局</span>
    </a>
  </div>
</section>

<section class="sec">
  <h2>📚 资料库</h2>
  <div class="grid grid-3">
    <a href="/pickaxes" class="card card-f"><span class="icon">⛏️</span><h3>镐子图鉴</h3><p>29 把镐子完整数据<br>含技能、配方、属性</p></a>
    <a href="/ore" class="card card-f"><span class="icon">💎</span><h3>矿石百科</h3><p>全部矿石稀有度<br>生成地层与获取方式</p></a>
    <a href="/gears" class="card card-f"><span class="icon">⚙️</span><h3>齿轮系统</h3><p>40 个齿轮效果说明<br>幸运/速度/特殊能力</p></a>
    <a href="/events" class="card card-f"><span class="icon">🎉</span><h3>事件列表</h3><p>所有世界事件<br>触发条件与持续时间</p></a>
    <a href="/celestial" class="card card-f"><span class="icon">🌟</span><h3>天界矿石</h3><p>最稀有等级矿石<br>完整生成消息列表</p></a>
    <a href="/ethereal" class="card card-f"><span class="icon">🔮</span><h3>虚灵矿石</h3><p>34 种虚灵矿石<br>稀有度与生成条件</p></a>
  </div>
</section>

<footer class="foot">
  <p>💬 讨论Q群：<b style="color:#58a6ff">730783833</b></p>
  <p>由 <a href="https://the-silly-caverns.fandom.com/wiki/The_Silly_Caverns_Wiki" target="_blank">The Silly Caverns Wiki</a> 汉化 · 游戏作者 Amber Catgirl</p>
  <p class="play"><a href="https://gityx.com/g8hh/yihanhua/1355.html" target="_blank">🎮 点此游玩中文版</a></p>
</footer>
