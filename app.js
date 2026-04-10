/* ============================================
   TEAM DASHBOARD — app.js
   팀 업무 현황 대시보드
   ============================================ */

// ────────── Storage ──────────
const STORE_KEY = 'team_dashboard_v2';
const COLORS = ['#64748b','#78716c','#6b7280','#71717a','#737373','#57534e','#525252','#44403c','#475569','#334155'];
const STATUSES = ['new','ready','ongoing','almostdone','done','hold'];
const STATUS_LABELS = { new:'New', ready:'Ready', ongoing:'Ongoing', almostdone:'Almost Done', done:'Done', hold:'Hold' };
const STATUS_COLORS = { new:'#7c3aed', ready:'#4338ca', ongoing:'#d97706', almostdone:'#2563eb', done:'#059669', hold:'#94a3b8' };
const SIZE_COLORS = { S:'#10b981', M:'#3b82f6', L:'#f59e0b', XL:'#ef4444' };
const SIZE_WEIGHTS = { S:1, M:3, L:5, XL:10 };
const REQUESTERS = ['commerce','content','O2O','offline','Team','Space AI','Life Event','Home'];
const REQUESTER_COLORS = {
  'commerce':'#92400e', 'content':'#9f1239', 'O2O':'#1e40af', 'offline':'#5b21b6',
  'Team':'#374151', 'Space AI':'#155e75', 'Life Event':'#115e59', 'Home':'#166534'
};

function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || null; }
  catch { return null; }
}
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(DATA)); }

function seedData() {
  const members = [
    { id: 'm_joe', name: 'Joe Jo', role: '', color: '#fb923c' },
    { id: 'm_dana', name: 'Dana Kim', role: '', color: '#a78bfa' },
    { id: 'm_leezen', name: 'Zen', role: '', color: '#38bdf8' },
    { id: 'm_ben', name: 'Ben Park', role: '', color: '#34d399' },
    { id: 'm_luka', name: 'Luka Jung', role: '', color: '#fbbf24' },
    { id: 'm_june', name: 'June Kim', role: '', color: '#f87171' },
    { id: 'm_sarah', name: 'Sarah Kim', role: '', color: '#818cf8' },
  ];

  const tasks = [
    // @New — 홈개편 소개 영상
    { id: 't22', title: '홈개편 소개 영상 제작', desc: 'w/ Ben, Dana ~4/13 / 스토리보드 PD공유 완 - 제작중', assignee: 'm_ben', status: 'ongoing', priority: 'high', size: 'L', due: '2026-04-13', requester: 'Home', createdAt: Date.now() },

    // Ben Park
    { id: 't23b', title: '카테고리 에셋 적용', desc: '', assignee: 'm_ben', status: 'done', priority: 'medium', size: 'L', due: '2026-04-03', requester: 'Home', createdAt: Date.now() },
    { id: 't28b', title: 'PNC AI프론티어 티셔츠 그래픽', desc: '', assignee: 'm_ben', status: 'done', priority: 'medium', size: 'XL', due: '2026-04-03', requester: 'commerce', createdAt: Date.now() },

    // Joe Jo
    { id: 't27j', title: '사장님센터 랜딩페이지 서비스 소개 영상', desc: '', assignee: 'm_joe', status: 'ready', priority: 'medium', size: 'L', due: '2026-04-10', requester: 'O2O', createdAt: Date.now() },

    // Luka Jung
    { id: 't29', title: '카테고리 아이콘 AI 활용 개편 및 블로그글 작성', desc: '초안작성 완', assignee: 'm_luka', status: 'ongoing', priority: 'medium', size: 'M', due: '2026-04-10', requester: 'Team', createdAt: Date.now() },
    { id: 't26l', title: '원하는날 도착 - 배송트럭 KV 제작', desc: '', assignee: 'm_luka', status: 'ready', priority: 'medium', size: 'L', due: '2026-04-23', requester: 'commerce', createdAt: Date.now() },
    { id: 't19l', title: '라이프 바인더', desc: '추후 퀄리티 검수 정도', assignee: 'm_luka', status: 'almostdone', priority: 'medium', size: 'L', due: '2026-05-10', requester: 'Team', createdAt: Date.now() },

    // Dana Kim
    { id: 't24d', title: 'visual language 개발', desc: '실제 진행되는 업무에 적용하면서 디벨롭 중', assignee: 'm_dana', status: 'ready', priority: 'medium', size: 'M', due: '2026-04-12', requester: 'Team', createdAt: Date.now() },

    // Zen
    { id: 't20z', title: '(업무명 미입력)', desc: '', assignee: 'm_leezen', status: 'almostdone', priority: 'medium', size: 'L', due: '2026-04-23', requester: '', createdAt: Date.now() },

    // Sarah Kim
    { id: 't25s', title: '홈개편 히어로 배너 리디자인', desc: '', assignee: 'm_sarah', status: 'done', priority: 'medium', size: 'S', due: '2026-04-23', requester: 'Home', createdAt: Date.now() },
  ];

  const schedules = [
    { id: 's1', member: 'm_joe', text: '4/11(금) 오후 반차', date: '' },
    { id: 's2', member: 'm_dana', text: '4/22(화) 연차', date: '' },
    { id: 's3', member: 'm_luka', text: '4/14(월) ~ 4/23(수) 연차', date: '' },
  ];

  return {
    members,
    tasks,
    projects: [],
    events: [],
    notes: [],
    activity: [{ id: 'a0', message: '주간 업무 데이터가 동기화되었습니다', time: Date.now() }],
    schedules,
    teamDiscussion: '양재천- 노상'
  };
}

let DATA = load() || seedData();
if (!DATA.schedules) DATA.schedules = [];

// ────────── Helpers ──────────
function uid() { return '_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }
function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function fmtDate(d) {
  if (!d) return '';
  const dt = new Date(d + 'T00:00:00');
  return `${dt.getMonth()+1}/${dt.getDate()}`;
}
function fmtDateFull(d) {
  if (!d) return '';
  const dt = new Date(d + 'T00:00:00');
  return `${dt.getFullYear()}.${String(dt.getMonth()+1).padStart(2,'0')}.${String(dt.getDate()).padStart(2,'0')}`;
}
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function isOverdue(d) { return d && d < todayStr(); }
function timeAgo(ts) {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1) return '방금 전';
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  return `${Math.floor(h / 24)}일 전`;
}
function getMember(id) { return DATA.members.find(m => m.id === id); }
function getMemberColor(id) { const m = getMember(id); return m ? m.color : '#6366f1'; }
function getMemberName(id) { const m = getMember(id); return m ? m.name : '미배정'; }
function getFirstName(id) { return getMemberName(id).split(' ')[0]; }

function addActivity(msg) {
  DATA.activity.unshift({ id: uid(), message: msg, time: Date.now() });
  if (DATA.activity.length > 50) DATA.activity.length = 50;
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ────────── Init ──────────
document.addEventListener('DOMContentLoaded', async () => {
  initDate();
  initSidebar();
  initTheme();
  initModals();
  initCalendar();
  initQuickNote();
  initSearch();
  initQuickAdd();
  initVendorFinder();

  renderAll();
});

function initDate() {
  const d = new Date();
  const days = ['일','월','화','수','목','금','토'];
  document.getElementById('currentDate').textContent =
    `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
}

// ────────── Sidebar ──────────
function initSidebar() {
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  });
}

function switchPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.getElementById('nav-' + page)?.classList.add('active');
  const titles = { dashboard: '대시보드', tasks: '업무 현황', calendar: '업무 캘린더', lunch: '점심 룰렛', vendor: '협력업체 파인더', team: '팀원 소개' };
  document.getElementById('pageTitle').textContent = titles[page] || page;
  if (page === 'tasks') { renderKanban(); renderMemberFilter(); }
  if (page === 'projects') renderProjectsPage();
  if (page === 'calendar') renderCalendar();
  if (page === 'lunch') renderLunchPage();
  if (page === 'vendor') vfRender();
  if (page === 'team') renderTeamProfiles();
}
window.switchPage = switchPage;

// ────────── Theme ──────────
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  document.getElementById('themeToggle').addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? '' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
}

// ────────── Search ──────────
function initSearch() {
  document.getElementById('searchInput').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.kanban-card').forEach(card => {
      card.style.display = !q || card.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ────────── Quick Add ──────────
function initQuickAdd() {
  const sel = document.getElementById('qaAssignee');
  if (!sel) return;
  sel.innerHTML = DATA.members.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
  refreshRequesterList2();
}

function refreshRequesterList2() {
  const dl = document.getElementById('requesterList2');
  if (!dl) return;
  const teams = [...new Set(DATA.tasks.map(t => t.requester).filter(Boolean))].sort();
  dl.innerHTML = teams.map(t => `<option value="${esc(t)}">`).join('');
}

window.quickAddTask = function(e) {
  e.preventDefault();
  const title = document.getElementById('qaTitle').value.trim();
  if (!title) return false;

  DATA.tasks.push({
    id: uid(),
    title,
    desc: '',
    assignee: document.getElementById('qaAssignee').value,
    requester: document.getElementById('qaRequester').value.trim(),
    status: document.getElementById('qaStatus').value,
    size: document.getElementById('qaSize').value,
    priority: 'medium',
    due: document.getElementById('qaDue').value,
    link: document.getElementById('qaLink').value.trim(),
    createdAt: Date.now()
  });

  addActivity(`"${title}" 추가됨 (${getMemberName(document.getElementById('qaAssignee').value)})`);
  save();

  // Reset form
  document.getElementById('qaTitle').value = '';
  document.getElementById('qaRequester').value = '';
  document.getElementById('qaLink').value = '';
  document.getElementById('qaDue').value = '';

  renderAll();
  showToast('업무가 추가되었습니다');
  return false;
};

// ────────── Render All ──────────
function renderAll() {
  renderTeamSummary();
  renderDeadlines();
  renderWeeklySummary();
  renderWorkloadChart();
  renderRequesterChart();
  renderSchedules();
  renderTeamEvents();
  renderKanban();
  renderMemberFilter();
  renderRequesterFilter();
  renderProjectsPage();
  renderNotesPage();
  updateBadge();
}

// ────────── Deadlines ──────────
function renderDeadlines() {
  const container = document.getElementById('deadlineList');
  if (!container) return;

  const today = todayStr();
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const nextWeekStr = `${nextWeek.getFullYear()}-${String(nextWeek.getMonth()+1).padStart(2,'0')}-${String(nextWeek.getDate()).padStart(2,'0')}`;

  const urgent = DATA.tasks
    .filter(t => t.due && t.status !== 'done' && t.due <= nextWeekStr)
    .sort((a, b) => a.due.localeCompare(b.due));

  if (urgent.length === 0) {
    container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-tertiary);font-size:13px">이번 주 마감 업무 없음</div>';
    return;
  }

  container.innerHTML = urgent.map(t => {
    const overdue = t.due < today;
    const isToday = t.due === today;
    return `
    <div style="display:flex;align-items:center;gap:10px;padding:10px 20px;border-bottom:1px solid var(--border-light)">
      <span style="font-size:14px">${overdue ? '🚨' : isToday ? '⏰' : '📌'}</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(t.title)}</div>
        <div style="font-size:11px;color:var(--text-tertiary)">${getMemberName(t.assignee)}</div>
      </div>
      <span style="font-size:12px;font-weight:600;color:${overdue ? '#dc2626' : isToday ? '#d97706' : 'var(--text-secondary)'}">${overdue ? '기한 초과' : isToday ? '오늘' : fmtDate(t.due)}</span>
      <span class="size-badge size-${t.size || 'M'}" style="font-size:10px;padding:1px 5px">${t.size || 'M'}</span>
    </div>`;
  }).join('');
}

// ────────── Weekly Summary ──────────
function renderWeeklySummary() {
  const container = document.getElementById('weeklySummary');
  if (!container) return;

  const t = DATA.tasks;
  const total = t.length;
  const ongoing = t.filter(x => x.status === 'ongoing').length;
  const done = t.filter(x => x.status === 'done').length;
  const ready = t.filter(x => x.status === 'ready' || x.status === 'new').length;
  const almostDone = t.filter(x => x.status === 'almostdone').length;
  const hold = t.filter(x => x.status === 'hold').length;

  container.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
      <div style="text-align:center">
        <div style="font-size:28px;font-weight:700">${total}</div>
        <div style="font-size:12px;color:var(--text-tertiary)">전체 업무</div>
      </div>
      <div style="text-align:center">
        <div style="font-size:28px;font-weight:700;color:#059669">${done}</div>
        <div style="font-size:12px;color:var(--text-tertiary)">완료</div>
      </div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
      <span style="font-size:12px;padding:4px 10px;border-radius:12px;background:${STATUS_COLORS.ongoing}15;color:${STATUS_COLORS.ongoing};font-weight:600">Ongoing ${ongoing}</span>
      <span style="font-size:12px;padding:4px 10px;border-radius:12px;background:${STATUS_COLORS.ready}15;color:${STATUS_COLORS.ready};font-weight:600">Ready ${ready}</span>
      <span style="font-size:12px;padding:4px 10px;border-radius:12px;background:${STATUS_COLORS.almostdone}15;color:${STATUS_COLORS.almostdone};font-weight:600">Almost ${almostDone}</span>
      ${hold ? `<span style="font-size:12px;padding:4px 10px;border-radius:12px;background:${STATUS_COLORS.hold}15;color:${STATUS_COLORS.hold};font-weight:600">Hold ${hold}</span>` : ''}
    </div>
  `;
}

