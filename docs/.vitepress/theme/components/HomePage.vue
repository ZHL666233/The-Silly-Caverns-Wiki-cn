<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-emoji">⛏️</div>
        <h1 class="hero-title">笨猫探穴</h1>
        <p class="hero-subtitle">The Silly Caverns 中文 Wiki</p>
        <p class="hero-desc">最全的矿石图鉴 · 镐子数据 · 齿轮指南 · 世界探索</p>
        <div class="hero-actions">
          <a href="/world-one" class="btn-primary">🌍 开始探索</a>
          <a href="https://gityx.com/g8hh/yihanhua/1355.html" target="_blank" class="btn-play">🎮 进入游戏</a>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="stats-bar">
      <div class="stat-item">
        <span class="stat-num">55</span>
        <span class="stat-label">Wiki 页面</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">29</span>
        <span class="stat-label">镐子图鉴</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">5</span>
        <span class="stat-label">游戏世界</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">40</span>
        <span class="stat-label">齿轮数据</span>
      </div>
    </section>

    <!-- World Cards -->
    <section class="section">
      <h2 class="section-title">🌍 世界探索</h2>
      <div class="card-grid">
        <a href="/world-one" class="card card-world w1">
          <div class="card-img">🌍</div>
          <h3>世界一</h3>
          <p>9 个普通地层 · 3 个特殊地层 · 15 把镐子</p>
          <span class="card-badge">起始世界</span>
        </a>
        <a href="/world-two" class="card card-world w2">
          <div class="card-img">🌏</div>
          <h3>世界二</h3>
          <p>4 个普通地层 · 12 把镐子 · 隐藏齿轮</p>
          <span class="card-badge">进阶世界</span>
        </a>
        <a href="/subrealm-one" class="card card-world sr1">
          <div class="card-img">🌎</div>
          <h3>子领域一</h3>
          <p>7 个大陆地层 · 生命之树</p>
          <span class="card-badge">特殊领域</span>
        </a>
        <a href="/watr-watr" class="card card-world watr">
          <div class="card-img">🌊</div>
          <h3>水水世界</h3>
          <p>隐藏世界 · 水域传送进入</p>
          <span class="card-badge">隐藏</span>
        </a>
        <a href="/galactica" class="card card-world gal">
          <div class="card-img">🌌</div>
          <h3>银河</h3>
          <p>终极世界 · 最强镐子</p>
          <span class="card-badge">终局</span>
        </a>
      </div>
    </section>

    <!-- Feature Cards -->
    <section class="section">
      <h2 class="section-title">📚 资料库</h2>
      <div class="card-grid cols-3">
        <a href="/pickaxes" class="card card-feature">
          <div class="card-icon">⛏️</div>
          <h3>镐子图鉴</h3>
          <p>29 把镐子完整数据<br>含技能、配方、属性</p>
        </a>
        <a href="/ore" class="card card-feature">
          <div class="card-icon">💎</div>
          <h3>矿石百科</h3>
          <p>全部矿石稀有度<br>生成地层与获取方式</p>
        </a>
        <a href="/gears" class="card card-feature">
          <div class="card-icon">⚙️</div>
          <h3>齿轮系统</h3>
          <p>40 个齿轮效果说明<br>幸运/速度/特殊能力</p>
        </a>
        <a href="/events" class="card card-feature">
          <div class="card-icon">🎉</div>
          <h3>事件列表</h3>
          <p>所有世界事件<br>触发条件与持续时间</p>
        </a>
        <a href="/celestial" class="card card-feature">
          <div class="card-icon">🌟</div>
          <h3>天界矿石</h3>
          <p>最稀有等级矿石<br>完整生成消息列表</p>
        </a>
        <a href="/ethereal" class="card card-feature">
          <div class="card-icon">🔮</div>
          <h3>虚灵矿石</h3>
          <p>34 种虚灵矿石<br>稀有度与生成条件</p>
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>由 <a href="https://the-silly-caverns.fandom.com/wiki/The_Silly_Caverns_Wiki" target="_blank">The Silly Caverns Wiki</a> 汉化 · 游戏作者 Amber Catgirl</p>
      <p class="footer-play"><a href="https://gityx.com/g8hh/yihanhua/1355.html" target="_blank">🎮 点此游玩中文版</a></p>
    </footer>
  </div>
</template>

