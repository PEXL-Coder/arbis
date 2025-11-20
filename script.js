const guidedFlowSteps = [
    {
        id: 0,
        question: "Has ID&V (Identity and Verification) been passed?",
        phrases: [
            "Before we proceed, I need to verify your identity for security purposes.",
            "Can you confirm your full name and date of birth please?",
            "For data protection, I'll need to verify a few details with you."
        ],
        options: ["Yes", "No"],
        next: { Yes: 1, No: 29 }
    },
    {
        id: 1,
        question: "Check for listing changes - Are there any changes to the vehicle or driver details?",
        phrases: [
            "Let me check if there are any recent changes to your policy.",
            "I can see we need to review some policy details.",
            "I'll just verify the current status of your policy."
        ],
        options: ["Changes Found", "No Changes"],
        next: { "Changes Found": 2, "No Changes": 20 }
    },
    {
        id: 2,
        question: "Confirm MTA (Mid-Term Adjustment) - Would you like to proceed with the policy change?",
        phrases: [
            "I can process this mid-term adjustment for you.",
            "Let's go through the changes to your policy.",
            "I'll help you make these changes to your policy."
        ],
        options: ["Proceed with MTA", "Cancel"],
        next: { "Proceed with MTA": 3, "Cancel": 28 }
    },
    {
        id: 3,
        question: "Confirm the effective date - When would you like this change to take effect?",
        phrases: [
            "When would you like these changes to start?",
            "Can you confirm the date you want this to be effective from?",
            "What date should I set for this change?"
        ],
        options: ["Today", "Specific Future Date", "Policy Renewal Date"],
        next: { "Today": 4, "Specific Future Date": 4, "Policy Renewal Date": 4 }
    },
    {
        id: 4,
        question: "Confirm reason for change - What is the reason for this policy modification?",
        phrases: [
            "Can you tell me why you're making this change?",
            "What's prompting this policy modification?",
            "Help me understand the reason for this change."
        ],
        options: ["Vehicle Change", "Driver Change", "Address Change", "Cover Change", "Other"],
        next: { "Vehicle Change": 5, "Driver Change": 6, "Address Change": 20, "Cover Change": 14, "Other": 20 }
    },
    {
        id: 5,
        question: "Confirm main driver - Who will be the main driver of this vehicle?",
        phrases: [
            "Who will be the primary driver of the vehicle?",
            "Can you confirm who the main driver is?",
            "Who will be driving this vehicle most often?"
        ],
        options: ["Policyholder", "Named Driver", "New Driver"],
        next: { "Policyholder": 7, "Named Driver": 7, "New Driver": 6 }
    },
    {
        id: 6,
        question: "Confirm keeper - Who is the registered keeper of the vehicle?",
        phrases: [
            "Who is listed as the registered keeper?",
            "Can you confirm who owns the vehicle?",
            "Who is the legal owner of the vehicle?"
        ],
        options: ["Policyholder", "Finance Company", "Family Member", "Other"],
        next: { "Policyholder": 7, "Finance Company": 7, "Family Member": 7, "Other": 7 }
    },
    {
        id: 7,
        question: "Confirm mileage - What is the estimated annual mileage?",
        phrases: [
            "How many miles do you estimate driving per year?",
            "What's your annual mileage?",
            "Can you confirm the yearly mileage?"
        ],
        options: ["Under 5,000", "5,000-10,000", "10,000-15,000", "Over 15,000"],
        next: { "Under 5,000": 8, "5,000-10,000": 8, "10,000-15,000": 8, "Over 15,000": 8 }
    },
    {
        id: 8,
        question: "Confirm transfer - Is this vehicle being transferred from another policy?",
        phrases: [
            "Are you transferring this from another policy?",
            "Is this a transfer from another insurer?",
            "Have you had previous insurance on this vehicle?"
        ],
        options: ["Yes - Transfer", "No - New Policy"],
        next: { "Yes - Transfer": 9, "No - New Policy": 9 }
    },
    {
        id: 9,
        question: "Confirm engine size - What is the engine capacity (cc)?",
        phrases: [
            "What size is the engine?",
            "Can you confirm the engine capacity?",
            "What's the cc of the vehicle?"
        ],
        options: ["Up to 1000cc", "1001-1500cc", "1501-2000cc", "Over 2000cc"],
        next: { "Up to 1000cc": 10, "1001-1500cc": 10, "1501-2000cc": 10, "Over 2000cc": 10 }
    },
    {
        id: 10,
        question: "Confirm modifications - Does the vehicle have any modifications?",
        phrases: [
            "Has the vehicle been modified in any way?",
            "Are there any modifications to the vehicle?",
            "Has anything been changed from the manufacturer's spec?"
        ],
        options: ["Yes", "No"],
        next: { "Yes": 11, "No": 11 }
    },
    {
        id: 11,
        question: "Confirm registered keeper - Is the vehicle registered at your current address?",
        phrases: [
            "Is the vehicle registered at your address?",
            "Can you confirm the vehicle registration address?",
            "Where is the vehicle registered?"
        ],
        options: ["Yes - Current Address", "No - Different Address"],
        next: { "Yes - Current Address": 12, "No - Different Address": 12 }
    },
    {
        id: 12,
        question: "Confirm purchase date - When was the vehicle purchased?",
        phrases: [
            "When did you purchase the vehicle?",
            "What's the purchase date of the vehicle?",
            "When did you acquire this vehicle?"
        ],
        options: ["Within last month", "1-6 months ago", "6-12 months ago", "Over 12 months ago"],
        next: { "Within last month": 13, "1-6 months ago": 13, "6-12 months ago": 13, "Over 12 months ago": 13 }
    },
    {
        id: 13,
        question: "Vehicle still held? - Do you still have possession of the vehicle?",
        phrases: [
            "Do you still have the vehicle?",
            "Is the vehicle still in your possession?",
            "Can you confirm you still own this vehicle?"
        ],
        options: ["Yes", "No"],
        next: { "Yes": 14, "No": 15 }
    },
    {
        id: 14,
        question: "Type of cover - What level of cover do you require?",
        phrases: [
            "What type of insurance cover would you like?",
            "Which level of cover do you need?",
            "Let's select your cover type."
        ],
        options: ["Comprehensive", "Third Party Fire & Theft", "Third Party Only"],
        next: { "Comprehensive": 16, "Third Party Fire & Theft": 20, "Third Party Only": 20 }
    },
    {
        id: 15,
        question: "Search alternative database - The vehicle is no longer held. Should we search for alternative options?",
        phrases: [
            "Let me search our system for alternatives.",
            "I can look for other options for you.",
            "Shall I search for alternative solutions?"
        ],
        options: ["Yes - Search Alternatives", "No - End Call"],
        next: { "Yes - Search Alternatives": 30, "No - End Call": 28 }
    },
    {
        id: 16,
        question: "Q. Managed add-ons (GRSC) - Would you like to add Guaranteed Replacement of Stolen Car?",
        phrases: [
            "We have an optional add-on for Guaranteed Replacement of Stolen Car.",
            "Would you like GRSC cover?",
            "This provides a replacement vehicle if yours is stolen."
        ],
        options: ["Yes - Add GRSC", "No Thanks", "Tell me more"],
        next: { "Yes - Add GRSC": 17, "No Thanks": 18, "Tell me more": 17 }
    },
    {
        id: 17,
        question: "Q. GHC (Guaranteed Hire Car) request - Would you like to add Guaranteed Hire Car?",
        phrases: [
            "We can offer Guaranteed Hire Car cover.",
            "Would you like a hire car guarantee?",
            "This ensures a replacement vehicle while yours is being repaired."
        ],
        options: ["Yes - Add GHC", "No Thanks"],
        next: { "Yes - Add GHC": 19, "No Thanks": 19 }
    },
    {
        id: 18,
        question: "Q. GHC inclusion - Guaranteed Hire Car is included with comprehensive cover. Would you like to keep it?",
        phrases: [
            "GHC is already included in your comprehensive policy.",
            "Hire car cover is part of your package - keep it?",
            "This is included at no extra cost."
        ],
        options: ["Yes - Keep GHC", "No - Remove GHC"],
        next: { "Yes - Keep GHC": 19, "No - Remove GHC": 19 }
    },
    {
        id: 19,
        question: "Q. Comp offer - Based on your profile, we can offer competitive rates. Proceed with quote?",
        phrases: [
            "I have a competitive quote ready for you.",
            "Let me calculate your premium.",
            "I can provide your quote now."
        ],
        options: ["Yes - Get Quote", "No - Review Options"],
        next: { "Yes - Get Quote": 21, "No - Review Options": 20 }
    },
    {
        id: 20,
        question: "Review details - Would you like to review all the details before proceeding?",
        phrases: [
            "Let's review everything we've discussed.",
            "I'll summarize the details for you.",
            "Let me confirm all the information."
        ],
        options: ["Review Complete - Proceed", "Make Changes", "Start Over"],
        next: { "Review Complete - Proceed": 21, "Make Changes": 1, "Start Over": 0 }
    },
    {
        id: 21,
        question: "Q. Add GHC? - Final confirmation - Add Guaranteed Hire Car to your policy?",
        phrases: [
            "As a final option, would you like to add Guaranteed Hire Car?",
            "One last add-on - Guaranteed Hire Car?",
            "Would you like hire car cover included?"
        ],
        options: ["Yes - Add GHC", "No Thanks"],
        next: { "Yes - Add GHC": 22, "No Thanks": 22 }
    },
    {
        id: 22,
        question: "Offer PRCT - Would you like to add Personal Accident Cover?",
        phrases: [
            "We also offer Personal Accident Cover.",
            "Would you like cover for personal accidents?",
            "This protects you in case of injury."
        ],
        options: ["Yes - Add PRCT", "No Thanks"],
        next: { "Yes - Add PRCT": 23, "No Thanks": 23 }
    },
    {
        id: 23,
        question: "Q. Already GHC added? - You've already added GHC. Would you like to confirm this?",
        phrases: [
            "I can confirm GHC is on your policy.",
            "Guaranteed Hire Car has been added.",
            "Just confirming the GHC add-on."
        ],
        options: ["Confirm GHC", "Remove GHC"],
        next: { "Confirm GHC": 24, "Remove GHC": 24 }
    },
    {
        id: 24,
        question: "Provide or confirm - Shall I provide a final quote or confirm the policy?",
        phrases: [
            "Would you like the final quote?",
            "Shall I confirm this policy for you?",
            "Let me finalize the details."
        ],
        options: ["Provide Quote", "Confirm Policy", "Review Again"],
        next: { "Provide Quote": 25, "Confirm Policy": 26, "Review Again": 20 }
    },
    {
        id: 25,
        question: "Quote provided - Your quote is ready. Would you like to proceed with this policy?",
        phrases: [
            "Here's your quote based on the information provided.",
            "Your premium has been calculated.",
            "This is the cost for your policy."
        ],
        options: ["Accept Quote", "Decline", "Need Time to Think"],
        next: { "Accept Quote": 26, "Decline": 28, "Need Time to Think": 27 }
    },
    {
        id: 26,
        question: "Policy confirmed - Your policy is now active. Is there anything else I can help with?",
        phrases: [
            "Your policy is all set up.",
            "Everything is confirmed and active.",
            "Your insurance is now in place."
        ],
        options: ["No, that's all", "I have a question"],
        next: { "No, that's all": 28, "I have a question": 27 }
    },
    {
        id: 27,
        question: "Additional assistance - What else can I help you with?",
        phrases: [
            "What other questions do you have?",
            "How else can I assist you?",
            "Is there anything else you need?"
        ],
        options: ["Policy Documents", "Payment Options", "Contact Details", "Nothing else"],
        next: { "Policy Documents": 28, "Payment Options": 28, "Contact Details": 28, "Nothing else": 28 }
    },
    {
        id: 28,
        question: "Call Closing - Thank you for calling. Is there anything else before we finish?",
        phrases: [
            "Thank you for choosing our insurance services.",
            "I appreciate your time today.",
            "We're here if you need us in the future."
        ],
        options: ["End Call"],
        next: { "End Call": -1 }
    },
    {
        id: 29,
        question: "ID&V Failed - Unable to proceed without verification. Would you like to try again?",
        phrases: [
            "I'm unable to proceed without verifying your identity.",
            "For security, I must complete ID&V before continuing.",
            "Would you like to attempt verification again?"
        ],
        options: ["Try ID&V Again", "End Call"],
        next: { "Try ID&V Again": 0, "End Call": 28 }
    },
    {
        id: 30,
        question: "Alternative database searched - We found some options. Would you like to hear them?",
        phrases: [
            "I found some alternative solutions.",
            "Here are some options that might work.",
            "Let me share what I found."
        ],
        options: ["Yes - Hear Options", "No Thanks"],
        next: { "Yes - Hear Options": 14, "No Thanks": 28 }
    }
];
const articles = [
    {
        id: 1,
        title: "Resetting Customer Password",
        category: "Account Management",
        steps: [
            "Navigate to Settings → Security → Reset Password",
            "Click on 'Forgot Password' link",
            "Enter customer's registered email address",
            "Verify customer identity using security questions",
            "Send password reset link to customer's email",
            "Confirm customer has received the email"
        ],
        screenshot: "Password Reset Interface"
    },
    {
        id: 2,
        title: "Processing a Refund",
        category: "Payments",
        steps: [
            "Navigate to Payments → Refunds → New Refund",
            "Enter transaction ID or search by customer name",
            "Verify transaction details and refund eligibility",
            "Select refund amount (full or partial)",
            "Choose refund method (original payment method or bank transfer)",
            "Add refund reason and notes",
            "Submit refund request for approval",
            "Notify customer of refund processing time (3-5 business days)"
        ],
        screenshot: "Refund Processing Dashboard"
    },
    {
        id: 3,
        title: "Updating Customer Contact Information",
        category: "Account Management",
        steps: [
            "Verify customer identity using ID&V process",
            "Navigate to Customer Profile → Contact Details",
            "Click 'Edit' on the contact information section",
            "Update email, phone number, or address as requested",
            "Verify new contact details with customer",
            "Click 'Save Changes'",
            "Send confirmation to new email/phone if changed"
        ],
        screenshot: "Customer Profile Edit Screen"
    },
    {
        id: 4,
        title: "Handling Login Issues",
        category: "Technical Support",
        steps: [
            "Ask customer to describe the specific login problem",
            "Check if account is locked or suspended",
            "Verify username/email is correct",
            "Attempt password reset if needed",
            "Check for browser cache/cookie issues",
            "Test login from different browser or device",
            "Escalate to technical team if issue persists"
        ],
        screenshot: "Account Status Dashboard"
    },
    {
        id: 5,
        title: "Creating a New Support Ticket",
        category: "Support",
        steps: [
            "Navigate to Support → New Ticket",
            "Enter customer details (name, account number, contact)",
            "Select issue category and priority level",
            "Provide detailed description of the issue",
            "Attach relevant screenshots or documents",
            "Assign to appropriate department",
            "Send ticket confirmation to customer with ticket ID"
        ],
        screenshot: "Support Ticket Creation Form"
    },
    {
        id: 6,
        title: "Verifying Customer Identity (ID&V)",
        category: "Security",
        steps: [
            "Greet customer and explain ID&V is for security",
            "Ask for full name as registered",
            "Request date of birth",
            "Ask for postcode of registered address",
            "Verify last 4 digits of account number or card",
            "Ask security question (mother's maiden name, first school, etc.)",
            "Mark ID&V as passed or failed in system",
            "Proceed with inquiry only if ID&V passed"
        ],
        screenshot: "ID&V Verification Screen"
    }
];