// ────────── Workload Chart ──────────
function renderWorkloadChart() {
  const container = document.getElementById('workloadChart');
  if (!container) return;

  const BAR_STATUSES = ['new','ongoing','almostdone','ready','done'];
  const BAR_COLORS = { new:'#1e293b', ongoing:'#475569', almostdone:'#94a3b8', ready:'#cbd5e1', done:'#e2e8f0' };

  const memberData = DATA.members.map(m => {
    const tasks = DATA.tasks.filter(t => t.assignee === m.id);
    const byStatus = {};
    BAR_STATUSES.forEach(s => {
      byStatus[s] = tasks.filter(t => t.status === s).reduce((sum, t) => sum + (SIZE_WEIGHTS[t.size] || 3), 0);
    });
    const totalWeight = BAR_STATUSES.reduce((sum, s) => sum + byStatus[s], 0);
    const activeWeight = totalWeight - (byStatus.done || 0);
    return { ...m, tasks, byStatus, totalWeight, activeWeight, count: tasks.length };
  }).filter(m => m.count > 0).sort((a, b) => b.activeWeight - a.activeWeight);

  if (memberData.length === 0) {
    container.innerHTML = '<div style="text-align:center;color:var(--text-tertiary);padding:20px;font-size:13px">업무를 추가해보세요</div>';
    return;
  }

  const maxWeight = Math.max(...memberData.map(m => m.totalWeight), 1);

  const legend = document.getElementById('workloadLegend');
  if (legend) legend.innerHTML = '';

  container.innerHTML = `
    <div class="workload-chart-grid">
      ${memberData.map(m => {
        const barPct = (m.activeWeight / maxWeight) * 100;

        const sizeCounts = { S:0, M:0, L:0, XL:0 };
        m.tasks.filter(t => t.status !== 'done').forEach(t => sizeCounts[t.size || 'M']++);
        const sizeTags = ['S','M','L','XL'].filter(s => sizeCounts[s] > 0)
          .map(s => `<span class="size-badge size-${s}" style="font-size:10px;padding:1px 5px">${s}×${sizeCounts[s]}</span>`).join(' ');

        const ratio = m.activeWeight / maxWeight;
        let emoji = '';
        if (ratio >= 0.9) emoji = '🤬';
        else if (ratio >= 0.7) emoji = '😡';
        else if (ratio >= 0.5) emoji = '😐';
        else emoji = '😊';
        return `
        <div class="wc-row">
          <div class="wc-name">
            <div class="avatar" style="width:26px;height:26px;font-size:11px;background:${m.color}">${m.name[0]}</div>
            <span>${m.name.split(' ')[0]}</span>
          </div>
          <div class="wc-bar-wrap">
            <div class="wc-bar">
              <div class="wc-bar-fill" style="width:${barPct}%;background:${m.color}"></div>
            </div>
          </div>
          <div class="wc-meta">
            <span class="wc-emoji">${emoji}</span>
            <span class="wc-weight${ratio >= 0.7 ? ' heavy' : ''}">${m.activeWeight}</span>
            <div class="wc-sizes">${sizeTags}</div>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
}

function updateBadge() {
  const ongoing = DATA.tasks.filter(t => t.status === 'ongoing').length;
  const badge = document.getElementById('taskBadge');
  badge.textContent = ongoing;
  badge.style.display = ongoing > 0 ? '' : 'none';
}

// ────────── Team Summary (pill bar) ──────────
function renderTeamSummary() {
  const t = DATA.tasks;
  const w = {};
  STATUSES.forEach(s => w[s] = t.filter(x => x.status === s).reduce((sum, x) => sum + (SIZE_WEIGHTS[x.size] || 3), 0));
  const totalW = Object.values(w).reduce((a, b) => a + b, 0);
  const donePct = totalW ? Math.round(w.done / totalW * 100) : 0;

  document.getElementById('teamSummary').innerHTML = `
    <div class="summary-pill">
      <span style="font-weight:600;color:var(--text-secondary)">팀원</span>
      <span class="pill-value">${DATA.members.length}명</span>
    </div>
    <div class="summary-pill">
      <span style="font-weight:600;color:var(--text-secondary)">전체</span>
      <span class="pill-value">${totalW}</span>
    </div>
    <div class="summary-pill">
      <div class="pill-dot" style="background:${STATUS_COLORS.ongoing}"></div>
      <span>Ongoing</span>
      <span class="pill-value">${w.ongoing}</span>
    </div>
    <div class="summary-pill">
      <div class="pill-dot" style="background:${STATUS_COLORS.ready}"></div>
      <span>Ready</span>
      <span class="pill-value">${w.ready + (w.new || 0)}</span>
    </div>
    <div class="summary-pill">
      <div class="pill-dot" style="background:${STATUS_COLORS.almostdone}"></div>
      <span>Almost Done</span>
      <span class="pill-value">${w.almostdone}</span>
    </div>
    <div class="summary-pill">
      <div class="pill-dot" style="background:${STATUS_COLORS.done}"></div>
      <span>Done</span>
      <span class="pill-value">${w.done}</span>
      <span style="font-size:12px;color:var(--text-tertiary)">(${donePct}%)</span>
    </div>
  `;
}

// ────────── Requester Chart ──────────
function renderRequesterChart() {
  const container = document.getElementById('requesterChart');
  if (!container) return;

  const active = DATA.tasks.filter(t => t.status !== 'done');
  const reqData = REQUESTERS.map(r => {
    const tasks = active.filter(t => t.requester === r);
    const weight = tasks.reduce((sum, t) => sum + (SIZE_WEIGHTS[t.size] || 3), 0);
    const byStatus = {};
    STATUSES.forEach(s => { byStatus[s] = tasks.filter(t => t.status === s).length; });
    return { name: r, color: REQUESTER_COLORS[r], count: tasks.length, weight, byStatus };
  }).filter(r => r.count > 0).sort((a, b) => b.weight - a.weight);

  if (reqData.length === 0) {
    container.innerHTML = '<div style="text-align:center;color:var(--text-tertiary);padding:20px;font-size:13px">요청 업무가 없습니다</div>';
    return;
  }

  const maxW = Math.max(...reqData.map(r => r.weight), 1);

  container.innerHTML = `<div class="workload-chart-grid">
    ${reqData.map(r => {
      const barPct = (r.weight / maxW) * 100;
      const statusBreakdown = ['new','ongoing','almostdone','ready'].filter(s => r.byStatus[s] > 0)
        .map(s => `<span style="color:${STATUS_COLORS[s]};font-weight:600;font-size:11px">${STATUS_LABELS[s]} ${r.byStatus[s]}</span>`)
        .join('<span style="color:var(--text-tertiary);margin:0 3px">·</span>');

      return `
      <div class="wc-row">
        <div class="wc-name" style="width:90px">
          <div style="width:10px;height:10px;border-radius:50%;background:${r.color};flex-shrink:0"></div>
          <span>${r.name}</span>
        </div>
        <div class="wc-bar-wrap">
          <div class="wc-bar" style="height:28px">
            <div style="width:${barPct}%;background:#cbd5e1;height:100%;border-radius:6px;display:flex;align-items:center;padding:0 8px;min-width:fit-content">
              <span style="font-size:11px;font-weight:700;color:#475569">${r.weight}</span>
            </div>
          </div>
        </div>
        <div class="wc-meta" style="min-width:auto">
          <div style="font-size:11px;display:flex;gap:0;flex-wrap:nowrap">${statusBreakdown}</div>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

// ────────── Schedules (근태) ──────────
function renderSchedules() {
  const container = document.getElementById('scheduleList');
  if (!container) return;

  if (!DATA.schedules || DATA.schedules.length === 0) {
    container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-tertiary);font-size:13px">등록된 근태가 없습니다</div>';
    return;
  }
  container.innerHTML = DATA.schedules.map(s => `
    <div style="display:flex;align-items:center;gap:10px;padding:10px 20px;border-bottom:1px solid var(--border-light)">
      <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;background:${getMemberColor(s.member)}22;color:${getMemberColor(s.member)}">${getFirstName(s.member)}</span>
      <span style="font-size:13px;flex:1">${esc(s.text)}</span>
      <button onclick="deleteSchedule('${s.id}')" style="background:none;border:none;cursor:pointer;color:var(--text-tertiary);font-size:12px">✕</button>
    </div>
  `).join('');
}

window.openScheduleModal = function() {
  const member = prompt('팀원 이름 (예: Joe Jo):');
  if (!member) return;
  const text = prompt('일정 내용 (예: 4월 15일 오후 반차):');
  if (!text) return;
  const found = DATA.members.find(m => m.name.toLowerCase().includes(member.toLowerCase()));
  DATA.schedules.push({ id: uid(), member: found ? found.id : DATA.members[0].id, text });
  save(); renderSchedules();
  showToast('근태 일정이 추가되었습니다');
};

window.deleteSchedule = function(id) {
  DATA.schedules = DATA.schedules.filter(s => s.id !== id);
  save(); renderSchedules();
};

// ────────── Team Overview (main dashboard) ──────────
const STATUS_ORDER = ['new','ongoing','almostdone','ready','done','hold'];

// ────────── Team Events ──────────
function renderTeamEvents() {
  const container = document.getElementById('teamEventList');
  if (!container) return;

  const teamEvents = (DATA.teamEvents || []).sort((a, b) => (a.date || '').localeCompare(b.date || ''));

  if (teamEvents.length === 0) {
    container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-tertiary);font-size:13px">등록된 팀 일정이 없습니다</div>';
    return;
  }

  container.innerHTML = teamEvents.map(e => {
    const isPast = e.date && e.date < todayStr();
    return `
    <div style="display:flex;align-items:center;gap:12px;padding:10px 20px;border-bottom:1px solid var(--border-light);${isPast ? 'opacity:.45' : ''}">
      <div style="width:42px;text-align:center;flex-shrink:0">
        <div style="font-size:18px">${e.emoji || '📅'}</div>
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:600">${esc(e.title)}</div>
        ${e.desc ? `<div style="font-size:12px;color:var(--text-tertiary);margin-top:2px">${esc(e.desc)}</div>` : ''}
      </div>
      <div style="flex-shrink:0;text-align:right">
        ${e.date ? `<div style="font-size:13px;font-weight:600;color:${isPast ? 'var(--text-tertiary)' : 'var(--primary)'}">${fmtDateFull(e.date)}</div>` : ''}
        ${e.time ? `<div style="font-size:11px;color:var(--text-tertiary)">${esc(e.time)}</div>` : ''}
      </div>
      <button onclick="deleteTeamEvent('${e.id}')" style="background:none;border:none;cursor:pointer;color:var(--text-tertiary);font-size:12px;flex-shrink:0">✕</button>
    </div>`;
  }).join('');
}

