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
    { id: 'm_joe', name: 'Joe Jo', role: 'Brand Designer', color: '#fb923c' },
    { id: 'm_dana', name: 'Dana Kim', role: 'Brand Language Designer', color: '#a78bfa' },
    { id: 'm_leezen', name: 'Zen Lee', role: 'Content & Brand Designer', color: '#38bdf8' },
    { id: 'm_ben', name: 'Ben Park', role: 'Brand Designer', color: '#34d399' },
    { id: 'm_luka', name: 'Luka Jung', role: 'Graphic Designer', color: '#fbbf24' },
    { id: 'm_june', name: 'June Kim', role: 'PB Designer', color: '#f87171' },
    { id: 'm_sarah', name: 'Sarah Kim', role: 'Brand Designer', color: '#818cf8' },
  ];

  // ────────── Source: Notion Weekly (가이드 샘플) ──────────
  const tasks = [
    // ── Dana ──
    { id: 'd_home_video_copy', title: '[Home] 홈 개편 안내 영상 스토리보드 카피라이팅', desc: 'w/ Ben & Luka', assignee: 'm_dana', status: 'ongoing', priority: 'high', size: 'L', due: '', requester: 'Home', createdAt: Date.now() },
    { id: 'd_writingbot', title: '[Team] 라이팅봇 클로드 확장', desc: '', assignee: 'm_dana', status: 'ongoing', priority: 'high', size: 'M', due: '2026-04-16', requester: 'Team', createdAt: Date.now() },
    { id: 'd_cnc_reviewname', title: '[Content] 실사용 리뷰명, 리뷰어 명칭', desc: '', assignee: 'm_dana', status: 'ongoing', priority: 'medium', size: 'M', due: '', requester: 'content', createdAt: Date.now() },
    { id: 'd_money_naming', title: '[Commerce] 오늘의집 머니 네이밍 논의', desc: '', assignee: 'm_dana', status: 'almostdone', priority: 'medium', size: 'S', due: '', requester: 'commerce', createdAt: Date.now() },
    { id: 'd_point_voc', title: '[Team] 포인트 소멸 안내 푸시 VoC 처리', desc: '', assignee: 'm_dana', status: 'done', priority: 'medium', size: 'S', due: '2026-04-22', requester: 'Team', createdAt: Date.now() },

    // ── Joe ──
    { id: 'j_neulshin_pdp', title: '[Commerce] 늘신선 상세페이지 제작', desc: '', assignee: 'm_joe', status: 'ongoing', priority: 'high', size: 'L', due: '', requester: 'commerce', createdAt: Date.now() },
    { id: 'j_o2o_light', title: '[O2O] 라이트 멤버쉽 소개 자료 제작', desc: '', assignee: 'm_joe', status: 'ready', priority: 'medium', size: 'L', due: '', requester: 'O2O', createdAt: Date.now() },
    { id: 'j_pangyo', title: '[O2O] 판교라운지 시트지 설치 및 제작물 발주', desc: '', assignee: 'm_joe', status: 'ongoing', priority: 'high', size: 'L', due: '2026-04-17', requester: 'O2O', createdAt: Date.now() },

    // ── Luka ──
    { id: 'l_home_video', title: '[Home] 홈개편 소개 영상 제작', desc: 'w/ Ben & Dana', assignee: 'm_luka', status: 'ongoing', priority: 'high', size: 'XL', due: '2026-04-13', requester: 'Home', createdAt: Date.now() },
    { id: 'l_category_assets', title: '[Home] 홈개편 카테고리 에셋 적용', desc: '', assignee: 'm_luka', status: 'done', priority: 'medium', size: 'S', due: '2026-04-14', requester: 'Home', createdAt: Date.now() },
    { id: 'l_delivery_kv', title: '[Commerce] 원하는날 도착 배송트럭 KV 제작', desc: '', assignee: 'm_luka', status: 'ready', priority: 'medium', size: 'M', due: '2026-04-15', requester: 'commerce', createdAt: Date.now() },
    { id: 'l_o2o_video', title: '[O2O] 사장님센터 랜딩페이지 서비스 소개 영상', desc: 'w/ Dana', assignee: 'm_luka', status: 'ready', priority: 'high', size: 'L', due: '2026-04-17', requester: 'O2O', createdAt: Date.now() },
    { id: 'l_ai_icon_blog', title: '[Team] 홈개편 카테고리 아이콘 AI 활용 개편 & 블로그글 작성', desc: '', assignee: 'm_luka', status: 'ongoing', priority: 'medium', size: 'M', due: '2026-04-22', requester: 'Team', createdAt: Date.now() },
    { id: 'l_hi_proto_blog', title: '[Team] AI를 활용한 Hi-Prototype 제작기 블로그 그래픽 제작', desc: '', assignee: 'm_luka', status: 'ongoing', priority: 'medium', size: 'M', due: '2026-04-13', requester: 'Team', createdAt: Date.now() },

    // ── Ben ──
    { id: 'b_welcome_kit', title: '[PnC] 웰컴키트', desc: '', assignee: 'm_ben', status: 'ongoing', priority: 'medium', size: 'M', due: '2026-04-13', requester: 'content', createdAt: Date.now() },
    { id: 'b_nukten', title: '[Commerce] 연합브랜드 눅텐 브랜딩', desc: '', assignee: 'm_ben', status: 'ongoing', priority: 'high', size: 'XL', due: '2026-04-16', requester: 'commerce', createdAt: Date.now() },
    { id: 'b_large_store', title: '[Commerce] 오늘의집 대형 매장 브랜드 경험 제안', desc: 'w/ June', assignee: 'm_ben', status: 'ongoing', priority: 'high', size: 'L', due: '', requester: 'commerce', createdAt: Date.now() },
    { id: 'b_life_binder', title: '[Team] 라이프 바인더', desc: '', assignee: 'm_ben', status: 'almostdone', priority: 'medium', size: 'S', due: '2026-04-20', requester: 'Team', createdAt: Date.now() },
    { id: 'b_special_creator', title: '[Team] 스페셜크리에이터', desc: '', assignee: 'm_ben', status: 'almostdone', priority: 'medium', size: 'S', due: '', requester: 'Team', createdAt: Date.now() },
    { id: 'b_home_video_help', title: '[Home] 홈 개편 영상 도움', desc: '', assignee: 'm_ben', status: 'ongoing', priority: 'medium', size: 'M', due: '', requester: 'Home', createdAt: Date.now() },

    // ── June ──
    { id: 'u_fabric_popup', title: '[offline] 1F 패브릭 팝업', desc: '', link: 'https://www.figma.com/design/cuLuTyZ5nd9SbKk2W3j1o6/%EC%B8%B5%EB%B3%84-%EC%A0%84%EC%8B%9C-%ED%94%8C%EB%9E%98%EB%8B%9D?node-id=1065-5492', assignee: 'm_june', status: 'ongoing', priority: 'high', size: 'L', due: '', requester: 'offline', createdAt: Date.now() },
    { id: 'u_giheung', title: '[offline] 기흥 오프라인 매장 브랜딩 프로젝트', desc: '', assignee: 'm_june', status: 'ongoing', priority: 'medium', size: 'L', due: '2026-04-14', requester: 'offline', createdAt: Date.now() },
    { id: 'u_3f_house', title: '[offline] 3F 올해의집', desc: '', assignee: 'm_june', status: 'done', priority: 'medium', size: 'L', due: '2026-04-15', requester: 'offline', createdAt: Date.now() },
    { id: 'u_download_sarah', title: '[Commerce] 업무 다운로드 w/ Sarah', desc: '', assignee: 'm_june', status: 'ready', priority: 'medium', size: 'S', due: '2026-04-16', requester: 'commerce', createdAt: Date.now() },

    // ── Zen ──
    { id: 'z_cnc_visit', title: '[Content] 전국내방자랑 리뉴얼', desc: '', assignee: 'm_leezen', status: 'ongoing', priority: 'medium', size: 'L', due: '2026-04-16', requester: 'content', createdAt: Date.now() },

    // ── Sarah ──
    { id: 's_download', title: '[Commerce] 업무 다운로드', desc: '', assignee: 'm_sarah', status: 'ongoing', priority: 'medium', size: 'L', due: '2026-04-13', requester: 'commerce', createdAt: Date.now() },
  ];

  const schedules = [
    { id: 's1', member: 'm_dana', text: '4/17(금) 오후 반차', date: '2026-04-17' },
    { id: 's2', member: 'm_ben', text: '4/21(화) 연차', date: '2026-04-21' },
    { id: 's3', member: 'm_luka', text: '4/20(월) ~ 4/27(월) 연차', date: '2026-04-20' },
  ];

  return {
    members,
    tasks,
    projects: [],
    events: [],
    notes: [],
    activity: [{ id: 'a0', message: '주간 업무 데이터가 동기화되었습니다', time: Date.now() }],
    schedules,
    teamEvents: [
      { id: 'te_lemonbase', title: '레몬베이스', desc: '', date: '2026-04-29', time: '', emoji: '🍋' },
      { id: 'te_dinner', title: '팀 회식', desc: '', date: '2026-05-14', time: '', emoji: '🍻' }
    ],
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

// ────────── Dashboard Hero ──────────
function renderDashHero() {
  const el = document.getElementById('dashHero');
  if (!el) return;
  const d = new Date();
  const days = ['일','월','화','수','목','금','토'];
  const dateStr = `${d.getFullYear()}. ${String(d.getMonth()+1).padStart(2,'0')}. ${String(d.getDate()).padStart(2,'0')} (${days[d.getDay()]})`;

  el.innerHTML = `
    <div class="dash-hero-date">${esc(dateStr)}</div>
  `;
}

// ────────── Daily Mood Banner ──────────
const MOOD_MESSAGES = [
  // 따뜻한 버전
  { emoji: '☀️', text: '좋은 아침이에요. 오늘도 만나서 반가워요.' },
  { emoji: '☕', text: '따뜻한 거 한 잔 마시면서 천천히 시작해요.' },
  { emoji: '🌿', text: '오늘은 어제보다 조금만 더 가볍게 가봐요.' },
  { emoji: '✨', text: '오늘도 더 좋은 하루가 될 거예요.' },
  { emoji: '🍀', text: '오늘은 작은 행운들이 살며시 찾아올 거예요.' },
  { emoji: '🌻', text: '햇살처럼 포근한 하루 보내세요.' },
  { emoji: '🌸', text: '스스로에게 조금 더 다정하게 대해줘요.' },
  { emoji: '🕊️', text: '숨 한 번 크게 쉬고 오늘도 잘 부탁해요.' },
  { emoji: '🌟', text: '오늘도 충분히 잘하고 있어요.' },
  { emoji: '🎀', text: '오늘 기분 좋은 일이 꼭 하나 있을 거예요.' },
  // 드립/웃긴 버전
  { emoji: '👑', text: '오늘 출근 성공한 것만으로 이미 레전드예요.' },
  { emoji: '🫣', text: '알람 몇 번 만에 일어났는지 우리는 다 알아요.' },
  { emoji: '😎', text: '오늘 아침 거울 잠깐 봤죠? 네 맞아요, 잘생겼어요.' },
  { emoji: '🫂', text: '월요일은 다 같이 힘든 거예요. 혼자 아니에요.' },
  { emoji: '🍙', text: '지금 배고프면 이미 점심 생각 중인 겁니다.' },
  { emoji: '⏰', text: '퇴근까지 카운트다운 시작. 무사히 가면 1승이에요.' },
  { emoji: '💸', text: '월급이 쏜살같아도 다음 월급은 꼭 옵니다.' },
  { emoji: '🧃', text: '오늘 커피는 따뜻? 아이스? 정답은 둘 다예요.' },
  { emoji: '🙏', text: '오늘 회의 끝나고 또 회의 아니길 기도합니다.' },
  { emoji: '🛌', text: '오늘 하루는 사건사고 없이 무사히. 그게 최고의 성과예요.' },
  { emoji: '🏆', text: '출근한 당신이 오늘의 MVP. 이견 없습니다.' },
  { emoji: '😴', text: '오전 집중력은 다음 주쯤 찾으러 가볼게요.' },
  { emoji: '🫠', text: '지금 이 화면 보는 것만으로도 일하는 겁니다.' },
  { emoji: '🥐', text: '오늘 하루의 목표: 맛있는 거 하나 먹기.' },
  { emoji: '🎲', text: '오늘 운세: "대체로 괜찮음". 나쁘지 않아요.' },
  { emoji: '🚀', text: '모니터 앞에 앉은 순간 이미 로켓은 발사됐어요.' },
  { emoji: '🧘', text: '심호흡 세 번. 이메일은 그 다음에 열어도 늦지 않아요.' },
  { emoji: '🧋', text: '오후 3시 당도 보충은 필수입니다. 강력 권장.' },
  { emoji: '🕺', text: '오늘 퇴근하면 제자리에서 한 번 춤춰봐요. 진짜로.' },
  { emoji: '🍜', text: '점심 뭐 먹을지가 오늘의 최대 고민이면 잘 가고 있는 거예요.' },
];

const MOVIE_PICKS = [
  '기생충','올드보이','인터스텔라','라라랜드','어바웃 타임','매트릭스','인셉션',
  '그랜드 부다페스트 호텔','시네마 천국','소울','인사이드 아웃','너의 이름은',
  '센과 치히로의 행방불명','마녀 배달부 키키','하울의 움직이는 성','원스',
  '500일의 썸머','노팅 힐','비포 선라이즈','이터널 선샤인','미드나잇 인 파리',
  '어바웃 어 보이','어벤져스: 엔드게임','해리포터와 마법사의 돌','주토피아',
  '월-E','토이 스토리','코코','업','라따뚜이','하이큐!! 극장판','스파이더맨: 뉴 유니버스'
];

const BOOK_PICKS = [
  { title: '코스모스', author: '칼 세이건' },
  { title: '사피엔스', author: '유발 하라리' },
  { title: '데미안', author: '헤르만 헤세' },
  { title: '어린 왕자', author: '생텍쥐페리' },
  { title: '1984', author: '조지 오웰' },
  { title: '모순', author: '양귀자' },
  { title: '아몬드', author: '손원평' },
  { title: '불편한 편의점', author: '김호연' },
  { title: '달러구트 꿈 백화점', author: '이미예' },
  { title: '미드나잇 라이브러리', author: '매트 헤이그' },
  { title: '소년이 온다', author: '한강' },
  { title: '페스트', author: '알베르 카뮈' },
  { title: '호밀밭의 파수꾼', author: 'J.D. 샐린저' },
  { title: '총, 균, 쇠', author: '재레드 다이아몬드' },
  { title: '아주 작은 습관의 힘', author: '제임스 클리어' },
  { title: '부의 추월차선', author: 'MJ 드마코' },
  { title: '도둑맞은 집중력', author: '요한 하리' },
  { title: '세이노의 가르침', author: '세이노' },
  { title: '아무튼, 요가', author: '박상영' },
  { title: '급류', author: '정대건' },
];

function renderMoodBanner() {
  const el = document.getElementById('moodBanner');
  if (!el) return;

  const pool = ['mood','mood','mood','mood','movie','book'];
  const type = pool[Math.floor(Math.random() * pool.length)];

  let emoji, text;
  if (type === 'movie') {
    const movie = MOVIE_PICKS[Math.floor(Math.random() * MOVIE_PICKS.length)];
    emoji = '🎬';
    text = `오늘 퇴근하고 '${movie}' 어때요?`;
  } else if (type === 'book') {
    const book = BOOK_PICKS[Math.floor(Math.random() * BOOK_PICKS.length)];
    emoji = '📚';
    text = `오늘의 책 한 권 — '${book.title}' (${book.author})`;
  } else {
    const msg = MOOD_MESSAGES[Math.floor(Math.random() * MOOD_MESSAGES.length)];
    emoji = msg.emoji;
    text = msg.text;
  }

  el.innerHTML = `
    <span class="mood-banner-emoji" aria-hidden="true">${emoji}</span>
    <span class="mood-banner-text">${esc(text)}</span>
  `;
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
  const titles = { dashboard: '대시보드', tasks: '업무 현황', calendar: '업무 캘린더', works: 'Works', lunch: '오늘 점심 뭐먹지?', vendor: '협력업체 파인더', team: '팀원 소개' };
  document.getElementById('pageTitle').textContent = titles[page] || page;
  if (page === 'tasks') { renderKanban(); renderMemberFilter(); }
  if (page === 'projects') renderProjectsPage();
  if (page === 'calendar') { renderCalendar(); renderOKRPage('okrContentInCalendar'); }
  if (page === 'lunch') renderLunchPage();
  if (page === 'vendor') vfRender();
  if (page === 'team') renderTeamProfiles();
  if (page === 'works') renderWorksPage();
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
  renderDashHero();
  renderMoodBanner();
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

  const urgent = DATA.tasks
    .filter(t => t.due && t.status !== 'done' && t.due === today)
    .sort((a, b) => (a.assignee || '').localeCompare(b.assignee || ''));

  if (urgent.length === 0) {
    container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-tertiary);font-size:13px">오늘 마감 업무 없음</div>';
    return;
  }

  container.innerHTML = urgent.map(t => `
    <div style="display:flex;align-items:center;gap:10px;padding:10px 20px;border-bottom:1px solid var(--border-light)">
      <span style="font-size:14px">⏰</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(t.title)}</div>
      </div>
      <span style="font-size:12px;color:var(--text-secondary);flex-shrink:0">${esc(getFirstName(t.assignee))}</span>
    </div>`).join('');
}