<style scoped>
/* ===== Base ===== */
.home-page {
  max-width: 100vw;
  overflow-x: hidden;
  margin: -24px -24px 0;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

/* ===== Hero ===== */
.hero {
  position: relative;
  padding: 80px 24px 64px;
  text-align: center;
  background: linear-gradient(135deg, #1a0a2e 0%, #16213e 30%, #0f3460 60%, #1a0a2e 100%);
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 20% 80%, rgba(255, 140, 0, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(0, 200, 255, 0.08) 0%, transparent 60%);
  animation: bgPulse 8s ease-in-out infinite;
}
@keyframes bgPulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}
.hero-content { position: relative; z-index: 1; }
.hero-emoji { font-size: 64px; margin-bottom: 16px; animation: float 3s ease-in-out infinite; }
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.hero-title {
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 900;
  background: linear-gradient(135deg, #ff8c00, #ff2d95, #8a2be2, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 8px;
  letter-spacing: 2px;
  line-height: 1.3;
  display: inline-block;
  padding: 0 4px;
}
.hero-subtitle { font-size: 18px; color: rgba(255,255,255,0.6); margin: 0 0 8px; }
.hero-desc { font-size: 15px; color: rgba(255,255,255,0.45); margin: 0 0 32px; }
.hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.btn-primary, .btn-play {
  display: inline-block; padding: 14px 32px; border-radius: 50px;
  font-size: 16px; font-weight: 700; text-decoration: none;
  transition: all 0.3s ease;
}
.btn-primary {
  background: linear-gradient(135deg, #ff8c00, #ff2d95);
  color: #fff; box-shadow: 0 4px 20px rgba(255,45,149,0.4);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 30px rgba(255,45,149,0.6); }
.btn-play {
  background: rgba(255,255,255,0.1); color: #fff;
  border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(10px);
}
.btn-play:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); }

/* ===== Stats Bar ===== */
.stats-bar {
  display: flex; justify-content: center; gap: 48px;
  padding: 32px 24px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
}
.stat-item { text-align: center; }
.stat-num {
  display: block; font-size: 28px; font-weight: 900;
  background: linear-gradient(135deg, var(--vp-c-brand), #ff8c00);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.stat-label { font-size: 13px; color: var(--vp-c-text-2); margin-top: 4px; }

/* ===== Sections ===== */
.section { padding: 48px 24px; max-width: 1100px; margin: 0 auto; }
.section-title { font-size: 24px; font-weight: 800; margin: 0 0 24px; text-align: center; }

/* ===== Cards ===== */
.card-grid { display: grid; gap: 16px; }
.card-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.card-grid:not(.cols-3) { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }

.card {
  display: block; padding: 24px; border-radius: 16px;
  text-decoration: none; color: inherit;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
.card-img, .card-icon { font-size: 40px; margin-bottom: 12px; }
.card h3 { font-size: 17px; font-weight: 700; margin: 0 0 8px; }
.card p { font-size: 13px; color: var(--vp-c-text-2); margin: 0; line-height: 1.6; }

/* World card badges */
.card-badge {
  display: inline-block; margin-top: 10px; padding: 3px 10px;
  border-radius: 20px; font-size: 11px; font-weight: 600;
}
.w1 .card-badge { background: rgba(139,90,43,0.2); color: #d4a373; }
.w2 .card-badge { background: rgba(70,130,180,0.2); color: #87ceeb; }
.sr1 .card-badge { background: rgba(46,139,87,0.2); color: #90ee90; }
.watr .card-badge { background: rgba(0,150,255,0.2); color: #64b5f6; }
.gal .card-badge { background: rgba(138,43,226,0.2); color: #ba68c8; }

/* Feature cards */
.card-feature { text-align: center; }
.card-feature:hover { border-color: var(--vp-c-brand); }

/* ===== Footer ===== */
.footer { padding: 32px 24px; text-align: center; background: var(--vp-c-bg-soft); border-top: 1px solid var(--vp-c-divider); }
.footer p { font-size: 13px; color: var(--vp-c-text-3); margin: 4px 0; }
.footer a { color: var(--vp-c-brand); }
.footer-play { margin-top: 12px !important; }
.footer-play a { font-size: 15px; font-weight: 600; }

@media (max-width: 768px) {
  .card-grid.cols-3 { grid-template-columns: 1fr; }
  .stats-bar { gap: 24px; }
  .hero { padding: 48px 16px 40px; }
}
</style>