window.openTeamEventModal = function() {
  if (document.getElementById('teamEventPopup')) return;
  const popup = document.createElement('div');
  popup.id = 'teamEventPopup';
  popup.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:400;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)';
  popup.innerHTML = `
    <div style="background:var(--surface);border-radius:16px;padding:24px;width:420px;max-width:92vw;box-shadow:var(--shadow-lg)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <h3 style="font-size:17px;font-weight:700">팀 일정 추가</h3>
        <button onclick="closeTeamEventModal()" style="background:none;border:none;cursor:pointer;color:var(--text-tertiary);font-size:18px">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label">일정 제목 *</label>
        <input type="text" class="form-input" id="teTitle" placeholder="예: 팀 전체 회의, 팀 회식" />
      </div>
      <div class="form-group">
        <label class="form-label">설명</label>
        <input type="text" class="form-input" id="teDesc" placeholder="예: 판교 맛집, 회의실 B" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 80px;gap:8px;margin-bottom:16px">
        <div>
          <label class="form-label">날짜</label>
          <input type="date" class="form-input" id="teDate" />
        </div>
        <div>
          <label class="form-label">시간</label>
          <input type="time" class="form-input" id="teTime" />
        </div>
        <div>
          <label class="form-label">이모지</label>
          <select class="form-input" id="teEmoji">
            <option value="📅">📅</option>
            <option value="🗓️">🗓️</option>
            <option value="👥">👥 회의</option>
            <option value="🍽️">🍽️ 회식</option>
            <option value="🎉">🎉 행사</option>
            <option value="🏃">🏃 워크샵</option>
            <option value="📢">📢 발표</option>
            <option value="🎂">🎂 생일</option>
          </select>
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:8px">
        <button class="btn-secondary" onclick="closeTeamEventModal()">취소</button>
        <button class="btn-primary" onclick="saveTeamEvent()">추가</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  popup.addEventListener('click', e => { if (e.target === popup) closeTeamEventModal(); });
  document.getElementById('teTitle').focus();
};

window.closeTeamEventModal = function() {
  const el = document.getElementById('teamEventPopup');
  if (el) el.remove();
};

window.saveTeamEvent = function() {
  const title = document.getElementById('teTitle').value.trim();
  if (!title) { showToast('일정 제목을 입력해주세요'); return; }
  if (!DATA.teamEvents) DATA.teamEvents = [];
  DATA.teamEvents.push({
    id: uid(),
    title,
    desc: document.getElementById('teDesc').value.trim(),
    date: document.getElementById('teDate').value,
    time: document.getElementById('teTime').value,
    emoji: document.getElementById('teEmoji').value
  });
  addActivity(`팀 일정 "${title}" 추가됨`);
  save();
  closeTeamEventModal();
  renderAll();
  showToast('팀 일정이 추가되었습니다');
};

window.deleteTeamEvent = function(id) {
  DATA.teamEvents = (DATA.teamEvents || []).filter(e => e.id !== id);
  save(); renderAll();
  showToast('팀 일정이 삭제되었습니다');
};

window.deleteEvent = function(id) {
  DATA.events = DATA.events.filter(e => e.id !== id);
  save(); renderAll(); renderCalendar();
  showToast('일정이 삭제되었습니다');
};

// ────────── Member Filter (tasks page) ──────────
let selectedMember = 'all';
let selectedRequester = 'all';

function renderMemberFilter() {
  const container = document.getElementById('memberFilter');
  if (!container) return;
  container.innerHTML = `
    <span style="font-size:12px;color:var(--text-tertiary);font-weight:600;padding:8px 4px">담당자</span>
    <button class="filter-tab${selectedMember === 'all' ? ' active' : ''}" onclick="filterByMember('all')">전체</button>
    ${DATA.members.map(m => `
      <button class="filter-tab${selectedMember === m.id ? ' active' : ''}" onclick="filterByMember('${m.id}')" style="${selectedMember === m.id ? `background:${m.color};border-color:${m.color}` : ''}">
        ${m.name.split(' ')[0]}
      </button>
    `).join('')}
  `;
}

function renderRequesterFilter() {
  const container = document.getElementById('requesterFilter');
  if (!container) return;
  container.innerHTML = `
    <span style="font-size:12px;color:var(--text-tertiary);font-weight:600;padding:8px 4px">요청 부서</span>
    <button class="filter-tab${selectedRequester === 'all' ? ' active' : ''}" onclick="filterByRequester('all')">전체</button>
    ${REQUESTERS.map(r => `
      <button class="filter-tab${selectedRequester === r ? ' active' : ''}" onclick="filterByRequester('${r}')" style="${selectedRequester === r ? `background:${REQUESTER_COLORS[r]};border-color:${REQUESTER_COLORS[r]};color:#fff` : ''}">
        ${r}
      </button>
    `).join('')}
  `;
}

window.filterByMember = function(id) {
  selectedMember = id;
  renderMemberFilter();
  renderKanban();
};

window.filterByRequester = function(r) {
  selectedRequester = r;
  renderRequesterFilter();
  renderKanban();
};

// ────────── Kanban Board ──────────
let currentFilter = 'all';

function renderKanban() {
  STATUSES.forEach(status => {
    let tasks = DATA.tasks.filter(t => t.status === status);
    if (selectedMember !== 'all') tasks = tasks.filter(t => t.assignee === selectedMember);
    if (selectedRequester !== 'all') tasks = tasks.filter(t => t.requester === selectedRequester);

    const container = document.getElementById('cards-' + status);
    if (!container) return;
    const countId = 'count' + status.charAt(0).toUpperCase() + status.slice(1);
    const countEl = document.getElementById(countId);
    if (countEl) countEl.textContent = tasks.length;

    if (tasks.length === 0) {
      container.innerHTML = '<div class="empty-state" style="padding:20px;font-size:12px"><p>없음</p></div>';
      return;
    }

    container.innerHTML = tasks.map(t => {
      const sz = t.size || 'M';
      return `
      <div class="kanban-card" draggable="true" data-id="${t.id}"
        ondragstart="dragTask(event)" ondragend="dragEnd(event)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;gap:6px">
          <div class="kanban-card-title" style="margin:0">${esc(t.title)}</div>
          <span class="size-badge size-${sz}">${sz}</span>
        </div>
        ${t.requester ? `<div style="margin-bottom:6px"><span class="requester-tag">${esc(t.requester)}</span></div>` : ''}
        ${t.desc ? `<div class="kanban-card-desc">${esc(t.desc).substring(0, 80)}</div>` : ''}
        <div class="kanban-card-footer">
          <span class="kanban-card-assignee" style="background:${getMemberColor(t.assignee)}22;color:${getMemberColor(t.assignee)}">${getFirstName(t.assignee)}</span>
          <div style="display:flex;align-items:center;gap:6px">
            ${t.due ? `<span class="kanban-card-due" style="${isOverdue(t.due) && t.status !== 'done' ? 'color:var(--danger)' : ''}">~${fmtDate(t.due)}</span>` : ''}
            <div class="kanban-card-actions">
              <button onclick="editTaskModal('${t.id}')" title="수정">&#9998;</button>
              <button onclick="deleteTask('${t.id}')" title="삭제">✕</button>
            </div>
          </div>
        </div>
      </div>`;
    }).join('');
  });
}

window.filterTasks = function(filter) {
  currentFilter = filter;
  document.querySelectorAll('#page-tasks .filter-tabs .filter-tab').forEach(b => b.classList.remove('active'));
  const el = document.getElementById('filter' + filter.charAt(0).toUpperCase() + filter.slice(1));
  if (el) el.classList.add('active');

  STATUSES.forEach(s => {
    const col = document.getElementById('col-' + s);
    if (col) col.style.display = (filter === 'all' || filter === s) ? '' : 'none';
  });
  renderKanban();
};

window.dragTask = function(e) {
  e.dataTransfer.setData('text/plain', e.target.dataset.id);
  e.target.classList.add('dragging');
};
window.dragEnd = function(e) { e.target.classList.remove('dragging'); };
window.dropTask = function(e, newStatus) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const task = DATA.tasks.find(t => t.id === id);
  if (!task) return;
  task.status = newStatus;
  addActivity(`"${task.title}" → ${STATUS_LABELS[newStatus]}`);
  save(); renderAll();
  showToast(`${STATUS_LABELS[newStatus]}(으)로 이동`);
};

window.deleteTask = function(id) {
  const t = DATA.tasks.find(t => t.id === id);
  if (!t) return;
  if (!confirm(`"${t.title}"을(를) 삭제하시겠습니까?`)) return;
  DATA.tasks = DATA.tasks.filter(t => t.id !== id);
  addActivity(`"${t.title}" 삭제됨`);
  save(); renderAll();
  showToast('업무가 삭제되었습니다');
};

// ────────── Task Modal ──────────
let editingTaskId = null;

function initModals() {
  const taskModal = document.getElementById('addTaskModal');
  document.getElementById('openAddTaskModal').addEventListener('click', () => openTaskModal());
  document.getElementById('closeAddTaskModal').addEventListener('click', () => closeModal('addTaskModal'));
  document.getElementById('cancelAddTask').addEventListener('click', () => closeModal('addTaskModal'));
  document.getElementById('confirmAddTask').addEventListener('click', saveTaskFromModal);
  taskModal.addEventListener('click', e => { if (e.target === taskModal) closeModal('addTaskModal'); });

  injectAssigneeField('addTaskModal');

  const noteModal = document.getElementById('addNoteModal');
  if (noteModal) {
    document.getElementById('openAddNoteModal')?.addEventListener('click', () => openNoteModal());
    document.getElementById('closeAddNoteModal')?.addEventListener('click', () => closeModal('addNoteModal'));
    document.getElementById('cancelAddNote')?.addEventListener('click', () => closeModal('addNoteModal'));
    document.getElementById('confirmAddNote')?.addEventListener('click', saveNoteFromModal);
    noteModal.addEventListener('click', e => { if (e.target === noteModal) closeModal('addNoteModal'); });
  }
}

function injectAssigneeField(modalId) {
  const modalBody = document.querySelector(`#${modalId} .modal-body`);
  const lastGroup = modalBody.querySelector('.form-group:last-child');
  const assigneeGroup = document.createElement('div');
  assigneeGroup.className = 'form-group';
  assigneeGroup.innerHTML = `
    <label class="form-label">담당자</label>
    <div style="display:flex;gap:8px">
      <select class="form-input" id="taskAssignee" style="flex:1">
        ${DATA.members.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
      </select>
      <button type="button" class="btn-secondary" onclick="openMemberManager()" style="white-space:nowrap;padding:10px 12px">팀원 관리</button>
    </div>
  `;
  lastGroup.parentNode.insertBefore(assigneeGroup, lastGroup);
}

function refreshRequesterList() {
  const dl = document.getElementById('requesterList');
  if (!dl) return;
  const teams = [...new Set(DATA.tasks.map(t => t.requester).filter(Boolean))].sort();
  dl.innerHTML = teams.map(t => `<option value="${esc(t)}">`).join('');
}

function refreshAssigneeSelect() {
  const sel = document.getElementById('taskAssignee');
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = DATA.members.map(m => `<option value="${m.id}"${m.id === cur ? ' selected' : ''}>${m.name}</option>`).join('');
}

function openModal(id) { document.getElementById(id).classList.add('show'); }
function closeModal(id) { document.getElementById(id).classList.remove('show'); }

function openTaskModal(task) {
  editingTaskId = task ? task.id : null;
  document.getElementById('addTaskTitle').textContent = task ? '업무 수정' : '새 업무 추가';
  document.getElementById('confirmAddTask').textContent = task ? '수정하기' : '추가하기';
  document.getElementById('taskTitle').value = task ? task.title : '';
  document.getElementById('taskDesc').value = task ? (task.desc || '') : '';
  document.getElementById('taskDue').value = task ? (task.due || '') : '';
  document.getElementById('taskPriority').value = task ? task.priority : 'medium';
  document.getElementById('taskSize').value = task ? (task.size || 'M') : 'M';
  document.getElementById('taskRequester').value = task ? (task.requester || '') : '';
  refreshRequesterList();
  document.getElementById('taskStatus').value = task ? task.status : 'ongoing';
  refreshAssigneeSelect();
  if (task) document.getElementById('taskAssignee').value = task.assignee || DATA.members[0]?.id;
  openModal('addTaskModal');
  document.getElementById('taskTitle').focus();
}

window.editTaskModal = function(id) {
  const t = DATA.tasks.find(t => t.id === id);
  if (t) openTaskModal(t);
};

