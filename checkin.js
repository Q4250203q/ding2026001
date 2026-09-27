#!/usr/bin/env node
/**
 * 彬的空间 · 打卡签到脚本
 * 由 GitHub Actions 定时运行（北京时间每天 08:30），
 * 自动向 checkins.json 追加当日打卡记录并提交到仓库。
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'checkins.json');

// 北京时间日期
function beijingNow() {
  return new Date(Date.now() + 8 * 3600 * 1000);
}
function fmtDate(d) {
  return d.toISOString().slice(0, 10);
}
function fmtTime(d) {
  return d.toISOString().slice(11, 16);
}

let data = { records: [] };
if (fs.existsSync(FILE)) {
  data = JSON.parse(fs.readFileSync(FILE, 'utf-8'));
  if (!Array.isArray(data.records)) data.records = [];
}

const now = beijingNow();
const date = fmtDate(now);

if (data.records.some(r => r.date === date)) {
  console.log(`今日（${date}）已自动打卡，跳过。`);
} else {
  data.records.push({ date, time: fmtTime(now), auto: true });
  data.records.sort((a, b) => a.date.localeCompare(b.date));
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`✅ 自动打卡成功：${date} ${fmtTime(now)}`);
  // 输出标记供工作流判断是否需要提交
  fs.writeFileSync(path.join(process.env.GITHUB_WORKSPACE || __dirname, '.checkin_changed'), '1');
}