const complaintsTree = [
    {
        id: 0,
        question: "Has the customer expressed dissatisfaction with our service or product?",
        options: ["Yes", "No"],
        next: { Yes: 1, No: -2 }
    },
    {
        id: 1,
        question: "Has the customer explicitly asked to make a formal complaint?",
        options: ["Yes", "No"],
        next: { Yes: -1, No: 2 }
    },
    {
        id: 2,
        question: "Have you attempted to resolve the issue during this call?",
        options: ["Yes", "No"],
        next: { Yes: 3, No: -1 }
    },
    {
        id: 3,
        question: "Is the customer satisfied with the resolution provided?",
        options: ["Yes", "No"],
        next: { Yes: -2, No: 4 }
    },
    {
        id: 4,
        question: "Does the issue involve financial loss, service failure, or breach of terms?",
        options: ["Yes", "No"],
        next: { Yes: -1, No: 5 }
    },
    {
        id: 5,
        question: "Has the customer indicated they want to escalate the matter?",
        options: ["Yes", "No"],
        next: { Yes: -1, No: -2 }
    }
];

const vcTree = [
    {
        id: 0,
        question: "Does the customer have difficulty communicating or understanding?",
        options: ["Yes", "No"],
        next: { Yes: -1, No: 1 }
    },
    {
        id: 1,
        question: "Has the customer mentioned any health conditions affecting their decision-making?",
        options: ["Yes", "No"],
        next: { Yes: -1, No: 2 }
    },
    {
        id: 2,
        question: "Is the customer experiencing financial difficulties or hardship?",
        options: ["Yes", "No"],
        next: { Yes: -1, No: 3 }
    },
    {
        id: 3,
        question: "Does the customer appear to be under pressure or duress from a third party?",
        options: ["Yes", "No"],
        next: { Yes: -1, No: 4 }
    },
    {
        id: 4,
        question: "Has the customer mentioned recent bereavement or significant life changes?",
        options: ["Yes", "No"],
        next: { Yes: -1, No: 5 }
    },
    {
        id: 5,
        question: "Does the customer show signs of age-related vulnerability (elderly)?",
        options: ["Yes", "No"],
        next: { Yes: -1, No: 6 }
    },
    {
        id: 6,
        question: "Is the customer showing signs of mental health concerns or distress?",
        options: ["Yes", "No"],
        next: { Yes: -1, No: -2 }
    }
];