function saveTaskFromModal() {
  const title = document.getElementById('taskTitle').value.trim();
  if (!title) { showToast('제목을 입력해주세요'); return; }

  const obj = {
    id: editingTaskId || uid(),
    title,
    desc: document.getElementById('taskDesc').value.trim(),
    due: document.getElementById('taskDue').value,
    priority: document.getElementById('taskPriority').value,
    size: document.getElementById('taskSize').value,
    requester: document.getElementById('taskRequester').value.trim(),
    status: document.getElementById('taskStatus').value,
    assignee: document.getElementById('taskAssignee').value,
    createdAt: Date.now()
  };

  if (editingTaskId) {
    const idx = DATA.tasks.findIndex(t => t.id === editingTaskId);
    if (idx >= 0) { obj.createdAt = DATA.tasks[idx].createdAt; DATA.tasks[idx] = obj; }
    addActivity(`"${title}" 수정됨`);
  } else {
    DATA.tasks.push(obj);
    addActivity(`"${title}" 추가됨 (${getMemberName(obj.assignee)})`);
  }

  save(); closeModal('addTaskModal'); renderAll();
  showToast(editingTaskId ? '수정되었습니다' : '업무가 추가되었습니다');
  editingTaskId = null;
}

// ────────── Member Manager ──────────
window.openMemberManager = function() {
  if (document.getElementById('memberManagerPopup')) return;
  const popup = document.createElement('div');
  popup.id = 'memberManagerPopup';
  popup.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:400;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)';
  popup.innerHTML = `
    <div style="background:var(--surface);border-radius:16px;padding:24px;width:420px;max-width:92vw;box-shadow:var(--shadow-lg)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <h3 style="font-size:17px;font-weight:700">팀원 관리</h3>
        <button onclick="closeMemberManager()" style="background:none;border:none;cursor:pointer;color:var(--text-tertiary);font-size:18px">✕</button>
      </div>
      <div id="memberList" style="margin-bottom:16px;max-height:300px;overflow-y:auto"></div>
      <div style="display:flex;gap:8px">
        <input type="text" id="newMemberName" placeholder="이름" class="form-input" style="flex:1">
        <input type="text" id="newMemberRole" placeholder="역할" class="form-input" style="flex:1">
        <button class="btn-primary" onclick="addMember()" style="white-space:nowrap">추가</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  popup.addEventListener('click', e => { if (e.target === popup) closeMemberManager(); });
  renderMemberList();
};

window.closeMemberManager = function() {
  const el = document.getElementById('memberManagerPopup');
  if (el) el.remove();
  refreshAssigneeSelect();
};

function renderMemberList() {
  const container = document.getElementById('memberList');
  if (!container) return;
  container.innerHTML = DATA.members.map(m => {
    const count = DATA.tasks.filter(t => t.assignee === m.id).length;
    return `
    <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border-light)">
      <div style="width:32px;height:32px;border-radius:50%;background:${m.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${m.name[0]}</div>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:600">${esc(m.name)}</div>
        <div style="font-size:12px;color:var(--text-tertiary)">${esc(m.role || '')} · ${count}개 업무</div>
      </div>
      <button onclick="removeMember('${m.id}')" style="background:none;border:none;cursor:pointer;color:var(--text-tertiary);font-size:14px" title="삭제">✕</button>
    </div>`;
  }).join('');
}

window.addMember = function() {
  const name = document.getElementById('newMemberName').value.trim();
  if (!name) return;
  const role = document.getElementById('newMemberRole').value.trim();
  DATA.members.push({ id: uid(), name, role, color: COLORS[DATA.members.length % COLORS.length] });
  addActivity(`팀원 "${name}" 추가됨`);
  save();
  document.getElementById('newMemberName').value = '';
  document.getElementById('newMemberRole').value = '';
  renderMemberList();
  showToast(`${name}님이 추가되었습니다`);
};

window.removeMember = function(id) {
  const m = getMember(id);
  if (!m) return;
  if (DATA.members.length <= 1) { showToast('최소 1명의 팀원이 필요합니다'); return; }
  if (!confirm(`${m.name}님을 제거하시겠습니까?`)) return;
  DATA.members = DATA.members.filter(mm => mm.id !== id);
  DATA.tasks.forEach(t => { if (t.assignee === id) t.assignee = DATA.members[0].id; });
  addActivity(`팀원 "${m.name}" 제거됨`);
  save(); renderMemberList(); renderAll();
};

// ────────── Projects ──────────
let editingProjectId = null;

function openProjectModal(proj) {
  editingProjectId = proj ? proj.id : null;
  document.getElementById('addProjectTitle').textContent = proj ? '프로젝트 수정' : '새 프로젝트 추가';
  document.getElementById('confirmAddProject').textContent = proj ? '수정하기' : '추가하기';
  document.getElementById('projectName').value = proj ? proj.name : '';
  document.getElementById('projectDesc').value = proj ? (proj.desc || '') : '';
  document.getElementById('projectDue').value = proj ? (proj.due || '') : '';
  document.getElementById('projectColor').value = proj ? proj.color : '#6366f1';
  openModal('addProjectModal');
  document.getElementById('projectName').focus();
}

function saveProjectFromModal() {
  const name = document.getElementById('projectName').value.trim();
  if (!name) { showToast('프로젝트명을 입력해주세요'); return; }
  const obj = {
    id: editingProjectId || uid(),
    name, desc: document.getElementById('projectDesc').value.trim(),
    due: document.getElementById('projectDue').value,
    color: document.getElementById('projectColor').value,
    status: 'active', createdAt: Date.now()
  };
  if (editingProjectId) {
    const idx = DATA.projects.findIndex(p => p.id === editingProjectId);
    if (idx >= 0) { obj.createdAt = DATA.projects[idx].createdAt; obj.status = DATA.projects[idx].status; DATA.projects[idx] = obj; }
  } else {
    DATA.projects.push(obj);
    addActivity(`프로젝트 "${name}" 생성됨`);
  }
  save(); closeModal('addProjectModal'); renderAll();
  showToast(editingProjectId ? '프로젝트가 수정되었습니다' : '프로젝트가 추가되었습니다');
  editingProjectId = null;
}

function renderProjectsPage() {
  const grid = document.getElementById('projectsGrid');
  if (DATA.projects.length === 0) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;padding:60px"><p>프로젝트를 추가해보세요</p></div>';
    return;
  }
  grid.innerHTML = DATA.projects.map(p => {
    const tasks = DATA.tasks.filter(t => t.projectId === p.id);
    const done = tasks.filter(t => t.status === 'done').length;
    const pct = tasks.length ? Math.round(done / tasks.length * 100) : 0;
    return `
    <div class="project-card" style="border-top-color:${p.color}">
      <div class="project-card-header"><div class="project-card-name">${esc(p.name)}</div></div>
      ${p.desc ? `<div class="project-card-desc">${esc(p.desc)}</div>` : ''}
      <div class="project-progress">
        <div class="project-progress-bar"><div class="project-progress-fill" style="width:${pct}%;background:${p.color}"></div></div>
        <div class="project-progress-label"><span>${done}/${tasks.length} 완료</span><span>${pct}%</span></div>
      </div>
      <div class="project-card-footer">
        <span class="project-due">${p.due ? fmtDateFull(p.due) + ' 마감' : ''}</span>
        <div class="project-actions">
          <button onclick="editProject('${p.id}')">수정</button>
          <button onclick="deleteProject('${p.id}')">삭제</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

window.editProject = function(id) { const p = DATA.projects.find(p => p.id === id); if (p) openProjectModal(p); };
window.deleteProject = function(id) {
  const p = DATA.projects.find(p => p.id === id);
  if (!p || !confirm(`"${p.name}" 프로젝트를 삭제하시겠습니까?`)) return;
  DATA.projects = DATA.projects.filter(pp => pp.id !== id);
  save(); renderAll();
  showToast('프로젝트가 삭제되었습니다');
};
window.filterProjects = function() {
  document.querySelectorAll('#page-projects .filter-tab').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderProjectsPage();
};

// ────────── Calendar ──────────
let calYear, calMonth, selectedDate;

function initCalendar() {
  const today = new Date();
  calYear = today.getFullYear();
  calMonth = today.getMonth();
  selectedDate = todayStr();
  const prev = document.getElementById('prevMonth');
  const next = document.getElementById('nextMonth');
  const addBtn = document.getElementById('addEventBtn');
  if (prev) prev.addEventListener('click', () => { calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; } renderCalendar(); });
  if (next) next.addEventListener('click', () => { calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; } renderCalendar(); });
  if (addBtn) addBtn.addEventListener('click', addEventFromForm);
  renderCalendar();
}

