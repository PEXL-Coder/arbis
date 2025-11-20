// ARBIS Prototype - navigation and interactivity (vanilla JS)

(function(){
  // Helper selectors
  const login = document.getElementById('login');
  const dashboard = document.getElementById('dashboard');
  const about = document.getElementById('about');
  const resetBtn = document.getElementById('resetBtn');
  const aboutToggle = document.getElementById('aboutToggle');
  const openAbout = document.getElementById('openAbout');
  const aboutBack = document.getElementById('aboutBack');

  const screens = Array.from(document.querySelectorAll('.screen'));
  const moduleCards = Array.from(document.querySelectorAll('.module-card'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const backBtns = Array.from(document.querySelectorAll('.backBtn'));

  // Login buttons
  const loginBtn = document.getElementById('loginBtn');
  const demoBtn = document.getElementById('demoBtn');

  // Simple fade/transition utility
  function showScreen(id){
    screens.forEach(s => {
      if(s.id === id){
        s.hidden = false;
        s.classList.add('active');
        // re-run animation
        const anim = s.querySelector('.animate-up');
        if(anim){ anim.style.animation = 'none'; void anim.offsetWidth; anim.style.animation = ''; }
      } else {
        s.hidden = true;
        s.classList.remove('active');
      }
    });
    // ensure body scroll to top of main content for mobile
    window.scrollTo({top:0, behavior:'smooth'});
  }

  // Login -> Dashboard
  function goToDashboard(){
    showScreen('dashboard');
  }

  loginBtn.addEventListener('click', () => {
    // no auth, simply navigate
    goToDashboard();
  });
  demoBtn.addEventListener('click', goToDashboard);

  // Module launching from cards
  moduleCards.forEach(card => {
    const target = card.dataset.target;
    card.addEventListener('click', () => {
      showScreen(target);
    });
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        showScreen(target);
      }
    });
  });

  // Sidebar nav
  navLinks.forEach(link => {
    const t = link.dataset.target;
    link.addEventListener('click', () => {
      showScreen(t);
    });
  });

  // Back buttons -> dashboard
  backBtns.forEach(b => {
    b.addEventListener('click', () => showScreen('dashboard'));
  });

  // Reset button: return to front page dashboard and reset any states (here just show dashboard)
  resetBtn.addEventListener('click', () => {
    showScreen('dashboard');
  });

  // About toggles
  aboutToggle.addEventListener('click', () => showScreen('about'));
  openAbout && openAbout.addEventListener('click', () => showScreen('about'));
  aboutBack && aboutBack.addEventListener('click', () => showScreen('dashboard'));

  // Module-specific reset example hooks (for expanding later)
  ['guided','knowledge','complaints','vc','verbatim','usage'].forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    const resetBtn = el.querySelector('button[id$="Reset"]');
    if(resetBtn){
      resetBtn.addEventListener('click', () => {
        // currently same as main reset — keep placeholder for future state resets
        showScreen('dashboard');
      });
    }
  });

  // Keyboard shortcut: press "D" to go to Dashboard, "L" to Login
  document.addEventListener('keydown', (e) => {
    if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if(e.key === 'd' || e.key === 'D') showScreen('dashboard');
    if(e.key === 'l' || e.key === 'L') showScreen('login');
  });

  // Accessibility: focus first focusable element when screen shows
  const observer = new MutationObserver(() => {
    const active = document.querySelector('.screen:not([hidden])');
    if(active){
      const focusable = active.querySelector('button, [tabindex], input, a');
      if(focusable) focusable.focus();
    }
  });
  observer.observe(document.body, {attributes:true, subtree:true, childList:true});

  // Initialize: show login screen
  showScreen('login');

})();