let currentModule = 'dashboard';
let flowState = {
    currentStep: 0,
    history: [],
    answers: {}
};
let complaintsState = {
    currentStep: 0,
    answers: {}
};
let vcState = {
    currentStep: 0,
    answers: {}
};

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initGuidedFlow();
    initKnowledgePortal();
    initComplaintsAssistant();
    initVCAssistant();
});

function initNavigation() {
    const cards = document.querySelectorAll('.card');
    const resetBtn = document.getElementById('resetBtn');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const module = card.getAttribute('data-module');
            showModule(module);
        });
    });

    resetBtn.addEventListener('click', () => {
        showModule('dashboard');
    });
}

function showModule(moduleName) {
    const sections = document.querySelectorAll('.module-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(moduleName);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    const resetBtn = document.getElementById('resetBtn');
    if (moduleName === 'dashboard') {
        resetBtn.style.display = 'none';
    } else {
        resetBtn.style.display = 'block';
    }

    currentModule = moduleName;
}

function initGuidedFlow() {
    const nextBtn = document.getElementById('flowNextBtn');
    const prevBtn = document.getElementById('flowPrevBtn');
    const restartBtn = document.getElementById('flowRestartBtn');
    const copyBtn = document.getElementById('flowCopyBtn');

    nextBtn.addEventListener('click', handleFlowNext);
    prevBtn.addEventListener('click', handleFlowPrevious);
    restartBtn.addEventListener('click', resetGuidedFlow);
    copyBtn.addEventListener('click', copyFlowNotes);

    renderFlowStep();
}

function renderFlowStep() {
    const step = guidedFlowSteps[flowState.currentStep];
    const questionEl = document.getElementById('flowQuestion');
    const phrasesEl = document.getElementById('flowPhrases');
    const optionsEl = document.getElementById('flowOptions');
    const prevBtn = document.getElementById('flowPrevBtn');
    const nextBtn = document.getElementById('flowNextBtn');
    const notesEl = document.getElementById('flowNotes');
    const stepContainer = document.getElementById('flowStep');

    questionEl.textContent = step.question;

    phrasesEl.innerHTML = '<h4 style="color: #FF6600; margin-bottom: 12px; font-size: 1.1rem; font-weight: 600;">Suggested Phrases:</h4>';
    step.phrases.forEach(phrase => {
        const phraseDiv = document.createElement('div');
        phraseDiv.className = 'phrase-item';
        phraseDiv.textContent = phrase;
        phrasesEl.appendChild(phraseDiv);
    });

    optionsEl.innerHTML = '';
    step.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        
        if (flowState.answers[step.id] === option) {
            btn.classList.add('selected');
        }

        btn.addEventListener('click', () => {
            const buttons = optionsEl.querySelectorAll('.option-btn');
            buttons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            flowState.answers[step.id] = option;
            nextBtn.disabled = false;
        });

        optionsEl.appendChild(btn);
    });

    prevBtn.disabled = flowState.history.length === 0;
    nextBtn.disabled = !flowState.answers[step.id];
}