function renderCalendar() {
  document.getElementById('calMonthTitle').textContent = `${calYear}년 ${calMonth + 1}월`;
  const grid = document.getElementById('calendarGrid');
  const headers = ['일','월','화','수','목','금','토'];
  let html = headers.map(h => `<div class="cal-header">${h}</div>`).join('');
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const prevDays = new Date(calYear, calMonth, 0).getDate();
  const todayS = todayStr();

  for (let i = firstDay - 1; i >= 0; i--) html += `<div class="cal-day other-month">${prevDays - i}</div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dayEvents = DATA.events.filter(e => e.date === ds);
    const dayTasks = DATA.tasks.filter(t => t.due === ds);
    html += `<div class="cal-day${ds === todayS ? ' today' : ''}${ds === selectedDate ? ' selected' : ''}" onclick="selectDate('${ds}')">
      ${d}
      ${(dayEvents.length || dayTasks.length) ? `<div class="cal-day-events">${dayEvents.map(e => `<div class="cal-event-dot" style="background:${e.color}"></div>`).join('')}${dayTasks.map(t => `<div class="cal-event-dot" style="background:${getMemberColor(t.assignee)}"></div>`).join('')}</div>` : ''}
    </div>`;
  }
  const totalCells = firstDay + daysInMonth;
  const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remaining; i++) html += `<div class="cal-day other-month">${i}</div>`;
  grid.innerHTML = html;
  renderSidebarEvents();
}

window.selectDate = function(ds) { selectedDate = ds; document.getElementById('selectedDateTitle').textContent = fmtDateFull(ds) + ' 일정'; renderCalendar(); };

function renderSidebarEvents() {
  const container = document.getElementById('sidebarEventList');
  const events = DATA.events.filter(e => e.date === selectedDate);
  const tasks = DATA.tasks.filter(t => t.due === selectedDate);
  let html = `<h4 style="margin:16px 0 8px;font-size:13px;color:var(--text-secondary)">선택된 날의 일정</h4>`;
  if (events.length === 0 && tasks.length === 0) {
    html += '<div class="empty-state" style="padding:16px"><p>일정 없음</p></div>';
  } else {
    html += events.map(e => `
      <div class="sidebar-event-item">
        <div style="width:3px;height:28px;border-radius:2px;background:${e.color};flex-shrink:0"></div>
        <div style="flex:1"><div style="font-size:13px;font-weight:500">${esc(e.title)}</div><div style="font-size:11px;color:var(--text-tertiary)">${e.time || '종일'}</div></div>
        <button onclick="deleteEvent('${e.id}')" style="background:none;border:none;cursor:pointer;color:var(--text-tertiary);font-size:12px">✕</button>
      </div>
    `).join('');
    html += tasks.map(t => `
      <div class="sidebar-event-item">
        <div style="width:3px;height:28px;border-radius:2px;background:${getMemberColor(t.assignee)};flex-shrink:0"></div>
        <div style="flex:1"><div style="font-size:13px;font-weight:500">${esc(t.title)}</div><div style="font-size:11px;color:var(--text-tertiary)">${getMemberName(t.assignee)} · ${STATUS_LABELS[t.status]}</div></div>
      </div>
    `).join('');
  }
  container.innerHTML = html;
}

function addEventFromForm() {
  const title = document.getElementById('eventTitle').value.trim();
  if (!title) { showToast('일정 제목을 입력해주세요'); return; }
  DATA.events.push({ id: uid(), title, date: selectedDate, time: document.getElementById('eventTime').value, color: document.getElementById('eventColor').value });
  addActivity(`일정 "${title}" 추가됨`);
  save();
  document.getElementById('eventTitle').value = '';
  document.getElementById('eventTime').value = '';
  renderCalendar(); renderAll();
  showToast('일정이 추가되었습니다');
}

// ────────── Notes ──────────
let editingNoteId = null;

function openNoteModal(note) {
  editingNoteId = note ? note.id : null;
  document.getElementById('addNoteTitle').textContent = note ? '메모 수정' : '새 메모 추가';
  document.getElementById('confirmAddNote').textContent = note ? '수정하기' : '추가하기';
  document.getElementById('noteTitle').value = note ? note.title : '';
  document.getElementById('noteContent').value = note ? (note.content || '') : '';
  document.getElementById('noteColor').value = note ? note.color : '#6366f1';
  document.getElementById('noteImportant').checked = note ? note.important : false;
  openModal('addNoteModal');
  document.getElementById('noteTitle').focus();
}

function saveNoteFromModal() {
  const title = document.getElementById('noteTitle').value.trim();
  if (!title) { showToast('제목을 입력해주세요'); return; }
  const obj = { id: editingNoteId || uid(), title, content: document.getElementById('noteContent').value.trim(), color: document.getElementById('noteColor').value, important: document.getElementById('noteImportant').checked, createdAt: Date.now() };
  if (editingNoteId) {
    const idx = DATA.notes.findIndex(n => n.id === editingNoteId);
    if (idx >= 0) { obj.createdAt = DATA.notes[idx].createdAt; DATA.notes[idx] = obj; }
  } else {
    DATA.notes.push(obj);
    addActivity(`메모 "${title}" 추가됨`);
  }
  save(); closeModal('addNoteModal'); renderAll();
  showToast(editingNoteId ? '메모가 수정되었습니다' : '메모가 추가되었습니다');
  editingNoteId = null;
}

function renderNotesPage() {
  const grid = document.getElementById('notesGrid');
  if (DATA.notes.length === 0) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;padding:60px"><p>메모를 추가해보세요</p></div>';
    return;
  }
  grid.innerHTML = DATA.notes.map(n => `
    <div class="note-card" style="border-left-color:${n.color}">
      <div class="note-card-header">
        <div class="note-card-title">${esc(n.title)}</div>
        <button class="note-star${n.important ? ' active' : ''}" onclick="toggleNoteImportant('${n.id}')">${n.important ? '★' : '☆'}</button>
      </div>
      <div class="note-card-body">${esc(n.content || '').substring(0, 150)}</div>
      <div class="note-card-footer">
        <span class="note-date">${timeAgo(n.createdAt)}</span>
        <div class="note-actions">
          <button onclick="editNote('${n.id}')">수정</button>
          <button onclick="deleteNote('${n.id}')">삭제</button>
        </div>
      </div>
    </div>
  `).join('');
}

window.toggleNoteImportant = function(id) { const n = DATA.notes.find(n => n.id === id); if (n) { n.important = !n.important; save(); renderAll(); } };
window.editNote = function(id) { const n = DATA.notes.find(n => n.id === id); if (n) openNoteModal(n); };
window.deleteNote = function(id) { DATA.notes = DATA.notes.filter(n => n.id !== id); save(); renderAll(); showToast('메모가 삭제되었습니다'); };
window.filterNotes = function() { document.querySelectorAll('#page-notes .filter-tab').forEach(b => b.classList.remove('active')); event.target.classList.add('active'); renderNotesPage(); };

// ────────── Quick Note ──────────
function initQuickNote() {
  const input = document.getElementById('quickNoteInput');
  const counter = document.getElementById('noteCharCount');
  if (!input || !counter) return;
  input.addEventListener('input', () => { counter.textContent = `${input.value.length} / 300`; });
  const saveBtn = document.getElementById('saveNoteBtn');
  if (!saveBtn) return;
  saveBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    DATA.notes.push({ id: uid(), title: text.substring(0, 30) + (text.length > 30 ? '...' : ''), content: text, color: '#6366f1', important: false, createdAt: Date.now() });
    addActivity('빠른 메모 추가됨');
    save(); input.value = ''; counter.textContent = '0 / 300'; renderAll();
    showToast('메모가 저장되었습니다');
  });
}

// ────────── Data Reset (for development) ──────────
window.resetDashboard = function() {
  if (!confirm('모든 데이터를 초기 상태로 리셋하시겠습니까?')) return;
  localStorage.removeItem(STORE_KEY);
  DATA = seedData();
  save(); renderAll();
  showToast('데이터가 초기화되었습니다');
};

// ════════════════════════════════════════════════════
// VENDOR FINDER (integrated from vendor-source.html)
// ════════════════════════════════════════════════════

const VF_SNAPSHOT = [
  { id:"295a597878a080418a23e1d4aba44fa5", name:"이토스", status:"green", type:["제작"], cat:["인쇄물"], price:5940000, duration:"약 2주", leadDays:14, note:"100장씩, 600통", project:"오늘의집 리브랜딩_명함", url:"https://www.notion.so/ohouse/295a597878a080418a23e1d4aba44fa5", hasFiles:true },
  { id:"296a597878a080cca582c39936b1f0b5", name:"이토스", status:"green", type:["제작"], cat:["인쇄물"], price:2046000, duration:"약 1달", leadDays:30, note:"1000장 제작 기준", project:"오늘의집 리브랜딩_쇼핑백", url:"https://www.notion.so/ohouse/296a597878a080cca582c39936b1f0b5", hasFiles:true },
  { id:"296a597878a080e08726de7e5bfc92e1", name:"이토스", status:"green", type:["제작"], cat:["인쇄물"], price:693000, duration:"약 2주", leadDays:14, note:"각 1000장씩", project:"오늘의집 리브랜딩_봉투 2종", url:"https://www.notion.so/ohouse/296a597878a080e08726de7e5bfc92e1", hasFiles:true },
  { id:"295a597878a080c6a473d7669bcf376f", name:"인타임", status:"warn", type:["제작"], cat:["인쇄물"], price:930600, duration:"", leadDays:null, note:"850개 제작, 다수 불량으로 사용 x", project:"오늘의집 리브랜딩_스티커 제작", url:"https://www.notion.so/ohouse/295a597878a080c6a473d7669bcf376f", hasFiles:true },
  { id:"295a597878a080d88ef0e8c01fea2208", name:"랩크리트", status:"green", type:["제작"], cat:["굿즈"], price:9020000, duration:"약 1달 반", leadDays:45, note:"금형비 70만원, 본품 개당 5만원 150개 제작", project:"스페셜크리에이터_상패_제작비용", url:"https://www.notion.so/ohouse/295a597878a080d88ef0e8c01fea2208", hasFiles:true, hasPreview:true },
  { id:"295a597878a0802eb67ae8327acb6da7", name:"㈜메이크포유", status:"orange", type:["제작"], cat:["굿즈"], price:100204326, duration:"-", leadDays:null, note:"150개 제작, 진행 x", project:"스페셜크리에이터_상패_황동 제작비용", url:"https://www.notion.so/ohouse/295a597878a0802eb67ae8327acb6da7", hasFiles:true },
  { id:"295a597878a08093b62ef1e4b5431baf", name:"랩크리트", status:"green", type:["디자인"], cat:["디자인"], price:660000, duration:"", leadDays:null, note:"상패 디자인 모델링 비용 1건", project:"스페셜크리에이터_상패_모델링 비용", url:"https://www.notion.so/ohouse/295a597878a08093b62ef1e4b5431baf", hasFiles:true },
  { id:"2b9a597878a0806985e2ccd144d420a9", name:"박스마스터", status:"green", type:["제작"], cat:["패키지"], price:8820000, duration:"약 1달 반", leadDays:45, note:"150개 패키지 제작, 칼선 개발비 & 샘플비 포함", project:"스페셜크리에이터_상패_패키지 제작 비용", url:"https://www.notion.so/ohouse/2b9a597878a0806985e2ccd144d420a9", hasFiles:true, hasPreview:true },
  { id:"296a597878a080b69b09ed534a0cdb98", name:"LCC", status:"orange", type:["촬영"], cat:["사진/촬영"], price:30800000, duration:"", leadDays:null, note:"2일 촬영 기준, 공간을 제외한 나머지 전부 포함", project:"오늘의집 스탠다드_촬영", url:"https://www.notion.so/ohouse/296a597878a080b69b09ed534a0cdb98", hasFiles:true },
  { id:"295a597878a0806ea87ff68db5e84e00", name:"단필름", status:"none", type:["촬영"], cat:["사진/촬영"], price:4100000, duration:"", leadDays:null, note:"모델, 미술감독, 조명감독 등 포함", project:"오늘의집 스탠다드_촬영비용", url:"https://www.notion.so/ohouse/295a597878a0806ea87ff68db5e84e00", hasFiles:true, hasPreview:true },
  { id:"295a597878a080f189b2c3759b894107", name:"이도타입", status:"orange", type:["디자인"], cat:["디자인","폰트"], price:11000000, duration:"", leadDays:null, note:"국영문 각 1종", project:"오늘의집 리브랜딩_워드마크 국영문 개발비용", url:"https://www.notion.so/ohouse/295a597878a080f189b2c3759b894107", hasFiles:true },
  { id:"295a597878a0804d94a9c84764542918", name:"양장점", status:"none", type:["디자인"], cat:["디자인","폰트"], price:16000000, duration:"", leadDays:null, note:"국영문 각 1종", project:"오늘의집 리브랜딩_워드마크 국영문 개발비용", url:"https://www.notion.so/ohouse/295a597878a0804d94a9c84764542918", hasFiles:true, hasPreview:true },
  { id:"295a597878a080f6b813f8541b09b370", name:"조소희", status:"green", type:["디자인"], cat:["디자인","레터링"], price:2160000, duration:"1주일 반", leadDays:10, note:"시안 2개 이상", project:"오늘의집 리브랜딩_캠페인 레터링 제작", url:"https://www.notion.so/ohouse/295a597878a080f6b813f8541b09b370", hasFiles:true, hasPreview:true },
  { id:"2b7a597878a0804bb2b0f19d186a9b6f", name:"팟 (김현진)", status:"none", type:["디자인"], cat:["디자인","레터링"], price:5000000, duration:"", leadDays:null, note:"2종, 각 시안 2개 이상, 수정 2회", project:"오늘의집 PICK & 미식100선_이벤트 레터링 제작", url:"https://www.notion.so/ohouse/2b7a597878a0804bb2b0f19d186a9b6f", hasFiles:true, hasPreview:true },
  { id:"295a597878a080a1aba2c9439b5e9a0f", name:"보담디자인", status:"none", type:["제작"], cat:["사이니지","시공"], price:7400000, duration:"", leadDays:null, note:"시공비 포함", project:"오늘의집 리브랜딩_물류 사이니지 교체", url:"https://www.notion.so/ohouse/295a597878a080a1aba2c9439b5e9a0f", hasFiles:true },
  { id:"295a597878a080e88b87e00c3e233485", name:"룩앤두", status:"none", type:["제작"], cat:["사이니지"], price:1265000, duration:"", leadDays:null, note:"스텐실 조명형 1종, 시공비 포함", project:"오늘의집 키친 팝업_사이니지", url:"https://www.notion.so/ohouse/295a597878a080e88b87e00c3e233485", hasFiles:true, hasPreview:true },
  { id:"2e7a597878a080f8925dd4e8116aa2fe", name:"단필름", status:"none", type:["촬영"], cat:["사진/촬영"], price:300000, duration:"", leadDays:null, note:"최초 50만원, 빠르게 단일 제품 컷만 촬영", project:"오늘의집 리브랜딩_줄자 촬영", url:"https://www.notion.so/ohouse/2e7a597878a080f8925dd4e8116aa2fe", hasFiles:true, hasPreview:true },
  { id:"2b9a597878a08003a082f4b4856b526f", name:"이도타입", status:"orange", type:["디자인"], cat:["폰트"], price:81000000, duration:"", leadDays:null, note:"한글 2,780 규격 / 라틴베이직 / 웨이트 3종", project:"오늘의집 리브랜딩_국영문 폰트 개발비용", url:"https://www.notion.so/ohouse/2b9a597878a08003a082f4b4856b526f", hasFiles:true },
  { id:"2fda597878a080f9bde2fad9ddca6ba8", name:"세원정밀", status:"green", type:["제작"], cat:["패키지"], price:12383000, duration:"약 3주", leadDays:21, note:"500개 제작, 배송비 포함 객단가 24,766원", project:"패키지 할인_라이프 바인더 제작", url:"https://www.notion.so/ohouse/2fda597878a080f9bde2fad9ddca6ba8", hasFiles:true },
  { id:"2fea597878a0808b8e3cf32c5569f8f3", name:"LCC", status:"orange", type:["촬영"], cat:["사진/촬영"], price:3960000, duration:"", leadDays:null, note:"14컷 기준", project:"패키지 할인_라이프 바인더 제품 촬영", url:"https://www.notion.so/ohouse/2fea597878a0808b8e3cf32c5569f8f3", hasFiles:true },
  { id:"305a597878a080dea513fb8aa7588367", name:"이정민 작가", status:"none", type:["촬영"], cat:["사진/촬영"], price:null, duration:"", leadDays:null, note:"", project:"패키지 할인_라이프 바인더 제품 촬영", url:"https://www.notion.so/ohouse/305a597878a080dea513fb8aa7588367", hasFiles:false },
  { id:"2fea597878a080b482b9f57d5d9a9156", name:"(주)테디", status:"green", type:["제작"], cat:["시공"], price:1496000, duration:"", leadDays:null, note:"유리벽 5면 기준", project:"오늘의집 시공 지하 상담실 시트작업", url:"https://www.notion.so/ohouse/2fea597878a080b482b9f57d5d9a9156", hasFiles:true },
  { id:"2fea597878a080aa9055d9e82ef3ce42", name:"레이저그라피", status:"green", type:["제작"], cat:["굿즈","기타"], price:396000, duration:"1주", leadDays:7, note:"스펀지 패드 제작", project:"오늘의집 인테리어 파트너 어워즈 2026_스펀지 패드", url:"https://www.notion.so/ohouse/2fea597878a080aa9055d9e82ef3ce42", hasFiles:true },
  { id:"2fea597878a0805ab4f6d7244524e2ff", name:"해머트로피", status:"green", type:["제작"], cat:["굿즈"], price:7210500, duration:"약 3주", leadDays:21, note:"23개 제작, 알루미늄 아노다이징", project:"오늘의집 인테리어 파트너 어워즈 2026_트로피", url:"https://www.notion.so/ohouse/2fea597878a0805ab4f6d7244524e2ff", hasFiles:true },
  { id:"2fea597878a080a49e12f6ceacb92075", name:"세원정밀", status:"green", type:["제작"], cat:["패키지"], price:2194000, duration:"2주", leadDays:14, note:"30개 제작, 스펀지 패드 포함, 긴급건", project:"오늘의집 인테리어 파트너 어워즈 2026_싸바리 박스", url:"https://www.notion.so/ohouse/2fea597878a080a49e12f6ceacb92075", hasFiles:true },
  { id:"2c5a597878a080b5831add0cf44870af", name:"PAPERBELLA", status:"green", type:["제작"], cat:["인쇄물"], price:null, duration:"", leadDays:null, note:"단색 지류 봉투, 종이파일과 박 위주 후가공 가능업체", project:"구매 업체 (지류)", url:"https://www.notion.so/ohouse/2c5a597878a080b5831add0cf44870af", hasFiles:false },
  { id:"33ea597878a0807bb4d5ef779f74840f", name:"test 업체", status:"none", type:["제작"], cat:["인쇄물"], price:3000000, duration:"3일", leadDays:null, note:"", project:"test", url:"https://www.notion.so/ohouse/33ea597878a0807bb4d5ef779f74840f", hasFiles:false },
  { id:"33ea597878a080429333ee26365dbfe4", name:"테스트업첩", status:"none", type:["제작"], cat:["인쇄물","사진/촬영","레터링"], price:null, duration:"2", leadDays:30, note:"", project:"테스트업체", url:"https://www.notion.so/ohouse/33ea597878a080429333ee26365dbfe4", hasFiles:false },
  { id:"33ea597878a080989660f090206d9901", name:"testtest", status:"none", type:["촬영"], cat:["폰트"], price:null, duration:"", leadDays:null, note:"", project:"test2", url:"https://www.notion.so/ohouse/33ea597878a080989660f090206d9901", hasFiles:false },
];

const VF_CONTACTS = {
  "이토스":       { homepage:"", phone:"", email:"", manager:"", memo:"인쇄물 전반 — 명함/쇼핑백/봉투" },
  "인타임":       { homepage:"", phone:"", email:"", manager:"", memo:"스티커 다수 불량 이력. 사용 보류" },
  "랩크리트":     { homepage:"", phone:"", email:"", manager:"", memo:"상패/굿즈 모델링·제작" },
  "㈜메이크포유": { homepage:"", phone:"", email:"", manager:"", memo:"황동 가공 — 견적만 받음" },
  "박스마스터":   { homepage:"", phone:"", email:"", manager:"", memo:"패키지 칼선/샘플 제작" },
  "LCC":          { homepage:"", phone:"", email:"", manager:"", memo:"프로덕션 촬영 (모델/스타일링/감독 포함)" },
  "단필름":       { homepage:"", phone:"", email:"", manager:"", memo:"단일 컷 빠른 촬영 가능" },
  "이도타입":     { homepage:"", phone:"", email:"", manager:"", memo:"워드마크/폰트 패밀리 개발" },
  "양장점":       { homepage:"", phone:"", email:"", manager:"", memo:"워드마크 비교 견적" },
  "조소희":       { homepage:"", phone:"", email:"", manager:"", memo:"캠페인 레터링" },
  "팟 (김현진)":  { homepage:"", phone:"", email:"", manager:"", memo:"이벤트 레터링" },
  "보담디자인":   { homepage:"", phone:"", email:"", manager:"", memo:"사이니지 + 시공 일괄" },
  "룩앤두":       { homepage:"", phone:"", email:"", manager:"", memo:"스텐실 조명형 사이니지" },
  "세원정밀":     { homepage:"", phone:"", email:"", manager:"", memo:"패키지 제작 — 라이프 바인더, 싸바리 박스" },
  "이정민 작가":  { homepage:"", phone:"", email:"", manager:"", memo:"제품 촬영 — 견적 미정" },
  "(주)테디":     { homepage:"", phone:"", email:"", manager:"", memo:"유리벽 시트 시공" },
  "레이저그라피": { homepage:"", phone:"", email:"", manager:"", memo:"스펀지 패드/소형 굿즈" },
  "해머트로피":   { homepage:"", phone:"", email:"", manager:"", memo:"어워즈 트로피 — 알루미늄 아노다이징" },
  "PAPERBELLA":   { homepage:"https://smartstore.naver.com/paperbella", phone:"", email:"", manager:"", memo:"단색 지류 봉투, 종이파일, 박 후가공" },
  "test 업체":    { homepage:"https://ohou.se/", phone:"020000000", email:"", manager:"", memo:"테스트 — 노션 동기화 검증용" },
  "테스트업첩":   { homepage:"https://naver.com", phone:"", email:"", manager:"", memo:"" },
};

let vfData = VF_SNAPSHOT.slice();
let vfState = { cat: 'all', budget: 110000000, recOnly: false };
let vfSyncSource = 'snapshot';
let vfLastSync = new Date();
let vfIsRefreshing = false;

const VF_SERVER_FALLBACKS = ['http://localhost:5173', 'http://127.0.0.1:5173'];

function vfGetContact(vendorName) {
  const v = vfData.find(d => d.name === vendorName);
  if (v && v.contact) return v.contact;
  return VF_CONTACTS[vendorName] || null;
}

function vfFmt(n) {
  if (!n) return { text: 'TBD', unset: true };
  return { text: 'KRW ' + new Intl.NumberFormat('en-US').format(n), unset: false };
}

function vfStatusBadge(s) {
  if (s === 'green') return '<span class="vf-badge vf-badge-green">Recommended</span>';
  if (s === 'orange') return '<span class="vf-badge vf-badge-orange">Quote only</span>';
  if (s === 'warn') return '<span class="vf-badge vf-badge-warn">Flagged</span>';
  return '';
}

function vfStatusBadgeBig(s) {
  if (s === 'green') return '<span class="vf-badge vf-badge-green">Recommended</span>';
  if (s === 'orange') return '<span class="vf-badge vf-badge-orange">Quote only</span>';
  if (s === 'warn') return '<span class="vf-badge vf-badge-warn">Flagged</span>';
  return '<span class="vf-badge" style="background:var(--bg-secondary);color:var(--text-tertiary)">Logged</span>';
}

const VF_ICON = {
  phone:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>',
  mail:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  link:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  user:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  ext:    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h7v7"/><path d="M13 3L6 10"/></svg>',
};

function vfRenderContact(contact) {
  if (!contact) return '<div class="vf-contact-empty">아직 등록된 연락처가 없습니다.</div>';
  const rows = [];
  if (contact.manager) rows.push(`<div class="vf-contact-row">${VF_ICON.user}<div><span class="key">담당</span>${esc(contact.manager)}</div></div>`);
  if (contact.phone) {
    const tel = contact.phone.replace(/[^0-9+]/g, '');
    rows.push(`<div class="vf-contact-row">${VF_ICON.phone}<div><span class="key">Phone</span><a href="tel:${esc(tel)}">${esc(contact.phone)}</a></div></div>`);
  }
  if (contact.email) rows.push(`<div class="vf-contact-row">${VF_ICON.mail}<div><span class="key">Email</span><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></div></div>`);
  if (contact.homepage) {
    const href = contact.homepage.startsWith('http') ? contact.homepage : `https://${contact.homepage}`;
    rows.push(`<div class="vf-contact-row">${VF_ICON.link}<div><span class="key">Homepage</span><a href="${esc(href)}" target="_blank" rel="noopener">${esc(contact.homepage.replace(/^https?:\/\//, ''))}</a></div></div>`);
  }
  const memo = contact.memo ? `<div class="vf-panel-memo">${esc(contact.memo)}</div>` : '';
  if (rows.length === 0) return `<div class="vf-contact-empty">연락처 항목이 비어 있습니다.</div>${memo}`;
  return rows.join('') + memo;
}

