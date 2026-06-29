# 傻傻洞穴 Wiki 中文站

[The Silly Caverns Wiki](https://the-silly-caverns.fandom.com/wiki/The_Silly_Caverns_Wiki) 的中文汉化版本。

**The Silly Caverns** 是一款 Roblox 挖矿游戏。本站收录 **55 个页面**，涵盖世界、镐子、矿石、齿轮等核心内容。

## 技术栈

- **抓取**：Fandom API (`action=parse`)
- **翻译**：术语表 + 句型规则（TypeScript）
- **框架**：VitePress

## 项目结构

```
wiki-cn/
├── data/          # 原始 WikiText（55 个文件）
├── scripts/
│   ├── fetch-all.ts   # 批量抓取脚本
│   ├── glossary.ts    # 翻译术语表
│   └── convert.ts     # WikiText → Markdown 转换
├── docs/          # Markdown 文件 + VitePress 配置
├── .github/workflows/deploy.yml  # GitHub Pages 自动部署
└── package.json
```

## 本地运行

```bash
cd wiki-cn
npm install
npm run dev      # 启动开发服务器
npm run build    # 构建静态站
```

## 部署到 GitHub Pages

1. 将项目推送到 GitHub
2. 在仓库 Settings → Pages 中选择 GitHub Actions 作为来源
3. Push 到 main 分支即可自动部署

如果仓库名不是 `username.github.io`，需要在 `docs/.vitepress/config.ts` 中设置 `base` 路径。

## 翻译说明

翻译采用**术语表 + 规则引擎**方式：
- 游戏术语（等级/层级/镐子等）→ 中文术语表
- 常见句型 → 正则匹配替换
- 表格数据、emoji、数字 → 原样保留

翻译质量约 80%，建议参照[英文原站](https://the-silly-caverns.fandom.com)阅读。
