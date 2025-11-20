// ARBIS Prototype - enhanced Guided Flow with Call Type selection and sample flows

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

  // --- Generic Decision Tree Engine (with router support) ---
  // Node format:
  // { id, text, input?, inputLabel?, inputNoteKey?, options: [{label,next,note,setCallType}], next?, router?, routes: {...}, end? }
  function renderDecisionTree(rootEl, tree, opts = {}) {
    let state = {
      currentId: tree.start,
      history: [], // {nodeId, choiceIndex, inputValue}
      notes: [],
      callType: null
    };

    rootEl.innerHTML = '';

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

    function nodeFor(id){ return tree.nodes[id]; }

    let selectedIndex = null;
    let inputValue = '';

    function render() {
      optionsEl.innerHTML = '';
      inputWrap.innerHTML = '';
      notesEl.innerHTML = '';

      const node = nodeFor(state.currentId);
      if(!node){
        qEl.textContent = 'Unknown node';
        return;
      }

      // If node is router: route automatically based on state.callType
      if(node.router){
        const routeTarget = node.routes && (node.routes[state.callType] || node.default);
        if(routeTarget){
          state.currentId = routeTarget;
          // We immediately render the routed node
          render();
          return;
        } else {
          qEl.textContent = node.text || '';
        }
      }

      // display question text + small note of call type (if set)
      qEl.innerHTML = '';
      const qText = document.createElement('div');
      qText.textContent = node.text || '';
      qEl.appendChild(qText);
      if(state.callType){
        const small = document.createElement('div');
        small.className = 'small-note';
        small.textContent = `Call Type: ${state.callType}`;
        qEl.appendChild(small);
      }

      // input
      if(node.input){
        const label = document.createElement('label');
        label.textContent = node.inputLabel || 'Details';
        const inp = node.inputType === 'textarea' ? document.createElement('textarea') : document.createElement('input');
        inp.placeholder = node.inputPlaceholder || '';
        // restore if available in history for this node
        const hist = state.history.find(h => h.nodeId === node.id);
        if(hist && hist.inputValue) inp.value = hist.inputValue;
        inp.addEventListener('input', (e) => {
          inputValue = e.target.value;
          nextBtn.disabled = !inputValue.trim();
        });
        inputWrap.appendChild(label);
        inputWrap.appendChild(inp);
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
            Array.from(optionsEl.children).forEach(ch => ch.classList.remove('selected'));
            b.classList.add('selected');
            selectedIndex = i;
            nextBtn.disabled = false;
          });
          optionsEl.appendChild(b);
        });

        // restore selection from history if present
        const last = state.history.find(h => h.nodeId === node.id);
        if(last && typeof last.choiceIndex === 'number'){
          const buttonToSelect = optionsEl.children[last.choiceIndex];
          if(buttonToSelect){
            buttonToSelect.classList.add('selected');
            selectedIndex = last.choiceIndex;
            nextBtn.disabled = false;
          }
        }
      } else {
        nextBtn.disabled = node.input ? !inputValue.trim() : false;
      }

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

    function goNext(){
      const node = nodeFor(state.currentId);
      let chosenOption = null;
      if(node.options && node.options.length && typeof selectedIndex === 'number'){
        chosenOption = node.options[selectedIndex];
      }

      const histEntry = { nodeId: node.id, choiceIndex: typeof selectedIndex === 'number' ? selectedIndex : null, inputValue: inputValue || null };
      state.history.push(histEntry);

      // commit notes
      if(chosenOption && chosenOption.note){
        state.notes.push({ k: chosenOption.note.k, v: chosenOption.note.v });
      }
      if(chosenOption && chosenOption.setCallType){
        state.callType = chosenOption.setCallType;
        // also add note indicating call type
        state.notes.push({ k: 'Call type', v: state.callType });
      }
      if(node.input && node.inputNoteKey && inputValue){
        state.notes.push({ k: node.inputNoteKey, v: inputValue });
      }

      // determine next
      let nextId = null;
      if(chosenOption && chosenOption.next) nextId = chosenOption.next;
      else if(node.next) nextId = node.next;
      else nextId = 'end';

      selectedIndex = null;
      inputValue = '';

      // handle 'end' special-case
      if(nextId === 'end'){
        renderEnd();
      } else {
        state.currentId = nextId;
        render();
      }
    }

    function goPrev(){
      if(state.history.length === 0) return;
      state.history.pop();
      // reconstruct notes from history
      state.notes = [];
      state.callType = null;
      for(const h of state.history){
        const nNode = nodeFor(h.nodeId);
        if(nNode){
          if(typeof h.choiceIndex === 'number' && nNode.options && nNode.options[h.choiceIndex] && nNode.options[h.choiceIndex].note){
            state.notes.push({ k: nNode.options[h.choiceIndex].note.k, v: nNode.options[h.choiceIndex].note.v });
          }
          if(nNode.options && typeof h.choiceIndex === 'number' && nNode.options[h.choiceIndex] && nNode.options[h.choiceIndex].setCallType){
            state.callType = nNode.options[h.choiceIndex].setCallType;
            state.notes.push({ k: 'Call type', v: state.callType });
          }
          if(nNode.input && nNode.inputNoteKey && h.inputValue){
            state.notes.push({ k: nNode.inputNoteKey, v: h.inputValue });
          }
        }
      }
      // set current to last history or start
      if(state.history.length){
        state.currentId = state.history[state.history.length-1].nodeId;
      } else {
        state.currentId = tree.start;
      }
      render();
    }

    function renderEnd(){
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
          const ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); copyBtn.textContent = 'Copied!'; setTimeout(()=> copyBtn.textContent = 'Copy Notes', 1200); } catch(e){}
          ta.remove();
        }
      });

      const retBtn = document.createElement('button');
      retBtn.className = 'btn outline';
      retBtn.textContent = 'Return to Dashboard';
      retBtn.addEventListener('click', () => window.showScreen('dashboard'));

      const restartBtn = document.createElement('button');
      restartBtn.className = 'btn ghost';
      restartBtn.textContent = 'Restart Flow';
      restartBtn.addEventListener('click', () => {
        state = { currentId: tree.start, history: [], notes: [], callType: null };
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

    nextBtn.addEventListener('click', () => {
      const node = nodeFor(state.currentId);
      if(node.options && node.options.length && typeof selectedIndex !== 'number') return;
      if(node.input && !inputValue) return;
      goNext();
    });

    prevBtn.addEventListener('click', goPrev);
    resetBtnLocal.addEventListener('click', () => {
      state = { currentId: tree.start, history: [], notes: [], callType: null };
      selectedIndex = null; inputValue = '';
      render();
    });

    render();
  }

  // --- Guided Flow Tree (expanded with call-type routing) ---
  const guidedTree = {
    start: 'call_type',
    endTitle: 'Guided Flow Complete',
    nodes: {
      call_type: {
        id: 'call_type',
        text: 'Select Call Type',
        options: [
          { label: 'Billing', next: 'idv_check', setCallType: 'Billing', note: { k: 'Call type', v: 'Billing' } },
          { label: 'Technical Support', next: 'idv_check', setCallType: 'Technical Support', note: { k: 'Call type', v: 'Technical Support' } },
          { label: 'Account Update', next: 'idv_check', setCallType: 'Account Update', note: { k: 'Call type', v: 'Account Update' } },
          { label: 'General Inquiry', next: 'idv_check', setCallType: 'General Inquiry', note: { k: 'Call type', v: 'General Inquiry' } }
        ]
      },

      // ID&V step (common)
      idv_check: {
        id: 'idv_check',
        text: 'Has ID&V been passed?',
        options: [
          { label: 'Yes', next: 'post_idv_router', note: { k: 'ID&V passed', v: 'Yes' } },
          { label: 'No', next: 'perform_idv', note: { k: 'ID&V passed', v: 'No' } }
        ]
      },
      perform_idv: {
        id: 'perform_idv',
        text: 'Please perform ID&V now. After performing ID&V, has it passed?',
        options: [
          { label: 'Now Passed', next: 'post_idv_router', note: { k: 'ID&V performed', v: 'Now Passed' } },
          { label: 'Still Not Passed', next: 'end', note: { k: 'ID&V performed', v: 'Failed' } }
        ]
      },

      // Router node: routes to call-type-specific first step after ID&V
      post_idv_router: {
        id: 'post_idv_router',
        router: true,
        // routes keyed by call type values used in call_type options
        routes: {
          'Billing': 'billing_issue',
          'Technical Support': 'tech_troubleshoot_start',
          'Account Update': 'account_update_start',
          'General Inquiry': 'general_flow_start'
        },
        default: 'general_flow_start'
      },

      // Billing flow
      billing_issue: {
        id: 'billing_issue',
        text: 'Is the issue related to an incorrect charge or missing credit?',
        options: [
          { label: 'Incorrect charge', next: 'billing_amount', note: { k: 'Billing issue type', v: 'Incorrect charge' } },
          { label: 'Missing credit', next: 'billing_amount', note: { k: 'Billing issue type', v: 'Missing credit' } },
          { label: 'Other', next: 'billing_description', note: { k: 'Billing issue type', v: 'Other' } }
        ]
      },
      billing_amount: {
        id: 'billing_amount',
        text: 'Confirm the charged amount with the customer. Enter the amount if provided:',
        input: true,
        inputLabel: 'Amount (e.g., $xx.xx)',
        inputPlaceholder: 'Enter amount (optional)',
        inputNoteKey: 'Reported amount',
        next: 'billing_resolution'
      },
      billing_description: {
        id: 'billing_description',
        text: 'Describe the billing problem briefly:',
        input: true,
        inputLabel: 'Description',
        inputPlaceholder: 'Customer describes the issue',
        inputNoteKey: 'Billing description',
        next: 'billing_resolution'
      },
      billing_resolution: {
        id: 'billing_resolution',
        text: 'Suggested resolution: Offer refund/adjustment or escalate. Was a resolution agreed?',
        options: [
          { label: 'Agreed refund/adjustment', next: 'end', note: { k: 'Billing resolution', v: 'Agreed' } },
          { label: 'Escalate', next: 'end', note: { k: 'Billing resolution', v: 'Escalated' } }
        ]
      },

      // Technical support flow
      tech_troubleshoot_start: {
        id: 'tech_troubleshoot_start',
        text: 'Is the issue related to connectivity or device/app?',
        options: [
          { label: 'Connectivity', next: 'tech_connectivity', note: { k: 'Tech issue area', v: 'Connectivity' } },
          { label: 'Device/App', next: 'tech_device', note: { k: 'Tech issue area', v: 'Device/App' } },
          { label: 'Other', next: 'tech_other', note: { k: 'Tech issue area', v: 'Other' } }
        ]
      },
      tech_connectivity: {
        id: 'tech_connectivity',
        text: 'Ask customer to restart the device and confirm if issue persists. Did restart resolve it?',
        options: [
          { label: 'Resolved', next: 'end', note: { k: 'Tech troubleshooting', v: 'Restart resolved' } },
          { label: 'Not resolved', next: 'tech_escalate', note: { k: 'Tech troubleshooting', v: 'Not resolved' } }
        ]
      },
      tech_device: {
        id: 'tech_device',
        text: 'Collect device model and OS/version:',
        input: true,
        inputLabel: 'Device model / OS',
        inputPlaceholder: 'e.g., iPhone 12 - iOS 16',
        inputNoteKey: 'Device info',
        next: 'tech_escalate'
      },
      tech_other: {
        id: 'tech_other',
        text: 'Briefly describe the technical issue:',
        input: true,
        inputLabel: 'Issue description',
        inputPlaceholder: 'Customer description',
        inputNoteKey: 'Tech issue description',
        next: 'tech_escalate'
      },
      tech_escalate: {
        id: 'tech_escalate',
        text: 'Recommendation: Escalate to Tier 2. Was issue escalated?',
        options: [
          { label: 'Yes, escalated', next: 'end', note: { k: 'Tech escalation', v: 'Yes' } },
          { label: 'No, provided workaround', next: 'end', note: { k: 'Tech escalation', v: 'No - workaround' } }
        ]
      },

      // Account update flow
      account_update_start: {
        id: 'account_update_start',
        text: 'Is the customer requesting personal details update or service change?',
        options: [
          { label: 'Personal details', next: 'account_update_details', note: { k: 'Account update type', v: 'Personal details' } },
          { label: 'Service change', next: 'account_update_service', note: { k: 'Account update type', v: 'Service change' } }
        ]
      },
      account_update_details: {
        id: 'account_update_details',
        text: 'Update details: collect field to update (e.g., address, phone). Enter summary:',
        input: true,
        inputLabel: 'Update summary',
        inputPlaceholder: 'e.g., Update phone number to ...',
        inputNoteKey: 'Account update summary',
        next: 'account_update_confirm'
      },
      account_update_service: {
        id: 'account_update_service',
        text: 'Service change: record requested change and confirm service impact:',
        input: true,
        inputLabel: 'Service change summary',
        inputPlaceholder: 'e.g., Upgrade plan to ...',
        inputNoteKey: 'Service change summary',
        next: 'account_update_confirm'
      },
      account_update_confirm: {
        id: 'account_update_confirm',
        text: 'Was the change applied successfully?',
        options: [
          { label: 'Yes', next: 'end', note: { k: 'Account update applied', v: 'Yes' } },
          { label: 'No', next: 'end', note: { k: 'Account update applied', v: 'No' } }
        ]
      },

      // General inquiry flow
      general_flow_start: {
        id: 'general_flow_start',
        text: 'What is the main reason for the call? Select one:',
        options: [
          { label: 'Product info', next: 'general_info', note: { k: 'General reason', v: 'Product info' } },
          { label: 'Service hours', next: 'general_info', note: { k: 'General reason', v: 'Service hours' } },
          { label: 'Other', next: 'general_description', note: { k: 'General reason', v: 'Other' } }
        ]
      },
      general_info: {
        id: 'general_info',
        text: 'Provide the information requested and confirm customer understanding. Was the customer satisfied?',
        options: [
          { label: 'Satisfied', next: 'end', note: { k: 'General outcome', v: 'Satisfied' } },
          { label: 'Needs follow-up', next: 'general_followup', note: { k: 'General outcome', v: 'Follow-up' } }
        ]
      },
      general_description: {
        id: 'general_description',
        text: 'Please capture a short note about the request:',
        input: true,
        inputLabel: 'Request summary',
        inputPlaceholder: 'Enter summary',
        inputNoteKey: 'Request summary',
        next: 'general_followup'
      },
      general_followup: {
        id: 'general_followup',
        text: 'Is follow-up required?',
        options: [
          { label: 'Yes', next: 'end', note: { k: 'Follow-up required', v: 'Yes' } },
          { label: 'No', next: 'end', note: { k: 'Follow-up required', v: 'No' } }
        ]
      }
    }
  };

  // --- Complaints Assistant Tree (unchanged from prior) ---
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

  // --- VC Assistant Tree (unchanged) ---
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

  const initialized = { guided: false, complaints: false, vc: false };

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

  // --- Knowledge Portal implementation (unchanged) ---
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

  renderKB(kbArticles);

  kbSearchEl.addEventListener('input', (e) => {
    const q = (e.target.value || '').toLowerCase().trim();
    if(!q){ renderKB(kbArticles); return; }
    const filtered = kbArticles.filter(a => {
      return a.title.toLowerCase().includes(q) || a.content.join(' ').toLowerCase().includes(q) || a.id.toLowerCase().includes(q);
    });
    renderKB(filtered);
  });

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