function vfRender() {
  const container = document.getElementById('vfResults');
  if (!container) return;

  let filtered = vfData.filter(d => {
    if (vfState.cat !== 'all' && !d.cat.includes(vfState.cat)) return false;
    if (d.price && d.price > vfState.budget && vfState.budget < 110000000) return false;
    if (vfState.recOnly && d.status !== 'green') return false;
    return true;
  });

  filtered.sort((a, b) => {
    const sOrd = { green: 0, orange: 1, none: 2, warn: 3 };
    if (sOrd[a.status] !== sOrd[b.status]) return sOrd[a.status] - sOrd[b.status];
    return (b.price || 0) - (a.price || 0);
  });

  const n = filtered.length;
  const countEl = document.getElementById('vfResultCount');
  if (countEl) countEl.innerHTML = `<span class="num">${String(n).padStart(2, '0')}</span> ${n === 1 ? 'result' : 'results'} found`;

  if (n === 0) {
    container.innerHTML = '<div class="empty-state" style="padding:60px"><p>조건에 맞는 업체가 없습니다</p></div>';
    return;
  }

  container.innerHTML = filtered.map((d, i) => {
    const isRec = d.status === 'green';
    const priceObj = vfFmt(d.price);
    return `
      <article class="vf-card${isRec ? ' recommended' : ''}" data-vendor="${esc(d.name)}" tabindex="0" role="button" aria-label="${esc(d.name)} 상세 보기">
        <div class="vf-card-top">
          <div class="vf-vendor-name-wrap">
            <span class="vf-vendor-name">${esc(d.name)}</span>
            ${vfStatusBadge(d.status)}
          </div>
          <div class="vf-card-price${priceObj.unset ? ' unset' : ''}">${priceObj.text}</div>
        </div>
        ${d.cat.length ? `<div class="vf-card-tags">${d.cat.map(c => `<span class="vf-tag">${esc(c)}</span>`).join('')}</div>` : ''}
        <div class="vf-card-meta">
          ${d.duration ? `<span><span class="vf-meta-key">Lead</span> ${esc(d.duration)}</span>` : ''}
        </div>
        ${d.note ? `<div class="vf-card-note">${esc(d.note)}</div>` : ''}
        <div class="vf-card-footer">
          <div class="vf-card-project">— ${esc(d.project)}</div>
          <a class="vf-notion-link" href="${esc(d.url)}" target="_blank" rel="noopener" data-stop="1">
            View in Notion
            ${VF_ICON.ext}
          </a>
        </div>
      </article>`;
  }).join('');

  // Sync bar
  const syncBar = document.getElementById('vfSyncBar');
  if (syncBar) {
    const time = vfLastSync.toLocaleTimeString('ko-KR', { hour:'2-digit', minute:'2-digit' });
    const dot = vfSyncSource === 'live' ? '#10b981' : '#f59e0b';
    const label = vfSyncSource === 'live' ? 'LIVE' : 'SNAPSHOT';
    syncBar.innerHTML = `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${dot}"></span> ${label} · ${time}`;
  }
}

