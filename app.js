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
    { id: 'm_bongho', name: 'Bongho Choi', role: '', color: '#f472b6' },
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
  const titles = { dashboard: '대시보드', tasks: '업무 현황', projects: '프로젝트', calendar: '캘린더', notes: '메모' };
  document.getElementById('pageTitle').textContent = titles[page] || page;
  if (page === 'tasks') { renderKanban(); renderMemberFilter(); }
  if (page === 'projects') renderProjectsPage();
  if (page === 'notes') renderNotesPage();
  if (page === 'calendar') renderCalendar();
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
  document.getElementById('openAddNoteModal').addEventListener('click', () => openNoteModal());
  document.getElementById('closeAddNoteModal').addEventListener('click', () => closeModal('addNoteModal'));
  document.getElementById('cancelAddNote').addEventListener('click', () => closeModal('addNoteModal'));
  document.getElementById('confirmAddNote').addEventListener('click', saveNoteFromModal);
  noteModal.addEventListener('click', e => { if (e.target === noteModal) closeModal('addNoteModal'); });
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
  document.getElementById('prevMonth').addEventListener('click', () => { calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; } renderCalendar(); });
  document.getElementById('nextMonth').addEventListener('click', () => { calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; } renderCalendar(); });
  document.getElementById('addEventBtn').addEventListener('click', addEventFromForm);
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
