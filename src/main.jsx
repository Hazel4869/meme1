import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  GitBranch,
  Network,
  Search,
  Sparkles,
} from "lucide-react";
import codebook from "../data/processed/codebook.json";
import themes from "../data/processed/themes.json";
import sources from "../data/processed/source_manifest.json";
import "./styles.css";

const rqLabels = {
  RQ1: "RQ1 数字催化与博物馆朝圣",
  RQ2: "RQ2 机构影响与可持续回应",
};

function App() {
  const [query, setQuery] = useState("");
  const [rqFilter, setRqFilter] = useState("全部");

  const filteredCodes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return codebook.filter((item) => {
      const matchesRq = rqFilter === "全部" || item.rq.includes(rqFilter);
      const text = `${item.code} ${item.name} ${item.definition} ${item.evidence.join(" ")}`.toLowerCase();
      return matchesRq && (!q || text.includes(q));
    });
  }, [query, rqFilter]);

  return (
    <main>
      <section className="hero">
        <div className="heroText">
          <p className="eyebrow">Inductive Thematic Analysis</p>
          <h1>Meme-Driven Tourism 初步主题分析</h1>
          <p className="lead">
            基于两份“无语佛 / Speechless Buddha”访谈逐字稿，整理代码本、五个初步主题、主题关系图与后续研究建议。
          </p>
          <div className="rqGrid">
            <div>
              <strong>RQ1</strong>
              <span>用户发起的 internet meme 如何成为实体博物馆朝圣的数字催化剂？</span>
            </div>
            <div>
              <strong>RQ2</strong>
              <span>meme-driven fame 对文化机构产生何种影响，博物馆如何实现可持续 engagement？</span>
            </div>
          </div>
        </div>
        <div className="heroPanel" aria-label="研究摘要">
          <div className="metric">
            <span>访谈</span>
            <strong>{sources.length}</strong>
          </div>
          <div className="metric">
            <span>开放代码</span>
            <strong>{codebook.length}</strong>
          </div>
          <div className="metric">
            <span>初步主题</span>
            <strong>{themes.length}</strong>
          </div>
        </div>
      </section>

      <section className="band">
        <SectionTitle icon={<BookOpen size={20} />} title="资料与伦理处理" />
        <div className="sourceGrid">
          {sources.map((source) => (
            <article className="sourceItem" key={source.id}>
              <div className="sourceId">{source.id}</div>
              <h3>{source.participant_profile}</h3>
              <p>{source.analytic_note}</p>
            </article>
          ))}
        </div>
        <p className="note">
          原始逐字稿保存在本地 `data/raw/`，不会推送到 GitHub；页面展示匿名化分析、材料清单和短引文，便于后续扩展同时降低研究伦理风险。
        </p>
      </section>

      <section>
        <SectionTitle icon={<Sparkles size={20} />} title="初步主题" />
        <div className="themeStack">
          {themes.map((theme) => (
            <article className="theme" key={theme.id}>
              <div className="themeHeader">
                <span>{theme.id}</span>
                <div className="rqPills">
                  {theme.rqs.map((rq) => (
                    <em key={rq}>{rq}</em>
                  ))}
                </div>
              </div>
              <h2>{theme.title}</h2>
              <p>{theme.summary}</p>
              <div className="codeChips">
                {theme.codes.map((code) => (
                  <span key={code}>{code}</span>
                ))}
              </div>
              <div className="quotes">
                {theme.representative_quotes.map((quote) => (
                  <blockquote key={`${theme.id}-${quote.participant}`}>
                    <strong>{quote.participant}</strong>
                    {quote.quote}
                  </blockquote>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="band">
        <SectionTitle icon={<Boxes size={20} />} title="代码本" />
        <div className="toolbar">
          <div className="searchBox">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索代码、定义或证据"
            />
          </div>
          <div className="segments" role="tablist" aria-label="按研究问题筛选">
            {["全部", "RQ1", "RQ2"].map((label) => (
              <button
                key={label}
                className={rqFilter === label ? "active" : ""}
                onClick={() => setRqFilter(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="codeGrid">
          {filteredCodes.map((item) => (
            <article className="codeCard" key={item.code}>
              <div className="codeTop">
                <span>{item.code}</span>
                <div>{item.rq.map((rq) => <em key={rq}>{rq}</em>)}</div>
              </div>
              <h3>{item.name}</h3>
              <p>{item.definition}</p>
              <ul>
                {item.evidence.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle icon={<Network size={20} />} title="主题关系图" />
        <div className="map">
          <Node title="跨平台接触" detail="被动推送 / 朋友圈 / 短视频" />
          <ArrowRight className="mapArrow" />
          <Node title="数字催化剂" detail="好玩、反差、可说服朋友" highlight />
          <ArrowRight className="mapArrow" />
          <Node title="物理朝圣" detail="进入博物馆看实体" />
          <ArrowRight className="mapArrow" />
          <Node title="实体求证" detail="尺度落差 / 氛围 / 真实感" />
          <ArrowRight className="mapArrow" />
          <Node title="参与式再生产" detail="拍照、分享、二创、共情" highlight />
        </div>
        <div className="strategy">
          <div>
            <GitBranch size={22} />
            <h3>机构影响</h3>
            <p>人流聚集、注意力集中、文创消费、传统文化年轻化。</p>
          </div>
          <div>
            <GitBranch size={22} />
            <h3>策略回应</h3>
            <p>系列化解释、动线管理、合理价位文创、UGC 共创机制与尊重边界提示。</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div className="sectionTitle">
      {icon}
      <h2>{title}</h2>
    </div>
  );
}

function Node({ title, detail, highlight = false }) {
  return (
    <div className={highlight ? "node highlight" : "node"}>
      <strong>{title}</strong>
      <span>{detail}</span>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