function vfOpenPanel(vendorName) {
  const quotes = vfData.filter(d => d.name === vendorName);
  if (quotes.length === 0) return;

  const contact = vfGetContact(vendorName);
  const primaryStatus = quotes.find(q => q.status === 'green')?.status
    || quotes.find(q => q.status === 'orange')?.status
    || quotes[0].status;

  const allCats = [...new Set(quotes.flatMap(q => q.cat))];

  const historyHtml = quotes.map(q => {
    const priceObj = vfFmt(q.price);
    return `
      <div class="vf-history-item">
        <div>
          <div class="vf-history-project">${esc(q.project)}</div>
          <div class="vf-history-meta">${q.duration ? esc(q.duration) + ' · ' : ''}${q.cat.join(' / ')}</div>
        </div>
        <a class="vf-history-price${priceObj.unset ? ' unset' : ''}" href="${esc(q.url)}" target="_blank" rel="noopener" style="text-decoration:none">${priceObj.text}</a>
      </div>`;
  }).join('');

  const tagsHtml = allCats.map(t => `<span class="vf-tag">${esc(t)}</span>`).join('');

  document.getElementById('vfPanelContent').innerHTML = `
    <div class="vf-panel-header">
      <div class="vf-panel-eyebrow">
        <span>Vendor / ${quotes.length} ${quotes.length === 1 ? 'quote' : 'quotes'}</span>
        <button class="vf-panel-close" id="vfPanelCloseBtn">Close</button>
      </div>
      <h2 class="vf-panel-name">${esc(vendorName)}</h2>
      <div>${vfStatusBadgeBig(primaryStatus)}</div>
      ${tagsHtml ? `<div class="vf-panel-tags">${tagsHtml}</div>` : ''}
    </div>
    <div class="vf-panel-body">
      <section class="vf-panel-section">
        <div class="vf-panel-section-title">Contact</div>
        ${vfRenderContact(contact)}
      </section>
      <section class="vf-panel-section">
        <div class="vf-panel-section-title">History · ${quotes.length}</div>
        ${historyHtml}
      </section>
    </div>
    <div class="vf-panel-footer">
      <a class="vf-panel-cta" href="${esc(quotes[0].url)}" target="_blank" rel="noopener">
        Open first quote in Notion ${VF_ICON.ext}
      </a>
    </div>`;

  document.getElementById('vfPanel').classList.add('open');
  document.getElementById('vfPanelBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('vfPanelCloseBtn').addEventListener('click', vfClosePanel);
}

function vfClosePanel() {
  document.getElementById('vfPanel').classList.remove('open');
  document.getElementById('vfPanelBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}

async function vfTryServerFetch(base, force) {
  const path = '/api/vendors' + (force ? '?force=1' : '');
  const r = await fetch(base + path, { cache: 'no-store' });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

async function vfRefresh(opts = {}) {
  if (vfIsRefreshing) return;
  vfIsRefreshing = true;
  try {
    let next = null;
    if (location.protocol !== 'file:') {
      try { const json = await vfTryServerFetch('', opts.force); vfSyncSource = json.source === 'live' ? 'live' : 'snapshot'; next = json.vendors || []; } catch {}
    }
    if (!next) {
      for (const base of VF_SERVER_FALLBACKS) {
        try { const json = await vfTryServerFetch(base, opts.force); vfSyncSource = json.source === 'live' ? 'live' : 'snapshot'; next = json.vendors || []; break; } catch {}
      }
    }
    if (next) {
      vfData = next;
      vfLastSync = new Date();
      vfRender();
    }
  } finally { vfIsRefreshing = false; }
}

// Init vendor finder event listeners
function initVendorFinder() {
  // Category chips
  document.querySelectorAll('#vfCatFilter .vf-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#vfCatFilter .vf-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      vfState.cat = btn.dataset.val;
      vfRender();
    });
  });

  // Budget slider
  const slider = document.getElementById('vfBudgetSlider');
  const budgetVal = document.getElementById('vfBudgetVal');
  if (slider) {
    slider.addEventListener('input', () => {
      const v = parseInt(slider.value);
      vfState.budget = v;
      budgetVal.textContent = v >= 110000000 ? 'NO LIMIT' : '\u2264 ' + new Intl.NumberFormat('en-US').format(v);
      vfRender();
    });
  }

  // Rec only toggle
  const recOnly = document.getElementById('vfRecOnly');
  if (recOnly) recOnly.addEventListener('change', e => { vfState.recOnly = e.target.checked; vfRender(); });

  // Card click → panel
  const results = document.getElementById('vfResults');
  if (results) {
    results.addEventListener('click', e => {
      if (e.target.closest('[data-stop]')) return;
      const card = e.target.closest('.vf-card');
      if (card) vfOpenPanel(card.getAttribute('data-vendor'));
    });
    results.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.vf-card');
      if (!card) return;
      e.preventDefault();
      vfOpenPanel(card.getAttribute('data-vendor'));
    });
  }

  // Panel backdrop
  document.getElementById('vfPanelBackdrop')?.addEventListener('click', vfClosePanel);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') vfClosePanel(); });

  // Auto-refresh from server
  vfRefresh({ force: true });
  setInterval(() => vfRefresh(), 30000);
}

// ════════════════════════════════════════════════════
// GOOGLE CALENDAR (team view)
// ════════════════════════════════════════════════════

const GCAL_STORE_KEY = 'team_gcal_settings';

function loadGcalSettings() {
  try { return JSON.parse(localStorage.getItem(GCAL_STORE_KEY)) || {}; } catch { return {}; }
}
function saveGcalSettings(settings) { localStorage.setItem(GCAL_STORE_KEY, JSON.stringify(settings)); }

function getGcalSettings() {
  const s = loadGcalSettings();
  if (!s.calendars) s.calendars = {};
  if (!s.viewMode) s.viewMode = 'WEEK';
  if (!s.columns) s.columns = 2;
  return s;
}

// Google Calendar embed에 사용할 색상 (최대 7명)
const GCAL_COLORS = ['D50000','F4511E','F6BF26','0B8043','039BE5','7986CB','8E24AA'];

function buildGcalCombinedUrl(entries, mode) {
  const base = 'https://calendar.google.com/calendar/embed';
  const params = new URLSearchParams({
    ctz: 'Asia/Seoul',
    mode: mode || 'WEEK',
    showTitle: '0',
    showNav: '1',
    showDate: '1',
    showPrint: '0',
    showTabs: '0',
    showCalendars: '1',
    showTz: '0',
    wkst: '2',
  });
  // 여러 src & color 파라미터 추가 (URLSearchParams.append로 중복 키 가능)
  entries.forEach((e, i) => {
    params.append('src', e.calId);
    params.append('color', '#' + (GCAL_COLORS[i % GCAL_COLORS.length]));
  });
  return `${base}?${params.toString()}`;
}

function renderGcalPage() {
  const settings = getGcalSettings();
  const grid = document.getElementById('gcalGrid');
  const viewSelect = document.getElementById('gcalViewMode');
  if (!grid) return;

  if (viewSelect) viewSelect.value = settings.viewMode || 'WEEK';

  // Collect calendars that are set
  const entries = DATA.members
    .map(m => ({ member: m, calId: settings.calendars[m.id] }))
    .filter(e => e.calId);

  if (entries.length === 0) {
    grid.className = 'gcal-grid';
    grid.innerHTML = `
      <div class="gcal-empty">
        <p>팀원 Google Calendar를 추가해주세요.</p>
        <p style="font-size:12px;color:var(--text-tertiary);margin-top:8px">설정 버튼을 눌러 캘린더 ID(이메일)를 등록하면<br>여기에 모든 팀원의 일정이 표시됩니다.</p>
        <button class="btn-primary" style="margin-top:16px" onclick="openGcalSettingsModal()">캘린더 설정</button>
      </div>`;
    return;
  }

  grid.className = 'gcal-grid';

  // 범례 (팀원-색상 매핑)
  const legendHtml = entries.map((e, i) => {
    const color = '#' + GCAL_COLORS[i % GCAL_COLORS.length];
    return `<span class="gcal-legend-item">
      <span class="gcal-legend-dot" style="background:${color}"></span>
      <span class="avatar" style="width:22px;height:22px;font-size:9px;background:${e.member.color}">${e.member.name[0]}</span>
      ${esc(e.member.name.split(' ')[0])}
    </span>`;
  }).join('');

  const embedUrl = buildGcalCombinedUrl(entries, settings.viewMode);

  grid.innerHTML = `
    <div class="gcal-legend">${legendHtml}</div>
    <div class="gcal-combined-wrap">
      <iframe src="${embedUrl}" frameborder="0" scrolling="no" loading="lazy"></iframe>
    </div>`;
}

window.openGcalSettingsModal = function() {
  if (document.getElementById('gcalSettingsPopup')) return;
  const settings = getGcalSettings();

  const popup = document.createElement('div');
  popup.id = 'gcalSettingsPopup';
  popup.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:400;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)';
  popup.innerHTML = `
    <div style="background:var(--surface);border-radius:16px;padding:24px;width:520px;max-width:92vw;box-shadow:var(--shadow-lg)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <h3 style="font-size:17px;font-weight:700">팀 캘린더 설정</h3>
        <button onclick="closeGcalSettingsModal()" style="background:none;border:none;cursor:pointer;color:var(--text-tertiary);font-size:18px">\u2715</button>
      </div>
      <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:16px">각 팀원의 Google Calendar ID (Gmail 주소)를 입력하세요. 캘린더가 <strong>공개</strong>로 설정되어 있어야 임베드됩니다.</p>
      <div id="gcalSettingsList">
        ${DATA.members.map(m => `
          <div class="gcal-setting-row">
            <div class="avatar" style="background:${m.color}">${m.name[0]}</div>
            <span class="name">${esc(m.name.split(' ')[0])}</span>
            <input type="email" id="gcal_${m.id}" value="${esc(settings.calendars[m.id] || '')}" placeholder="example@gmail.com" />
          </div>
        `).join('')}
      </div>
      <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:20px">
        <button class="btn-secondary" onclick="closeGcalSettingsModal()">취소</button>
        <button class="btn-primary" onclick="saveGcalSettingsFromModal()">저장</button>
      </div>
    </div>`;
  document.body.appendChild(popup);
  popup.addEventListener('click', e => { if (e.target === popup) closeGcalSettingsModal(); });
};

window.closeGcalSettingsModal = function() {
  const el = document.getElementById('gcalSettingsPopup');
  if (el) el.remove();
};

window.saveGcalSettingsFromModal = function() {
  const settings = getGcalSettings();
  DATA.members.forEach(m => {
    const input = document.getElementById('gcal_' + m.id);
    if (input) {
      const val = input.value.trim();
      if (val) settings.calendars[m.id] = val;
      else delete settings.calendars[m.id];
    }
  });
  saveGcalSettings(settings);
  closeGcalSettingsModal();
  renderGcalPage();
  showToast('캘린더 설정이 저장되었습니다');
};

function initGcal() {
  const viewSelect = document.getElementById('gcalViewMode');
  if (viewSelect) {
    viewSelect.addEventListener('change', () => {
      const settings = getGcalSettings();
      settings.viewMode = viewSelect.value;
      saveGcalSettings(settings);
      renderGcalPage();
    });
  }
}

// ════════════════════════════════════════════════════
// LUNCH ROULETTE
// ════════════════════════════════════════════════════

const LUNCH_STORE = 'lunch_roulette_v1';
const WHEEL_COLORS = ['#6366f1','#f59e0b','#10b981','#ec4899','#3b82f6','#f97316','#8b5cf6','#14b8a6','#ef4444','#84cc16','#06b6d4','#e879f9'];

function loadLunch() {
  try { return JSON.parse(localStorage.getItem(LUNCH_STORE)) || null; } catch { return null; }
}
function saveLunch(d) { localStorage.setItem(LUNCH_STORE, JSON.stringify(d)); }

function getLunchData() {
  let d = loadLunch();
  if (!d) {
    d = {
      menus: ['김치찌개','돈까스','쌀국수','초밥','버거','파스타','칼국수','비빔밥','떡볶이','샌드위치','짜장면','냉면'],
      history: []
    };
    saveLunch(d);
  }
  return d;
}

let lunchSpinning = false;
let lunchAngle = 0;