function handleFlowNext() {
    const step = guidedFlowSteps[flowState.currentStep];
    const selectedAnswer = flowState.answers[step.id];

    if (!selectedAnswer) return;

    const nextStepId = step.next[selectedAnswer];

    if (nextStepId === -1) {
        showFlowNotes();
        return;
    }

    flowState.history.push(flowState.currentStep);
    flowState.currentStep = nextStepId;
    renderFlowStep();
}

function handleFlowPrevious() {
    if (flowState.history.length > 0) {
        flowState.currentStep = flowState.history.pop();
        renderFlowStep();
    }
}

function showFlowNotes() {
    const stepContainer = document.getElementById('flowStep');
    const controls = document.querySelector('.flow-controls');
    const notesEl = document.getElementById('flowNotes');
    const notesContent = document.getElementById('flowNotesContent');

    stepContainer.style.display = 'none';
    controls.style.display = 'none';
    notesEl.style.display = 'block';

    const timestamp = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    let notes = '╔════════════════════════════════════════════════════════════╗\n';
    notes += '║              INSURANCE POLICY CALL NOTES                   ║\n';
    notes += '╚════════════════════════════════════════════════════════════╝\n\n';
    notes += `Date & Time: ${timestamp}\n\n`;

    const idvStatus = flowState.answers[0] || 'Not Verified';
    notes += '┌─── IDENTITY VERIFICATION ───────────────────────────────────\n';
    notes += `│ Status: ${idvStatus}\n`;
    notes += '└─────────────────────────────────────────────────────────────\n\n';

    let vehicleDetails = [];
    let policyChanges = [];
    let coverDetails = [];
    let addOns = [];
    let quoteStatus = [];

    guidedFlowSteps.forEach(step => {
        const answer = flowState.answers[step.id];
        if (answer && step.id > 0) {
            if (step.id >= 1 && step.id <= 13) {
                vehicleDetails.push({
                    question: step.question,
                    answer: answer
                });
            }
            if (step.id >= 14 && step.id <= 15) {
                coverDetails.push({
                    question: step.question,
                    answer: answer
                });
            }
            if (step.id >= 16 && step.id <= 23) {
                addOns.push({
                    question: step.question,
                    answer: answer
                });
            }
            if (step.id >= 24 && step.id <= 28) {
                quoteStatus.push({
                    question: step.question,
                    answer: answer
                });
            }
        }
    });

    if (vehicleDetails.length > 0) {
        notes += '┌─── POLICY CHANGE DETAILS ───────────────────────────────────\n';
        vehicleDetails.forEach(detail => {
            const cleanQuestion = detail.question.replace(/^.*? - /, '');
            notes += `│ ${cleanQuestion}\n`;
            notes += `│   → ${detail.answer}\n`;
        });
        notes += '└─────────────────────────────────────────────────────────────\n\n';
    }

    if (coverDetails.length > 0) {
        notes += '┌─── COVER TYPE SELECTION ────────────────────────────────────\n';
        coverDetails.forEach(detail => {
            const cleanQuestion = detail.question.replace(/^.*? - /, '');
            notes += `│ ${cleanQuestion}\n`;
            notes += `│   → ${detail.answer}\n`;
        });
        notes += '└─────────────────────────────────────────────────────────────\n\n';
    }

    if (addOns.length > 0) {
        notes += '┌─── ADD-ONS SELECTED ────────────────────────────────────────\n';
        addOns.forEach(detail => {
            const cleanQuestion = detail.question.replace(/^.*? - /, '').replace(/^Q\. /, '');
            notes += `│ ${cleanQuestion}\n`;
            notes += `│   → ${detail.answer}\n`;
        });
        notes += '└─────────────────────────────────────────────────────────────\n\n';
    }

    if (quoteStatus.length > 0) {
        notes += '┌─── QUOTE & POLICY STATUS ───────────────────────────────────\n';
        quoteStatus.forEach(detail => {
            const cleanQuestion = detail.question.replace(/^.*? - /, '');
            notes += `│ ${cleanQuestion}\n`;
            notes += `│   → ${detail.answer}\n`;
        });
        notes += '└─────────────────────────────────────────────────────────────\n\n';
    }

    notes += '┌─── COMPLETE CALL TRANSCRIPT ────────────────────────────────\n';
    let stepNumber = 1;
    guidedFlowSteps.forEach(step => {
        if (flowState.answers[step.id]) {
            notes += `│\n│ Step ${stepNumber}: ${step.question}\n`;
            notes += `│ Agent Selected: ${flowState.answers[step.id]}\n`;
            stepNumber++;
        }
    });
    notes += '└─────────────────────────────────────────────────────────────\n\n';

    notes += '═══════════════════════════════════════════════════════════════\n';
    notes += '                    END OF INSURANCE CALL NOTES\n';
    notes += '═══════════════════════════════════════════════════════════════';

    notesContent.textContent = notes;
}

