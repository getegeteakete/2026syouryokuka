import { useState, useEffect, useRef, useCallback } from "react";

// ==================== SVG ICON LIBRARY ====================
const Ico = {
  arrowUp:(c="#fff",s=22)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>,
  home:(c="#fff",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>,
  chevRight:(c="#E8963E",s=16)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>,
  clipboard:(c="#fff",s=24)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>,
  megaphone:(c="#fff",s=24)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  monitor:(c="#fff",s=24)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  clock:(c="#fff",s=24)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  searchIcon:(c="#fff",s=24)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  trophy:(c="#fff",s=24)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4a2 2 0 010-4h2M18 9h2a2 2 0 000-4h-2"/><path d="M8 3h8v5a4 4 0 01-8 0V3z"/><path d="M12 12v4M8 20h8M10 16h4"/></svg>,
  fileText:(c="#fff",s=24)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>,
  checkCircle:(c="#fff",s=24)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>,
  wrench:(c="#fff",s=24)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  barChart:(c="#fff",s=24)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>,
  trendUp:(c="#fff",s=24)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>,
  diamond:(c="#F5C882",s=26)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20"/></svg>,
  pieChart:(c="#F5C882",s=26)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 118 2.83"/><path d="M22 12A10 10 0 0012 2v10z"/></svg>,
  layers:(c="#F5C882",s=26)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  calendar:(c="#F5C882",s=26)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  robot:(c="#0F2B46",s=36)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="8" width="14" height="12" rx="2"/><path d="M12 8V5"/><circle cx="12" cy="3" r="2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M9 17h6"/></svg>,
  calculator:(c="#0F2B46",s=36)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h4"/></svg>,
  wallet:(c="#0F2B46",s=36)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 010-4h12v4"/><rect x="4" y="8" width="16" height="12" rx="2"/><circle cx="16" cy="14" r="1"/></svg>,
  shieldCheck:(c="#0F2B46",s=36)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  lockClosed:(c="#0F2B46",s=36)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1"/></svg>,
  zap:(c="#0F2B46",s=36)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  check:(c="#22C55E",s=16)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  lockSm:(c="#9CA3AF",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  msgCircle:(c="#0F2B46",s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
  editPen:(c="#0F2B46",s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  filePage:(c="#0F2B46",s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>,
  users:(c="#6B7280",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  settings:(c="#0F2B46",s=22)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  play:(c="#fff",s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z"/></svg>,
  star:(c="#E8963E",s=22)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  sparkles:(c="#E8963E",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/><circle cx="12" cy="12" r="4"/></svg>,
  fire:(c="#E8963E",s=16)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c2-3.25 4-6 4-8a4 4 0 00-8 0c0 2 2 4.75 4 8z"/><path d="M8 14a6 6 0 004 8 6 6 0 004-8c0-1.5-2-4-4-6-2 2-4 4.5-4 6z"/></svg>,
  alertTri:(c="#F59E0B",s=56)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>,
  mic:(c="#E8963E",s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><path d="M12 19v4M8 23h8"/></svg>,
  micOff:(c="#EF4444",s=20)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1l22 22M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6"/><path d="M17 16.95A7 7 0 015 12v-2m14 0v2c0 .76-.12 1.49-.34 2.18"/><path d="M12 19v4M8 23h8"/></svg>,
  analysis:(c="#0F2B46",s=36)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12h-4l-3 9L8 3l-3 9H1"/></svg>,
  download:(c="#fff",s=18)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/></svg>,
};
const SI={clipboard:Ico.clipboard,megaphone:Ico.megaphone,monitor:Ico.monitor,clock:Ico.clock,search:Ico.searchIcon,trophy:Ico.trophy,fileText:Ico.fileText,checkCircle:Ico.checkCircle,wrench:Ico.wrench,barChart:Ico.barChart,trendUp:Ico.trendUp};

// ==================== CONSTANTS ====================
const C={primary:"#0F2B46",accent:"#E8963E",accentLight:"#F5C882",bg:"#FAFAF7",card:"#FFFFFF",text:"#1A1A1A",textLight:"#6B7280",success:"#22C55E",danger:"#EF4444",border:"#E5E7EB",gS:"#0F2B46",gE:"#1A4A6E"};
const ET=[{label:"5人以下",min:1,max:5,normal:750,raised:1000},{label:"6〜20人",min:6,max:20,normal:1500,raised:2000},{label:"21〜50人",min:21,max:50,normal:3000,raised:4000},{label:"51〜100人",min:51,max:100,normal:5000,raised:6500},{label:"101人以上",min:101,max:9999,normal:8000,raised:10000}];
const SCHED=[{phase:"事前準備",desc:"GビズIDプライム取得・販売事業者選定",ik:"clipboard",date:"〜2026年3月",status:"active"},{phase:"公募開始",desc:"第6回公募 公募要領公開",ik:"megaphone",date:"2026年3月上旬",status:"upcoming"},{phase:"申請受付",desc:"Jグランツにて電子申請開始",ik:"monitor",date:"2026年4月中旬",status:"upcoming"},{phase:"申請締切",desc:"応募書類提出期限",ik:"clock",date:"2026年5月中旬",status:"upcoming"},{phase:"審査",desc:"書面審査・口頭審査（対象者のみ）",ik:"search",date:"締切後約3ヶ月",status:"upcoming"},{phase:"採択発表",desc:"補助金交付候補者の決定",ik:"trophy",date:"2026年8月頃",status:"upcoming"},{phase:"交付申請",desc:"採択後2ヶ月以内に交付申請",ik:"fileText",date:"採択後〜2ヶ月",status:"upcoming"},{phase:"交付決定",desc:"事業開始可能（発注・契約開始）",ik:"checkCircle",date:"2026年8〜9月頃",status:"upcoming"},{phase:"事業実施",desc:"設備導入・システム構築（18ヶ月以内）",ik:"wrench",date:"交付決定〜18ヶ月",status:"upcoming"},{phase:"実績報告",desc:"完了後30日以内に報告書提出",ik:"barChart",date:"事業完了後",status:"upcoming"},{phase:"効果報告",desc:"毎年4月に事業効果を報告",ik:"trendUp",date:"毎年4月",status:"upcoming"}];
const DQ=[
{id:1,q:"あなたの事業形態を教えてください",opts:[{l:"法人（株式会社・合同会社等）",v:"corp"},{l:"個人事業主",v:"sole"},{l:"NPO法人",v:"npo"},{l:"組合（事業協同組合等）",v:"union"}]},
{id:2,q:"業種を教えてください",sub:"業種により中小企業の定義（資本金・従業員数の上限）が異なります",opts:[{l:"製造業",v:"manufacturing"},{l:"建設業",v:"construction"},{l:"運輸業",v:"transport"},{l:"卸売業",v:"wholesale"},{l:"小売業",v:"retail"},{l:"サービス業（宿泊業・娯楽業を除く）",v:"service"},{l:"宿泊業・娯楽業",v:"hotel"},{l:"ソフトウェア・情報処理業",v:"software"},{l:"その他",v:"other"}]},
{id:3,q:"常勤の従業員数を教えてください",sub:"労働基準法上の『常時使用する従業員』の人数です",opts:[{l:"5人以下",v:"5"},{l:"6〜20人",v:"20"},{l:"21〜50人",v:"50"},{l:"51〜100人",v:"100"},{l:"101〜300人",v:"300"},{l:"301人以上",v:"301"}]},
{id:4,q:"資本金（出資の総額）はいくらですか？",sub:"個人事業主の方は「個人事業主」を選択してください",opts:[{l:"個人事業主（資本金なし）",v:"0"},{l:"5,000万円以下",v:"5000"},{l:"5,000万円超〜1億円以下",v:"10000"},{l:"1億円超〜3億円以下",v:"30000"},{l:"3億円超",v:"over"}]},
{id:5,q:"人手不足の状況を教えてください",sub:"省力化投資補助金の申請には人手不足の申告が必要です",opts:[{l:"深刻な人手不足（採用しても人が集まらない）",v:"severe"},{l:"人手不足を実感している",v:"moderate"},{l:"将来的に不足が見込まれる",v:"future"},{l:"現時点では問題ない",v:"none"}]},
{id:6,q:"導入を検討しているAI製品・システムは？",sub:"オーダーメイド開発のAIシステムが対象です",opts:[{l:"AI-OCR（請求書・帳票自動読取）",v:"ai_ocr"},{l:"AI検品・画像検査システム",v:"ai_inspect"},{l:"AI需要予測・在庫最適化",v:"ai_forecast"},{l:"AIチャットボット（顧客対応自動化）",v:"ai_chatbot"},{l:"AI配車・物流最適化",v:"ai_logistics"},{l:"その他AI/DXシステム",v:"ai_other"}]},
{id:7,q:"賃上げの計画はありますか？",sub:"給与支給総額の年平均成長率が基準を超えると補助上限額が増加します",opts:[{l:"年平均6.0%以上の賃上げを計画（大幅賃上げ特例対象）",v:"big_raise"},{l:"年平均3.5%以上の賃上げを計画",v:"normal_raise"},{l:"賃上げの具体的な計画はまだない",v:"no_raise"}]},
{id:8,q:"最低賃金に近い水準で雇用している従業員はいますか？",sub:"全従業員の30%以上が最低賃金近辺の場合、補助率が引き上げられます（最低賃金特例）",opts:[{l:"全従業員の30%以上が最低賃金+50円以内",v:"yes_minwage"},{l:"該当しない / わからない",v:"no_minwage"}]},
{id:9,q:"GビズIDプライムアカウントをお持ちですか？",sub:"電子申請（Jグランツ）に必須です。取得に約2週間かかります",opts:[{l:"取得済み",v:"yes"},{l:"申請中",v:"pending"},{l:"まだ取得していない",v:"no"}]}
];
const CQ=[{id:"company_name",q:"会社名（事業者名）を教えてください"},{id:"representative",q:"代表者のお名前をお聞かせください"},{id:"industry",q:"業種を教えてください（例：製造業、小売業）"},{id:"employees",q:"常勤従業員数を教えてください"},{id:"capital",q:"資本金（万円）を教えてください"},{id:"current_issue",q:"現在の人手不足の課題を教えてください\n（例：受注増加で検品作業が追いつかない）"},{id:"target_process",q:"省力化したい業務プロセスを具体的に教えてください"},{id:"expected_system",q:"導入をイメージしているAIシステムは？\n（未定の場合は「未定」とご入力ください）"},{id:"budget",q:"想定予算（万円）を教えてください（概算OK）"},{id:"wage_raise",q:"賃上げの予定はありますか？\n（年平均3.5%以上の給与支給総額増加で補助上限UP）"},{id:"gbizid",q:"GビズIDプライムは？（はい/いいえ/申請中）"},{id:"email",q:"連絡先メールアドレスを教えてください"},{id:"phone",q:"電話番号を教えてください"}];
const EI=[{name:"要件定義・ヒアリング",days:3,cat:"設計"},{name:"基本設計・画面設計",days:5,cat:"設計"},{name:"詳細設計",days:4,cat:"設計"},{name:"フロントエンド開発",days:8,cat:"開発"},{name:"バックエンド開発",days:10,cat:"開発"},{name:"DB設計・構築",days:4,cat:"開発"},{name:"API開発・連携",days:5,cat:"開発"},{name:"セキュリティ実装",days:3,cat:"開発"},{name:"テスト・品質保証",days:5,cat:"テスト"},{name:"本番環境構築",days:3,cat:"インフラ"},{name:"運用マニュアル",days:2,cat:"ドキュメント"},{name:"ユーザー研修",days:2,cat:"導入支援"},{name:"PM管理",days:5,cat:"管理"}];

// ===== AI製品マスター（費用対効果分析用）=====
const AI_PRODUCTS=[
  {id:"ai_ocr",name:"AI-OCR 帳票自動読取システム",category:"事務効率化",price:480,monthlyOps:5,description:"請求書・納品書・注文書をAIが自動読取。手入力ゼロで経理業務を80%削減。",laborSavingHours:160,currentWorkers:2,roi:320,paybackMonths:8,features:["請求書自動読取","仕訳自動生成","電子帳簿保存法対応","API連携"]},
  {id:"ai_inspect",name:"AI画像検品システム",category:"製造・品質",price:1200,monthlyOps:12,description:"製品外観をAIカメラが自動検査。不良品検出率99.5%で人的ミスを排除。",laborSavingHours:320,currentWorkers:4,roi:580,paybackMonths:12,features:["リアルタイム検査","不良パターン学習","統計レポート","ライン連携"]},
  {id:"ai_forecast",name:"AI需要予測・在庫最適化",category:"物流・在庫",price:800,monthlyOps:8,description:"過去データとAI分析で需要を予測。在庫過剰30%削減、欠品率50%改善。",laborSavingHours:200,currentWorkers:3,roi:450,paybackMonths:10,features:["需要予測AI","自動発注提案","在庫アラート","ダッシュボード"]},
  {id:"ai_chatbot",name:"AIチャットボット顧客対応",category:"カスタマーサポート",price:350,monthlyOps:3,description:"24時間365日のAI自動応答。問い合わせの70%を自動解決。",laborSavingHours:120,currentWorkers:2,roi:250,paybackMonths:7,features:["自然言語理解","FAQ自動回答","有人エスカレーション","多言語対応"]},
  {id:"ai_logistics",name:"AI配車・ルート最適化",category:"物流・配送",price:950,monthlyOps:10,description:"AIが最適配送ルートを自動計算。燃料費20%削減、配送効率35%向上。",laborSavingHours:250,currentWorkers:3,roi:520,paybackMonths:11,features:["ルート最適化","リアルタイム追跡","CO2削減計算","ドライバーアプリ"]},
  {id:"ai_other",name:"カスタムAI/DXシステム",category:"オーダーメイド",price:600,monthlyOps:6,description:"御社の業務に最適化されたオーダーメイドAIシステムを構築。",laborSavingHours:180,currentWorkers:2,roi:380,paybackMonths:9,features:["業務分析","カスタムAIモデル","既存システム連携","運用サポート"]},
];

const fmt=n=>new Intl.NumberFormat("ja-JP").format(n);
/* ===== 正確な補助金計算（交付規程準拠） ===== */
/* 中小企業の業種別上限 */
const IND_LIMITS={manufacturing:{cap:30000,emp:300},construction:{cap:30000,emp:300},transport:{cap:30000,emp:300},wholesale:{cap:10000,emp:100},retail:{cap:5000,emp:50},service:{cap:5000,emp:100},hotel:{cap:5000,emp:200},software:{cap:30000,emp:300},other:{cap:30000,emp:300}};
/* 小規模事業者の業種別従業員上限 */
const SMALL_LIMITS={manufacturing:20,construction:20,transport:20,wholesale:5,retail:5,service:5,hotel:20,software:20,other:20};
function calcSub(emp,cost,raised,isSmall,isMinWage){
  const t=ET.find(t=>emp>=t.min&&emp<=t.max);if(!t)return{sub:0,rate:"−",limit:0,rateDetail:[]};
  const lim=(raised?t.raised:t.normal)*10000;
  /* 補助率決定: 小規模/再生/最低賃金特例→2/3、通常中小→1/2 */
  const baseRate=(isSmall||isMinWage)?2/3:1/2;
  /* 1500万以下部分→baseRate、1500万超部分→1/3 */
  const th=15000000;
  const portion1=Math.min(cost,th);
  const portion2=Math.max(0,cost-th);
  const sub1=Math.floor(portion1*baseRate);
  const sub2=Math.floor(portion2*(1/3));
  const rawSub=sub1+sub2;
  const sub=Math.min(rawSub,lim);
  const rateLabel=isSmall?"2/3（小規模事業者）":isMinWage?"2/3（最低賃金特例）":"1/2（中小企業）";
  const rateDetail=[
    {part:"1,500万円以下の部分",rate:`${isSmall||isMinWage?"2/3":"1/2"}`,amount:sub1,base:portion1},
    ...(portion2>0?[{part:"1,500万円超の部分",rate:"1/3",amount:sub2,base:portion2}]:[])
  ];
  return{sub,rate:rateLabel,limit:lim,tier:t,rateDetail,baseRate,rawSub};
}

// ==================== VOICE INPUT HOOK ====================
function useVoice(){
  const [listening,setL]=useState(false);const [text,setT]=useState("");const recRef=useRef(null);
  const start=useCallback(()=>{
    if(!("webkitSpeechRecognition" in window)&&!("SpeechRecognition" in window)){alert("お使いのブラウザは音声入力に対応していません。Chrome等をお使いください。");return;}
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;const r=new SR();
    r.lang="ja-JP";r.continuous=false;r.interimResults=true;
    r.onresult=e=>{const t=Array.from(e.results).map(r=>r[0].transcript).join("");setT(t);};
    r.onend=()=>setL(false);r.onerror=()=>setL(false);
    recRef.current=r;r.start();setL(true);
  },[]);
  const stop=useCallback(()=>{if(recRef.current){recRef.current.stop();setL(false);}}, []);
  return{listening,text,start,stop,setText:setT};
}

// ==================== VOICE INPUT BUTTON ====================
function VoiceBtn({onResult,size=36}){
  const {listening,text,start,stop,setText}=useVoice();
  const prevText=useRef("");
  useEffect(()=>{if(text&&text!==prevText.current){prevText.current=text;onResult(text);}},[text,onResult]);
  return(<button type="button" onClick={listening?stop:start} title={listening?"音声入力を停止":"音声で入力する"} style={{
    width:size,height:size,borderRadius:"50%",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
    background:listening?"rgba(239,68,68,0.12)":"rgba(232,150,62,0.08)",
    animation:listening?"voicePulse 1.2s infinite":"none",transition:"all .2s",
  }}>{listening?Ico.micOff("#EF4444",size*0.5):Ico.mic(C.accent,size*0.5)}</button>);
}

// ==================== VOICE-ENABLED INPUT ====================
function VInput({value,onChange,placeholder,type="text",style:sx={}}){
  const handleVoice=useCallback(t=>{onChange({target:{value:t}});},[onChange]);
  return(<div style={{display:"flex",gap:8,alignItems:"center",width:"100%"}}>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{flex:1,padding:"10px 14px",borderRadius:10,border:"2px solid #E8EAED",fontSize:14,outline:"none",boxSizing:"border-box",...sx}}/>
    <VoiceBtn onResult={handleVoice} size={36}/>
  </div>);
}

// ==================== VOICE-ENABLED TEXTAREA ====================
function VTextarea({value,onChange,placeholder,rows=3,style:sx={}}){
  const handleVoice=useCallback(t=>{onChange({target:{value:value?value+t:t}});},[onChange,value]);
  return(<div style={{display:"flex",gap:8,alignItems:"flex-start",width:"100%"}}>
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={{flex:1,padding:"10px 14px",borderRadius:10,border:"2px solid #E8EAED",fontSize:14,outline:"none",boxSizing:"border-box",resize:"vertical",fontFamily:"inherit",...sx}}/>
    <VoiceBtn onResult={handleVoice} size={36}/>
  </div>);
}

// ==================== UTILITY COMPONENTS ====================
function ScrollTop(){const[s,setS]=useState(false);useEffect(()=>{const fn=()=>setS(window.scrollY>400);window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);},[]);if(!s)return null;return(<button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="TOP" style={{position:"fixed",bottom:28,right:28,zIndex:9999,width:52,height:52,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent},#D4802E)`,border:"none",cursor:"pointer",boxShadow:"0 6px 28px rgba(232,150,62,0.5)",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform .25s",animation:"scrollBtnIn .35s ease"}} onMouseOver={e=>{e.currentTarget.style.transform="translateY(-3px) scale(1.08)"}} onMouseOut={e=>{e.currentTarget.style.transform=""}}>{Ico.arrowUp("#fff",22)}</button>);}
function ANum({value:v,d=1000}){const[n,sN]=useState(0);useEffect(()=>{let s=0;const st=v/(d/16);const t=setInterval(()=>{s+=st;if(s>=v){sN(v);clearInterval(t);}else sN(Math.floor(s));},16);return()=>clearInterval(t);},[v,d]);return<span>{fmt(n)}</span>;}

// ==================== NAV ====================
function Nav({page,setPage,isLoggedIn,user,onLogout}){return(<nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:"rgba(15,43,70,0.97)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(232,150,62,0.12)",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
  <div style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer"}} onClick={()=>setPage("lp")}><div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:C.primary,fontSize:15}}>省</div><span style={{color:"#fff",fontWeight:700,fontSize:14}}>省力化補助金 AI申請サポート</span></div>
  <div style={{display:"flex",alignItems:"center",gap:6}}>
    {[{k:"lp",l:"TOP"},{k:"estimate",l:"見積もり"},{k:"ai_analysis",l:"AI製品分析"}].map(p=>(<button key={p.k} onClick={()=>setPage(p.k)} style={{background:page===p.k?"rgba(232,150,62,0.15)":"transparent",color:page===p.k?C.accent:"rgba(255,255,255,0.7)",border:"none",padding:"8px 14px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600}}>{p.l}</button>))}
    {isLoggedIn?(<><button onClick={()=>setPage(user?.role==="admin"?"admin":"mypage")} style={{background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:C.primary,border:"none",padding:"8px 18px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:700}}>{user?.role==="admin"?"管理画面":"マイページ"}</button><button onClick={onLogout} style={{background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.5)",border:"none",padding:"8px 12px",borderRadius:8,cursor:"pointer",fontSize:12}}>ログアウト</button></>):(<><button onClick={()=>setPage("login")} style={{background:"rgba(255,255,255,0.08)",color:"#fff",border:"1px solid rgba(255,255,255,0.15)",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600}}>ログイン</button><button onClick={()=>setPage("register")} style={{background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:C.primary,border:"none",padding:"8px 18px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:700}}>無料会員登録</button></>)}
  </div></nav>);}

// ==================== HERO ====================
function HeroSection({setPage}){return(<section style={{background:`linear-gradient(135deg,${C.gS} 0%,${C.gE} 60%,#1A5A7E 100%)`,minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative",overflow:"hidden",padding:"100px 24px 60px"}}>
  <div style={{position:"absolute",inset:0,opacity:0.035,backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23E8963E' stroke-width='0.5'/%3E%3C/svg%3E\")",backgroundSize:"60px 60px"}}/>
  <div style={{maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1}}>
    <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(232,150,62,0.12)",border:"1px solid rgba(232,150,62,0.25)",borderRadius:24,padding:"6px 18px",marginBottom:24}}>{Ico.fire(C.accent,16)}<span style={{color:C.accent,fontSize:13,fontWeight:700}}>第6回公募 2026年3月〜 受付開始予定</span></div>
    <h1 style={{color:"#fff",fontSize:"clamp(32px,5vw,56px)",fontWeight:900,lineHeight:1.2,marginBottom:20,letterSpacing:-1}}>中小企業省力化投資補助金<br/><span style={{color:C.accent}}>一般型</span><span style={{fontSize:"0.45em",verticalAlign:"super",color:"rgba(255,255,255,0.4)",marginLeft:8}}>AI申請サポート</span></h1>
    <p style={{color:"rgba(255,255,255,0.8)",fontSize:18,lineHeight:1.8,maxWidth:700,marginBottom:16}}>最大<span style={{color:C.accent,fontWeight:800,fontSize:28}}>1億円</span>の補助金で、AI製品・オーダーメイドシステムを導入。<br/>AIが対話形式＋<span style={{color:C.accentLight,fontWeight:700}}>音声入力対応</span>で申請をフルサポート。</p>
    <p style={{color:"rgba(255,255,255,0.5)",fontSize:14,marginBottom:36}}>補助率 1/2〜2/3 ｜ AI・IoT・ロボット・DX ｜ 最大18ヶ月 ｜ 音声入力対応</p>
    <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
      <button onClick={()=>setPage("diagnosis")} style={{background:`linear-gradient(135deg,${C.accent},#D4802E)`,color:"#fff",border:"none",padding:"16px 36px",borderRadius:12,fontSize:16,fontWeight:800,cursor:"pointer",boxShadow:"0 8px 32px rgba(232,150,62,0.4)",display:"flex",alignItems:"center",gap:10}} onMouseOver={e=>{e.currentTarget.style.transform="translateY(-2px)"}} onMouseOut={e=>{e.currentTarget.style.transform=""}}>{Ico.sparkles("#fff",18)} 申請診断＋仮見積もり</button>
      <button onClick={()=>setPage("ai_analysis")} style={{background:"rgba(255,255,255,0.08)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",padding:"16px 36px",borderRadius:12,fontSize:16,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>{Ico.analysis("#fff",22)} AI製品 費用対効果分析</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:20,marginTop:60}}>
      {[{l:"補助上限額（賃上げ特例）",v:"最大1億円",ic:Ico.diamond},{l:"補助率",v:"1/2〜2/3",ic:Ico.pieChart},{l:"対象経費",v:"7種類",ic:Ico.layers},{l:"事業実施期間",v:"最大18ヶ月",ic:Ico.calendar}].map((s,i)=>(<div key={i} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:"20px 24px"}}><div style={{marginBottom:10,opacity:0.85}}>{s.ic()}</div><div style={{color:C.accentLight,fontSize:22,fontWeight:800}}>{s.v}</div><div style={{color:"rgba(255,255,255,0.45)",fontSize:12,marginTop:4}}>{s.l}</div></div>))}
    </div>
  </div></section>);}

// ==================== AI PRODUCT ANALYSIS ====================
function AIAnalysis({setPage,onRegister}){
  const [sel,setSel]=useState(null);const [emp,setEmp]=useState(10);const [raised,setRaised]=useState(false);const [small,setSmall]=useState(false);
  const p=sel?AI_PRODUCTS.find(x=>x.id===sel):null;
  const cost=p?(p.price*10000):0;const res=p?calcSub(emp,cost,raised,small,false):{sub:0,limit:0};
  const monthlySaving=p?(p.laborSavingHours*2500):0;const annualSaving=monthlySaving*12;const annualROI=p?Math.round((annualSaving/cost)*100):0;
  return(<div style={{minHeight:"100vh",background:C.bg,paddingTop:80}}><div style={{maxWidth:1100,margin:"0 auto",padding:24}}>
    <div style={{textAlign:"center",marginBottom:40}}><div style={{marginBottom:8}}>{Ico.analysis(C.accent,32)}</div><h1 style={{fontSize:28,fontWeight:800,color:C.primary}}>AI製品 費用対効果分析</h1><p style={{color:C.textLight,fontSize:14,marginTop:6}}>導入を検討中のAI製品を選択すると、補助金額・ROI・投資回収期間を自動算出します</p></div>
    {/* Product Cards */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20,marginBottom:32}}>
      {AI_PRODUCTS.map(pr=>(<div key={pr.id} onClick={()=>setSel(pr.id)} style={{background:sel===pr.id?`linear-gradient(135deg,${C.primary},${C.gE})`:"#fff",borderRadius:16,padding:24,border:sel===pr.id?`2px solid ${C.accent}`:"1px solid #E8EAED",cursor:"pointer",transition:"all .2s"}} onMouseOver={e=>{if(sel!==pr.id)e.currentTarget.style.transform="translateY(-3px)"}} onMouseOut={e=>{e.currentTarget.style.transform=""}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:8,background:sel===pr.id?"rgba(232,150,62,0.2)":"rgba(232,150,62,0.08)",color:C.accent}}>{pr.category}</span>
          <span style={{fontSize:18,fontWeight:900,color:sel===pr.id?"#fff":C.accent}}>{fmt(pr.price)}万円</span>
        </div>
        <h3 style={{fontSize:16,fontWeight:800,color:sel===pr.id?"#fff":C.primary,marginBottom:8}}>{pr.name}</h3>
        <p style={{fontSize:12,color:sel===pr.id?"rgba(255,255,255,0.7)":C.textLight,lineHeight:1.6,margin:0}}>{pr.description}</p>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:12}}>{pr.features.map((f,i)=>(<span key={i} style={{fontSize:10,padding:"2px 8px",borderRadius:6,background:sel===pr.id?"rgba(255,255,255,0.1)":"#F3F4F6",color:sel===pr.id?"rgba(255,255,255,0.8)":C.textLight}}>{f}</span>))}</div>
      </div>))}
    </div>
    {/* Analysis Panel */}
    {p&&(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
      <div style={{background:"#fff",borderRadius:16,padding:28,border:"1px solid #E8EAED"}}>
        <h3 style={{fontSize:16,fontWeight:800,color:C.primary,marginBottom:20}}>条件設定</h3>
        <label style={{display:"block",marginBottom:16}}><span style={{fontSize:13,fontWeight:600,display:"block",marginBottom:6}}>従業員数: <strong style={{color:C.accent}}>{emp}人</strong></span><input type="range" min="1" max="200" value={emp} onChange={e=>setEmp(+e.target.value)} style={{width:"100%",accentColor:C.accent}}/></label>
        <div style={{display:"flex",gap:12}}>{[{v:raised,s:setRaised,l:"賃上げ特例"},{v:small,s:setSmall,l:"小規模事業者"}].map((cb,i)=>(<label key={i} style={{flex:1,display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:cb.v?"rgba(232,150,62,0.08)":"#F8F9FA",borderRadius:10,border:cb.v?`2px solid ${C.accent}`:"2px solid #E8EAED",cursor:"pointer"}}><input type="checkbox" checked={cb.v} onChange={e=>cb.s(e.target.checked)} style={{accentColor:C.accent}}/><span style={{fontSize:12,fontWeight:600}}>{cb.l}</span></label>))}</div>
        <div style={{marginTop:24,padding:20,background:"#F8F9FA",borderRadius:12}}>
          <h4 style={{fontSize:14,fontWeight:700,color:C.primary,marginBottom:12}}>省力化効果の試算</h4>
          {[{l:"月間削減工数",v:`${p.laborSavingHours}時間/月`},{l:"現在の担当者数",v:`${p.currentWorkers}名`},{l:"月間コスト削減額",v:`¥${fmt(monthlySaving)}`},{l:"年間コスト削減額",v:`¥${fmt(annualSaving)}`},{l:"年間ROI",v:`${annualROI}%`},{l:"投資回収期間",v:`約${p.paybackMonths}ヶ月`}].map((r,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #E8EAED"}}><span style={{fontSize:13,color:C.textLight}}>{r.l}</span><span style={{fontSize:14,fontWeight:700,color:C.primary}}>{r.v}</span></div>))}
        </div>
      </div>
      <div style={{background:`linear-gradient(135deg,${C.gS},${C.gE})`,borderRadius:20,padding:32,color:"#fff"}}>
        <h3 style={{fontSize:18,fontWeight:800,marginBottom:4}}>{p.name}</h3>
        <p style={{fontSize:12,opacity:0.6,marginBottom:24}}>{p.category}</p>
        <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.1)"}}><span>製品導入費用</span><span style={{fontWeight:800,fontSize:18}}>¥{fmt(cost)}</span></div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.1)"}}><span>月額運用費</span><span style={{fontWeight:700}}>¥{fmt(p.monthlyOps*10000)}/月</span></div>
        <div style={{background:"rgba(232,150,62,0.15)",borderRadius:14,padding:20,marginTop:20,border:"1px solid rgba(232,150,62,0.3)"}}>
          <div style={{textAlign:"center",marginBottom:12}}><span style={{fontSize:12,opacity:0.7}}>推定補助金額</span><div style={{fontSize:36,fontWeight:900,color:C.accentLight}}>¥<ANum value={res.sub}/></div></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13}}><span style={{opacity:0.7}}>自己負担額</span><span style={{fontWeight:700}}>¥{fmt(cost-res.sub)}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginTop:4}}><span style={{opacity:0.7}}>補助上限額</span><span style={{fontWeight:700}}>¥{fmt(res.limit)}</span></div>
        </div>
        <div style={{background:"rgba(34,197,94,0.12)",borderRadius:12,padding:16,marginTop:16,border:"1px solid rgba(34,197,94,0.2)"}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",marginBottom:4}}>補助金適用後の実質投資回収</div>
          <div style={{fontSize:24,fontWeight:900,color:"#86EFAC"}}>{Math.max(1,Math.round(((cost-res.sub)/annualSaving)*12))}ヶ月</div>
          <div style={{fontSize:11,opacity:0.5,marginTop:4}}>補助金なし: {p.paybackMonths}ヶ月 → 補助金あり: 大幅短縮</div>
        </div>
        <button onClick={()=>setPage("diagnosis")} style={{width:"100%",background:`linear-gradient(135deg,${C.accent},#D4802E)`,color:"#fff",border:"none",padding:"14px",borderRadius:12,fontSize:15,fontWeight:800,cursor:"pointer",marginTop:20}}>この製品で申請診断する →</button>
      </div>
    </div>)}
  </div></div>);}

// ==================== SCHEDULE + TABLE + FEATURES + COMPARISON ====================
function SchedSection(){return(<section style={{padding:"80px 24px",background:"#fff"}}><div style={{maxWidth:1000,margin:"0 auto"}}><div style={{textAlign:"center",marginBottom:48}}><div style={{marginBottom:8}}>{Ico.calendar(C.accent,26)}</div><h2 style={{fontSize:28,fontWeight:800,color:C.primary}}>申請スケジュール（第6回公募）</h2></div><div style={{position:"relative"}}><div style={{position:"absolute",left:28,top:0,bottom:0,width:2,background:`linear-gradient(to bottom,${C.accent},${C.primary},#E8EAED)`}}/>
  {SCHED.map((s,i)=>{const fn=SI[s.ik]||Ico.clipboard;const a=s.status==="active";return(<div key={i} style={{display:"flex",gap:20,marginBottom:20,position:"relative",animation:`fadeIn .5s ease ${i*.06}s both`}}><div style={{width:56,height:56,borderRadius:16,flexShrink:0,background:a?`linear-gradient(135deg,${C.accent},${C.accentLight})`:"linear-gradient(135deg,#E8EDF2,#D1D8E0)",display:"flex",alignItems:"center",justifyContent:"center",border:a?"3px solid rgba(232,150,62,0.25)":"3px solid #fff",boxShadow:a?"0 4px 20px rgba(232,150,62,0.25)":"0 2px 8px rgba(0,0,0,0.06)",zIndex:1}}>{fn(a?"#fff":"#94A3B8",22)}</div><div style={{flex:1,background:a?"rgba(232,150,62,0.04)":"#F8F9FA",borderRadius:14,padding:"16px 20px",border:a?"1px solid rgba(232,150,62,0.15)":"1px solid #ECEDF0"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style={{fontWeight:800,color:C.primary,fontSize:15}}>{s.phase}</span><span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:10,background:a?C.accent:"#D1D8E0",color:a?"#fff":"#6B7280"}}>{s.date}</span></div><p style={{color:C.textLight,fontSize:13,margin:0}}>{s.desc}</p></div></div>);})}</div></div></section>);}

function SubTable(){return(<section style={{padding:"80px 24px",background:C.bg}}><div style={{maxWidth:900,margin:"0 auto"}}><div style={{textAlign:"center",marginBottom:40}}><div style={{marginBottom:8}}>{Ico.diamond(C.accent,28)}</div><h2 style={{fontSize:28,fontWeight:800,color:C.primary}}>補助上限額と補助率</h2></div><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"separate",borderSpacing:0,borderRadius:16,overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,0.06)"}}><thead><tr style={{background:C.primary}}>{["従業員数","通常","賃上げ特例","補助率"].map((h,i)=>(<th key={i} style={{padding:"14px 16px",color:"#fff",fontSize:13,fontWeight:700,textAlign:"center"}}>{h}</th>))}</tr></thead><tbody>{ET.map((t,i)=>(<tr key={i} style={{background:i%2===0?"#fff":"#F8F9FA"}}><td style={{padding:"14px 16px",fontWeight:700,fontSize:14,textAlign:"center",color:C.primary}}>{t.label}</td><td style={{padding:"14px 16px",textAlign:"center",fontWeight:700}}>{fmt(t.normal)}万円</td><td style={{padding:"14px 16px",textAlign:"center",fontWeight:800,color:C.accent}}>{fmt(t.raised)}万円</td><td style={{padding:"14px 16px",textAlign:"center",fontSize:13,color:C.textLight}}>{i<2?"中小1/2 小規模2/3":"1500万以下1/2 超1/3"}</td></tr>))}</tbody></table></div></div></section>);}

function FeatSection(){const F=[{ic:()=>Ico.robot(C.primary,36),t:"AI対話型ヒアリング",d:"音声入力対応のチャット形式で事業計画書を自動生成。"},{ic:()=>Ico.calculator(C.primary,36),t:"自動数値計算",d:"省力化指数・労働生産性を自動算出。"},{ic:()=>Ico.wallet(C.primary,36),t:"AI製品費用対効果分析",d:"AI製品ごとのROI・投資回収期間を自動算出。"},{ic:()=>Ico.shieldCheck(C.primary,36),t:"申請書類チェッカー",d:"AIが書類の不備をチェック。一発採択を目指します。"},{ic:()=>Ico.lockClosed(C.primary,36),t:"実績報告サポート",d:"採択後の証憑管理から実績報告まで一貫サポート。"},{ic:()=>Ico.zap(C.primary,36),t:"最短即日準備完了",d:"AIの高速処理で申請準備が即日完了。"}];
  return(<section style={{padding:"80px 24px",background:C.bg}}><div style={{maxWidth:1000,margin:"0 auto"}}><div style={{textAlign:"center",marginBottom:48}}><div style={{marginBottom:8}}>{Ico.zap(C.accent,28)}</div><h2 style={{fontSize:28,fontWeight:800,color:C.primary}}>主な機能</h2></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24}}>{F.map((f,i)=>(<div key={i} style={{background:"#fff",borderRadius:18,padding:28,border:"1px solid #E8EAED",transition:"transform .2s,box-shadow .2s"}} onMouseOver={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,0.07)"}} onMouseOut={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="none"}}><div style={{width:56,height:56,borderRadius:14,background:"rgba(232,150,62,0.08)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>{f.ic()}</div><h3 style={{fontSize:17,fontWeight:800,color:C.primary,marginBottom:8}}>{f.t}</h3><p style={{color:C.textLight,fontSize:13,lineHeight:1.7,margin:0}}>{f.d}</p></div>))}</div></div></section>);}


// ==================== DIAGNOSIS + INLINE REGISTRATION ====================
function DiagPage({setPage,onLogin}){
  const [step,setStep]=useState(0);const [ans,setAns]=useState({});const [result,setResult]=useState(null);
  const [email,setEmail]=useState("");const [pw,setPw]=useState("");const [cn,setCn]=useState("");const [rep,setRep]=useState("");const [ph,setPh]=useState("");const [regMsg,setRegMsg]=useState("");
  const q=DQ[step];
  const handleAns=opt=>{const na={...ans,[q.id]:opt.v};setAns(na);
    if(step>=DQ.length-1){
      const empV=parseInt(na[3])||5;const capV=parseInt(na[4])||5000;const ind=na[2]||"other";
      const indL=IND_LIMITS[ind]||IND_LIMITS.other;
      const smallLimit=SMALL_LIMITS[ind]||20;
      const isSmall=empV<=smallLimit;
      const isMinWage=na[8]==="yes_minwage"&&!isSmall;
      const raised=na[7]==="big_raise";
      const aiProduct=AI_PRODUCTS.find(p=>p.id===na[6]);
      const reasons=[];
      if(na[5]==="none")reasons.push("人手不足の状況が補助要件を満たさない可能性があります");
      if(capV>0&&capV>indL.cap)reasons.push("資本金が業種別の中小企業定義の上限を超えています");
      if(empV>indL.emp)reasons.push("従業員数が業種別の中小企業定義（"+indL.emp+"人）を超えています");
      if(empV>=301)reasons.push("従業員301人以上は中小企業の範囲外の可能性があります");
      setResult({eligible:reasons.length===0,reasons,ans:na,emp:empV,aiProduct,isSmall,isMinWage,raised,industry:ind});
    }else setStep(step+1);
  };
  const goBack=()=>{if(step>0)setStep(step-1);else setPage("lp");};
  const doReg=()=>{if(!email||!pw||!cn){setRegMsg("会社名・メール・パスワードは必須です");return;}setRegMsg("登録完了！マイページへ移動します...");setTimeout(()=>onLogin({email,companyName:cn,rep,role:"user",diagnosisData:ans,aiProduct:result?.aiProduct}),1500);};
  const resetDiag=()=>{setStep(0);setAns({});setResult(null);};

  if(result){
    const tier=ET.find(t=>{const e=result.emp;return e>=t.min&&e<=t.max;});
    const pr=result.aiProduct;const cost=pr?(pr.price*10000):0;
    const res=pr?calcSub(result.emp,cost,result.raised,result.isSmall,result.isMinWage):{sub:0,limit:0,rate:"−",rateDetail:[],baseRate:0.5,rawSub:0};
    const mSave=pr?(pr.laborSavingHours*2500):0;const aSave=mSave*12;
    const roi=cost>0?Math.round((aSave/cost)*100):0;
    const payback=(cost-res.sub)>0&&mSave>0?Math.max(1,Math.round(((cost-res.sub)/mSave))):0;
    const subPct=cost>0?Math.round((res.sub/cost)*100):0;
    const mData=pr?Array.from({length:12},(_,i)=>({m:i+1,save:mSave*(i+1),cost:cost-res.sub})):[];
    const bepMonth=mSave>0?Math.ceil((cost-res.sub)/mSave):99;
    const ansLabels={};DQ.forEach(dq=>{const v=result.ans[dq.id];const o=dq.opts.find(x=>x.v===v);if(o)ansLabels[dq.id]={q:dq.q,a:o.l};});

    return(<div style={{minHeight:"100vh",background:`linear-gradient(180deg,${C.bg} 0%,#EEF0EC 100%)`,paddingTop:80}}><div style={{maxWidth:960,margin:"0 auto",padding:"24px 20px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <button onClick={resetDiag} style={{display:"flex",alignItems:"center",gap:6,background:"#fff",border:"1px solid #E8EAED",padding:"8px 16px",borderRadius:10,fontSize:13,fontWeight:700,color:C.primary,cursor:"pointer"}}>← もう一度診断する</button>
        <button onClick={()=>setPage("lp")} style={{display:"flex",alignItems:"center",gap:4,background:"transparent",border:"none",fontSize:13,fontWeight:600,color:C.textLight,cursor:"pointer"}}>TOPに戻る</button>
      </div>

      <div style={{background:result.eligible?`linear-gradient(135deg,${C.gS} 0%,${C.gE} 50%,#1A5A7E 100%)`:"linear-gradient(135deg,#7F1D1D,#DC2626)",borderRadius:24,padding:"48px 40px",color:"#fff",marginBottom:32,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:200,height:200,borderRadius:"50%",background:"rgba(232,150,62,0.08)"}}/>
        <div style={{position:"absolute",bottom:-60,left:-30,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.03)"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}><div style={{width:48,height:48,borderRadius:14,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center"}}>{result.eligible?Ico.trophy("#fff",28):Ico.alertTri("#fff",28)}</div><div><div style={{fontSize:13,opacity:.7,fontWeight:600}}>診断結果</div><h2 style={{fontSize:26,fontWeight:900,margin:0}}>{result.eligible?"申請の可能性が高いです！":"一部条件の確認が必要です"}</h2></div></div>
          {!result.eligible&&result.reasons.length>0&&(<div style={{marginTop:16,padding:"16px 20px",background:"rgba(255,255,255,0.08)",borderRadius:14,border:"1px solid rgba(255,255,255,0.1)"}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:8,opacity:.8}}>確認が必要な項目：</div>
            {result.reasons.map((r,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:6}}>{Ico.alertTri("#FBBF24",14)}<span style={{fontSize:13,opacity:.9,lineHeight:1.5}}>{r}</span></div>))}
          </div>)}
          {result.eligible&&tier&&(<div style={{display:"flex",gap:12,marginTop:24,flexWrap:"wrap"}}>
            <div style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:16,padding:"16px 24px",flex:"1 1 140px"}}><div style={{fontSize:11,opacity:.6,marginBottom:4}}>補助上限額{result.raised?"（賃上げ特例）":"（通常）"}</div><div style={{fontSize:28,fontWeight:900,color:C.accentLight}}>最大{fmt(result.raised?tier.raised:tier.normal)}<span style={{fontSize:14,fontWeight:600}}>万円</span></div></div>
            <div style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:16,padding:"16px 24px",flex:"1 1 200px"}}><div style={{fontSize:11,opacity:.6,marginBottom:4}}>適用補助率</div><div style={{fontSize:22,fontWeight:900,color:"#86EFAC"}}>{res.rate||"1/2（中小企業）"}</div></div>
            <div style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:16,padding:"16px 24px",flex:"1 1 120px"}}><div style={{fontSize:11,opacity:.6,marginBottom:4}}>従業員規模</div><div style={{fontSize:22,fontWeight:900}}>{tier.label}{result.isSmall?" (小規模)":""}</div></div>
          </div>)}
        </div>
      </div>

      {pr&&result.eligible&&res.rateDetail&&res.rateDetail.length>0&&(
      <div style={{background:"#fff",borderRadius:20,padding:"28px 28px",marginBottom:24,boxShadow:"0 4px 24px rgba(0,0,0,0.04)",border:"1px solid #E8EAED"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>{Ico.calculator(C.accent,20)}<h3 style={{fontSize:16,fontWeight:800,color:C.primary,margin:0}}>補助率の計算根拠（交付規程準拠）</h3></div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{borderBottom:`2px solid ${C.accent}`}}><th style={{textAlign:"left",padding:"10px 12px",fontWeight:700,color:C.primary}}>区分</th><th style={{textAlign:"right",padding:"10px 12px",fontWeight:700,color:C.primary}}>対象経費</th><th style={{textAlign:"center",padding:"10px 12px",fontWeight:700,color:C.primary}}>補助率</th><th style={{textAlign:"right",padding:"10px 12px",fontWeight:700,color:C.primary}}>補助金額</th></tr></thead>
          <tbody>
          {res.rateDetail.map((d,i)=>(<tr key={i} style={{borderBottom:"1px solid #F3F4F6"}}><td style={{padding:"10px 12px",color:C.text}}>{d.part}</td><td style={{padding:"10px 12px",textAlign:"right",fontWeight:600}}>¥{fmt(d.base)}</td><td style={{padding:"10px 12px",textAlign:"center",fontWeight:800,color:C.accent}}>{d.rate}</td><td style={{padding:"10px 12px",textAlign:"right",fontWeight:800,color:C.success}}>¥{fmt(d.amount)}</td></tr>))}
          <tr style={{background:"rgba(232,150,62,0.04)"}}><td style={{padding:"10px 12px",fontWeight:800,color:C.primary}}>合計（上限適用前）</td><td style={{padding:"10px 12px",textAlign:"right",fontWeight:700}}>¥{fmt(cost)}</td><td style={{padding:"10px 12px",textAlign:"center"}}>−</td><td style={{padding:"10px 12px",textAlign:"right",fontWeight:800,color:C.success}}>¥{fmt(res.rawSub)}</td></tr>
          {res.rawSub>res.sub&&(<tr style={{background:"rgba(239,68,68,0.04)"}}><td colSpan={3} style={{padding:"10px 12px",fontWeight:700,color:C.danger,fontSize:12}}>※ 補助上限額 ¥{fmt(res.limit)} を超えるため上限額を適用</td><td style={{padding:"10px 12px",textAlign:"right",fontWeight:900,color:C.danger}}>¥{fmt(res.sub)}</td></tr>)}
          </tbody>
        </table>
        <div style={{marginTop:16,padding:"12px 16px",background:"#F8F9FA",borderRadius:10,fontSize:12,color:C.textLight,lineHeight:1.7}}>
          {result.isSmall&&"✦ 小規模事業者のため、補助率 2/3 が適用されます。"}
          {result.isMinWage&&!result.isSmall&&"✦ 最低賃金引き上げ特例により、補助率 2/3 が適用されます。"}
          {!result.isSmall&&!result.isMinWage&&"✦ 中小企業の補助率 1/2 が適用されます。"}
          {" "}1,500万円を超える部分は一律 1/3 となります。
          {result.raised&&` 大幅賃上げ特例（年平均6.0%以上）により補助上限額が${fmt(tier.raised)}万円に引き上げられています。`}
        </div>
      </div>)}

      {pr&&result.eligible&&(<>
      <div style={{background:"#fff",borderRadius:24,padding:"40px 36px",marginBottom:24,boxShadow:"0 8px 40px rgba(0,0,0,0.06)",border:"1px solid #E8EAED",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:`linear-gradient(90deg,${C.accent},${C.success},#8B5CF6)`}}/>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:13,fontWeight:700,color:C.textLight,marginBottom:6,letterSpacing:1}}>推定補助金額</div>
          <div style={{fontSize:64,fontWeight:900,color:C.success,lineHeight:1,letterSpacing:-2}}>¥<ANum value={res.sub} d={1500}/></div>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(34,197,94,0.08)",padding:"6px 16px",borderRadius:20,marginTop:12}}>{Ico.trendUp(C.success,16)}<span style={{fontSize:13,fontWeight:700,color:"#059669"}}>投資額の{subPct}%を国が補助</span></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
          {[{label:"製品導入費用",value:`¥${fmt(cost)}`,sub:pr.name,color:C.primary,bg:"rgba(15,43,70,0.04)"},{label:"推定補助金額",value:`¥${fmt(res.sub)}`,sub:`補助率 ${res.rate}`,color:C.success,bg:"rgba(34,197,94,0.04)"},{label:"実質自己負担",value:`¥${fmt(cost-res.sub)}`,sub:`${fmt(Math.round((cost-res.sub)/10000))}万円`,color:"#7C3AED",bg:"rgba(139,92,246,0.04)"}].map((c,i)=>(
            <div key={i} style={{background:c.bg,borderRadius:16,padding:"20px 16px",textAlign:"center",border:`1px solid ${c.bg}`}}>
              <div style={{fontSize:11,fontWeight:700,color:C.textLight,marginBottom:8,letterSpacing:.5}}>{c.label}</div>
              <div style={{fontSize:26,fontWeight:900,color:c.color,letterSpacing:-1}}>{c.value}</div>
              <div style={{fontSize:11,color:C.textLight,marginTop:4}}>{c.sub}</div>
            </div>))}
        </div>
        <div style={{marginTop:28,padding:"20px 0 0"}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,fontWeight:700,color:C.textLight,marginBottom:8}}><span>補助金カバー率</span><span>{subPct}%</span></div>
          <div style={{height:14,borderRadius:7,background:"#F3F4F6",overflow:"hidden",position:"relative"}}>
            <div style={{height:"100%",borderRadius:7,background:`linear-gradient(90deg,${C.success},#34D399)`,width:`${subPct}%`,transition:"width 1.5s ease",position:"relative"}}><div style={{position:"absolute",right:0,top:-2,width:18,height:18,borderRadius:"50%",background:"#fff",border:`3px solid ${C.success}`,boxShadow:"0 2px 8px rgba(34,197,94,0.3)"}}/></div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.textLight,marginTop:4}}><span>¥0</span><span>¥{fmt(cost)}</span></div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:24}}>
        <div style={{background:"#fff",borderRadius:20,padding:"28px 24px",boxShadow:"0 4px 24px rgba(0,0,0,0.04)",border:"1px solid #E8EAED"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>{Ico.barChart(C.accent,20)}<h3 style={{fontSize:16,fontWeight:800,color:C.primary,margin:0}}>月間省力化効果</h3></div>
          <div style={{marginBottom:20}}>
            {[{label:"作業時間",before:`${pr.laborSavingHours+80}h/月`,after:"80h/月",pct:Math.round(80/(pr.laborSavingHours+80)*100),color:C.accent},{label:"人件費",before:`¥${fmt((pr.laborSavingHours+80)*2500)}`,after:`¥${fmt(80*2500)}`,pct:Math.round(80/(pr.laborSavingHours+80)*100),color:C.success},{label:"エラー率",before:"5.2%",after:"0.3%",pct:6,color:"#8B5CF6"}].map((bar,i)=>(
              <div key={i} style={{marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <span style={{fontSize:13,fontWeight:700,color:C.primary}}>{bar.label}</span>
                  <div style={{display:"flex",alignItems:"center",gap:8,fontSize:12}}><span style={{textDecoration:"line-through",color:C.textLight}}>{bar.before}</span><span style={{color:C.textLight}}>→</span><span style={{fontWeight:800,color:C.primary}}>{bar.after}</span><span style={{fontWeight:800,color:bar.color,fontSize:13}}>-{100-bar.pct}%</span></div>
                </div>
                <div style={{height:10,borderRadius:5,background:"#F3F4F6",overflow:"hidden"}}><div style={{height:"100%",borderRadius:5,background:`linear-gradient(90deg,${bar.color},${bar.color}88)`,width:`${bar.pct}%`,transition:`width .8s ease ${i*.15}s`}}/></div>
              </div>))}
          </div>
          <div style={{background:"#F8F9FA",borderRadius:12,padding:"14px 16px"}}>
            {[{l:"月間削減時間",v:`${pr.laborSavingHours}h`},{l:"月間コスト削減",v:`¥${fmt(mSave)}`},{l:"年間コスト削減",v:`¥${fmt(aSave)}`}].map((s,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<2?"1px solid #ECEDF0":"none"}}><span style={{fontSize:12,color:C.textLight}}>{s.l}</span><span style={{fontSize:13,fontWeight:800,color:C.primary}}>{s.v}</span></div>))}
          </div>
        </div>
        <div style={{background:"#fff",borderRadius:20,padding:"28px 24px",boxShadow:"0 4px 24px rgba(0,0,0,0.04)",border:"1px solid #E8EAED"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>{Ico.trendUp(C.accent,20)}<h3 style={{fontSize:16,fontWeight:800,color:C.primary,margin:0}}>ROI・投資回収シミュレーション</h3></div>
          <div style={{display:"flex",gap:8,height:140,alignItems:"flex-end",marginBottom:12,padding:"0 4px"}}>
            {mData.map((d,i)=>{const maxH=130;const h=aSave>0?Math.round((d.save/aSave)*maxH):0;const over=d.save>=d.cost;return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
              <div style={{height:h,width:"100%",borderRadius:"4px 4px 0 0",background:over?`linear-gradient(180deg,${C.success},#34D399)`:`linear-gradient(180deg,${C.accent},${C.accentLight})`,transition:`height .5s ease ${i*.05}s`,position:"relative"}}>{i+1===bepMonth&&bepMonth<=12&&(<div style={{position:"absolute",top:-18,left:"50%",transform:"translateX(-50%)",fontSize:8,fontWeight:800,color:C.success,whiteSpace:"nowrap"}}>回収↑</div>)}</div>
              <span style={{fontSize:8,color:C.textLight}}>{d.m}月</span>
            </div>);})}
          </div>
          <div style={{background:`linear-gradient(135deg,${C.gS},${C.gE})`,borderRadius:14,padding:"16px",color:"#fff",marginBottom:12,textAlign:"center"}}><div style={{fontSize:11,opacity:.6}}>年間投資対効果（ROI）</div><div style={{fontSize:42,fontWeight:900,color:C.accentLight}}>{roi}%</div></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[{l:"投資回収",v:`${payback}ヶ月`,s:"補助金適用後",c:C.success},{l:"3年間総削減額",v:`¥${fmt(aSave*3)}`,s:"",c:C.accent},{l:"補助金なし回収",v:`${pr.paybackMonths}ヶ月`,s:"",c:C.textLight},{l:"5年間総削減額",v:`¥${fmt(aSave*5)}`,s:"",c:"#8B5CF6"}].map((m,i)=>(<div key={i} style={{padding:"10px 12px",background:"#F8F9FA",borderRadius:10,textAlign:"center"}}><div style={{fontSize:10,color:C.textLight}}>{m.l}</div><div style={{fontSize:18,fontWeight:900,color:m.c}}>{m.v}</div>{m.s&&<div style={{fontSize:9,color:C.textLight}}>{m.s}</div>}</div>))}
          </div>
        </div>
      </div>

      <div style={{background:"#fff",borderRadius:20,padding:"28px 32px",marginBottom:24,boxShadow:"0 4px 24px rgba(0,0,0,0.04)",border:"1px solid #E8EAED"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>{Ico.robot(C.accent,28)}<div><h3 style={{fontSize:18,fontWeight:800,color:C.primary,margin:0}}>{pr.name}</h3><span style={{fontSize:12,color:C.textLight}}>{pr.category}</span></div></div>
          <div style={{padding:"6px 16px",background:"rgba(232,150,62,0.06)",borderRadius:10,fontSize:13,fontWeight:800,color:C.accent}}>¥{fmt(pr.price)}万円</div>
        </div>
        <p style={{fontSize:14,color:C.text,lineHeight:1.8,margin:"0 0 20px",padding:"16px 20px",background:"#F8F9FA",borderRadius:12,borderLeft:`4px solid ${C.accent}`}}>{pr.description}</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{pr.features.map((f,i)=>(<span key={i} style={{fontSize:12,padding:"6px 14px",borderRadius:10,background:"rgba(15,43,70,0.04)",color:C.primary,fontWeight:600,border:"1px solid #ECEDF0",display:"inline-flex",alignItems:"center",gap:4}}>{Ico.check(C.success,12)}{f}</span>))}</div>
      </div>
      </>)}

      <div style={{background:"#fff",borderRadius:20,padding:"24px 28px",marginBottom:24,boxShadow:"0 4px 24px rgba(0,0,0,0.04)",border:"1px solid #E8EAED"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}><div style={{display:"flex",alignItems:"center",gap:8}}>{Ico.clipboard(C.accent,18)}<h3 style={{fontSize:15,fontWeight:800,color:C.primary,margin:0}}>回答内容</h3></div><button onClick={resetDiag} style={{fontSize:12,fontWeight:600,color:C.accent,background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>やり直す</button></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {Object.entries(ansLabels).map(([k,v])=>(<div key={k} style={{padding:"8px 12px",background:"#F8F9FA",borderRadius:8,fontSize:12}}><div style={{color:C.textLight,marginBottom:2}}>{v.q.split("\n")[0]}</div><div style={{fontWeight:700,color:C.primary}}>{v.a}</div></div>))}
        </div>
      </div>

      {result.eligible&&(<div style={{background:"#fff",borderRadius:20,padding:"32px 36px",boxShadow:"0 8px 40px rgba(0,0,0,0.06)",border:"1px solid #E8EAED",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.accent},${C.accentLight})`}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
          <div><h3 style={{fontSize:20,fontWeight:800,color:C.primary,margin:"0 0 4px"}}>今すぐ申請準備を始める</h3><p style={{fontSize:13,color:C.textLight,margin:0}}>診断結果・AI製品分析データをそのまま引き継ぎます</p></div>
          <div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(34,197,94,0.06)",padding:"6px 14px",borderRadius:10}}>{Ico.check(C.success,14)}<span style={{fontSize:12,fontWeight:700,color:"#059669"}}>診断結果を引き継ぎ</span></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
          <div><label style={{fontSize:12,fontWeight:700,display:"block",marginBottom:6,color:C.primary}}>会社名 <span style={{color:C.danger}}>*</span></label><VInput value={cn} onChange={e=>setCn(e.target.value)} placeholder="株式会社サンプル"/></div>
          <div><label style={{fontSize:12,fontWeight:700,display:"block",marginBottom:6,color:C.primary}}>代表者名</label><VInput value={rep} onChange={e=>setRep(e.target.value)} placeholder="山田太郎"/></div>
          <div><label style={{fontSize:12,fontWeight:700,display:"block",marginBottom:6,color:C.primary}}>メールアドレス <span style={{color:C.danger}}>*</span></label><VInput value={email} onChange={e=>setEmail(e.target.value)} placeholder="info@example.com" type="email"/></div>
          <div><label style={{fontSize:12,fontWeight:700,display:"block",marginBottom:6,color:C.primary}}>パスワード <span style={{color:C.danger}}>*</span></label><input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="8文字以上" style={{width:"100%",padding:"10px 14px",borderRadius:10,border:"2px solid #E8EAED",fontSize:14,outline:"none",boxSizing:"border-box"}}/></div>
          <div><label style={{fontSize:12,fontWeight:700,display:"block",marginBottom:6,color:C.primary}}>電話番号</label><VInput value={ph} onChange={e=>setPh(e.target.value)} placeholder="03-1234-5678"/></div>
        </div>
        {regMsg&&<div style={{marginTop:16,padding:"12px 16px",borderRadius:12,fontSize:14,fontWeight:700,background:regMsg.includes("完了")?"rgba(34,197,94,0.06)":"rgba(239,68,68,0.06)",color:regMsg.includes("完了")?"#059669":C.danger}}>{regMsg}</div>}
        <button onClick={doReg} style={{width:"100%",marginTop:20,background:`linear-gradient(135deg,${C.accent},#D4802E)`,color:"#fff",border:"none",padding:"16px",borderRadius:14,fontSize:16,fontWeight:800,cursor:"pointer",boxShadow:"0 8px 32px rgba(232,150,62,0.3)",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>{Ico.sparkles("#fff",18)} 診断結果を引き継いで会員登録する</button>
      </div>)}
    </div></div>);
  }

  return(<div style={{minHeight:"100vh",background:C.bg,paddingTop:80}}><div style={{maxWidth:600,margin:"0 auto",padding:24}}>
    <div style={{textAlign:"center",marginBottom:40}}>
      <div style={{marginBottom:8}}>{Ico.clipboard(C.accent,28)}</div>
      <h1 style={{fontSize:26,fontWeight:800,color:C.primary,marginBottom:8}}>申請適格性かんたん診断</h1>
      <p style={{color:C.textLight,fontSize:14}}>{DQ.length}つの質問に答えるだけで補助金の適格性と補助額がわかります</p>
      <div style={{display:"flex",gap:4,justifyContent:"center",marginTop:16}}>{DQ.map((_,i)=>(<div key={i} style={{width:28,height:5,borderRadius:3,background:i<step?C.success:i===step?C.accent:"#E5E7EB",transition:"background .3s"}}/>))}</div>
    </div>
    <div style={{background:"#fff",borderRadius:20,padding:36,boxShadow:"0 4px 24px rgba(0,0,0,0.05)",border:"1px solid #E8EAED"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <button onClick={goBack} style={{display:"flex",alignItems:"center",gap:6,background:step>0?"rgba(15,43,70,0.04)":"transparent",border:step>0?"1px solid #E8EAED":"1px solid transparent",borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:700,color:step>0?C.primary:C.textLight,cursor:"pointer"}}>{step>0?"← 前の質問に戻る":"← TOPに戻る"}</button>
        <div style={{display:"inline-block",background:"rgba(232,150,62,0.08)",borderRadius:20,padding:"4px 14px",fontSize:12,fontWeight:700,color:C.accent}}>質問 {step+1} / {DQ.length}</div>
      </div>
      <h3 style={{fontSize:20,fontWeight:800,color:C.primary,marginBottom:8,lineHeight:1.4}}>{q.q}</h3>
      {q.sub&&<p style={{fontSize:13,color:C.textLight,marginBottom:20,lineHeight:1.6,padding:"10px 14px",background:"rgba(232,150,62,0.03)",borderRadius:10,borderLeft:`3px solid ${C.accent}30`}}>{q.sub}</p>}
      {!q.sub&&<div style={{marginBottom:20}}/>}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {q.opts.map((opt,i)=>{const selected=ans[q.id]===opt.v;return(
          <button key={i} onClick={()=>handleAns(opt)} style={{background:selected?"rgba(232,150,62,0.06)":"#F8F9FA",border:selected?`2px solid ${C.accent}`:"2px solid #E8EAED",borderRadius:12,padding:"14px 20px",textAlign:"left",cursor:"pointer",fontSize:15,fontWeight:600,color:selected?C.accent:C.text,transition:"all .2s",display:"flex",alignItems:"center",gap:10}} onMouseOver={e=>{if(!selected)e.currentTarget.style.borderColor=C.accent}} onMouseOut={e=>{if(!selected)e.currentTarget.style.borderColor="#E8EAED"}}>
            <div style={{width:20,height:20,borderRadius:"50%",border:selected?`6px solid ${C.accent}`:"2px solid #D1D5DB",flexShrink:0,transition:"border .2s"}}/>
            {opt.l}
          </button>);})}
      </div>
      {step>0&&(<div style={{marginTop:24,paddingTop:20,borderTop:"1px solid #F3F4F6"}}>
        <div style={{fontSize:11,fontWeight:700,color:C.textLight,marginBottom:8}}>これまでの回答：</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {DQ.slice(0,step).map((dq,i)=>{const v=ans[dq.id];const o=dq.opts.find(x=>x.v===v);return o?(<button key={i} onClick={()=>setStep(i)} style={{fontSize:11,padding:"4px 10px",borderRadius:8,background:"rgba(15,43,70,0.04)",border:"1px solid #ECEDF0",color:C.textLight,cursor:"pointer"}} onMouseOver={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.color=C.accent}} onMouseOut={e=>{e.currentTarget.style.borderColor="#ECEDF0";e.currentTarget.style.color=C.textLight}}>Q{i+1}: {o.l}</button>):null;})}
        </div>
      </div>)}
    </div>
  </div></div>);
}

// ==================== ESTIMATE ====================
function EstPage({setPage}){const [emp,setEmp]=useState(10);const [sc,setSc]=useState(1);const [raised,setR]=useState(false);const [sm,setSm]=useState(false);const [sel,setSel]=useState(EI.map((_,i)=>i));
  const DR=200000;const tD=sel.reduce((s,i)=>s+EI[i].days*sc,0);const dev=tD*DR;const inf=Math.round(dev*.15);const pm=Math.round(dev*.1);const tot=dev+inf+pm;const res=calcSub(emp,tot,raised,sm,false);
  return(<div style={{minHeight:"100vh",background:C.bg,paddingTop:80}}><div style={{maxWidth:1000,margin:"0 auto",padding:24}}>
    <div style={{textAlign:"center",marginBottom:40}}><div style={{marginBottom:8}}>{Ico.wallet(C.accent,28)}</div><h1 style={{fontSize:28,fontWeight:800,color:C.primary}}>見積もりシミュレーション</h1></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
      <div><div style={{background:"#fff",borderRadius:16,padding:28,border:"1px solid #E8EAED",marginBottom:20}}>
        <h3 style={{fontSize:16,fontWeight:800,color:C.primary,marginBottom:20}}>基本設定</h3>
        <label style={{display:"block",marginBottom:16}}><span style={{fontSize:13,fontWeight:600,display:"block",marginBottom:6}}>従業員数: <strong style={{color:C.accent}}>{emp}人</strong></span><input type="range" min="1" max="200" value={emp} onChange={e=>setEmp(+e.target.value)} style={{width:"100%",accentColor:C.accent}}/></label>
        <label style={{display:"block",marginBottom:16}}><span style={{fontSize:13,fontWeight:600,display:"block",marginBottom:6}}>規模: <strong style={{color:C.accent}}>×{sc}</strong></span><input type="range" min="0.5" max="3" step="0.1" value={sc} onChange={e=>setSc(+e.target.value)} style={{width:"100%",accentColor:C.accent}}/></label>
        <div style={{display:"flex",gap:12}}>{[{v:raised,s:setR,l:"賃上げ特例"},{v:sm,s:setSm,l:"小規模事業者"}].map((cb,i)=>(<label key={i} style={{flex:1,display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:cb.v?"rgba(232,150,62,0.08)":"#F8F9FA",borderRadius:10,border:cb.v?`2px solid ${C.accent}`:"2px solid #E8EAED",cursor:"pointer"}}><input type="checkbox" checked={cb.v} onChange={e=>cb.s(e.target.checked)} style={{accentColor:C.accent}}/><span style={{fontSize:12,fontWeight:600}}>{cb.l}</span></label>))}</div>
      </div>
      <div style={{background:"#fff",borderRadius:16,padding:28,border:"1px solid #E8EAED"}}><h3 style={{fontSize:16,fontWeight:800,color:C.primary,marginBottom:16}}>開発工程</h3>
        {EI.map((it,i)=>(<label key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #F3F4F6",cursor:"pointer"}}><input type="checkbox" checked={sel.includes(i)} onChange={e=>{if(e.target.checked)setSel([...sel,i]);else setSel(sel.filter(x=>x!==i));}} style={{accentColor:C.accent}}/><span style={{flex:1,fontSize:13}}>{it.name}</span><span style={{fontSize:11,padding:"2px 8px",borderRadius:8,background:"#F3F4F6",color:C.textLight}}>{it.cat}</span><span style={{fontSize:13,fontWeight:700,color:C.accent,minWidth:50,textAlign:"right"}}>{Math.round(it.days*sc)}日</span></label>))}
      </div></div>
      <div><div style={{background:`linear-gradient(135deg,${C.gS},${C.gE})`,borderRadius:20,padding:32,color:"#fff",position:"sticky",top:80}}>
        <h3 style={{fontSize:16,fontWeight:600,opacity:.8,marginBottom:24}}>見積もり概算</h3>
        {[{l:"開発費",v:dev,s:`${Math.round(tD)}人日×¥200,000`},{l:"インフラ",v:inf,s:"15%"},{l:"PM費",v:pm,s:"10%"}].map((it,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.1)"}}><div><div style={{fontSize:13,fontWeight:600}}>{it.l}</div><div style={{fontSize:11,opacity:.5}}>{it.s}</div></div><div style={{fontSize:16,fontWeight:800}}>¥{fmt(it.v)}</div></div>))}
        <div style={{display:"flex",justifyContent:"space-between",padding:"16px 0",borderTop:"2px solid rgba(255,255,255,0.15)",marginTop:8}}><span style={{fontSize:16,fontWeight:700}}>総事業費</span><span style={{fontSize:24,fontWeight:900}}>¥{fmt(tot)}</span></div>
        <div style={{background:"rgba(232,150,62,0.12)",borderRadius:14,padding:20,marginTop:20,border:"1px solid rgba(232,150,62,0.25)"}}>
          <div style={{textAlign:"center",marginBottom:12}}><span style={{fontSize:12,opacity:.7}}>推定補助金額</span><div style={{fontSize:36,fontWeight:900,color:C.accentLight}}>¥<ANum value={res.sub}/></div></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13}}><span style={{opacity:.7}}>自己負担額</span><span style={{fontWeight:700}}>¥{fmt(tot-res.sub)}</span></div>
        </div>
        <button onClick={()=>setPage("register")} style={{width:"100%",background:`linear-gradient(135deg,${C.accent},#D4802E)`,color:"#fff",border:"none",padding:"14px",borderRadius:12,fontSize:15,fontWeight:800,cursor:"pointer",marginTop:20}}>仮申し込みする →</button>
      </div></div>
    </div>
  </div></div>);}

// ==================== PRICING ====================
// ==================== AUTH ====================
function AuthPage({mode,setPage,onLogin}){const [email,setEmail]=useState("");const [pw,setPw]=useState("");const [cn,setCn]=useState("");const [rep,setRep]=useState("");const [ph,setPh]=useState("");const [msg,setMsg]=useState("");const [ok,setOk]=useState(false);
  const go=()=>{if(!email||!pw){setMsg("メールとパスワードは必須です");setOk(false);return;}if(mode==="register"&&!cn){setMsg("会社名は必須です");setOk(false);return;}
    if(mode==="register"){setMsg("登録完了！マイページへ移動します...");setOk(true);setTimeout(()=>onLogin({email,companyName:cn,rep,role:"user"}),1500);}
    else{if(email==="admin@example.com")onLogin({email,companyName:"運営管理者",role:"admin"});else{onLogin({email,companyName:cn||"サンプル株式会社",role:"user"});}}};
  return(<div style={{minHeight:"100vh",background:C.bg,paddingTop:80,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{background:"#fff",borderRadius:20,padding:40,maxWidth:440,width:"100%",boxShadow:"0 8px 40px rgba(0,0,0,0.06)",border:"1px solid #E8EAED"}}>
    <div style={{textAlign:"center",marginBottom:32}}><div style={{width:56,height:56,borderRadius:16,margin:"0 auto 16px",background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:C.primary,fontSize:24}}>省</div><h2 style={{fontSize:22,fontWeight:800,color:C.primary}}>{mode==="register"?"新規会員登録":"ログイン"}</h2></div>
    {mode==="register"&&(<><div style={{marginBottom:16}}><label style={{fontSize:12,fontWeight:700,display:"block",marginBottom:4}}>会社名 <span style={{color:C.danger}}>*</span></label><VInput value={cn} onChange={e=>setCn(e.target.value)} placeholder="株式会社サンプル"/></div><div style={{marginBottom:16}}><label style={{fontSize:12,fontWeight:700,display:"block",marginBottom:4}}>代表者名</label><VInput value={rep} onChange={e=>setRep(e.target.value)} placeholder="山田太郎"/></div><div style={{marginBottom:16}}><label style={{fontSize:12,fontWeight:700,display:"block",marginBottom:4}}>電話番号</label><VInput value={ph} onChange={e=>setPh(e.target.value)} placeholder="03-1234-5678"/></div></>)}
    <div style={{marginBottom:16}}><label style={{fontSize:12,fontWeight:700,display:"block",marginBottom:4}}>メール <span style={{color:C.danger}}>*</span></label><VInput value={email} onChange={e=>setEmail(e.target.value)} placeholder="info@example.com" type="email"/></div>
    <div style={{marginBottom:20}}><label style={{fontSize:12,fontWeight:700,display:"block",marginBottom:4}}>パスワード <span style={{color:C.danger}}>*</span></label><input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" style={{width:"100%",padding:"10px 14px",borderRadius:10,border:"2px solid #E8EAED",fontSize:14,outline:"none",boxSizing:"border-box"}}/></div>
    {msg&&<div style={{padding:"10px 14px",borderRadius:10,marginBottom:16,fontSize:13,fontWeight:600,background:ok?"rgba(34,197,94,0.08)":"rgba(239,68,68,0.08)",color:ok?"#059669":C.danger}}>{msg}</div>}
    <button onClick={go} style={{width:"100%",background:`linear-gradient(135deg,${C.accent},#D4802E)`,color:"#fff",border:"none",padding:"14px",borderRadius:12,fontSize:15,fontWeight:800,cursor:"pointer"}}>{mode==="register"?"会員登録する":"ログイン"}</button>
    <p style={{textAlign:"center",fontSize:13,color:C.textLight,marginTop:16}}>{mode==="register"?(<>アカウントをお持ちの方は <button onClick={()=>setPage("login")} style={{color:C.accent,background:"none",border:"none",cursor:"pointer",fontWeight:700,fontSize:13}}>ログイン</button></>):(<>アカウントをお持ちでない方は <button onClick={()=>setPage("register")} style={{color:C.accent,background:"none",border:"none",cursor:"pointer",fontWeight:700,fontSize:13}}>新規登録</button></>)}</p>
    {mode==="login"&&<p style={{textAlign:"center",fontSize:11,color:C.textLight,marginTop:8}}>デモ: admin@example.com で管理者画面</p>}
  </div></div>);}

// ==================== MY PAGE (Voice-enabled chat) ====================
function MyPage({user,setPage}){
  const [tab,setTab]=useState("dashboard");const [chatStep,setChatStep]=useState(0);const [chatAns,setChatAns]=useState({});const [chatIn,setChatIn]=useState("");const [planSt,setPlanSt]=useState("draft");const [edits,setEdits]=useState({});
  const handleChat=()=>{if(!chatIn.trim())return;const q=CQ[chatStep];setChatAns({...chatAns,[q.id]:chatIn});setChatIn("");if(chatStep<CQ.length-1)setChatStep(chatStep+1);else setPlanSt("complete");};
  const handleVoiceChat=useCallback(t=>{setChatIn(prev=>prev?prev+" "+t:t);},[]);
  const tabs=[{id:"dashboard",l:"ダッシュボード",ic:a=>Ico.barChart(a?C.accent:C.textLight,18)},{id:"chat",l:"AIヒアリング",ic:a=>Ico.msgCircle(a?C.accent:C.textLight,18)},{id:"plan",l:"事業計画書",ic:a=>Ico.editPen(a?C.accent:C.textLight,18)},{id:"docs",l:"必要書類",ic:a=>Ico.filePage(a?C.accent:C.textLight,18)},{id:"performance",l:"実績報告",ic:a=>Ico.barChart(a?C.accent:C.textLight,18)}];
  return(<div style={{minHeight:"100vh",background:C.bg,paddingTop:64}}><div style={{display:"flex",minHeight:"calc(100vh - 64px)"}}>
    <div style={{width:240,background:"#fff",borderRight:"1px solid #E8EAED",padding:"24px 12px",flexShrink:0}}>
      <div style={{padding:"12px 16px",marginBottom:20}}><div style={{fontSize:14,fontWeight:800,color:C.primary}}>{user?.companyName||"未設定"}</div><div style={{fontSize:11,color:C.textLight}}>{user?.email}</div></div>
      {tabs.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{width:"100%",padding:"10px 16px",borderRadius:10,border:"none",background:tab===t.id?"rgba(232,150,62,0.08)":"transparent",color:tab===t.id?C.accent:C.text,textAlign:"left",cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:4,display:"flex",alignItems:"center",gap:10}}>{t.ic(tab===t.id)}{t.l}</button>))}
    </div>
    <div style={{flex:1,padding:32,overflowY:"auto"}}>
      {tab==="dashboard"&&(<div><h2 style={{fontSize:22,fontWeight:800,color:C.primary,marginBottom:24}}>ダッシュボード</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:32}}>{[{l:"ステータス",v:planSt==="complete"?"作成完了":"作成中",c:planSt==="complete"?C.success:C.accent},{l:"ヒアリング進捗",v:`${Math.round((chatStep/CQ.length)*100)}%`,c:C.accent},{l:"次のアクション",v:chatStep===0?"ヒアリング開始":"計画書確認",c:C.primary}].map((s,i)=>(<div key={i} style={{background:"#fff",borderRadius:14,padding:20,border:"1px solid #E8EAED"}}><div style={{fontSize:12,color:C.textLight,marginBottom:4}}>{s.l}</div><div style={{fontSize:20,fontWeight:800,color:s.c}}>{s.v}</div></div>))}</div>
        <div style={{background:"#fff",borderRadius:14,padding:24,border:"1px solid #E8EAED"}}><h3 style={{fontSize:16,fontWeight:700,color:C.primary,marginBottom:16}}>申請ステップ</h3>
          {[{s:"1",t:"AIヒアリング（音声入力対応）",d:"チャットで事業内容を入力",done:chatStep>0},{s:"2",t:"事業計画書自動生成",d:"AIが計画書を作成",done:planSt==="complete"},{s:"3",t:"書類確認・修正",d:"各項目3回まで修正可能",done:false},{s:"4",t:"見積書・必要書類準備",d:"添付書類の準備",done:false},{s:"5",t:"Jグランツで電子申請",d:"完成書類で申請",done:false}].map((s,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"12px 0",borderBottom:"1px solid #F3F4F6"}}><div style={{width:32,height:32,borderRadius:"50%",flexShrink:0,background:s.done?C.success:"#E8EAED",color:s.done?"#fff":C.textLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800}}>{s.done?Ico.check("#fff",14):s.s}</div><div><div style={{fontSize:14,fontWeight:700,color:C.primary}}>{s.t}</div><div style={{fontSize:12,color:C.textLight}}>{s.d}</div></div></div>))}
        </div>
      </div>)}
      {tab==="chat"&&(<div><h2 style={{fontSize:22,fontWeight:800,color:C.primary,marginBottom:8,display:"flex",alignItems:"center",gap:10}}>{Ico.msgCircle(C.primary,22)} AIヒアリング</h2>
        <p style={{fontSize:13,color:C.textLight,marginBottom:24,display:"flex",alignItems:"center",gap:6}}>{Ico.mic(C.accent,16)} 音声入力に対応しています。マイクボタンで入力できます。</p>
        <div style={{background:"#fff",borderRadius:16,border:"1px solid #E8EAED",maxHeight:"55vh",overflowY:"auto",padding:24,marginBottom:16}}>
          <div style={{display:"flex",gap:10,marginBottom:20}}><div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{Ico.robot("#fff",20)}</div><div style={{background:"#F8F9FA",borderRadius:"4px 16px 16px 16px",padding:"12px 16px",maxWidth:"80%",fontSize:14,lineHeight:1.6}}>こんにちは！省力化補助金の申請サポートAIです。音声でもテキストでも回答できます。</div></div>
          {Object.entries(chatAns).map(([k,v],i)=>{const qo=CQ.find(q=>q.id===k);return(<div key={i}><div style={{display:"flex",gap:10,marginBottom:12}}><div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{Ico.robot("#fff",20)}</div><div style={{background:"#F8F9FA",borderRadius:"4px 16px 16px 16px",padding:"12px 16px",maxWidth:"80%",fontSize:14,whiteSpace:"pre-line",lineHeight:1.6}}>{qo?.q}</div></div>
          <div style={{display:"flex",gap:10,marginBottom:20,justifyContent:"flex-end"}}><div style={{background:C.primary,color:"#fff",borderRadius:"16px 4px 16px 16px",padding:"12px 16px",maxWidth:"80%",fontSize:14}}>{v}</div><div style={{width:36,height:36,borderRadius:"50%",background:"#E8EAED",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{Ico.users("#6B7280",18)}</div></div></div>);})}
          {planSt!=="complete"&&chatStep<CQ.length&&(<div style={{display:"flex",gap:10}}><div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{Ico.robot("#fff",20)}</div><div style={{background:"#F8F9FA",borderRadius:"4px 16px 16px 16px",padding:"12px 16px",maxWidth:"80%",fontSize:14,whiteSpace:"pre-line",lineHeight:1.6}}>{CQ[chatStep].q}</div></div>)}
          {planSt==="complete"&&(<div style={{display:"flex",gap:10}}><div style={{width:36,height:36,borderRadius:"50%",background:C.success,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{Ico.check("#fff",18)}</div><div style={{background:"rgba(34,197,94,0.06)",borderRadius:"4px 16px 16px 16px",padding:"12px 16px",fontSize:14,border:"1px solid rgba(34,197,94,0.15)"}}>ヒアリング完了！「事業計画書」タブで確認・修正できます。</div></div>)}
        </div>
        {planSt!=="complete"&&(<div style={{display:"flex",gap:8,alignItems:"center"}}>
          <input value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleChat()} placeholder="回答を入力..." style={{flex:1,padding:"12px 16px",borderRadius:12,border:"2px solid #E8EAED",fontSize:14,outline:"none"}}/>
          <VoiceBtn onResult={handleVoiceChat} size={44}/>
          <button onClick={handleChat} style={{background:C.accent,color:"#fff",border:"none",padding:"12px 24px",borderRadius:12,fontWeight:800,cursor:"pointer",fontSize:14}}>送信</button>
        </div>)}
      </div>)}
      {tab==="plan"&&(<div><h2 style={{fontSize:22,fontWeight:800,color:C.primary,marginBottom:24}}>{Ico.editPen(C.primary,22)} 事業計画書</h2>
        {planSt!=="complete"?(<div style={{background:"#fff",borderRadius:16,padding:40,textAlign:"center",border:"1px solid #E8EAED"}}><p style={{fontSize:16,fontWeight:700,color:C.primary}}>まずAIヒアリングを完了してください</p><button onClick={()=>setTab("chat")} style={{background:C.accent,color:"#fff",border:"none",padding:"10px 24px",borderRadius:10,fontWeight:700,cursor:"pointer",marginTop:16}}>ヒアリング開始</button></div>):(
        <div style={{background:"#fff",borderRadius:16,padding:28,border:"1px solid #E8EAED"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(34,197,94,0.08)",padding:"4px 14px",borderRadius:12,fontSize:12,fontWeight:700,color:"#059669",marginBottom:20}}>{Ico.check(C.success,14)} 生成完了</div>
          {[{k:"overview",t:"事業概要",c:`${chatAns.company_name||""}は、${chatAns.industry||""}において${chatAns.current_issue||"人手不足"}の課題を抱え、本補助金でAIシステム導入による省力化を図る。`},{k:"target",t:"省力化対象",c:chatAns.target_process||"業務プロセスの自動化"},{k:"system",t:"導入システム",c:chatAns.expected_system||"AIシステム"},{k:"effect",t:"期待される効果",c:"対象業務の作業時間を約60%削減し、労働生産性を年平均4.0%以上向上。"},{k:"plan",t:"賃上げ計画",c:chatAns.wage_raise||"給与支給総額を年平均3.5%以上増加。"}].map((s,i)=>(<div key={i} style={{marginBottom:20,padding:16,background:"#F8F9FA",borderRadius:12,border:"1px solid #E8EAED"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><h4 style={{fontSize:14,fontWeight:800,color:C.primary,margin:0}}>{s.t}</h4><span style={{fontSize:11,color:C.textLight}}>修正残り: {3-(edits[s.k]||0)}回</span></div>
            <p style={{fontSize:13,color:C.text,lineHeight:1.7,margin:0}}>{s.c}</p>
            {(edits[s.k]||0)<3&&<button style={{marginTop:8,background:"transparent",border:`1px solid ${C.accent}`,color:C.accent,padding:"4px 12px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}} onClick={()=>setEdits({...edits,[s.k]:(edits[s.k]||0)+1})}>修正依頼</button>}
          </div>))}
        </div>)}
      </div>)}
      {tab==="docs"&&(<div><h2 style={{fontSize:22,fontWeight:800,color:C.primary,marginBottom:24}}>{Ico.filePage(C.primary,22)} 必要書類チェックリスト</h2><div style={{background:"#fff",borderRadius:16,padding:28,border:"1px solid #E8EAED"}}>
        {[{n:"損益計算書（直近2期分）",r:true,tip:"製造原価報告書含む"},{n:"貸借対照表（直近2期分）",r:true},{n:"事業計画書（その1・その2）",r:true,tip:"当システムで自動生成"},{n:"事業計画書（その3）指定様式",r:true},{n:"1人当たり給与支給総額確認書",r:true},{n:"履歴事項全部証明書",r:true,tip:"3ヶ月以内"},{n:"納税証明書（その2）3期分",r:true},{n:"法人事業概況説明書",r:true},{n:"役員名簿",r:true},{n:"株主名簿",r:true},{n:"見積書（相見積もり）",r:true,tip:"50万以上は2者以上"},{n:"金融機関確認書",r:false,tip:"借入がある場合のみ"}].map((d,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:"1px solid #F3F4F6"}}><input type="checkbox" style={{accentColor:C.accent,width:18,height:18}}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{d.n}</div>{d.tip&&<div style={{fontSize:11,color:C.textLight}}>{d.tip}</div>}</div>{d.r&&<span style={{fontSize:10,fontWeight:700,color:C.danger,background:"rgba(239,68,68,0.08)",padding:"2px 8px",borderRadius:6}}>必須</span>}</div>))}
      </div></div>)}
      {tab==="performance"&&(<div><h2 style={{fontSize:22,fontWeight:800,color:C.primary,marginBottom:24}}>実績報告サポート</h2>
        <div style={{background:"#fff",borderRadius:16,padding:28,border:"1px solid #E8EAED"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
            {[{t:"証憑書類管理",d:"領収書・請求書をカテゴリ別に整理"},{t:"経費配分チェック",d:"補助対象経費の配分を自動検証"},{t:"実績報告書作成",d:"テンプレートに基づき自動作成"},{t:"効果報告ガイド",d:"毎年4月の効果報告をサポート"}].map((it,i)=>(<div key={i} style={{padding:20,background:"#F8F9FA",borderRadius:12,border:"1px solid #E8EAED"}}><h4 style={{fontSize:14,fontWeight:700,color:C.primary,marginBottom:4}}>{it.t}</h4><p style={{fontSize:12,color:C.textLight,margin:0}}>{it.d}</p></div>))}
          </div>
          <div style={{background:"rgba(232,150,62,0.06)",borderRadius:12,padding:20,border:"1px solid rgba(232,150,62,0.15)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>{Ico.mic(C.accent,18)}<span style={{fontSize:14,fontWeight:700,color:C.primary}}>音声入力で実績報告</span></div>
            <p style={{fontSize:13,color:C.textLight,margin:0}}>証憑の説明や実績報告の入力も音声で行えます。マイクボタンを押して話すだけ。</p>
          </div>
        </div>
      </div>)}
    </div>
  </div></div>);}

// ==================== ADMIN ====================
function AdminPage(){const [users]=useState([{id:1,company:"サンプル製造株式会社",email:"tanaka@sample.co.jp",st:"pending",date:"2026-02-28",perf:false},{id:2,company:"テスト商事合同会社",email:"suzuki@test.co.jp",st:"approved",date:"2026-02-25",perf:false},{id:3,company:"デモサービス株式会社",email:"sato@demo.co.jp",st:"approved",date:"2026-02-20",perf:true}]);
  return(<div style={{minHeight:"100vh",background:C.bg,paddingTop:64}}><div style={{maxWidth:1000,margin:"0 auto",padding:32}}>
    <h1 style={{fontSize:26,fontWeight:800,color:C.primary,marginBottom:8,display:"flex",alignItems:"center",gap:10}}>{Ico.settings(C.primary,24)} 管理者ダッシュボード</h1>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginTop:24,marginBottom:32}}>{[{l:"登録ユーザー",v:"3",c:C.primary},{l:"承認待ち",v:"1",c:C.accent},{l:"申請完了",v:"1",c:C.success},{l:"実績報告中",v:"1",c:"#8B5CF6"}].map((s,i)=>(<div key={i} style={{background:"#fff",borderRadius:14,padding:20,border:"1px solid #E8EAED",textAlign:"center"}}><div style={{fontSize:28,fontWeight:900,color:s.c}}>{s.v}</div><div style={{fontSize:12,color:C.textLight}}>{s.l}</div></div>))}</div>
    <div style={{background:"#fff",borderRadius:16,border:"1px solid #E8EAED",overflow:"hidden"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{background:"#F8F9FA"}}>{["会社名","メール","登録日","ステータス","実績報告","操作"].map((h,i)=>(<th key={i} style={{padding:"12px 16px",fontSize:12,fontWeight:700,color:C.textLight,textAlign:"left"}}>{h}</th>))}</tr></thead><tbody>{users.map(u=>(<tr key={u.id} style={{borderTop:"1px solid #F3F4F6"}}><td style={{padding:"12px 16px",fontSize:13,fontWeight:700,color:C.primary}}>{u.company}</td><td style={{padding:"12px 16px",fontSize:13,color:C.textLight}}>{u.email}</td><td style={{padding:"12px 16px",fontSize:13,color:C.textLight}}>{u.date}</td><td style={{padding:"12px 16px"}}><span style={{padding:"3px 10px",borderRadius:8,fontSize:11,fontWeight:700,background:u.st==="approved"?"rgba(34,197,94,0.08)":"rgba(234,179,8,0.08)",color:u.st==="approved"?"#059669":"#B45309"}}>{u.st==="approved"?"承認済":"承認待ち"}</span></td><td style={{padding:"12px 16px"}}><span style={{padding:"3px 10px",borderRadius:8,fontSize:11,fontWeight:700,background:u.perf?"rgba(139,92,246,0.08)":"rgba(0,0,0,0.03)",color:u.perf?"#7C3AED":"#9CA3AF"}}>{u.perf?"有効":"未開放"}</span></td><td style={{padding:"12px 16px"}}><div style={{display:"flex",gap:6}}>{u.st==="pending"&&<button style={{background:C.success,color:"#fff",border:"none",padding:"4px 12px",borderRadius:6,fontSize:11,fontWeight:700,cursor:"pointer"}}>承認</button>}{!u.perf&&u.st==="approved"&&<button style={{background:"#8B5CF6",color:"#fff",border:"none",padding:"4px 12px",borderRadius:6,fontSize:11,fontWeight:700,cursor:"pointer"}}>実績報告開放</button>}</div></td></tr>))}</tbody></table></div>
  </div></div>);}

// ==================== LANDING + APP ====================

// ==================== 導入事例データ（20件・運送業中心） ====================
const CASES=[
{id:1,company:"丸和急配株式会社",area:"埼玉県",emp:48,industry:"一般貨物運送",
 headline:"配車AIで燃料費32%削減、ドライバー残業ゼロを達成",
 tag:"AI配車最適化",subsidy:3200,cost:4800,
 summary:"ベテラン配車マンの勘に頼っていた配車業務をAIが自動化。120台の車両配置を5分で最適化し、空車率を大幅削減。",
 challenge:"配車担当者2名が毎朝4時から手作業で120台分の配車計画を作成。属人化により休日対応が困難で、空車率28%、燃料費の高騰が経営を圧迫。",
 system:{name:"AI配車・ルート最適化エンジン",features:["リアルタイム交通データ連携","天候・渋滞予測AI","ドライバースキル自動マッチング","荷量予測による事前配車","GPSトラッキング連携","CO2排出量自動計算","ダッシュボード（KPI可視化）"],tech:"Python/TensorFlow・Google Maps API・AWS"},
 results:[{metric:"燃料費",before:"月額820万円",after:"月額557万円",change:"-32%"},{metric:"空車率",before:"28%",after:"8.5%",change:"-69%"},{metric:"配車作業時間",before:"3時間/日",after:"15分/日",change:"-92%"},{metric:"ドライバー残業",before:"月平均42h",after:"月平均0h",change:"-100%"},{metric:"CO2排出量",before:"月48t",after:"月33t",change:"-31%"}],
 testimonial:"配車AIの導入で、ベテランが引退しても配車品質が落ちない体制ができた。若手でも即戦力になれる。",person:"代表取締役 丸山和彦",roi:285,payback:7},
{id:2,company:"城南ロジスティクス株式会社",area:"東京都",emp:92,industry:"3PL物流",
 headline:"倉庫在庫AIで欠品率87%改善、出荷リードタイム半減",
 tag:"AI在庫最適化",subsidy:5200,cost:7800,
 summary:"EC急成長で在庫管理が破綻寸前だった物流倉庫に、AI需要予測＋自動発注システムを導入。欠品による機会損失を激減。",
 challenge:"EC荷主15社の在庫を管理する3PL倉庫。SKU数12,000超で在庫精度は82%、欠品による出荷遅延が月300件以上発生。人手による棚卸しに月5日を要していた。",
 system:{name:"AI倉庫在庫管理・需要予測システム",features:["SKU別需要予測AI","自動発注アラート","ロケーション最適化","バーコード/QR連携","ABC分析自動化","賞味期限管理","リアルタイムダッシュボード","荷主別レポート自動生成"],tech:"Python/Prophet・React・PostgreSQL・AWS Lambda"},
 results:[{metric:"欠品率",before:"月300件",after:"月38件",change:"-87%"},{metric:"在庫精度",before:"82%",after:"99.2%",change:"+21%"},{metric:"出荷リードタイム",before:"4時間",after:"1.8時間",change:"-55%"},{metric:"棚卸し工数",before:"5日/月",after:"0.5日/月",change:"-90%"},{metric:"過剰在庫金額",before:"2,400万円",after:"960万円",change:"-60%"}],
 testimonial:"在庫の見える化で荷主への提案力が格段に上がり、新規荷主3社を獲得できた。",person:"物流部長 城田健一",roi:320,payback:8},
{id:3,company:"北関東運輸株式会社",area:"群馬県",emp:35,industry:"冷凍冷蔵輸送",
 headline:"AI点呼システムで違反ゼロ＆点呼業務95%自動化",
 tag:"AI点呼・安全管理",subsidy:2000,cost:3000,
 summary:"運行管理者の負担だった点呼業務をAI顔認証＋アルコール検知連携で完全自動化。24時間対応の無人点呼を実現。",
 challenge:"早朝3時～深夜23時まで点呼が必要な冷凍輸送業。運行管理者2名では対応しきれず、点呼漏れによる行政指導を2回受けていた。",
 system:{name:"AI遠隔点呼・健康管理システム",features:["顔認証による本人確認","アルコール検知器連携","血圧・体温自動記録","AI疲労度判定","自動記録・保存","異常時アラート通知","月次レポート自動生成"],tech:"Python/OpenCV・React Native・Firebase"},
 results:[{metric:"点呼漏れ",before:"月12件",after:"0件",change:"-100%"},{metric:"運行管理者負担",before:"6時間/日",after:"20分/日",change:"-94%"},{metric:"行政指導",before:"年2回",after:"0回",change:"-100%"},{metric:"健康起因事故",before:"年2件",after:"0件",change:"-100%"},{metric:"点呼対応時間帯",before:"5-22時",after:"24時間",change:"完全対応"}],
 testimonial:"深夜早朝の点呼が自動化され、管理者が睡眠を確保できるようになった。離職防止にも大きく貢献。",person:"運行管理者 北田真一",roi:240,payback:6},
{id:4,company:"湘南配送サービス株式会社",area:"神奈川県",emp:28,industry:"宅配・ラストワンマイル",
 headline:"AIルート最適化で配達完了率98.5%、再配達45%減",
 tag:"AIラストワンマイル",subsidy:1800,cost:2800,
 summary:"宅配ドライバーの経験頼みだったルート組みをAIが最適化。時間指定精度が劇的に向上し再配達が激減。",
 challenge:"1日平均180件の宅配。時間指定の増加でルート組みが複雑化し、配達完了率は85%にとどまり、再配達コストが月額180万円に膨らんでいた。",
 system:{name:"AIラストワンマイル配達最適化",features:["時間指定考慮ルート最適化","不在予測AI","リアルタイムルート変更","配達順序自動決定","ドライバーアプリ","顧客通知連携","配達実績分析"],tech:"Python/OR-Tools・Flutter・Google Maps API"},
 results:[{metric:"配達完了率",before:"85%",after:"98.5%",change:"+16%"},{metric:"再配達率",before:"22%",after:"12%",change:"-45%"},{metric:"1日配達件数",before:"180件",after:"215件",change:"+19%"},{metric:"燃料費",before:"月165万円",after:"月118万円",change:"-28%"},{metric:"顧客クレーム",before:"月25件",after:"月3件",change:"-88%"}],
 testimonial:"新人ドライバーでもベテラン並みの配達効率が出せるようになり、採用の幅が広がった。",person:"配送センター長 湘田達也",roi:310,payback:5},
{id:5,company:"東海ロジテック株式会社",area:"愛知県",emp:156,industry:"自動車部品輸送",
 headline:"AI帳票OCRで請求書処理90%自動化、月末残業ゼロに",
 tag:"AI-OCR帳票自動化",subsidy:6500,cost:9800,
 summary:"取引先200社の請求書・納品書を手入力していた経理業務をAI-OCRが自動化。月末の地獄的残業から解放された。",
 challenge:"月間8,000枚以上の帳票を経理担当3名で処理。月末は毎日22時まで残業が常態化。入力ミスによる差額調整が月平均15件発生。",
 system:{name:"AI-OCR帳票自動読取・仕訳システム",features:["マルチフォーマット対応OCR","AI自動仕訳","会計ソフト連携","電子帳簿保存法対応","承認ワークフロー","差額自動検出","月次レポート自動生成","API連携"],tech:"Python/Tesseract+独自AIモデル・React・freee API連携"},
 results:[{metric:"処理時間",before:"120時間/月",after:"12時間/月",change:"-90%"},{metric:"入力ミス",before:"月15件",after:"月0.5件",change:"-97%"},{metric:"月末残業",before:"日均4時間",after:"0時間",change:"-100%"},{metric:"処理速度",before:"1枚3分",after:"1枚5秒",change:"-97%"},{metric:"経理担当",before:"3名専任",after:"1名兼任",change:"-67%"}],
 testimonial:"月末が普通の日になった。経理のスタッフが他の戦略業務に時間を使えるようになったのが最大の成果。",person:"経理部長 東海林美咲",roi:380,payback:9},
{id:6,company:"九州急送株式会社",area:"福岡県",emp:72,industry:"長距離幹線輸送",
 headline:"AI運行管理で事故率78%減、保険料年間420万円削減",
 tag:"AI安全運転管理",subsidy:3800,cost:5600,
 summary:"デジタコ＋ドラレコデータをAIが分析し、危険運転の予兆を検知。事故を未然に防ぐ安全管理システム。",
 challenge:"長距離ドライバー45名の安全管理。年間事故12件、ヒヤリハット報告は形骸化。保険料の高騰で利益率が低下していた。",
 system:{name:"AI安全運転分析・予兆検知システム",features:["デジタコデータAI分析","急ブレーキ/急ハンドル検知","疲労度予測AI","個別安全スコアリング","リアルタイムアラート","安全教育コンテンツ自動生成","保険会社連携レポート"],tech:"Python/scikit-learn・React・AWS IoT"},
 results:[{metric:"事故件数",before:"年12件",after:"年2.6件",change:"-78%"},{metric:"保険料",before:"年1,800万円",after:"年1,380万円",change:"-23%"},{metric:"燃費",before:"3.2km/L",after:"3.8km/L",change:"+19%"},{metric:"ヒヤリハット報告",before:"月5件",after:"月28件",change:"+460%"},{metric:"ドライバー定着率",before:"65%",after:"88%",change:"+35%"}],
 testimonial:"事故が減っただけでなく、ドライバーの安全意識が目に見えて変わった。スコアリングがゲーム感覚で好評。",person:"安全管理室長 九条隆司",roi:260,payback:8},
{id:7,company:"大阪港運株式会社",area:"大阪府",emp:68,industry:"港湾運送・コンテナ輸送",
 headline:"AI動態管理でコンテナ滞留40%削減、港湾効率1.5倍",
 tag:"AIコンテナ管理",subsidy:4200,cost:6400,
 summary:"港湾でのコンテナ荷役スケジュールをAIが最適化。待機時間の大幅削減でターンアラウンドタイムを短縮。",
 challenge:"1日200本のコンテナを扱う港湾作業。船舶の遅延や通関待ちで滞留が常態化し、ヤード使用率は常に95%超。荷主からの納期クレームが月20件。",
 system:{name:"AIコンテナ動態管理・最適配置システム",features:["船舶到着予測AI","通関所要時間予測","ヤード配置最適化","シャーシ手配自動化","荷主別トラッキング","リアルタイムヤードマップ","NACCS連携"],tech:"Python/PyTorch・React・AWS・NACCS API"},
 results:[{metric:"コンテナ滞留時間",before:"平均38時間",after:"平均22時間",change:"-42%"},{metric:"ヤード回転率",before:"1.2回/日",after:"1.8回/日",change:"+50%"},{metric:"待機時間",before:"平均95分",after:"平均35分",change:"-63%"},{metric:"納期クレーム",before:"月20件",after:"月4件",change:"-80%"},{metric:"追加作業員コスト",before:"月280万円",after:"月120万円",change:"-57%"}],
 testimonial:"港湾作業は天候と船の遅延で読めないのが常識だったが、AIの予測精度に驚いている。荷主の信頼が格段に上がった。",person:"港湾事業部長 大原正人",roi:290,payback:10},
{id:8,company:"信越運送株式会社",area:"長野県",emp:22,industry:"農産物輸送",
 headline:"AI温度管理で品質クレーム95%減、高付加価値輸送を実現",
 tag:"AI温度・品質管理",subsidy:1200,cost:1800,
 summary:"農産物の鮮度管理にIoTセンサー＋AIを導入。リアルタイム温度監視と異常予測で品質事故をほぼゼロに。",
 challenge:"信州産の果物・野菜を首都圏に輸送。温度管理の失敗で月平均8件の品質クレーム。損害賠償と取引停止のリスクを抱えていた。",
 system:{name:"AI温度・鮮度リアルタイム管理システム",features:["IoT温湿度センサー","異常予測アラート","冷凍機自動制御連携","品質証明書自動発行","トレーサビリティ","荷主リアルタイム共有","季節別最適温度AI学習"],tech:"Raspberry Pi・Python・AWS IoT Core・React"},
 results:[{metric:"品質クレーム",before:"月8件",after:"月0.4件",change:"-95%"},{metric:"廃棄ロス",before:"月35万円",after:"月5万円",change:"-86%"},{metric:"高付加価値案件",before:"0件",after:"月12件",change:"新規獲得"},{metric:"損害賠償",before:"年240万円",after:"年12万円",change:"-95%"},{metric:"荷主満足度",before:"62点",after:"94点",change:"+52%"}],
 testimonial:"温度管理の見える化で『信越さんなら安心』と言われるようになった。高単価のワイン輸送も受注できるように。",person:"代表取締役 信田幸夫",roi:420,payback:4},
{id:9,company:"北陸ドライバーズ協同組合",area:"石川県",emp:180,industry:"協同組合（求貨求車）",
 headline:"AIマッチングで空車率58%削減、組合員の売上平均22%増",
 tag:"AI求貨求車マッチング",subsidy:8000,cost:12000,
 summary:"組合員85社の車両と荷物をAIがリアルタイムマッチング。帰り荷確保率が飛躍的に向上し、組合員の収益力が激増。",
 challenge:"組合員85社・車両320台の求貨求車を電話・FAXで管理。マッチング精度は低く、空車率42%。帰り荷が見つからず片道輸送が常態化。",
 system:{name:"AI求貨求車マッチングプラットフォーム",features:["車両位置リアルタイム把握","荷物・車両AIマッチング","運賃自動見積","帰り荷レコメンド","組合員専用アプリ","実績データ分析","請求自動化"],tech:"Python/機械学習・React Native・Firebase・Google Maps"},
 results:[{metric:"空車率",before:"42%",after:"17.6%",change:"-58%"},{metric:"組合員売上",before:"平均月380万円",after:"平均月464万円",change:"+22%"},{metric:"帰り荷確保率",before:"35%",after:"72%",change:"+106%"},{metric:"マッチング時間",before:"平均45分",after:"平均3分",change:"-93%"},{metric:"電話対応",before:"日200件",after:"日30件",change:"-85%"}],
 testimonial:"FAXと電話の時代が終わった。若い組合員が増えてきたのは、このシステムのおかげ。",person:"理事長 北村孝雄",roi:350,payback:11},
{id:10,company:"札幌デリバリー株式会社",area:"北海道",emp:42,industry:"食品配送",
 headline:"AI需要予測で食品ロス62%削減、配送効率35%向上",
 tag:"AI需要予測・配送最適化",subsidy:2800,cost:4200,
 summary:"スーパー・コンビニ向け食品配送の需要をAIが予測。最適な配送量とルートを同時に算出し、ロスと走行距離を同時削減。",
 challenge:"道内150店舗への食品配送。需要予測の精度が低く、過剰配送による返品ロスが月額380万円。冬季は道路状況の変化で遅配も頻発。",
 system:{name:"AI食品需要予測＋配送最適化統合システム",features:["店舗別需要予測AI","天候・イベント補正","返品予測・抑制","冬季道路状況AI判定","配送量最適化","店舗発注支援","ロス分析ダッシュボード"],tech:"Python/LightGBM・React・PostgreSQL・気象データAPI"},
 results:[{metric:"食品ロス",before:"月380万円",after:"月144万円",change:"-62%"},{metric:"配送効率",before:"件/km比0.8",after:"件/km比1.08",change:"+35%"},{metric:"需要予測精度",before:"68%",after:"91%",change:"+34%"},{metric:"遅配率",before:"8.5%",after:"2.1%",change:"-75%"},{metric:"CO2削減",before:"−",after:"月12t削減",change:"新規効果"}],
 testimonial:"冬の北海道でこの精度は正直すごい。返品が減って取引先との関係も改善した。",person:"配送企画部 札田直樹",roi:300,payback:7},
{id:11,company:"広島急便株式会社",area:"広島県",emp:55,industry:"引越し・生活物流",
 headline:"AI見積もりで成約率2.3倍、訪問見積もりの75%をオンライン化",
 tag:"AI引越し見積もり",subsidy:3000,cost:4500,
 summary:"引越し見積もりにAI画像認識を導入。スマホで部屋を撮影するだけで荷物量を自動算出し、即座に見積もりを提示。",
 challenge:"訪問見積もりに1件平均90分。繁忙期は見積もり対応だけで手一杯になり、機会損失が月100件以上。見積もり精度のばらつきも課題。",
 system:{name:"AI画像認識引越し自動見積もりシステム",features:["部屋撮影→荷物量AI算出","トラックサイズ自動提案","作業員数自動算出","オンライン見積もり","繁忙期価格AI最適化","顧客LINE連携","CRM統合"],tech:"Python/YOLOv8・React・LINE API・Firebase"},
 results:[{metric:"成約率",before:"18%",after:"41%",change:"+128%"},{metric:"訪問見積もり",before:"月280件",after:"月70件",change:"-75%"},{metric:"見積もり所要時間",before:"90分/件",after:"5分/件",change:"-94%"},{metric:"売上",before:"月2,800万円",after:"月4,200万円",change:"+50%"},{metric:"顧客満足度",before:"72点",after:"91点",change:"+26%"}],
 testimonial:"若い世代は訪問見積もりを嫌がる。オンライン完結にしたら一気に問い合わせが増えた。",person:"営業部長 広瀬健太",roi:380,payback:6},
{id:12,company:"東北冷蔵運輸株式会社",area:"宮城県",emp:38,industry:"冷凍食品物流",
 headline:"AIシフト自動作成で管理工数85%削減、人件費15%最適化",
 tag:"AIシフト・労務管理",subsidy:2200,cost:3200,
 summary:"24時間稼働の冷凍倉庫のシフト管理をAIが自動化。法令遵守しながら最適人員配置を実現。",
 challenge:"24時間365日稼働の冷凍倉庫。120名のシフト作成に管理者が毎月40時間を費やし、法令違反リスクと人手の偏りが常態化。",
 system:{name:"AI自動シフト・労務最適化システム",features:["法令自動チェック","スキルマッチング","希望休考慮AI","繁忙期自動増員","勤怠連携","残業予測アラート","人件費シミュレーション"],tech:"Python/制約最適化・React・freee人事連携"},
 results:[{metric:"シフト作成時間",before:"40時間/月",after:"6時間/月",change:"-85%"},{metric:"法令違反リスク",before:"月平均5件",after:"0件",change:"-100%"},{metric:"人件費",before:"月2,400万円",after:"月2,040万円",change:"-15%"},{metric:"従業員満足度",before:"55点",after:"82点",change:"+49%"},{metric:"欠勤率",before:"4.8%",after:"2.1%",change:"-56%"}],
 testimonial:"スタッフの希望を反映しつつ法令も守る。人の手では不可能だったバランスをAIが実現してくれた。",person:"倉庫管理部長 東條裕子",roi:280,payback:5},
{id:13,company:"四国運輸株式会社",area:"香川県",emp:65,industry:"一般貨物運送",
 headline:"AI車両メンテナンス予測で突発故障82%減、稼働率98%達成",
 tag:"AI予知保全",subsidy:3600,cost:5400,
 summary:"車両センサーデータをAIが常時分析し、故障の予兆を検知。計画的なメンテナンスで突発的な車両停止をほぼゼロに。",
 challenge:"保有車両85台の老朽化が進行。突発故障が月平均6件発生し、代替車両手配コストと配送遅延で月額200万円以上の損失。",
 system:{name:"AI車両予知保全・メンテナンス最適化システム",features:["OBDデータリアルタイム収集","故障予測AI","部品交換時期最適化","整備記録自動管理","車両別コスト分析","整備工場連携","車両更新計画支援"],tech:"Python/LSTM・IoTゲートウェイ・React・AWS"},
 results:[{metric:"突発故障",before:"月6件",after:"月1.1件",change:"-82%"},{metric:"車両稼働率",before:"88%",after:"98%",change:"+11%"},{metric:"整備コスト",before:"月350万円",after:"月240万円",change:"-31%"},{metric:"配送遅延",before:"月15件",after:"月2件",change:"-87%"},{metric:"車両寿命",before:"平均12年",after:"推定15年+",change:"+25%"}],
 testimonial:"壊れてから直すのではなく、壊れる前にわかる。この違いは運送業にとって革命的。",person:"車両管理部 四條武志",roi:310,payback:8},
{id:14,company:"千葉ポートサービス株式会社",area:"千葉県",emp:44,industry:"港湾荷役・倉庫",
 headline:"AI画像検品で検品精度99.7%、検品工数70%削減",
 tag:"AI画像検品",subsidy:2600,cost:3900,
 summary:"輸入貨物の外装検品にAIカメラを導入。破損・汚損の見逃しがほぼゼロになり、荷主からの信頼が飛躍的に向上。",
 challenge:"1日500個以上の貨物を目視検品。疲労による見逃しが月20件発生し、荷主への損害賠償が年間480万円。繁忙期は検品が追いつかず出荷遅延。",
 system:{name:"AI画像検品・貨物品質管理システム",features:["高解像度カメラ自動撮影","破損・汚損AI判定","記録自動保存","荷主別品質レポート","過去データ学習","スマホ検品対応","API連携"],tech:"Python/YOLOv8・React・AWS S3/Rekognition"},
 results:[{metric:"検品精度",before:"94%",after:"99.7%",change:"+6%"},{metric:"検品工数",before:"8人×8時間",after:"2人×8時間+AI",change:"-70%"},{metric:"見逃し",before:"月20件",after:"月0.8件",change:"-96%"},{metric:"損害賠償",before:"年480万円",after:"年18万円",change:"-96%"},{metric:"処理速度",before:"1個45秒",after:"1個8秒",change:"-82%"}],
 testimonial:"AIの目は疲れない。人間が8時間集中するのは不可能だが、AIなら24時間同じ精度で検品できる。",person:"品質管理課長 千田恵介",roi:350,payback:6},
{id:15,company:"名古屋エクスプレス株式会社",area:"愛知県",emp:110,industry:"自動車部品JIT輸送",
 headline:"AI生産連動で納品遅延ゼロ、JIT輸送の精度を極限まで向上",
 tag:"AI生産連動JIT",subsidy:6000,cost:9000,
 summary:"自動車メーカーの生産ラインと連動するAIシステムで、部品のJIT配送精度を飛躍的に向上。ライン停止リスクをゼロに。",
 challenge:"トヨタ系列の部品JIT輸送。1分の遅延がライン停止につながる超高精度配送が求められるが、渋滞・事故で月平均3件の遅延が発生。",
 system:{name:"AI生産連動JIT配送最適化システム",features:["生産計画データ連携","リアルタイム渋滞予測","代替ルート自動切替","到着時刻精密予測","緊急時自動エスカレーション","複数拠点在庫同期","KPIダッシュボード"],tech:"Python/強化学習・React・AWS・EDI連携"},
 results:[{metric:"納品遅延",before:"月3件",after:"0件",change:"-100%"},{metric:"到着精度(±5分以内)",before:"82%",after:"99.4%",change:"+21%"},{metric:"緊急便手配",before:"月8件",after:"月0.5件",change:"-94%"},{metric:"ペナルティ費用",before:"年1,200万円",after:"年0円",change:"-100%"},{metric:"取引継続評価",before:"B評価",after:"S評価",change:"最高評価"}],
 testimonial:"JIT輸送に『絶対』はないと思っていたが、AIが限りなくそれに近づけてくれた。メーカーからS評価をもらえたのは創業以来初。",person:"代表取締役 名倉正樹",roi:290,payback:9},
{id:16,company:"福岡グリーン物流株式会社",area:"福岡県",emp:30,industry:"環境配慮型物流",
 headline:"AIエコ運転でCO2排出28%削減、環境認証取得で新規受注3倍",
 tag:"AI脱炭素物流",subsidy:1600,cost:2400,
 summary:"CO2排出量をリアルタイムでAI計測・最適化。環境意識の高い荷主からの受注が急増し、新たな収益の柱に。",
 challenge:"環境対応を求める荷主が増加も、CO2排出量の定量化ができず商機を逸していた。エコドライブも掛け声だけで実効性がなかった。",
 system:{name:"AI脱炭素物流管理・エコドライブシステム",features:["CO2リアルタイム計測","配送別排出量算出","エコドライブスコアリング","荷主別環境レポート","Scope3対応","環境認証取得支援","カーボンオフセット連携"],tech:"Python・React・AWS IoT・環境省APIデータ"},
 results:[{metric:"CO2排出量",before:"月32t",after:"月23t",change:"-28%"},{metric:"環境対応受注",before:"0件",after:"月15件",change:"新規獲得"},{metric:"燃料費",before:"月380万円",after:"月295万円",change:"-22%"},{metric:"環境認証",before:"なし",after:"グリーン経営認証",change:"取得"},{metric:"売上",before:"月1,800万円",after:"月2,700万円",change:"+50%"}],
 testimonial:"環境対応は『コスト』だと思っていたが、AIのおかげで『利益の源泉』に変わった。",person:"代表取締役 福田翠",roi:420,payback:4},
{id:17,company:"新潟米穀運送株式会社",area:"新潟県",emp:18,industry:"農産物・米穀輸送",
 headline:"AI受発注で電話注文95%削減、事務員1名で3倍の取引を処理",
 tag:"AI受発注自動化",subsidy:800,cost:1200,
 summary:"農協・卸売業者からのFAX/電話注文をAIが自動受付・処理。小規模ながら3倍の取引量を同じ人員で回せるように。",
 challenge:"FAXと電話で受ける注文を事務員2名が手入力。繁忙期の秋は処理が追いつかず、受注ミス月10件、機会損失も深刻だった。",
 system:{name:"AI受発注自動化・業務効率化システム",features:["FAX-OCR自動読取","音声注文AI受付","受注自動登録","配車自動連携","請求自動発行","取引先ポータル","季節需要予測"],tech:"Python/Whisper+OCR・React・LINE Works連携"},
 results:[{metric:"電話対応",before:"日60件",after:"日3件",change:"-95%"},{metric:"受注ミス",before:"月10件",after:"月0.3件",change:"-97%"},{metric:"処理可能取引数",before:"月200件",after:"月600件",change:"+200%"},{metric:"事務員",before:"2名専任",after:"1名兼任",change:"-50%"},{metric:"受注確認速度",before:"平均2時間",after:"平均5分",change:"-96%"}],
 testimonial:"18人の小さな会社でも、大手並みのシステムが入れられた。補助金のおかげで実質負担は微々たるもの。",person:"代表取締役 新田米蔵",roi:480,payback:3},
{id:18,company:"関西物流センター株式会社",area:"兵庫県",emp:85,industry:"3PL・流通加工",
 headline:"AI作業割当で庫内生産性45%向上、パート採用コスト60%削減",
 tag:"AI庫内作業最適化",subsidy:4800,cost:7200,
 summary:"倉庫内のピッキング・梱包・流通加工作業をAIが最適割当。作業者の得意分野とリアルタイム進捗を考慮した人員配置。",
 challenge:"パート従業員80名の作業割当をリーダー3名が毎日決定。スキル差が大きく生産性のばらつきが課題。繁忙期は人手不足で外注費が膨張。",
 system:{name:"AI庫内作業最適化・生産性管理システム",features:["作業者スキルDB","リアルタイム進捗管理","AI最適割当","バーコード作業実績収集","生産性ダッシュボード","繁忙期シミュレーション","外注判断支援AI"],tech:"Python/最適化アルゴリズム・React・ハンディ端末連携"},
 results:[{metric:"庫内生産性",before:"15件/人時",after:"21.8件/人時",change:"+45%"},{metric:"外注費",before:"月320万円",after:"月96万円",change:"-70%"},{metric:"パート定着率",before:"55%",after:"82%",change:"+49%"},{metric:"出荷ミス",before:"月18件",after:"月2件",change:"-89%"},{metric:"リーダー割当時間",before:"2時間/日",after:"15分/日",change:"-88%"}],
 testimonial:"パートさん一人ひとりの得意な作業をAIが把握して割り振るので、みんながイキイキ働けるようになった。",person:"センター長 関口明美",roi:340,payback:7},
{id:19,company:"沖縄離島物流株式会社",area:"沖縄県",emp:25,industry:"離島物流・海上輸送",
 headline:"AI船舶スケジュール連動で離島配送リードタイム38%短縮",
 tag:"AI離島物流最適化",subsidy:1400,cost:2100,
 summary:"離島への物資輸送をAIが最適化。船舶スケジュール・天候予測・在庫データを統合し、離島の物流課題を解決。",
 challenge:"15の離島への物資配送。船舶欠航で週平均2回の配送遅延。離島側の在庫切れと過剰在庫が同時に発生する矛盾した状況。",
 system:{name:"AI離島物流最適化・在庫連動システム",features:["船舶運航予測AI","天候ベース欠航予測","離島在庫リアルタイム管理","事前出荷AI判断","代替輸送手段提案","離島店舗発注支援","物資優先度AI判定"],tech:"Python/天候予測モデル・React・衛星通信連携"},
 results:[{metric:"配送リードタイム",before:"平均4.2日",after:"平均2.6日",change:"-38%"},{metric:"欠品率",before:"12%",after:"3.5%",change:"-71%"},{metric:"過剰在庫",before:"月180万円",after:"月72万円",change:"-60%"},{metric:"緊急チャーター",before:"月4回",after:"月0.5回",change:"-88%"},{metric:"離島住民満足度",before:"58点",after:"86点",change:"+48%"}],
 testimonial:"離島の暮らしを守るのが我々の使命。AIが天候を読んで事前に出荷してくれるので、台風シーズンでも物資が途切れなくなった。",person:"代表取締役 沖田守",roi:360,payback:5},
{id:20,company:"東京ビジネスデリバリー株式会社",area:"東京都",emp:120,industry:"企業間定期配送",
 headline:"AI全体最適で売上1.8倍・利益率12%→21%、DX経営への転換",
 tag:"AI統合経営プラットフォーム",subsidy:8000,cost:12000,
 summary:"配車・労務・経理・営業をAIで統合管理。データドリブン経営への転換で、売上・利益率ともに劇的向上。",
 challenge:"各部門がバラバラのシステムで運用。データが分断され経営判断にタイムラグ。属人化した業務が成長のボトルネックに。",
 system:{name:"AI統合経営ダッシュボード・業務自動化プラットフォーム",features:["全部門データ統合","AI経営分析ダッシュボード","配車AI連携","労務・シフトAI","AI売上予測","AI原価管理","異常検知アラート","経営レポート自動生成"],tech:"Python/全統合・React・PostgreSQL・AWS・各種API連携"},
 results:[{metric:"売上",before:"月8,000万円",after:"月1.44億円",change:"+80%"},{metric:"営業利益率",before:"12%",after:"21%",change:"+75%"},{metric:"管理業務工数",before:"月800時間",after:"月200時間",change:"-75%"},{metric:"意思決定速度",before:"月次",after:"リアルタイム",change:"即時化"},{metric:"従業員満足度",before:"62点",after:"85点",change:"+37%"}],
 testimonial:"AIは道具ではなく、経営パートナー。数字に基づいた判断ができるようになり、会社のステージが変わった。",person:"代表取締役CEO 東山誠",roi:400,payback:10}
];

// ==================== CASE STUDIES SECTION (TOP PAGE) ====================
function CasesSection({setPage,setCaseId}){
  const [filter,setFilter]=useState("all");const [hover,setHover]=useState(null);
  const tags=[...new Set(CASES.map(c=>c.tag))];
  const filtered=filter==="all"?CASES:CASES.filter(c=>c.tag===filter);
  return(<section style={{padding:"80px 24px",background:"#fff"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
    <div style={{textAlign:"center",marginBottom:20}}>
      <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(232,150,62,0.06)",padding:"4px 14px",borderRadius:20,marginBottom:12}}>{Ico.trophy(C.accent,16)}<span style={{fontSize:12,fontWeight:700,color:C.accent}}>補助金活用 導入事例</span></div>
      <h2 style={{fontSize:32,fontWeight:900,color:C.primary,marginBottom:8}}>たとえば、こんな成果が出ています</h2>
      <p style={{color:C.textLight,fontSize:15,maxWidth:650,margin:"0 auto"}}>運送・物流業界を中心に、AI導入で<strong style={{color:C.accent}}>売上アップ</strong>・<strong style={{color:C.success}}>コスト削減</strong>・<strong style={{color:"#8B5CF6"}}>生産性向上</strong>を実現した{CASES.length}社の実績</p>
    </div>
    {/* Filter tags */}
    <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:36}}>
      <button onClick={()=>setFilter("all")} style={{padding:"6px 16px",borderRadius:20,border:filter==="all"?`2px solid ${C.accent}`:"2px solid #E8EAED",background:filter==="all"?C.accent:"#fff",color:filter==="all"?"#fff":C.textLight,fontSize:12,fontWeight:700,cursor:"pointer"}}>全て ({CASES.length})</button>
      {tags.map(t=>{const cnt=CASES.filter(c=>c.tag===t).length;return(<button key={t} onClick={()=>setFilter(t)} style={{padding:"6px 16px",borderRadius:20,border:filter===t?`2px solid ${C.accent}`:"2px solid #E8EAED",background:filter===t?"rgba(232,150,62,0.08)":"#fff",color:filter===t?C.accent:C.textLight,fontSize:12,fontWeight:600,cursor:"pointer"}}>{t} ({cnt})</button>);})}
    </div>
    {/* Case grid */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:20}}>
      {filtered.map((c,idx)=>(<div key={c.id} onClick={()=>{setCaseId(c.id);setPage("case_detail");}} style={{background:hover===c.id?`linear-gradient(135deg,${C.gS},${C.gE})`:"#FAFBFC",borderRadius:18,padding:"24px 22px",border:hover===c.id?`1px solid ${C.accent}`:"1px solid #ECEDF0",cursor:"pointer",transition:"all .25s",transform:hover===c.id?"translateY(-4px)":"none",boxShadow:hover===c.id?"0 16px 48px rgba(15,43,70,0.12)":"0 2px 8px rgba(0,0,0,0.03)",animation:`fadeIn .4s ease ${idx*.03}s both`}} onMouseEnter={()=>setHover(c.id)} onMouseLeave={()=>setHover(null)}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <span style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:8,background:hover===c.id?"rgba(232,150,62,0.2)":"rgba(232,150,62,0.06)",color:C.accent}}>{c.tag}</span>
          <span style={{fontSize:11,color:hover===c.id?"rgba(255,255,255,0.5)":C.textLight}}>{c.area}</span>
        </div>
        <h3 style={{fontSize:15,fontWeight:800,color:hover===c.id?"#fff":C.primary,lineHeight:1.5,marginBottom:12,minHeight:45}}>{c.headline}</h3>
        <p style={{fontSize:12,color:hover===c.id?"rgba(255,255,255,0.65)":C.textLight,lineHeight:1.6,marginBottom:16,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{c.summary}</p>
        {/* Key metrics */}
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {c.results.slice(0,3).map((r,i)=>(<div key={i} style={{flex:1,padding:"8px 6px",borderRadius:8,background:hover===c.id?"rgba(255,255,255,0.08)":"#fff",textAlign:"center",border:hover===c.id?"1px solid rgba(255,255,255,0.1)":"1px solid #F3F4F6"}}>
            <div style={{fontSize:14,fontWeight:900,color:hover===c.id?((r.change||"").includes("-")?'#86EFAC':C.accentLight):((r.change||"").includes("-")?C.success:C.accent)}}>{r.change}</div>
            <div style={{fontSize:9,color:hover===c.id?"rgba(255,255,255,0.5)":C.textLight,marginTop:2}}>{r.metric}</div>
          </div>))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:12,borderTop:hover===c.id?"1px solid rgba(255,255,255,0.08)":"1px solid #F3F4F6"}}>
          <div style={{fontSize:12,fontWeight:700,color:hover===c.id?"rgba(255,255,255,0.8)":C.primary}}>{c.company}</div>
          <div style={{display:"flex",alignItems:"center",gap:4,fontSize:12,fontWeight:700,color:hover===c.id?C.accentLight:C.accent}}>
            詳細を見る {Ico.chevRight(hover===c.id?C.accentLight:C.accent,14)}
          </div>
        </div>
      </div>))}
    </div>
  </div></section>);
}

// ==================== CASE DETAIL LP PAGE ====================
function CaseDetailPage({caseId,setPage}){
  const c=CASES.find(x=>x.id===caseId);if(!c)return null;
  const res2=calcSub(c.emp,c.cost*10000,false,c.emp<=20,false);
  const maxChange=Math.max(...c.results.map(r=>Math.abs(parseFloat(r.change))||0));
  return(<div style={{minHeight:"100vh",background:C.bg}}><div style={{maxWidth:"100%",margin:"0 auto"}}>
    {/* HERO */}
    <div style={{background:`linear-gradient(135deg,${C.gS} 0%,${C.gE} 50%,#1A5A7E 100%)`,padding:"100px 24px 60px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:0.04,backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20h40M20 0v40' stroke='%23E8963E' stroke-width='0.3'/%3E%3C/svg%3E\")",backgroundSize:"40px 40px"}}/>
      <div style={{maxWidth:960,margin:"0 auto",position:"relative",zIndex:1}}>
        <button onClick={()=>setPage("lp")} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",padding:"6px 16px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",marginBottom:20,display:"flex",alignItems:"center",gap:6}}>← 事例一覧に戻る</button>
        <div style={{display:"flex",gap:10,marginBottom:16}}>
          <span style={{fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:8,background:"rgba(232,150,62,0.15)",color:C.accentLight}}>{c.tag}</span>
          <span style={{fontSize:11,fontWeight:600,padding:"4px 12px",borderRadius:8,background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.7)"}}>{c.area} ・ {c.industry} ・ 従業員{c.emp}名</span>
        </div>
        <h1 style={{color:"#fff",fontSize:"clamp(24px,4vw,40px)",fontWeight:900,lineHeight:1.35,marginBottom:20,maxWidth:800}}>{c.headline}</h1>
        <p style={{color:"rgba(255,255,255,0.75)",fontSize:16,lineHeight:1.7,maxWidth:700}}>{c.summary}</p>
        {/* Quick stat badges */}
        <div style={{display:"flex",gap:12,marginTop:28,flexWrap:"wrap"}}>
          {[{l:"補助金額",v:`${fmt(c.subsidy)}万円`,c:C.accentLight},{l:"ROI",v:`${c.roi}%`,c:"#86EFAC"},{l:"回収期間",v:`${c.payback}ヶ月`,c:"#C4B5FD"}].map((b,i)=>(<div key={i} style={{padding:"10px 20px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>{b.l}</div>
            <div style={{fontSize:22,fontWeight:900,color:b.c}}>{b.v}</div>
          </div>))}
        </div>
      </div>
    </div>

    <div style={{maxWidth:960,margin:"0 auto",padding:"40px 24px"}}>
    {/* ===== 成果グラフ ===== */}
    <div style={{background:"#fff",borderRadius:24,padding:"36px 32px",marginBottom:28,boxShadow:"0 4px 24px rgba(0,0,0,0.04)",border:"1px solid #E8EAED"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:24}}>{Ico.barChart(C.accent,22)}<h2 style={{fontSize:20,fontWeight:800,color:C.primary,margin:0}}>導入成果</h2></div>
      <div style={{display:"flex",flexDirection:"column",gap:20}}>
        {c.results.map((r,i)=>{const val=Math.abs(parseFloat(r.change))||50;const barW=Math.min((val/Math.max(maxChange,100))*100,100);const isDown=(r.change||"").includes("-");const barColor=isDown?`linear-gradient(90deg,${C.success},#34D399)`:(r.change||"").includes("+")?`linear-gradient(90deg,${C.accent},${C.accentLight})`:`linear-gradient(90deg,#8B5CF6,#A78BFA)`;
          return(<div key={i}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
              <span style={{fontSize:15,fontWeight:700,color:C.primary}}>{r.metric}</span>
              <div style={{display:"flex",alignItems:"baseline",gap:12}}>
                <span style={{fontSize:13,color:C.textLight,textDecoration:"line-through"}}>{r.before}</span>
                <span style={{fontSize:11,color:C.textLight}}>→</span>
                <span style={{fontSize:15,fontWeight:800,color:C.primary}}>{r.after}</span>
                <span style={{fontSize:18,fontWeight:900,color:isDown?C.success:C.accent,minWidth:70,textAlign:"right"}}>{r.change}</span>
              </div>
            </div>
            <div style={{height:12,borderRadius:6,background:"#F3F4F6",overflow:"hidden"}}>
              <div style={{height:"100%",borderRadius:6,background:barColor,width:`${barW}%`,transition:`width 1s ease ${i*.15}s`}}/>
            </div>
          </div>);
        })}
      </div>
    </div>

    {/* ===== 2 column: 課題 → システム ===== */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:28}}>
      {/* 課題 */}
      <div style={{background:"#fff",borderRadius:20,padding:"28px 24px",boxShadow:"0 4px 24px rgba(0,0,0,0.04)",border:"1px solid #E8EAED"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>{Ico.alertTri(C.danger,20)}<h3 style={{fontSize:16,fontWeight:800,color:C.primary,margin:0}}>導入前の課題</h3></div>
        <p style={{fontSize:14,color:C.text,lineHeight:1.8,margin:0,padding:"16px 20px",background:"rgba(239,68,68,0.03)",borderRadius:12,borderLeft:`4px solid ${C.danger}`}}>{c.challenge}</p>
      </div>
      {/* システム */}
      <div style={{background:"#fff",borderRadius:20,padding:"28px 24px",boxShadow:"0 4px 24px rgba(0,0,0,0.04)",border:"1px solid #E8EAED"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>{Ico.robot(C.accent,20)}<h3 style={{fontSize:16,fontWeight:800,color:C.primary,margin:0}}>開発したAIシステム</h3></div>
        <div style={{fontSize:16,fontWeight:800,color:C.primary,marginBottom:6}}>{c.system.name}</div>
        <div style={{fontSize:11,color:C.textLight,marginBottom:16,padding:"4px 10px",background:"#F3F4F6",borderRadius:6,display:"inline-block"}}>{c.system.tech}</div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {c.system.features.map((f,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0"}}>{Ico.check(C.success,14)}<span style={{fontSize:13,color:C.text}}>{f}</span></div>))}
        </div>
      </div>
    </div>

    {/* ===== 補助金情報 ===== */}
    <div style={{background:`linear-gradient(135deg,${C.gS},${C.gE})`,borderRadius:24,padding:"36px 32px",color:"#fff",marginBottom:28}}>
      <h3 style={{fontSize:18,fontWeight:800,marginBottom:24}}>補助金活用の内訳</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:16}}>
        {[{l:"開発費用",v:`${fmt(c.cost)}万円`},{l:"補助金額",v:`${fmt(c.subsidy)}万円`},{l:"自己負担",v:`${fmt(c.cost-c.subsidy)}万円`},{l:"補助率",v:`${Math.round(c.subsidy/c.cost*100)}%`}].map((m,i)=>(<div key={i} style={{background:"rgba(255,255,255,0.06)",borderRadius:14,padding:"16px 12px",textAlign:"center",border:"1px solid rgba(255,255,255,0.08)"}}>
          <div style={{fontSize:11,opacity:.6,marginBottom:4}}>{m.l}</div>
          <div style={{fontSize:24,fontWeight:900,color:i===1?C.accentLight:"#fff"}}>{m.v}</div>
        </div>))}
      </div>
      {/* bar */}
      <div style={{marginTop:24}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:6,opacity:.7}}><span>自己負担</span><span>補助金</span></div>
        <div style={{height:14,borderRadius:7,background:"rgba(255,255,255,0.1)",overflow:"hidden",display:"flex"}}>
          <div style={{height:"100%",background:`linear-gradient(90deg,#8B5CF6,#A78BFA)`,width:`${Math.round((c.cost-c.subsidy)/c.cost*100)}%`}}/>
          <div style={{height:"100%",background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,flex:1}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginTop:4,opacity:.5}}><span>{fmt(c.cost-c.subsidy)}万円</span><span>{fmt(c.subsidy)}万円</span></div>
      </div>
    </div>

    {/* ===== お客様の声 ===== */}
    <div style={{background:"#fff",borderRadius:20,padding:"32px 28px",marginBottom:28,boxShadow:"0 4px 24px rgba(0,0,0,0.04)",border:"1px solid #E8EAED"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>{Ico.msgCircle(C.accent,20)}<h3 style={{fontSize:16,fontWeight:800,color:C.primary,margin:0}}>お客様の声</h3></div>
      <blockquote style={{fontSize:16,color:C.text,lineHeight:1.8,margin:0,padding:"20px 24px",background:"rgba(232,150,62,0.04)",borderRadius:14,borderLeft:`4px solid ${C.accent}`,fontStyle:"italic"}}>「{c.testimonial}」</blockquote>
      <div style={{textAlign:"right",marginTop:12,fontSize:13,color:C.textLight,fontWeight:600}}>{c.company} {c.person}</div>
    </div>

    {/* CTA */}
    <div style={{background:`linear-gradient(135deg,${C.accent}15,${C.accentLight}20)`,borderRadius:20,padding:"40px 32px",textAlign:"center",border:`1px solid ${C.accent}30`}}>
      <h3 style={{fontSize:22,fontWeight:800,color:C.primary,marginBottom:8}}>同じような成果を、あなたの会社でも。</h3>
      <p style={{color:C.textLight,fontSize:14,marginBottom:24}}>省力化補助金を活用して、オーダーメイドAIシステムを導入しませんか？</p>
      <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
        <button onClick={()=>setPage("diagnosis")} style={{background:`linear-gradient(135deg,${C.accent},#D4802E)`,color:"#fff",border:"none",padding:"14px 36px",borderRadius:12,fontSize:15,fontWeight:800,cursor:"pointer",boxShadow:"0 8px 32px rgba(232,150,62,0.35)",display:"flex",alignItems:"center",gap:8}}>{Ico.sparkles("#fff",16)} 無料で申請診断する</button>
        <button onClick={()=>setPage("ai_analysis")} style={{background:"#fff",color:C.primary,border:`2px solid ${C.accent}`,padding:"14px 36px",borderRadius:12,fontSize:15,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>{Ico.analysis(C.primary,18)} AI製品分析を見る</button>
      </div>
    </div>
    </div>
  </div></div>);
}

function LandingPage({setPage,setCaseId}){return(<div><HeroSection setPage={setPage}/><SchedSection/><SubTable/><FeatSection/><CasesSection setPage={setPage} setCaseId={setCaseId}/>
  <section style={{background:`linear-gradient(135deg,${C.gS},${C.gE})`,padding:"80px 24px",textAlign:"center"}}><h2 style={{color:"#fff",fontSize:32,fontWeight:900,marginBottom:12}}>補助金申請、もっとカンタンに。</h2><p style={{color:"rgba(255,255,255,0.65)",fontSize:16,marginBottom:32}}>AI＋音声入力で対話型フルサポート。利用料わずか3万円。</p>
    <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}><button onClick={()=>setPage("diagnosis")} style={{background:`linear-gradient(135deg,${C.accent},#D4802E)`,color:"#fff",border:"none",padding:"16px 40px",borderRadius:12,fontSize:16,fontWeight:800,cursor:"pointer",boxShadow:"0 8px 32px rgba(232,150,62,0.4)",display:"inline-flex",alignItems:"center",gap:8}}>{Ico.sparkles("#fff",18)} 無料で申請診断する</button><button onClick={()=>setPage("register")} style={{background:"rgba(255,255,255,0.12)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",padding:"16px 40px",borderRadius:12,fontSize:16,fontWeight:700,cursor:"pointer"}}>会員登録して始める</button></div>
  </section>
  <footer style={{background:C.primary,padding:"40px 24px",textAlign:"center"}}><p style={{color:"rgba(255,255,255,0.35)",fontSize:12}}>© 2026 省力化補助金 AI申請サポート ｜ 中小企業省力化投資補助金（一般型）</p><p style={{color:"rgba(255,255,255,0.25)",fontSize:11,marginTop:8}}>お問い合わせ: 0570-099-660 ｜ 9:30-17:30（平日）</p></footer>
</div>);}

export default function App(){
  const [page,setPage]=useState("lp");const [user,setUser]=useState(null);const [caseId,setCaseId]=useState(null);
  const handleLogin=u=>{setUser(u);if(u.role==="admin")setPage("admin");else setPage("mypage");};
  const handleLogout=()=>{setUser(null);setPage("lp");};
  useEffect(()=>{window.scrollTo(0,0);},[page]);
  return(<div style={{fontFamily:"'Noto Sans JP','Hiragino Sans','Hiragino Kaku Gothic ProN',Meiryo,sans-serif",color:C.text}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700;800;900&display=swap');
      *{margin:0;padding:0;box-sizing:border-box;}body{background:${C.bg};}
      @keyframes fadeIn{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
      @keyframes scrollBtnIn{from{opacity:0;transform:translateY(20px) scale(.8);}to{opacity:1;transform:translateY(0) scale(1);}}
      @keyframes voicePulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.3);}50%{box-shadow:0 0 0 10px rgba(239,68,68,0);}}
      input:focus,textarea:focus{border-color:${C.accent}!important;box-shadow:0 0 0 3px rgba(232,150,62,0.1);}
      ::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:#D1D5DB;border-radius:3px;}
    `}</style>
    <Nav page={page} setPage={setPage} isLoggedIn={!!user} user={user} onLogout={handleLogout}/>
    <ScrollTop/>
    {page==="lp"&&<LandingPage setPage={setPage} setCaseId={setCaseId}/>}
    {page==="case_detail"&&<CaseDetailPage caseId={caseId} setPage={setPage}/>}
    {page==="diagnosis"&&<DiagPage setPage={setPage} onLogin={handleLogin}/>}
    {page==="estimate"&&<EstPage setPage={setPage}/>}
    {page==="ai_analysis"&&<AIAnalysis setPage={setPage} onRegister={handleLogin}/>}
    {page==="login"&&<AuthPage mode="login" setPage={setPage} onLogin={handleLogin}/>}
    {page==="register"&&<AuthPage mode="register" setPage={setPage} onLogin={handleLogin}/>}
    {page==="mypage"&&<MyPage user={user} setPage={setPage}/>}
    {page==="admin"&&<AdminPage/>}
  </div>);
}