function drawWheel() {
  const canvas = document.getElementById('lunchWheel');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const data = getLunchData();
  const menus = data.menus;
  const n = menus.length;
  if (n === 0) {
    ctx.clearRect(0, 0, 360, 360);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 15px Pretendard, Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('메뉴를 추가해주세요', 180, 185);
    return;
  }

  const cx = 180, cy = 180, r = 170;
  const arc = (2 * Math.PI) / n;

  ctx.clearRect(0, 0, 360, 360);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(lunchAngle);

  for (let i = 0; i < n; i++) {
    const startAngle = i * arc;
    const endAngle = startAngle + arc;

    // Slice
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text
    ctx.save();
    ctx.rotate(startAngle + arc / 2);
    ctx.fillStyle = '#fff';
    ctx.font = `600 ${n > 16 ? 10 : n > 10 ? 12 : 14}px Pretendard, Inter, sans-serif`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(menus[i].length > 6 ? menus[i].slice(0, 5) + '..' : menus[i], r - 16, 0);
    ctx.restore();
  }

  // Center circle
  ctx.beginPath();
  ctx.arc(0, 0, 28, 0, 2 * Math.PI);
  ctx.fillStyle = 'var(--surface, #fff)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.08)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

window.spinLunchWheel = function() {
  const data = getLunchData();
  if (data.menus.length === 0 || lunchSpinning) return;
  lunchSpinning = true;

  const btn = document.getElementById('lunchSpinBtn');
  const resultEl = document.getElementById('lunchResult');
  btn.disabled = true;
  btn.textContent = '돌아가는 중...';
  resultEl.innerHTML = '';

  const n = data.menus.length;
  const arc = (2 * Math.PI) / n;
  // Pick random winner
  const winnerIdx = Math.floor(Math.random() * n);
  // Target angle: spin several full rotations + land so that winner is at top (3 o'clock = angle 0, arrow is at right/top)
  // Arrow points right (3 o'clock). Slice i is at angle (i*arc + arc/2). We want that angle + lunchAngle ≡ 0 (mod 2π)
  const targetSliceAngle = winnerIdx * arc + arc / 2;
  const spins = 5 + Math.random() * 3; // 5~8 full spins
  const targetAngle = lunchAngle + spins * 2 * Math.PI - (targetSliceAngle + lunchAngle) % (2 * Math.PI);

  const startAngle = lunchAngle;
  const totalDelta = targetAngle - startAngle;
  const duration = 4000;
  const startTime = performance.now();

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animate(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    lunchAngle = startAngle + totalDelta * easeOutCubic(t);
    drawWheel();
    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      lunchSpinning = false;
      btn.disabled = false;
      btn.textContent = '돌리기!';
      const winner = data.menus[winnerIdx];
      resultEl.innerHTML = `<span class="lunch-result-text">오늘의 점심은 <strong>${esc(winner)}</strong>!</span>`;
      data.history.unshift({ menu: winner, date: todayStr(), time: new Date().toLocaleTimeString('ko-KR', { hour:'2-digit', minute:'2-digit' }) });
      if (data.history.length > 30) data.history.length = 30;
      saveLunch(data);
      renderLunchHistory();
    }
  }
  requestAnimationFrame(animate);
};

window.addLunchMenu = function() {
  const input = document.getElementById('lunchNewMenu');
  if (!input) return;
  const name = input.value.trim();
  if (!name) return;
  const data = getLunchData();
  if (data.menus.includes(name)) { showToast('이미 있는 메뉴입니다'); return; }
  data.menus.push(name);
  saveLunch(data);
  input.value = '';
  renderLunchMenuList();
  drawWheel();
  showToast(`"${name}" 추가됨`);
};

window.removeLunchMenu = function(name) {
  const data = getLunchData();
  data.menus = data.menus.filter(m => m !== name);
  saveLunch(data);
  renderLunchMenuList();
  drawWheel();
};

function renderLunchMenuList() {
  const container = document.getElementById('lunchMenuList');
  if (!container) return;
  const data = getLunchData();
  if (data.menus.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:16px;color:var(--text-tertiary);font-size:13px">메뉴를 추가해보세요</div>';
    return;
  }
  container.innerHTML = data.menus.map((m, i) => `
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border-light)">
      <span style="width:8px;height:8px;border-radius:50%;background:${WHEEL_COLORS[i % WHEEL_COLORS.length]};flex-shrink:0"></span>
      <span style="flex:1;font-size:14px">${esc(m)}</span>
      <button onclick="removeLunchMenu('${esc(m).replace(/'/g, "\\'")}')" style="background:none;border:none;cursor:pointer;color:var(--text-tertiary);font-size:13px;padding:2px 6px">\u2715</button>
    </div>
  `).join('');
}

function renderLunchHistory() {
  const container = document.getElementById('lunchHistory');
  if (!container) return;
  const data = getLunchData();
  if (data.history.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:16px;color:var(--text-tertiary);font-size:13px">아직 기록이 없습니다</div>';
    return;
  }
  container.innerHTML = data.history.map(h => `
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border-light)">
      <span style="font-size:18px">🍽️</span>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:600">${esc(h.menu)}</div>
        <div style="font-size:11px;color:var(--text-tertiary)">${h.date} ${h.time || ''}</div>
      </div>
    </div>
  `).join('');
}

function renderLunchPage() {
  renderLunchMenuList();
  renderLunchHistory();
  drawWheel();
}

// ════════════════════════════════════════════════════
// TEAM PROFILES
// ════════════════════════════════════════════════════

const TP_STORE = 'team_profiles_v1';
const TP_FIELDS = [
  { key:'intro',  label:'한 줄 소개', icon:'💬', placeholder:'자유롭게 한 줄!' },
  { key:'mbti',   label:'MBTI',       icon:'🧠', placeholder:'INFP' },
  { key:'hobby',  label:'취미',       icon:'🎯', placeholder:'넷플릭스, 러닝...' },
  { key:'food',   label:'최애 음식',  icon:'🍕', placeholder:'떡볶이, 초밥...' },
  { key:'tmi',    label:'TMI',        icon:'🤫', placeholder:'아무 말 대잔치' },
];

function loadProfiles() { try { return JSON.parse(localStorage.getItem(TP_STORE)) || {}; } catch { return {}; } }
function saveProfiles(d) { localStorage.setItem(TP_STORE, JSON.stringify(d)); }

function renderTeamProfiles() {
  const grid = document.getElementById('teamProfileGrid');
  if (!grid) return;
  const profiles = loadProfiles();

  grid.innerHTML = DATA.members.map(m => {
    const p = profiles[m.id] || {};
    const taskCount = DATA.tasks.filter(t => t.assignee === m.id && t.status !== 'done').length;
    const doneCount = DATA.tasks.filter(t => t.assignee === m.id && t.status === 'done').length;

    const fieldsHtml = TP_FIELDS.map(f => {
      const val = p[f.key] || '';
      return `<div class="tp-field">
        <span class="tp-field-icon">${f.icon}</span>
        <span class="tp-field-label">${f.label}</span>
        <span class="tp-field-value">${val ? esc(val) : '<span style="color:var(--text-tertiary);font-style:italic">미입력</span>'}</span>
      </div>`;
    }).join('');

    const avatarHtml = p.photo
      ? `<div class="tp-avatar-img" style="width:56px;height:56px"><img src="${p.photo}" alt="${esc(m.name)}" /></div>`
      : `<div class="avatar" style="width:56px;height:56px;font-size:20px;background:${m.color}">${m.name[0]}</div>`;

    return `
    <div class="tp-card" style="--member-color:${m.color}">
      <div class="tp-card-header">
        ${avatarHtml}
        <div class="tp-card-info">
          <div class="tp-card-name">${esc(m.name)}</div>
          <div class="tp-card-role">${esc(m.role || 'Brand Designer')}</div>
          <div class="tp-card-stats">
            <span class="tp-stat">진행 <strong>${taskCount}</strong></span>
            <span class="tp-stat">완료 <strong>${doneCount}</strong></span>
          </div>
        </div>
        <button class="tp-edit-btn" onclick="openProfileEditor('${m.id}')" title="수정">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
      </div>
      <div class="tp-card-body">${fieldsHtml}</div>
    </div>`;
  }).join('');
}

window.openProfileEditor = function(memberId) {
  if (document.getElementById('tpEditorPopup')) return;
  const m = getMember(memberId);
  if (!m) return;
  _pendingPhoto = undefined;
  const profiles = loadProfiles();
  const p = profiles[memberId] || {};

  const popup = document.createElement('div');
  popup.id = 'tpEditorPopup';
  popup.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:400;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)';
  const editorAvatarHtml = p.photo
    ? `<div class="tp-avatar-img" style="width:48px;height:48px"><img src="${p.photo}" id="tpPhotoPreview" alt="" /></div>`
    : `<div class="avatar" style="width:48px;height:48px;font-size:17px;background:${m.color}" id="tpPhotoPreview">${m.name[0]}</div>`;

  popup.innerHTML = `
    <div style="background:var(--surface);border-radius:16px;padding:24px;width:440px;max-width:92vw;box-shadow:var(--shadow-lg);max-height:90vh;overflow-y:auto">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
        ${editorAvatarHtml}
        <div>
          <h3 style="font-size:17px;font-weight:700">${esc(m.name)}</h3>
          <div style="font-size:12px;color:var(--text-tertiary)">프로필 수정</div>
        </div>
        <button onclick="closeProfileEditor()" style="margin-left:auto;background:none;border:none;cursor:pointer;color:var(--text-tertiary);font-size:18px">\u2715</button>
      </div>
      <div class="form-group">
        <label class="form-label">프로필 사진</label>
        <div class="tp-photo-upload">
          <input type="file" id="tpPhotoInput" accept="image/*" onchange="previewProfilePhoto(this)" style="display:none" />
          <button type="button" class="btn-secondary" style="font-size:12px;padding:6px 14px" onclick="document.getElementById('tpPhotoInput').click()">사진 선택</button>
          ${p.photo ? '<button type="button" class="btn-secondary" style="font-size:12px;padding:6px 14px;color:var(--danger)" onclick="removeProfilePhoto()">삭제</button>' : ''}
          <span style="font-size:11px;color:var(--text-tertiary);margin-left:4px">200KB 이하 권장</span>
        </div>
      </div>
      ${TP_FIELDS.map(f => `
        <div class="form-group">
          <label class="form-label">${f.icon} ${f.label}</label>
          <input type="text" class="form-input" id="tp_${f.key}" value="${esc(p[f.key] || '')}" placeholder="${f.placeholder}" />
        </div>
      `).join('')}
      <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px">
        <button class="btn-secondary" onclick="closeProfileEditor()">취소</button>
        <button class="btn-primary" onclick="saveProfile('${memberId}')">저장</button>
      </div>
    </div>`;
  document.body.appendChild(popup);
  popup.addEventListener('click', e => { if (e.target === popup) closeProfileEditor(); });
  document.getElementById('tp_' + TP_FIELDS[0].key)?.focus();
};

window.closeProfileEditor = function() {
  const el = document.getElementById('tpEditorPopup');
  if (el) el.remove();
};

let _pendingPhoto = undefined; // undefined=no change, null=remove, string=new data

window.previewProfilePhoto = function(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 500 * 1024) { showToast('500KB 이하 이미지를 선택해주세요'); input.value = ''; return; }
  const reader = new FileReader();
  reader.onload = function(e) {
    _pendingPhoto = e.target.result;
    const preview = document.getElementById('tpPhotoPreview');
    if (preview.tagName === 'IMG') {
      preview.src = _pendingPhoto;
    } else {
      preview.outerHTML = `<div class="tp-avatar-img" style="width:48px;height:48px"><img src="${_pendingPhoto}" id="tpPhotoPreview" alt="" /></div>`;
    }
  };
  reader.readAsDataURL(file);
};

window.removeProfilePhoto = function() {
  _pendingPhoto = null;
  const preview = document.getElementById('tpPhotoPreview');
  if (preview) {
    const wrap = preview.closest('.tp-avatar-img');
    if (wrap) wrap.outerHTML = `<div class="avatar" style="width:48px;height:48px;font-size:17px;background:var(--primary)" id="tpPhotoPreview">?</div>`;
  }
};

window.saveProfile = function(memberId) {
  const profiles = loadProfiles();
  if (!profiles[memberId]) profiles[memberId] = {};
  TP_FIELDS.forEach(f => {
    const input = document.getElementById('tp_' + f.key);
    if (input) profiles[memberId][f.key] = input.value.trim();
  });
  if (_pendingPhoto !== undefined) {
    if (_pendingPhoto === null) delete profiles[memberId].photo;
    else profiles[memberId].photo = _pendingPhoto;
  }
  _pendingPhoto = undefined;
  saveProfiles(profiles);
  closeProfileEditor();
  renderTeamProfiles();
  showToast('프로필이 저장되었습니다');
};