function copyFlowNotes() {
    const notesContent = document.getElementById('flowNotesContent');
    const text = notesContent.textContent;

    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = document.getElementById('flowCopyBtn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '';
        }, 2000);
    });
}

function resetGuidedFlow() {
    flowState = {
        currentStep: 0,
        history: [],
        answers: {}
    };

    const stepContainer = document.getElementById('flowStep');
    const controls = document.querySelector('.flow-controls');
    const notesEl = document.getElementById('flowNotes');

    stepContainer.style.display = 'block';
    controls.style.display = 'flex';
    notesEl.style.display = 'none';

    renderFlowStep();
}

function initKnowledgePortal() {
    const searchInput = document.getElementById('knowledgeSearch');
    const container = document.getElementById('articlesContainer');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        renderArticles(searchTerm);
    });

    renderArticles('');
}

function renderArticles(searchTerm = '') {
    const container = document.getElementById('articlesContainer');
    container.innerHTML = '';

    const filteredArticles = articles.filter(article => {
        return article.title.toLowerCase().includes(searchTerm) ||
               article.category.toLowerCase().includes(searchTerm) ||
               article.steps.some(step => step.toLowerCase().includes(searchTerm));
    });

    if (filteredArticles.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No articles found matching your search.</p>';
        return;
    }

    filteredArticles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'article-card';

        const header = document.createElement('div');
        header.className = 'article-header';
        header.innerHTML = `
            <div>
                <h3>${article.title}</h3>
                <p style="color: #666; font-size: 0.9rem; margin-top: 4px;">${article.category}</p>
            </div>
            <span class="article-toggle">+</span>
        `;

        const content = document.createElement('div');
        content.className = 'article-content';

        const stepsHtml = article.steps.map((step, index) => 
            `<div class="article-step">${index + 1}. ${step}</div>`
        ).join('');

        content.innerHTML = `
            <div class="article-steps">${stepsHtml}</div>
            <div class="article-screenshot">Screenshot: ${article.screenshot}</div>
        `;

        header.addEventListener('click', () => {
            const isExpanded = content.classList.contains('expanded');
            content.classList.toggle('expanded');
            header.querySelector('.article-toggle').textContent = isExpanded ? '+' : '−';
        });

        card.appendChild(header);
        card.appendChild(content);
        container.appendChild(card);
    });
}