// ────────── Weekly Summary ──────────
function getWeekRange(offset = 0) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0=Sun
  const mondayOffset = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + mondayOffset + offset * 7);
  const start = new Date(d);
  const end = new Date(d);
  end.setDate(end.getDate() + 6);
  const fmt = x => `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`;
  return { start: fmt(start), end: fmt(end), startDate: start, endDate: end };
}

function renderWeeklySummary() {
  const container = document.getElementById('weeklySummary');
  if (!container) return;

  const week = getWeekRange(0);
  const lastWeek = getWeekRange(-1);
  const t = DATA.tasks;

  const inRange = (date, r) => date && date >= r.start && date <= r.end;

  // due in this week (regardless of status)
  const dueThisWeek = t.filter(x => inRange(x.due, week));
  const dueDone = dueThisWeek.filter(x => x.status === 'done').length;
  const dueRemaining = dueThisWeek.length - dueDone;

  // ongoing/almostdone snapshot
  const inProgress = t.filter(x => x.status === 'ongoing' || x.status === 'almostdone').length;

  // new this week (createdAt within range)
  const newThisWeek = t.filter(x => {
    if (!x.createdAt) return false;
    return x.createdAt >= week.startDate.getTime() && x.createdAt <= week.endDate.getTime() + 86400000;
  }).length;

  // last-week comparison: how many tasks had due last week & still not done
  const lastWeekDue = t.filter(x => inRange(x.due, lastWeek)).length;
  const delta = dueThisWeek.length - lastWeekDue;
  const deltaLabel = delta === 0 ? '지난 주와 동일' : (delta > 0 ? `지난 주 대비 +${delta}` : `지난 주 대비 ${delta}`);

  const fmtRange = `${week.startDate.getMonth()+1}/${week.startDate.getDate()} ~ ${week.endDate.getMonth()+1}/${week.endDate.getDate()}`;

  // weekday distribution
  const dayLabels = ['월','화','수','목','금','토','일'];
  const dayCounts = [0,0,0,0,0,0,0];
  dueThisWeek.forEach(x => {
    const d = new Date(x.due + 'T00:00:00');
    const idx = (d.getDay() + 6) % 7; // Mon=0
    dayCounts[idx]++;
  });
  const maxDay = Math.max(...dayCounts, 1);
  const todayIdx = (new Date().getDay() + 6) % 7;

  container.innerHTML = `
    <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px">
      <div style="font-size:13px;font-weight:700;color:var(--text-primary)">이번 주 <span style="color:var(--text-tertiary);font-weight:500;margin-left:4px">${fmtRange}</span></div>
      <div style="font-size:11px;color:var(--text-tertiary)">${esc(deltaLabel)}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
      <div class="ws-metric">
        <div class="ws-metric-value">${dueRemaining}<span class="ws-metric-suffix">/${dueThisWeek.length}</span></div>
        <div class="ws-metric-label">이번 주 마감 (남은 / 전체)</div>
      </div>
      <div class="ws-metric">
        <div class="ws-metric-value" style="color:#059669">${dueDone}</div>
        <div class="ws-metric-label">이번 주 마감 중 완료</div>
      </div>
      <div class="ws-metric">
        <div class="ws-metric-value" style="color:${STATUS_COLORS.ongoing}">${inProgress}</div>
        <div class="ws-metric-label">진행 중 + Almost Done</div>
      </div>
      <div class="ws-metric">
        <div class="ws-metric-value" style="color:var(--primary)">${newThisWeek}</div>
        <div class="ws-metric-label">이번 주 새로 추가</div>
      </div>
    </div>
    <div>
      <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:6px;font-weight:600">요일별 마감 분포</div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">
        ${dayLabels.map((lbl, i) => {
          const h = Math.round((dayCounts[i] / maxDay) * 28) + 4;
          const isToday = i === todayIdx;
          return `
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
            <div style="width:100%;height:32px;display:flex;align-items:flex-end">
              <div style="width:100%;height:${h}px;background:${dayCounts[i] ? (isToday ? 'var(--primary)' : STATUS_COLORS.ongoing) : 'var(--border)'};border-radius:3px"></div>
            </div>
            <div style="font-size:10px;color:${isToday ? 'var(--primary)' : 'var(--text-tertiary)'};font-weight:${isToday ? '700' : '500'}">${lbl}</div>
            <div style="font-size:10px;color:var(--text-tertiary)">${dayCounts[i] || ''}</div>
          </div>`;
        }).join('')}
      </div>
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
        if (m.activeWeight >= 20) emoji = '🤬';
        else if (m.activeWeight >= 15) emoji = '😡';
        else if (m.activeWeight >= 10) emoji = '😰';
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
  const c = {};
  STATUSES.forEach(s => c[s] = t.filter(x => x.status === s).length);
  const total = t.length;
  const donePct = total ? Math.round(c.done / total * 100) : 0;

  document.getElementById('teamSummary').innerHTML = `
    <div class="summary-pill">
      <span style="font-weight:600;color:var(--text-secondary)">전체</span>
      <span class="pill-value">${total}건</span>
    </div>
    <div class="summary-pill summary-pill--primary" aria-label="진행 중 업무 수">
      <div class="pill-dot" style="background:${STATUS_COLORS.ongoing}"></div>
      <span>Ongoing</span>
      <span class="pill-value">${c.ongoing}건</span>
    </div>
    <div class="summary-pill">
      <div class="pill-dot" style="background:${STATUS_COLORS.ready}"></div>
      <span>Ready</span>
      <span class="pill-value">${c.ready + (c.new || 0)}건</span>
    </div>
    <div class="summary-pill">
      <div class="pill-dot" style="background:${STATUS_COLORS.almostdone}"></div>
      <span>Almost Done</span>
      <span class="pill-value">${c.almostdone}건</span>
    </div>
    <div class="summary-pill">
      <div class="pill-dot" style="background:${STATUS_COLORS.done}"></div>
      <span>Done</span>
      <span class="pill-value">${c.done}건</span>
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

  const sorted = [...DATA.schedules].sort((a, b) => (a.date || '').localeCompare(b.date || ''));

  container.innerHTML = sorted.map(s => {
    const isPast = s.date && s.date < todayStr();
    const name = getFirstName(s.member);
    const cleanText = s.date
      ? s.text.replace(/^[\d/().\s~월화수목금토일-]+/, '').trim() || s.text
      : s.text;
    return `
    <div style="display:flex;align-items:center;gap:10px;padding:10px 20px;border-bottom:1px solid var(--border-light);${isPast ? 'opacity:.45' : ''}">
      <div style="flex:1;min-width:0;font-size:14px;display:flex;align-items:baseline;gap:8px">
        <span style="color:var(--text-primary);flex-shrink:0">${esc(name)}</span>
        <span style="color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(cleanText)}</span>
      </div>
      ${s.date ? `<div style="font-size:13px;color:var(--text-secondary);flex-shrink:0">${fmtDateFull(s.date)}</div>` : ''}
      <button onclick="deleteSchedule('${s.id}')" style="background:none;border:none;cursor:pointer;color:var(--text-tertiary);font-size:12px;flex-shrink:0">✕</button>
    </div>`;
  }).join('');
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
        ${e.date ? `<div style="font-size:13px;color:var(--text-secondary)">${fmtDateFull(e.date)}</div>` : ''}
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
          <div class="kanban-card-title" style="margin:0;display:flex;align-items:center;gap:6px;flex:1;min-width:0">
            <span style="overflow:hidden;text-overflow:ellipsis">${esc(t.title)}</span>
            ${t.link ? `<a href="${esc(t.link)}" target="_blank" rel="noopener" title="원본 링크" aria-label="원본 링크 열기" onclick="event.stopPropagation()" style="color:var(--text-tertiary);flex-shrink:0;display:inline-flex">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </a>` : ''}
          </div>
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
let vfState = { cat: 'all', budget: 110000000, recOnly: false, search: '' };
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

  const q = vfState.search.toLowerCase();

  // Filter individual quotes
  let filtered = vfData.filter(d => {
    if (vfState.cat !== 'all' && !d.cat.includes(vfState.cat)) return false;
    if (d.price && d.price > vfState.budget && vfState.budget < 110000000) return false;
    if (vfState.recOnly && d.status !== 'green') return false;
    if (q && !d.name.toLowerCase().includes(q) && !d.project.toLowerCase().includes(q)) return false;
    return true;
  });

  // Group by vendor name
  const groupMap = new Map();
  filtered.forEach(d => {
    if (!groupMap.has(d.name)) groupMap.set(d.name, []);
    groupMap.get(d.name).push(d);
  });

  // Sort groups
  const sOrd = { green: 0, orange: 1, none: 2, warn: 3 };
  const groups = [...groupMap.entries()].map(([name, quotes]) => {
    const bestStatus = quotes.reduce((best, q) => sOrd[q.status] < sOrd[best] ? q.status : best, 'warn');
    const totalPrice = quotes.reduce((sum, q) => sum + (q.price || 0), 0);
    const allCats = [...new Set(quotes.flatMap(q => q.cat))];
    return { name, quotes, bestStatus, totalPrice, allCats };
  });
  groups.sort((a, b) => {
    if (sOrd[a.bestStatus] !== sOrd[b.bestStatus]) return sOrd[a.bestStatus] - sOrd[b.bestStatus];
    return b.totalPrice - a.totalPrice;
  });

  const n = groups.length;
  const totalQuotes = filtered.length;
  const countEl = document.getElementById('vfResultCount');
  if (countEl) countEl.innerHTML = `<span class="num">${String(n).padStart(2, '0')}</span> ${n === 1 ? 'vendor' : 'vendors'} · ${totalQuotes} quotes`;

  if (n === 0) {
    container.innerHTML = '<div class="empty-state" style="padding:60px"><p>조건에 맞는 업체가 없습니다</p></div>';
    return;
  }

  container.innerHTML = groups.map((g, i) => {
    const isRec = g.bestStatus === 'green';
    const projectSummary = g.quotes.length <= 2
      ? g.quotes.map(q => q.project).join(', ')
      : g.quotes.slice(0, 2).map(q => q.project).join(', ') + ` 외 ${g.quotes.length - 2}건`;
    const priceRange = vfPriceRange(g.quotes);
    const hasFiles = g.quotes.some(q => q.hasFiles);
    const hasPreview = g.quotes.some(q => q.hasPreview);

    return `
      <article class="vf-card${isRec ? ' recommended' : ''}" data-vendor="${esc(g.name)}" tabindex="0" role="button" aria-label="${esc(g.name)} 상세 보기" style="animation-delay:${i * 0.04}s">
        <div class="vf-card-top">
          <div class="vf-vendor-name-wrap">
            <span class="vf-vendor-name">${esc(g.name)}</span>
            ${vfStatusBadge(g.bestStatus)}
            ${g.quotes.length > 1 ? `<span class="vf-quote-count">${g.quotes.length} quotes</span>` : ''}
          </div>
          <div class="vf-card-price">${priceRange}</div>
        </div>
        ${g.allCats.length ? `<div class="vf-card-tags">${g.allCats.map(c => `<span class="vf-tag">${esc(c)}</span>`).join('')}</div>` : ''}
        <div class="vf-card-note">${esc(projectSummary)}</div>
        <div class="vf-card-footer">
          <div class="vf-card-files">
            ${hasFiles ? '<span class="vf-file-indicator"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> 견적서</span>' : ''}
            ${hasPreview ? '<span class="vf-file-indicator"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> 결과물</span>' : ''}
          </div>
          <a class="vf-notion-link" href="${esc(g.quotes[0].url)}" target="_blank" rel="noopener" data-stop="1">
            Notion ${VF_ICON.ext}
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

function vfPriceRange(quotes) {
  const prices = quotes.map(q => q.price).filter(Boolean);
  if (prices.length === 0) return '<span style="color:var(--text-tertiary)">TBD</span>';
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const fmt = n => new Intl.NumberFormat('ko-KR').format(n);
  if (min === max) return `<span style="color:var(--primary);font-weight:600">₩${fmt(min)}</span>`;
  return `<span style="color:var(--primary);font-weight:600">₩${fmt(min)} ~ ${fmt(max)}</span>`;
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
    const fileLinks = [];
    if (q.hasFiles) fileLinks.push(`<a class="vf-file-link" href="${esc(q.url)}" target="_blank" rel="noopener"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> 견적서 보기</a>`);
    if (q.hasPreview) fileLinks.push(`<a class="vf-file-link vf-file-preview" href="${esc(q.url)}" target="_blank" rel="noopener"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> 결과물 보기</a>`);
    return `
      <div class="vf-history-item">
        <div style="flex:1;min-width:0">
          <div class="vf-history-project">${esc(q.project)}</div>
          <div class="vf-history-meta">${q.duration ? esc(q.duration) + ' · ' : ''}${q.cat.join(' / ')}${q.note ? ' · ' + esc(q.note) : ''}</div>
          ${fileLinks.length ? `<div class="vf-history-files">${fileLinks.join('')}</div>` : ''}
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
  // Search
  const searchInput = document.getElementById('vfSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      vfState.search = searchInput.value.trim();
      vfRender();
    });
  }

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
const WHEEL_COLORS = ['#f1f5f9','#e2e8f0'];

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
    ctx.strokeStyle = 'rgba(148,163,184,.35)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Text
    ctx.save();
    ctx.rotate(startAngle + arc / 2);
    ctx.fillStyle = '#334155';
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
  // Random target: 5~8 full spins + random offset
  const spins = 5 + Math.random() * 3;
  const randomOffset = Math.random() * 2 * Math.PI;
  const startAngle = lunchAngle;
  const targetAngle = lunchAngle + spins * 2 * Math.PI + randomOffset;
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
      btn.textContent = '메뉴 뽑기';
      // Derive winner from the ACTUAL final angle
      // Arrow points at canvas angle 0 (3 o'clock).
      // A slice i's original range is [i*arc, (i+1)*arc]. After rotation by lunchAngle,
      // the angle under the arrow relative to the unrotated wheel is (-lunchAngle) mod 2π.
      const angleUnderArrow = ((-lunchAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const winnerIdx = Math.floor(angleUnderArrow / arc) % n;
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
      ? `<div class="tp-avatar-img" style="width:84px;height:84px"><img src="${p.photo}" alt="${esc(m.name)}" /></div>`
      : `<div class="avatar" style="width:84px;height:84px;font-size:28px;background:${m.color}">${m.name[0]}</div>`;

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

// ════════════════════════════════════════════════════
// OKR (26 H1 Brand eXperience Design)
// ════════════════════════════════════════════════════

const OKR_DATA = {
  period: '2026 H1',
  mission: '비즈니스(브랜드) 성장의 단단한 토대(Foundation)로서 전사 목표를 능동적으로 견인하고, 강제하지 않아도 선택받는 경험과 디자인 기준을 만든다.',
  principles: [
    '팀 과업을 넘어, 전사의 목표 달성과 성장에 능동적으로 기여한다.',
    '모든 협업에서 시너지와 성과로 이어지는 명확한 경험을 제공한다.',
    '누구나 쉽게 이해하고 적용할 수 있는 직관적인 기준을 만든다.',
    '기준은 통제 수단이 아닌, 업무 효율을 높이는 검증된 도구로서 자발적으로 사용되도록 설계한다.',
  ],
  groups: [
    {
      name: 'Brand Design',
      tagline: '브랜드 철학을 실제 경험으로 구현하고, 완성된 경험을 브랜드 자산으로 축적·확장한다.',
      okrs: [
        {
          priority: 'high',
          title: 'OKR 1. 과업의 성공을 견인하며, 이를 지속 가능한 기준으로 만든다',
          tag: '전방위 브랜드 아이덴티티 확산',
          objective: '전사 핵심 과업의 성공을 주도적으로 견인하며, 실행의 과정을 지속 가능한 브랜드 자산과 기준으로 축적한다.',
          krs: [
            { title: 'KR 1. O2O 시공 서비스 통합 브랜드 가이드 정립', desc: '파편화된 시공 서비스 경험을 브랜드 관점으로 재정의하고, 쇼룸·Standard Material·인앱 경험에 일관된 기준 적용' },
            { title: 'KR 2. 대형 오프라인 브랜드 경험 프레임워크 구축', desc: '카테고리 & 브랜드 쇼룸·팝업의 기획 초기부터 브랜드 경험 가치를 이식, 재사용 가능한 공간 디자인 원칙 정의' },
            { title: 'KR 3. 멤버십·글린다 브랜드/프로모션 아이덴티티 정립', desc: '오늘의집 안에서의 성격과 역할을 정의하고, 과도한 할인/행사 인상으로 흐르지 않도록 기준 수립' },
            { title: 'KR 4. 빅 프로모션 시각 체계 기준 정립', desc: '디자인어워드·집요한세일·미식백선 등에서 \'오늘의집다움\' 공통 디자인 요소 도출, Quality Standard 정의' },
            { title: 'KR 5. 인터널 브랜드의 효율과 효과 개선', desc: '사내 캠페인·공지·스테이셔너리·행사에 \'오늘의집다움\' 공통 시각 자산 개발, 변주 가능한 기준 수립' },
            { title: 'KR 6. 익스클루시브 브랜딩', desc: '추가 예정', muted: true },
          ],
        },
        {
          priority: 'medium',
          title: 'OKR 2. \'오늘의집 표준 시각 자산\' 고도화 및 운영 체계 확립',
          tag: '시각 자산 정의 및 확산',
          objective: '브랜드 & 프로덕트 전반에 적용되는 시각 자산을 고도화하고 운영 체계를 확립한다.',
          krs: [
            { title: 'KR 1. 그래픽 에셋 프레임워크 정의 (기준 정립 단계)', desc: '사용 목적에 따라 4단계 위계: Icon / Small Assets / Large Assets / Large Motion Assets' },
            { title: 'KR 2. 표준 시각 자산 라이브러리 개발 (실행·적용 단계)', desc: '실사용 가능한 그래픽 세트 제작, 브랜드·프로덕트·마케팅 지면 적용으로 톤앤매너 검증' },
            { title: 'KR 3. AI 기반 아이콘 생성 파이프라인 설계 (확장 단계)', desc: '쉐입·두께·컬러·질감·조명을 AI 학습 가능한 프롬프트로 모듈화, 일관된 퀄리티 재생산 테스트' },
          ],
          deliverables: ['프레임워크 및 정의 문서', '실사용 가능한 시각 자산 세트', '아이콘 스타일별 AI 프롬프트 설계'],
        },
        {
          priority: 'low',
          title: 'OKR 3. 브랜드 가이드를 \'조직이 실제로 쓰는 시스템\'으로 만든다',
          tag: '비주얼 아이덴티티 명문화 및 전파',
          objective: '리브랜딩으로 정립된 브랜드 기준을 흩어진 문서가 아닌, 조직이 언제든 찾아 쓰고 이해할 수 있는 시스템으로 체계화한다.',
          krs: [
            { title: 'KR 1. 전사 공통 브랜드 가이드 \'판단 기준 중심\' 재정리', desc: '핵심 요소(로고·컬러·타이포·그래픽)를 사용 맥락별로 분류, 직관적 판단 기준 중심으로 재구성' },
            { title: 'KR 2. 브랜드 에셋 라이브러리 \'찾아 쓰기 쉬운 사이트\' 구축', desc: '맥락 설명과 최신성 관리가 가능한 브랜드 에셋 사이트 (개발 리소스 사용 없음)' },
          ],
          deliverables: ['전사 공통 Brand Guide 문서', 'Brand Asset Library Site', 'Brand Asset Library Site 활용 추적'],
        },
      ],
    },
    {
      name: 'Brand Language',
      tagline: '브랜드 언어를 \'이해를 돕는 언어\'에서 \'브랜드 태도의 기준\'으로 확장한다.',
      okrs: [
        {
          priority: 'high',
          title: 'OKR 1. 브랜드 언어를 \'브랜드 태도의 기준\'으로 확장한다',
          tag: '브랜드 언어 아이덴티티 정의',
          objective: '브랜드 언어의 역할을 단순한 문구 교정 업무에서 탈피하여, 전사 구성원이 참고하고 의사결정할 수 있는 판단 기준으로 재정의한다.',
          krs: [
            { title: 'KR 1. 역할 명확화 및 태도(Authenticity) 기준 문서화', desc: '브랜드 언어 디자이너의 역할·의사결정 권한·책임 범위 문서화, 검토→결정→가이드 구조 명문화' },
            { title: 'KR 2. 브랜드 언어 기준의 서비스 전반 적용 설계', desc: '시스템(Identity) / 제품(UX Writing) / 커뮤니케이션(Copywriting) 3개 레이어로 구조화, 핵심 지표(태도·거리감·확신의 정도) 정의' },
          ],
          deliverables: ['Brand Language Role Definition 문서', 'Brand Voice & Attitude 기준 문서', 'Brand Language Level Map'],
        },
        {
          priority: 'high',
          title: 'OKR 2. 브랜드 언어 기준을 AI/툴로 \'실현 가능한 자산\'으로 전환',
          tag: '확산 및 자산화',
          objective: '정의한 브랜드 언어 기준을 AI와 도구를 통해 조직이 실제로 사용하는 언어 자산으로 만든다. (디지털 자산화)',
          krs: [
            { title: 'KR 1. 브랜드 언어 원칙을 AI 최적화 데이터로 변환', desc: '말투·태도 기준을 프롬프트 구조로 재정의, 금지/경계/권장 표현 세트 구축' },
            { title: 'KR 2. 직무별 맞춤형 Brand Language Bot 설계 및 배포', desc: '인터널 브랜딩·채용·마케팅·프로덕트 등 직무별 전용 AI 봇' },
            { title: 'KR 3. 도구 접근성 강화 및 실무 도입률 입증', desc: 'Slack·Notion 연동, 사용 사례 발굴, 활용도/피드백 리포트' },
            { title: 'KR 4. 브랜드 언어 자산화의 장기적 ROI 분석 모델 수립', desc: '리뷰/수정 커뮤니케이션 감소·조직 체감 상승을 정량화, 비즈니스 기여 논리 구조 마련' },
          ],
          deliverables: ['Brand Language Master Prompt', '직무별 Brand Language Bot', '사용 사례·피드백 리포트', 'ROI 설명 문서'],
        },
        {
          priority: 'medium',
          title: 'OKR 3. 디폴트 브랜드 위계와 운영 원칙을 정립한다',
          tag: '브랜드 구조 명문화',
          objective: '브랜드 구조 명문화 및 표준 가이드 구축을 통해 전사 브랜드 의사결정 체계를 확립한다.',
          krs: [
            { title: 'KR 1. 전사 브랜드 아키텍처 정의 및 마스터-하위 서비스 위계 정립', desc: '디폴트 브랜드 구조 가이드 제작, 예외 케이스 허용 범위와 판단 가이드 구체화' },
          ],
          deliverables: ['Brand Architecture Map'],
        },
      ],
    },
  ],
};

const OKR_PRIORITY_LABEL = { high: '우선순위 높음', medium: '우선순위 보통', low: '우선순위 낮음' };

const OKR_REVIEW = {
  period: '2025 H2',
  title: '지난 분기 회고',
  groups: [
    {
      name: 'Brand Design',
      resolved: [
        '리브랜딩 안정적 적용',
        '리브랜딩 적용에 따른 내/외부 반응 양호 → 성공적 리브랜딩으로 판단',
        'O2O 브랜딩 참여를 통해 브랜드 완성도 개선',
        '인터널 브랜딩 100% 완료',
      ],
      unresolved: [
        '브랜드 인덱스 조사의 선호도/퍼스널리티 개선 기여 — 성과 측정 불가',
        'PR 활동 이미지 가이드 개발 — 우선순위에서 밀려 진행되지 못함',
      ],
      lessons: [
        { title: '성과 측정의 한계', desc: '브랜드 활동은 인식·신뢰·일관성 등 시간에 따라 축적되는 자산. 단기 지표가 아닌 장기 관점의 성과 기준이 필요.' },
        { title: '파운데이션 조직의 구조적 특성', desc: '성과가 개별 조직의 결과에 흡수되기 쉬워 단독 정량 평가에는 한계. 결과보다 협업 기여도 중심 평가가 적절.' },
        { title: '운영 관점의 과제', desc: '파운데이션 조직은 실행을 돕되 간섭/추가 비용으로 인식되지 않아야 함. 기준은 최소 개입으로 쉽게 적용 가능해야.' },
      ],
    },
    {
      name: 'Brand Language (UX Writing)',
      resolved: [
        '브랜드 보이스 일관성 선제적 확보 — 1차 기조 기반 라이팅 규칙 수립, AI 툴로 전사 내재화',
        '실무 내재화 모델 구축 — MD 등 고부하 부서 대상 \'교육+봇\' 패키지 도입, 현업 자생적 생산 구조 마련',
        '대외 기술 브랜드 인지도 제고 — 외부 강연으로 AI 활용·UX 라이팅 자산화 사례 전파',
        'GPT 빌더 2종 이상 배포 — 기획전·배너 카피용 봇 구축, 카피 퀄리티 상향 평준화',
        '문구 평가 시스템 — Do/Don\'t 사례 정리, 첫 질문 자동 답변 세팅으로 사용률 1위 달성',
      ],
      unresolved: [
        'Verbal Identity 내재화 — 가이드 준수율 측정·전사 적용 사례 확보 (브랜드 보이스 확정 후 가능, 2026 이월)',
        '브랜드 언어 가이드라인 배포 (보이스 확정 후 측정 가능, 2026 이월)',
        '컴포넌트 문구 DB 구축 (Lokalise 연동 진행 중)',
      ],
      lessons: [
        { title: '선행 과제 의존도 관리', desc: '브랜드 플랫폼(퍼스널리티 등) 설정 완료 후 가능한 연계 과업이 다수. 후속 단계는 2026년으로 이월 결정.' },
      ],
    },
  ],
};

function renderOKRPage(targetId) {
  const c = document.getElementById(targetId || 'okrContent');
  if (!c) return;
  const d = OKR_DATA;

  c.innerHTML = `
    <div class="okr-mission-card">
      <div class="okr-period-chip">${esc(d.period)}</div>
      <h2 class="okr-mission-text">${esc(d.mission)}</h2>
      <ol class="okr-principle-list">
        ${d.principles.map(p => `<li>${esc(p)}</li>`).join('')}
      </ol>
    </div>

    ${d.groups.map(g => `
      <section class="okr-group">
        <header class="okr-group-header">
          <h3 class="okr-group-name">${esc(g.name)}</h3>
          <p class="okr-group-tagline">"${esc(g.tagline)}"</p>
        </header>
        <div class="okr-card-grid">
          ${g.okrs.map(o => `
            <article class="okr-card okr-card--${o.priority}">
              <div class="okr-card-head">
                <span class="okr-priority-chip okr-priority-chip--${o.priority}">${esc(OKR_PRIORITY_LABEL[o.priority] || '')}</span>
                <span class="okr-tag-chip">${esc(o.tag || '')}</span>
              </div>
              <h4 class="okr-card-title">${esc(o.title)}</h4>
              <p class="okr-card-objective">${esc(o.objective)}</p>
              <ul class="okr-kr-list">
                ${o.krs.map(kr => `
                  <li class="okr-kr-item${kr.muted ? ' okr-kr-item--muted' : ''}">
                    <div class="okr-kr-title">${esc(kr.title)}</div>
                    ${kr.desc ? `<div class="okr-kr-desc">${esc(kr.desc)}</div>` : ''}
                  </li>
                `).join('')}
              </ul>
              ${o.deliverables ? `
                <div class="okr-deliverables">
                  <span class="okr-deliverables-label">산출물</span>
                  <div class="okr-deliverables-tags">
                    ${o.deliverables.map(x => `<span class="okr-deliverable-tag">${esc(x)}</span>`).join('')}
                  </div>
                </div>
              ` : ''}
            </article>
          `).join('')}
        </div>
      </section>
    `).join('')}

    <details class="okr-review">
      <summary class="okr-review-summary">
        <span class="okr-review-chevron" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </span>
        <span class="okr-review-period">${esc(OKR_REVIEW.period)}</span>
        <span class="okr-review-title">${esc(OKR_REVIEW.title)}</span>
      </summary>
      <div class="okr-review-body">
        ${OKR_REVIEW.groups.map(g => `
          <section class="okr-review-group">
            <h4 class="okr-review-group-name">${esc(g.name)}</h4>
            <div class="okr-review-cols">
              <div class="okr-review-col okr-review-col--resolved">
                <div class="okr-review-col-head">
                  <span class="okr-review-icon">✓</span>
                  <span>문제 해결</span>
                </div>
                <ul>${g.resolved.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
              </div>
              <div class="okr-review-col okr-review-col--unresolved">
                <div class="okr-review-col-head">
                  <span class="okr-review-icon">⊘</span>
                  <span>미해결</span>
                </div>
                <ul>${g.unresolved.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
              </div>
            </div>
            <div class="okr-review-lessons">
              <div class="okr-review-col-head">
                <span class="okr-review-icon">💡</span>
                <span>레슨런</span>
              </div>
              <ul class="okr-review-lesson-list">
                ${g.lessons.map(l => `
                  <li>
                    <div class="okr-lesson-title">${esc(l.title)}</div>
                    <div class="okr-lesson-desc">${esc(l.desc)}</div>
                  </li>
                `).join('')}
              </ul>
            </div>
          </section>
        `).join('')}
      </div>
    </details>
  `;
}
window.renderOKRPage = renderOKRPage;

// ════════════════════════════════════════════════════
// WORKS BOARD (제작물 게시판)
// ════════════════════════════════════════════════════

const WORKS_CATEGORIES = ['전체', '브랜딩', '그래픽', '영상', '패키지', '오프라인', '인쇄물', '캠페인', '디지털'];
const WORKS_PERIODS = [
  { key: 'month',   label: '이번 달' },
  { key: 'quarter', label: '이번 분기' },
  { key: 'year',    label: '올해' },
  { key: 'all',     label: '전체' },
];

const PROJECTS = [
  { id: 'p_home',    name: '홈개편',                period: '2026 Q2', desc: '카테고리 개편 · 메인 리디자인 · 안내 영상' },
  { id: 'p_vl',      name: 'Visual Language',      period: '2026 H1', desc: '브랜드 그래픽 언어 정립 및 디자인 시스템' },
  { id: 'p_nukten',  name: '연합브랜드 눅텐',        period: '2026 Q2', desc: '연합 브랜딩 프로젝트' },
  { id: 'p_pangyo',  name: '판교라운지',            period: '2026 Q2', desc: '오프라인 공간 브랜딩 & 시공' },
  { id: 'p_o2o',     name: '사장님센터 · O2O',      period: '2026 Q2', desc: '라이트 멤버십·랜딩페이지·카피라이팅' },
  { id: 'p_etc',     name: '기타 단일 작업',         period: '상시',    desc: '프로젝트에 속하지 않는 단발 작업' },
];

const WORKS_DATA = [
  {
    id: 'w_home_video',
    title: '홈개편 소개 영상',
    desc: '카테고리 개편을 알리는 메인 모션 영상.',
    category: '영상',
    projectId: 'p_home',
    members: ['m_luka', 'm_ben', 'm_dana'],
    date: '2026-04-13',
    link: 'https://www.figma.com/design/DtgQju7v6pruXHhPPgGMud/2024-Brand-Graphics---Interaction-Design?node-id=8660-55815',
    thumbnail: ''
  },
  {
    id: 'w_hero_banner',
    title: '홈개편 히어로 배너',
    desc: '메인 진입 페이지 히어로 영역 비주얼.',
    category: '그래픽',
    projectId: 'p_home',
    members: ['m_luka'],
    date: '2026-04-10',
    link: 'https://www.figma.com/design/DtgQju7v6pruXHhPPgGMud/2024-Brand-Graphics---Interaction-Design?node-id=8645-26506',
    thumbnail: ''
  },
  {
    id: 'w_visual_lang',
    title: 'Visual Language System',
    desc: '브랜드 그래픽 언어 정립 및 디자인 시스템 구축.',
    category: '브랜딩',
    projectId: 'p_vl',
    members: ['m_luka'],
    date: '2026-03-28',
    link: 'https://www.figma.com/design/JTmMbRsPUbHwslVOEj9qOl/2025-Brand-Graphic-Design-System?node-id=6756-19023',
    thumbnail: ''
  },
];

let worksView = { mode: 'projects', projectId: null, cat: '전체', period: 'all', q: '' };

function matchWorksPeriod(dateStr, period) {
  if (!dateStr || period === 'all') return true;
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d)) return false;
  const now = new Date();
  if (period === 'year') return d.getFullYear() === now.getFullYear();
  if (period === 'quarter') {
    if (d.getFullYear() !== now.getFullYear()) return false;
    return Math.floor(d.getMonth() / 3) === Math.floor(now.getMonth() / 3);
  }
  if (period === 'month') {
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }
  return true;
}

function getWorksCard(w) {
  const memberAvatars = (w.members || []).map(id => {
    const m = getMember(id);
    if (!m) return '';
    return `<div class="works-avatar" style="background:${m.color}" title="${esc(m.name)}">${esc(m.name[0])}</div>`;
  }).join('');

  const thumb = w.thumbnail
    ? `<div class="works-thumb" style="background-image:url('${esc(w.thumbnail)}')"></div>`
    : `<div class="works-thumb works-thumb--empty" data-category="${esc(w.category)}">
        <div class="works-thumb-initial">${esc(w.title[0] || '?')}</div>
      </div>`;

  const dateLabel = w.date ? w.date.slice(0, 7).replace('-', '.') : '';

  return `
  <a class="works-card" href="${esc(w.link || '#')}" target="_blank" rel="noopener">
    ${thumb}
    <div class="works-card-body">
      <div class="works-card-head">
        <span class="works-cat-tag">${esc(w.category)}</span>
        <span class="works-year">${esc(dateLabel)}</span>
      </div>
      <div class="works-card-title">${esc(w.title)}</div>
      ${w.desc ? `<div class="works-card-desc">${esc(w.desc)}</div>` : ''}
      <div class="works-card-foot">
        <div class="works-avatars">${memberAvatars}</div>
        <span class="works-link-icon" aria-label="원본 링크">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </span>
      </div>
    </div>
  </a>`;
}

function renderWorksPage() {
  const grid = document.getElementById('worksGrid');
  const chips = document.getElementById('worksCatFilter');
  const meta = document.getElementById('worksCount');
  if (!grid || !chips) return;

  // Wire search input (once)
  const search = document.getElementById('worksSearchInput');
  if (search && !search.dataset.wired) {
    search.dataset.wired = '1';
    search.addEventListener('input', e => {
      worksView.q = e.target.value.trim().toLowerCase();
      renderWorksPage();
    });
  }

  // Build filter chips = period + category
  const periodChips = WORKS_PERIODS.map(p =>
    `<button class="works-chip${worksView.period === p.key ? ' active' : ''}" onclick="setWorksPeriod('${p.key}')">${esc(p.label)}</button>`
  ).join('');
  const catChips = WORKS_CATEGORIES.map(c =>
    `<button class="works-chip${worksView.cat === c ? ' active' : ''}" onclick="setWorksFilter('${c}')">${esc(c)}</button>`
  ).join('');
  chips.innerHTML = `
    <div class="works-chip-group">${periodChips}</div>
    <div class="works-chip-sep"></div>
    <div class="works-chip-group">${catChips}</div>
  `;

  // Filter works by period, category, query
  const filteredWorks = WORKS_DATA.filter(w => {
    if (!matchWorksPeriod(w.date, worksView.period)) return false;
    if (worksView.cat !== '전체' && w.category !== worksView.cat) return false;
    if (worksView.q) {
      const haystack = (w.title + ' ' + (w.desc || '') + ' ' + (w.members || []).map(getMemberName).join(' ')).toLowerCase();
      if (!haystack.includes(worksView.q)) return false;
    }
    return true;
  });

  if (worksView.mode === 'project-detail') {
    renderWorksProjectDetail(filteredWorks);
    return;
  }

  // Default: project list view
  renderWorksProjectList(filteredWorks);
}

function renderWorksProjectList(filteredWorks) {
  const grid = document.getElementById('worksGrid');
  const meta = document.getElementById('worksCount');

  // Group works by project
  const byProject = {};
  filteredWorks.forEach(w => {
    const pid = w.projectId || 'p_etc';
    if (!byProject[pid]) byProject[pid] = [];
    byProject[pid].push(w);
  });

  // Only show projects with at least 1 matched work
  const projectsWithWorks = PROJECTS
    .map(p => ({ ...p, works: byProject[p.id] || [] }))
    .filter(p => p.works.length > 0)
    .sort((a, b) => {
      const aLatest = Math.max(...a.works.map(w => w.date ? new Date(w.date).getTime() : 0));
      const bLatest = Math.max(...b.works.map(w => w.date ? new Date(w.date).getTime() : 0));
      return bLatest - aLatest;
    });

  if (meta) meta.textContent = `${projectsWithWorks.length}개 프로젝트 · ${filteredWorks.length}건`;

  if (projectsWithWorks.length === 0) {
    grid.className = 'works-grid';
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-tertiary);font-size:13px">조건에 맞는 프로젝트가 없습니다</div>';
    return;
  }

  grid.className = 'works-project-grid';
  grid.innerHTML = projectsWithWorks.map(p => {
    // Collect unique members across all works of this project
    const memberSet = new Set();
    p.works.forEach(w => (w.members || []).forEach(id => memberSet.add(id)));
    const memberAvatars = [...memberSet].slice(0, 5).map(id => {
      const m = getMember(id);
      if (!m) return '';
      return `<div class="works-avatar" style="background:${m.color}" title="${esc(m.name)}">${esc(m.name[0])}</div>`;
    }).join('');

    // Representative category for thumb
    const firstCat = p.works[0].category;
    const firstInitial = (p.name[0] || '?');

    return `
    <button class="works-project-card" onclick="openWorksProject('${esc(p.id)}')">
      <div class="works-thumb works-thumb--empty" data-category="${esc(firstCat)}">
        <div class="works-thumb-initial">${esc(firstInitial)}</div>
      </div>
      <div class="works-project-body">
        <div class="works-project-meta">
          <span class="works-project-period">${esc(p.period)}</span>
          <span class="works-project-count">${p.works.length}건</span>
        </div>
        <div class="works-project-name">${esc(p.name)}</div>
        ${p.desc ? `<div class="works-project-desc">${esc(p.desc)}</div>` : ''}
        <div class="works-project-foot">
          <div class="works-avatars">${memberAvatars}</div>
          <span class="works-project-chevron">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
        </div>
      </div>
    </button>`;
  }).join('');
}

function renderWorksProjectDetail(filteredWorks) {
  const grid = document.getElementById('worksGrid');
  const meta = document.getElementById('worksCount');

  const project = PROJECTS.find(p => p.id === worksView.projectId);
  const items = filteredWorks
    .filter(w => (w.projectId || 'p_etc') === worksView.projectId)
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  if (meta) meta.textContent = `${items.length}건`;

  grid.className = 'works-grid';
  if (!project) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-tertiary)">프로젝트를 찾을 수 없습니다</div>';
    return;
  }

  const headerHtml = `
    <div class="works-detail-header" style="grid-column:1/-1">
      <button class="works-back-btn" onclick="closeWorksProject()" aria-label="프로젝트 목록으로">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        프로젝트 목록
      </button>
      <div>
        <div class="works-detail-period">${esc(project.period)}</div>
        <h2 class="works-detail-name">${esc(project.name)}</h2>
        ${project.desc ? `<div class="works-detail-desc">${esc(project.desc)}</div>` : ''}
      </div>
    </div>
  `;

  const cardsHtml = items.length
    ? items.map(getWorksCard).join('')
    : '<div style="grid-column:1/-1;text-align:center;padding:40px 20px;color:var(--text-tertiary);font-size:13px">조건에 맞는 작품이 없습니다</div>';

  grid.innerHTML = headerHtml + cardsHtml;
}

window.setWorksFilter = function(cat) {
  worksView.cat = cat;
  renderWorksPage();
};
window.setWorksPeriod = function(period) {
  worksView.period = period;
  renderWorksPage();
};
window.openWorksProject = function(id) {
  worksView.mode = 'project-detail';
  worksView.projectId = id;
  renderWorksPage();
};
window.closeWorksProject = function() {
  worksView.mode = 'projects';
  worksView.projectId = null;
  renderWorksPage();
};
window.renderWorksPage = renderWorksPage;
