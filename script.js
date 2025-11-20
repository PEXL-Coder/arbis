// ARBIS Prototype - enhanced navigation and decision tree logic

(function(){
  // --- Basic navigation wiring (unchanged) ---
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

  const loginBtn = document.getElementById('loginBtn');
  const demoBtn = document.getElementById('demoBtn');

  function showScreen(id){
    screens.forEach(s => {
      if(s.id === id){
        s.hidden = false;
        s.classList.add('active');
        const anim = s.querySelector('.animate-up');
        if(anim){ anim.style.animation = 'none'; void anim.offsetWidth; anim.style.animation = ''; }
      } else {
        s.hidden = true;
        s.classList.remove('active');
      }
    });
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function goToDashboard(){ showScreen('dashboard'); }

  loginBtn.addEventListener('click', goToDashboard);
  demoBtn.addEventListener('click', goToDashboard);

  moduleCards.forEach(card => {
    const target = card.dataset.target;
    card.addEventListener('click', () => showScreen(target));
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); showScreen(target); }
    });
  });

  navLinks.forEach(link => {
    const t = link.dataset.target;
    link.addEventListener('click', () => showScreen(t));
  });

  backBtns.forEach(b => b.addEventListener('click', () => showScreen('dashboard')));

  resetBtn.addEventListener('click', () => showScreen('dashboard'));
  aboutToggle.addEventListener('click', () => showScreen('about'));
  openAbout && openAbout.addEventListener('click', () => showScreen('about'));
  aboutBack && aboutBack.addEventListener('click', () => showScreen('dashboard'));

  // --- Generic Decision Tree Engine ---
  // Node format:
  // { id: 'start', text: 'Question?', input: false, options: [{label:'Yes', next:'nextNode', note:{k:'ID&V passed', v:'Yes'}}, ...] }
  // if next === 'end' -> finish

  function renderDecisionTree(rootEl, tree, opts = {}) {
    // state
    let state = {
      currentId: tree.start,
      history: [], // stack of nodes visited {nodeId, choiceIndex, inputValue}
      notes: [] // {k,v}
    };

    // clear root
    rootEl.innerHTML = '';

    // create UI pieces
    const qEl = document.createElement('div');
    const optionsEl = document.createElement('div');
    const inputWrap = document.createElement('div');
    const controls = document.createElement('div');
    const notesEl = document.createElement('div');

    qEl.className = 'flow-question';
    optionsEl.className = 'options';
    inputWrap.className = 'flow-input';
    controls.className = 'flow-controls';
    notesEl.className = 'flow-notes';

    rootEl.appendChild(qEl);
    rootEl.appendChild(optionsEl);
    rootEl.appendChild(inputWrap);
    rootEl.appendChild(controls);
    rootEl.appendChild(notesEl);

    // controls: Previous, Next, Reset
    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn outline';
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = true;

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn primary';
    nextBtn.textContent = 'Next';
    nextBtn.disabled = true;

    const resetBtnLocal = document.createElement('button');
    resetBtnLocal.className = 'btn ghost';
    resetBtnLocal.textContent = 'Restart';

    controls.appendChild(prevBtn);
    controls.appendChild(resetBtnLocal);
    controls.appendChild(nextBtn);

    // helper to find node
    function nodeFor(id){ return tree.nodes[id]; }

    // track selection for current node
    let selectedIndex = null;
    let inputValue = '';

    function render() {
      // clear option UI
      optionsEl.innerHTML = '';
      inputWrap.innerHTML = '';
      notesEl.innerHTML = '';

      const node = nodeFor(state.currentId);
      if(!node){
        qEl.textContent = 'Unknown node';
        return;
      }
      qEl.textContent = node.text || '';

      // input field (if node.input === true)
      if(node.input){
        const label = document.createElement('label');
        label.textContent = node.inputLabel || 'Details';
        const inp = node.inputType === 'textarea' ? document.createElement('textarea') : document.createElement('input');
        inp.placeholder = node.inputPlaceholder || '';
        inp.value = state.history.length && state.history[state.history.length-1] && state.history[state.history.length-1].inputValue && state.history[state.history.length-1].nodeId === node.id ? state.history[state.history.length-1].inputValue : '';
        inp.addEventListener('input', (e) => {
          inputValue = e.target.value;
          nextBtn.disabled = !inputValue.trim();
        });
        inputWrap.appendChild(label);
        inputWrap.appendChild(inp);
        // set initial inputValue
        inputValue = inp.value || '';
        nextBtn.disabled = !inputValue.trim();
      } else {
        inputValue = '';
      }

      // options
      if(node.options && node.options.length){
        node.options.forEach((opt, i) => {
          const b = document.createElement('button');
          b.className = 'option-btn';
          b.type = 'button';
          b.textContent = opt.label;
          b.addEventListener('click', () => {
            // visually select
            Array.from(optionsEl.children).forEach(ch => ch.classList.remove('selected'));
            b.classList.add('selected');
            selectedIndex = i;
            nextBtn.disabled = false;
          });
          optionsEl.appendChild(b);
        });

        // restore previous selection if returning
        const last = state.history[state.history.length-1];
        if(last && last.nodeId === node.id && typeof last.choiceIndex === 'number'){
          const buttonToSelect = optionsEl.children[last.choiceIndex];
          if(buttonToSelect){
            buttonToSelect.classList.add('selected');
            selectedIndex = last.choiceIndex;
            nextBtn.disabled = false;
          }
        }
      } else {
        // no options -> enable next when input or direct
        nextBtn.disabled = node.input ? !inputValue.trim() : false;
      }

      // previous button enablement
      prevBtn.disabled = state.history.length === 0;

      // render notes summary
      if(state.notes.length){
        const h = document.createElement('div');
        h.style.fontWeight = '700';
        h.style.marginBottom = '8px';
        h.textContent = 'Current Notes Preview';
        notesEl.appendChild(h);

        const ul = document.createElement('ul');
        ul.style.margin = '0';
        ul.style.paddingLeft = '16px';
        state.notes.forEach(n => {
          const li = document.createElement('li');
          li.textContent = `${n.k}: ${n.v}`;
          ul.appendChild(li);
        });
        notesEl.appendChild(ul);
      }
    }

    // goNext: commit current selection/input and navigate
    function goNext(){
      const node = nodeFor(state.currentId);
      // if node expects input only
      let chosenOption = null;
      if(node.options && node.options.length && typeof selectedIndex === 'number'){
        chosenOption = node.options[selectedIndex];
      }

      // prepare history entry
      const histEntry = { nodeId: node.id, choiceIndex: typeof selectedIndex === 'number' ? selectedIndex : null, inputValue: inputValue || null };
      state.history.push(histEntry);

      // commit notes for chosen option and/or input
      if(chosenOption && chosenOption.note){
        // push note
        state.notes.push({ k: chosenOption.note.k, v: chosenOption.note.v });
      }
      if(node.input && node.inputNoteKey && inputValue){
        // store input as note
        state.notes.push({ k: node.inputNoteKey, v: inputValue });
      }

      // determine next id
      let nextId = null;
      if(chosenOption && chosenOption.next) nextId = chosenOption.next;
      else if(node.next) nextId = node.next;
      else nextId = 'end';

      // reset selection trackers
      selectedIndex = null;
      inputValue = '';

      if(nextId === 'end'){
        // render summary and copy notes button
        renderEnd();
      } else {
        state.currentId = nextId;
        render();
      }
    }

    function goPrev(){
      if(state.history.length === 0) return;
      // pop last history
      const last = state.history.pop();
      // also remove any notes that were added by that history step.
      // We'll remove last N notes where N equals number of note keys associated with that pop.
      // For simplicity, we reconstruct notes from remaining history:
      state.notes = [];
      for(const h of state.history){
        const nNode = nodeFor(h.nodeId);
        if(nNode){
          if(typeof h.choiceIndex === 'number' && nNode.options && nNode.options[h.choiceIndex] && nNode.options[h.choiceIndex].note){
            state.notes.push({ k: nNode.options[h.choiceIndex].note.k, v: nNode.options[h.choiceIndex].note.v });
          }
          if(nNode.input && nNode.inputNoteKey && h.inputValue){
            state.notes.push({ k: nNode.inputNoteKey, v: h.inputValue });
          }
        }
      }

      // set current to previous node (if any), otherwise start
      if(state.history.length){
        state.currentId = state.history[state.history.length-1].nodeId;
      } else {
        state.currentId = tree.start;
      }
      // restore selection of previous node if it was there
      render();
    }

    function renderEnd(){
      // clear UI and show result summary + copy notes + restart
      rootEl.innerHTML = '';
      const endWrap = document.createElement('div');
      endWrap.className = 'flow-end';

      const title = document.createElement('h3');
      title.textContent = tree.endTitle || 'Flow Complete';
      endWrap.appendChild(title);

      const summary = document.createElement('div');
      summary.style.marginTop = '8px';

      const ul = document.createElement('ul');
      ul.style.paddingLeft = '16px';
      ul.style.marginTop = '8px';
      state.notes.forEach(n => {
        const li = document.createElement('li');
        li.textContent = `${n.k}: ${n.v}`;
        ul.appendChild(li);
      });
      summary.appendChild(ul);
      endWrap.appendChild(summary);

      // Copy button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'btn primary';
      copyBtn.textContent = 'Copy Notes';
      copyBtn.addEventListener('click', () => {
        const text = `Call Notes:\n` + state.notes.map(n => `- ${n.k}: ${n.v}`).join('\n');
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(()=> copyBtn.textContent = 'Copy Notes', 1200);
          });
        } else {
          // fallback
          const ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); copyBtn.textContent = 'Copied!'; setTimeout(()=> copyBtn.textContent = 'Copy Notes', 1200); } catch(e){}
          ta.remove();
        }
      });

      // Restart and Return to Dashboard
      const retBtn = document.createElement('button');
      retBtn.className = 'btn outline';
      retBtn.textContent = 'Return to Dashboard';
      retBtn.addEventListener('click', () => showScreen('dashboard'));

      const restartBtn = document.createElement('button');
      restartBtn.className = 'btn ghost';
      restartBtn.textContent = 'Restart Flow';
      restartBtn.addEventListener('click', () => {
        // reset internal state and render fresh
        state = { currentId: tree.start, history: [], notes: [] };
        rootEl.innerHTML = '';
        rootEl.appendChild(qEl);
        rootEl.appendChild(optionsEl);
        rootEl.appendChild(inputWrap);
        rootEl.appendChild(controls);
        rootEl.appendChild(notesEl);
        render();
      });

      const controlWrap = document.createElement('div');
      controlWrap.style.display = 'flex';
      controlWrap.style.gap = '8px';
      controlWrap.style.marginTop = '12px';
      controlWrap.appendChild(copyBtn);
      controlWrap.appendChild(restartBtn);
      controlWrap.appendChild(retBtn);

      endWrap.appendChild(controlWrap);
      rootEl.appendChild(endWrap);
    }

    // wire buttons
    nextBtn.addEventListener('click', () => {
      const node = nodeFor(state.currentId);
      // if node has options but none selected, do nothing
      if(node.options && node.options.length && typeof selectedIndex !== 'number') return;
      // if node requires input and inputValue empty, do nothing
      if(node.input && !inputValue) return;
      // if node has selected option that includes an input prompt (option.input) we might need to handle; for now options don't include inputs
      // special-case: if next is 'end' via node.next or option.next -> renderEnd
      const chosen = node.options && selectedIndex !== null ? node.options[selectedIndex] : null;
      const nextId = chosen && chosen.next ? chosen.next : (node.next ? node.next : 'end');
      // store note values (handled in goNext)
      goNext();
    });

    prevBtn.addEventListener('click', goPrev);
    resetBtnLocal.addEventListener('click', () => {
      state = { currentId: tree.start, history: [], notes: [] };
      selectedIndex = null; inputValue = '';
      render();
    });

    // initialize
    render();
  }

  // --- Define Guided Flow Tree ---
  const guidedTree = {
    start: 'idv_check',
    endTitle: 'Guided Flow Complete',
    nodes: {
      idv_check: {
        id: 'idv_check',
        text: 'Has ID&V been passed?',
        options: [
          { label: 'Yes', next: 'complaint_check', note: { k: 'ID&V passed', v: 'Yes' } },
          { label: 'No', next: 'perform_idv', note: { k: 'ID&V passed', v: 'No' } }
        ]
      },
      perform_idv: {
        id: 'perform_idv',
        text: 'Please perform ID&V before proceeding. After performing ID&V, has it passed?',
        options: [
          { label: 'Now Passed', next: 'complaint_check', note: { k: 'ID&V performed', v: 'Now Passed' } },
          { label: 'Still Not Passed', next: 'end', note: { k: 'ID&V performed', v: 'Failed' } }
        ]
      },
      complaint_check: {
        id: 'complaint_check',
        text: 'Is there a complaint to log?',
        options: [
          { label: 'Yes', next: 'complaint_description', note: { k: 'Complaint logged', v: 'Yes' } },
          { label: 'No', next: 'vulnerability_check', note: { k: 'Complaint logged', v: 'No' } }
        ]
      },
      complaint_description: {
        id: 'complaint_description',
        text: 'Briefly describe the complaint:',
        input: true,
        inputLabel: 'Complaint description',
        inputPlaceholder: 'Enter summary of complaint (required)',
        inputNoteKey: 'Complaint description',
        next: 'vulnerability_check'
      },
      vulnerability_check: {
        id: 'vulnerability_check',
        text: 'Is the customer vulnerable or in a sensitive situation?',
        options: [
          { label: 'Yes', next: 'vuln_details', note: { k: 'Vulnerability identified', v: 'Yes' } },
          { label: 'No', next: 'resolution_step', note: { k: 'Vulnerability identified', v: 'No' } }
        ]
      },
      vuln_details: {
        id: 'vuln_details',
        text: 'Optional: describe vulnerability / supports required:',
        input: true,
        inputLabel: 'Vulnerability notes',
        inputPlaceholder: '(optional) notes',
        inputNoteKey: 'Vulnerability details',
        next: 'resolution_step'
      },
      resolution_step: {
        id: 'resolution_step',
        text: 'Suggested resolution: Offer standard remediation. Was resolution accepted?',
        options: [
          { label: 'Accepted', next: 'end', note: { k: 'Resolution accepted', v: 'Yes' } },
          { label: 'Not accepted', next: 'end', note: { k: 'Resolution accepted', v: 'No' } }
        ]
      }
    }
  };

  // --- Complaints Assistant Tree ---
  const complaintsTree = {
    start: 'c_start',
    endTitle: 'Complaints Assistant Result',
    nodes: {
      c_start: {
        id: 'c_start',
        text: 'Is the customer expressing dissatisfaction about a product or service?',
        options: [
          { label: 'Yes', next: 'c_severity', note: { k: 'Complaint expressed', v: 'Yes' } },
          { label: 'No', next: 'c_no_log', note: { k: 'Complaint expressed', v: 'No' } }
        ]
      },
      c_severity: {
        id: 'c_severity',
        text: 'Is the issue high severity (safety, legal, significant loss)?',
        options: [
          { label: 'High', next: 'c_log', note: { k: 'Severity', v: 'High' } },
          { label: 'Medium', next: 'c_log', note: { k: 'Severity', v: 'Medium' } },
          { label: 'Low', next: 'c_maybe_log', note: { k: 'Severity', v: 'Low' } }
        ]
      },
      c_maybe_log: {
        id: 'c_maybe_log',
        text: 'Low severity — recommended: Monitor and advise. Do you want to log anyway?',
        options: [
          { label: 'Log Complaint', next: 'c_log', note: { k: 'Agent chose to log', v: 'Yes' } },
          { label: 'Do Not Log', next: 'c_no_log', note: { k: 'Agent chose to log', v: 'No' } }
        ]
      },
      c_log: {
        id: 'c_log',
        text: 'Log complaint: enter a short summary',
        input: true,
        inputLabel: 'Complaint summary',
        inputPlaceholder: 'Enter summary to log',
        inputNoteKey: 'Logged complaint summary',
        next: 'end'
      },
      c_no_log: {
        id: 'c_no_log',
        text: 'Recommendation: Do Not Log Complaint',
        next: 'end'
      }
    }
  };

  // --- VC Assistant Tree ---
  const vcTree = {
    start: 'v_start',
    endTitle: 'VC Assistant Result',
    nodes: {
      v_start: {
        id: 'v_start',
        text: 'Does the customer indicate any vulnerabilities (health, financial hardship, language barriers)?',
        options: [
          { label: 'Yes', next: 'v_detail', note: { k: 'Vulnerability flag', v: 'Yes' } },
          { label: 'No', next: 'v_no', note: { k: 'Vulnerability flag', v: 'No' } }
        ]
      },
      v_detail: {
        id: 'v_detail',
        text: 'Select the primary vulnerability observed',
        options: [
          { label: 'Health', next: 'v_support', note: { k: 'Vulnerability type', v: 'Health' } },
          { label: 'Financial', next: 'v_support', note: { k: 'Vulnerability type', v: 'Financial' } },
          { label: 'Language', next: 'v_support', note: { k: 'Vulnerability type', v: 'Language' } }
        ]
      },
      v_support: {
        id: 'v_support',
        text: 'Recommended support: Offer tailored support or escalate. Did you escalate?',
        options: [
          { label: 'Escalated', next: 'end', note: { k: 'Escalated', v: 'Yes' } },
          { label: 'Not Escalated', next: 'end', note: { k: 'Escalated', v: 'No' } }
        ]
      },
      v_no: {
        id: 'v_no',
        text: 'Recommendation: Customer is not vulnerable',
        next: 'end'
      }
    }
  };

  // Initialize flows on module show
  const guidedRoot = document.getElementById('guidedFlowRoot');
  const complaintsRoot = document.getElementById('complaintsFlowRoot');
  const vcRoot = document.getElementById('vcFlowRoot');

  // Render when their screens become visible. We hook into screen changes by overriding showScreen to initialize on first show.
  const initialized = { guided: false, complaints: false, vc: false };

  // Wrap original showScreen to add init
  const originalShowScreen = showScreen;
  window.showScreen = function(id){
    originalShowScreen(id);
    if(id === 'guided' && !initialized.guided){
      renderDecisionTree(guidedRoot, guidedTree);
      initialized.guided = true;
    }
    if(id === 'complaints' && !initialized.complaints){
      renderDecisionTree(complaintsRoot, complaintsTree);
      initialized.complaints = true;
    }
    if(id === 'vc' && !initialized.vc){
      renderDecisionTree(vcRoot, vcTree);
      initialized.vc = true;
    }
  };

  // --- Knowledge Portal implementation ---
  const kbArticles = [
    {
      id: 'reset_password',
      title: 'Resetting Customer Password',
      content: [
        '1. Navigate to Settings → Security → Reset Password',
        '2. Confirm identity',
        '3. Send temporary password via secure channel'
      ],
      screenshot: true
    },
    {
      id: 'billing_disputes',
      title: 'How to handle billing disputes',
      content: [
        '1. Verify account and recent charges',
        '2. Ask for supporting evidence (invoice, dates)',
        '3. Offer corrective action or escalation'
      ],
      screenshot: true
    },
    {
      id: 'idv_best_practices',
      title: 'ID&V Best Practices',
      content: [
        '1. Use at least two matching data points',
        '2. Avoid closed questions for sensitive checks',
        '3. Record verification method in call notes'
      ],
      screenshot: false
    }
  ];

  const kbListEl = document.getElementById('kbList');
  const kbSearchEl = document.getElementById('kbSearch');

  function renderKB(list){
    kbListEl.innerHTML = '';
    list.forEach(a => {
      const item = document.createElement('div');
      item.className = 'kb-item';
      const h = document.createElement('h4');
      h.innerHTML = `${a.title} <span style="font-weight:600;color:var(--muted);font-size:12px">[${a.id}]</span>`;
      const toggle = document.createElement('button');
      toggle.className = 'btn ghost';
      toggle.textContent = 'Open';
      toggle.style.marginLeft = '8px';
      toggle.addEventListener('click', () => {
        body.classList.toggle('expanded');
        toggle.textContent = body.classList.contains('expanded') ? 'Close' : 'Open';
      });
      h.appendChild(toggle);

      const body = document.createElement('div');
      body.className = 'kb-body';
      a.content.forEach(line => {
        const p = document.createElement('p');
        p.style.margin = '6px 0';
        p.textContent = line;
        body.appendChild(p);
      });
      if(a.screenshot){
        const ss = document.createElement('div');
        ss.className = 'kb-screenshot';
        ss.textContent = 'Screenshot Placeholder';
        body.appendChild(ss);
      }

      item.appendChild(h);
      item.appendChild(body);
      kbListEl.appendChild(item);
    });
  }

  // initial render
  renderKB(kbArticles);

  // search behavior
  kbSearchEl.addEventListener('input', (e) => {
    const q = (e.target.value || '').toLowerCase().trim();
    if(!q){ renderKB(kbArticles); return; }
    const filtered = kbArticles.filter(a => {
      return a.title.toLowerCase().includes(q) || a.content.join(' ').toLowerCase().includes(q) || a.id.toLowerCase().includes(q);
    });
    renderKB(filtered);
  });

  // Rewire original initialization: on first show, we want to init if needed
  // Ensure showScreen used earlier goes through window.showScreen
  // Initialize: show login
  showScreen('login');

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if(e.key === 'd' || e.key === 'D') window.showScreen('dashboard');
    if(e.key === 'l' || e.key === 'L') window.showScreen('login');
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

})();