function initComplaintsAssistant() {
    const restartBtn = document.getElementById('complaintsRestartBtn');
    restartBtn.addEventListener('click', resetComplaints);
    renderComplaintsStep();
}

function renderComplaintsStep() {
    const step = complaintsTree[complaintsState.currentStep];
    const questionEl = document.getElementById('complaintsQuestion');
    const optionsEl = document.getElementById('complaintsOptions');
    const stepContainer = document.getElementById('complaintsStep');
    const resultContainer = document.getElementById('complaintsResult');

    stepContainer.style.display = 'block';
    resultContainer.style.display = 'none';

    questionEl.textContent = step.question;

    optionsEl.innerHTML = '';
    step.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;

        btn.addEventListener('click', () => {
            complaintsState.answers[step.id] = option;
            const nextStepId = step.next[option];

            if (nextStepId === -1) {
                showComplaintsResult(true);
            } else if (nextStepId === -2) {
                showComplaintsResult(false);
            } else {
                complaintsState.currentStep = nextStepId;
                renderComplaintsStep();
            }
        });

        optionsEl.appendChild(btn);
    });
}

function showComplaintsResult(shouldLog) {
    const stepContainer = document.getElementById('complaintsStep');
    const resultContainer = document.getElementById('complaintsResult');
    const resultTitle = document.getElementById('complaintsResultTitle');
    const notesEl = document.getElementById('complaintsNotes');

    stepContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    if (shouldLog) {
        resultTitle.textContent = 'Log Complaint';
        resultTitle.className = 'warning';
    } else {
        resultTitle.textContent = 'Do Not Log Complaint';
        resultTitle.className = 'success';
    }

    let notesHtml = '<h4 style="color: #FF6600; margin-bottom: 12px; font-weight: 600;">Assessment Summary:</h4>';
    complaintsTree.forEach(step => {
        if (complaintsState.answers[step.id]) {
            notesHtml += `<p><strong>Q:</strong> ${step.question}</p>`;
            notesHtml += `<p><strong>A:</strong> ${complaintsState.answers[step.id]}</p>`;
            notesHtml += '<hr style="margin: 12px 0; border: none; border-top: 1px solid #E0E0E0;">';
        }
    });

    notesEl.innerHTML = notesHtml;
}

