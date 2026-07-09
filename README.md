# Meme-Driven Tourism 初步主题分析

本项目记录两份关于 “Speechless Buddha / 无语佛” 的访谈材料处理流程、归纳式主题分析代码本、初步主题和主题关系图。

## 研究问题

- RQ1: How does a user-initiated internet meme, such as the "Speechless Buddha", function as a digital catalyst for physical museum pilgrimage?
- RQ2: What are the multifaceted impacts of meme-driven fame on a cultural institution, and how can museums strategically respond to such phenomena and achieve sustainable engagement?

## 数据处理说明

原始逐字稿已从用户提供的 Word 文档中抽取到本地 `data/raw/`，但该目录被 `.gitignore` 排除，不会推送到 GitHub。原因是访谈逐字稿包含可识别称呼、时间、社交平台行为和研究流程信息。项目中公开记录的是匿名化后的材料清单、分析备忘、代码本、主题和代表性短引文。

## 本地运行

```bash
npm install
npm run dev
```

## 项目结构

- `src/`: React 展示页面
- `data/processed/`: 匿名化后的研究输出
- `notes/`: 分析流程、备忘和主题关系图 Mermaid 文本
- `data/raw/`: 本地原始逐字稿抽取文本，不纳入 Git