function resetComplaints() {
    complaintsState = {
        currentStep: 0,
        answers: {}
    };
    renderComplaintsStep();
}

function initVCAssistant() {
    const restartBtn = document.getElementById('vcRestartBtn');
    restartBtn.addEventListener('click', resetVC);
    renderVCStep();
}

function renderVCStep() {
    const step = vcTree[vcState.currentStep];
    const questionEl = document.getElementById('vcQuestion');
    const optionsEl = document.getElementById('vcOptions');
    const stepContainer = document.getElementById('vcStep');
    const resultContainer = document.getElementById('vcResult');

    stepContainer.style.display = 'block';
    resultContainer.style.display = 'none';

    questionEl.textContent = step.question;

    optionsEl.innerHTML = '';
    step.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;

        btn.addEventListener('click', () => {
            vcState.answers[step.id] = option;
            const nextStepId = step.next[option];

            if (nextStepId === -1) {
                showVCResult(true);
            } else if (nextStepId === -2) {
                showVCResult(false);
            } else {
                vcState.currentStep = nextStepId;
                renderVCStep();
            }
        });

        optionsEl.appendChild(btn);
    });
}

function showVCResult(isVulnerable) {
    const stepContainer = document.getElementById('vcStep');
    const resultContainer = document.getElementById('vcResult');
    const resultTitle = document.getElementById('vcResultTitle');
    const notesEl = document.getElementById('vcNotes');

    stepContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    if (isVulnerable) {
        resultTitle.textContent = 'Customer is Vulnerable';
        resultTitle.className = 'warning';
    } else {
        resultTitle.textContent = 'Customer is Not Vulnerable';
        resultTitle.className = 'success';
    }

    let notesHtml = '<h4 style="color: #FF6600; margin-bottom: 12px; font-weight: 600;">Vulnerability Assessment:</h4>';
    vcTree.forEach(step => {
        if (vcState.answers[step.id]) {
            notesHtml += `<p><strong>Q:</strong> ${step.question}</p>`;
            notesHtml += `<p><strong>A:</strong> ${vcState.answers[step.id]}</p>`;
            notesHtml += '<hr style="margin: 12px 0; border: none; border-top: 1px solid #E0E0E0;">';
        }
    });

    if (isVulnerable) {
        notesHtml += '<p style="color: #D32F2F; font-weight: 600; margin-top: 16px;">Action Required: Flag account for vulnerable customer support and follow appropriate procedures.</p>';
    }

    notesEl.innerHTML = notesHtml;
}

function resetVC() {
    vcState = {
        currentStep: 0,
        answers: {}
    };
    renderVCStep();
}
