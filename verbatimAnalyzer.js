/* ===================================================================
   VERBATIM ANALYZER - Advanced PoC Module
   Phrase-level sentiment analysis with historical tracking
   =================================================================== */

// Global Dashboard Mock Object
window.ARBIS_DASHBOARD = window.ARBIS_DASHBOARD || {
    metrics: [],
    pushMetric: function (metric) {
        this.metrics.push(metric);
        console.log('📊 Dashboard Metric Pushed:', metric);
    }
};

// Comprehensive keyword dictionary for phrase analysis - Enhanced for Customer Service & Emotions
const SENTIMENT_KEYWORDS = {
    positive: {
        strong: [
            // Exceptional service
            'excellent', 'amazing', 'fantastic', 'wonderful', 'outstanding', 'perfect', 'brilliant',
            'exceptional', 'superb', 'magnificent', 'phenomenal', 'incredible', 'marvelous', 'spectacular',
            'first-class', 'top-notch', 'world-class', 'exemplary', 'flawless', 'impeccable',
            // Strong appreciation
            'love', 'adore', 'delighted', 'thrilled', 'ecstatic', 'overjoyed', 'blessed', 'grateful',
            'appreciate greatly', 'highly recommend', 'extremely satisfied', 'beyond expectations',
            // Resolution & success
            'resolved quickly', 'fixed immediately', 'sorted out perfectly', 'handled brilliantly',
            'exceeded expectations', 'went above and beyond', 'outstanding support', 'problem solved'
        ],
        moderate: [
            // Good service
            'good', 'great', 'nice', 'helpful', 'pleasant', 'positive', 'satisfactory', 'competent',
            'reliable', 'dependable', 'trustworthy', 'professional', 'courteous', 'polite', 'respectful',
            // Efficiency
            'quick', 'fast', 'prompt', 'efficient', 'speedy', 'timely', 'swift', 'rapid',
            'responsive', 'immediate', 'expedited', 'streamlined',
            // Problem resolution
            'solved', 'resolved', 'fixed', 'sorted', 'handled', 'addressed', 'dealt with',
            'taken care of', 'looked after', 'managed well', 'cleared up', 'working on it',
            // Appreciation
            'thank', 'thanks', 'appreciate', 'grateful', 'pleased', 'happy', 'satisfied',
            'content', 'glad', 'relieved', 'comfortable',
            // Gratitude expressions
            'generous', 'kind', 'thoughtful', 'considerate', 'understanding', 'accommodating',
            'fair', 'reasonable offer', 'more than fair',
            // Customer feeling valued/cared for
            'feel cared', 'feel valued', 'feel heard', 'feel appreciated', 'feel respected',
            'truly cared', 'really cared', 'genuinely care', 'you care', 'you cared',
            'makes me feel', 'made me feel better', 'feel like you', 'feel supported',
            // Knowledge & competence
            'knowledgeable', 'informed', 'experienced', 'skilled', 'capable', 'qualified',
            'well-trained', 'expert', 'proficient', 'understanding', 'patient',
            // Communication
            'clear', 'explained well', 'easy to understand', 'straightforward', 'transparent',
            'kept informed', 'good communication', 'listened carefully',
            // Empathy & acknowledgment (HANDLER POSITIVE BEHAVIORS)
            'i understand', 'i can see', 'i appreciate', 'i recognize', 'i hear you',
            'that must be', 'i can imagine', 'totally understand', 'completely understand',
            'understand your frustration', 'understand your concern', 'understand how',
            'i apologize', 'apologize for', 'sorry for', 'sorry about', 'my apologies',
            'let me help', 'happy to help', 'here to help', 'assist you',
            // Solution-oriented language
            'let me', 'i will', 'i can', 'what i can do', 'what i will do',
            'let me check', 'let me look', 'let me see', 'let me find',
            'i\'ll take care', 'i\'ll sort', 'i\'ll fix', 'i\'ll resolve',
            'solution', 'resolve this', 'fix this', 'sort this out',
            // Refund & credit processing (positive handler actions)
            'processing refund', 'processing credit', 'processing the refund', 'processing the credit',
            'issuing refund', 'issuing credit', 'refund processed', 'credit processed',
            'refund you', 'credit your account', 'crediting your account', 'refunding you',
            // Ownership & accountability (positive when handler takes responsibility)
            'taking ownership', 'took ownership', 'owned the mistake', 'owned the error',
            'taking responsibility', 'took responsibility', 'accountable',
            'more than just fixing', 'went beyond', 'doing more than', 'above and beyond',
            // Proactive handler actions (preventive measures)
            'to ensure', 'to prevent', 'to avoid', 'to make sure', 'to guarantee',
            'i have escalated', 'i have flagged', 'i have noted', 'i have documented',
            'doesn\'t happen again', 'won\'t happen again', 'prevent this', 'avoid this',
            'put measures in place', 'implemented safeguards', 'added protection',
            // Handler diagnostic/explanation (professional troubleshooting)
            'typically points to', 'indicates', 'suggests', 'points to', 'likely',
            'i found', 'i discovered', 'documented bug', 'known issue', 'matches your',
            'cross-reference', 'logging all', 'hand off', 'specific command',
            'bypass the', 'workaround for'
        ],
        mild: [
            'okay', 'fine', 'decent', 'acceptable', 'reasonable', 'adequate', 'fair', 'alright',
            'not bad', 'passable', 'tolerable', 'satisfactory enough', 'meets expectations',
            'standard', 'average', 'normal', 'typical', 'usual', 'expected'
        ]
    },
    negative: {
        strong: [
            // Extreme dissatisfaction
            'terrible', 'awful', 'horrible', 'worst', 'appalling', 'atrocious', 'abysmal', 'dreadful',
            'disgusting', 'pathetic', 'useless', 'worthless', 'incompetent', 'unacceptable',
            // Strong emotions
            'furious', 'outraged', 'livid', 'enraged', 'infuriated', 'incensed', 'irate',
            'disgusted', 'appalled', 'shocked', 'horrified', 'devastated',
            // Severe issues
            'nightmare', 'disaster', 'catastrophe', 'fiasco', 'debacle', 'shambles', 'mess',
            'complete failure', 'total disaster', 'absolute nightmare', 'utter chaos',
            // Strong negative actions
            'scam', 'fraud', 'rip-off', 'cheated', 'conned', 'deceived', 'misled', 'lied to',
            'robbed', 'stolen', 'ripped off', 'taken advantage of',
            // Complaints & escalation
            'complain formally', 'file complaint', 'report', 'sue', 'legal action', 'ombudsman',
            'regulator', 'solicitor', 'lawyer', 'compensation', 'refund demanded',
            // Extreme frustration
            // Frustration & stress
            'frustrated', 'frustrating', 'annoyed', 'annoying', 'irritated', 'irritating',
            'upset', 'upsetting', 'angry', 'cross', 'displeased', 'unhappy', 'dissatisfied',
            'let down', 'disappointed', 'stressed', 'stressful', 'worried', 'concerned',
            'anxious', 'nervous', 'tense', 'overwhelmed',
            // Problems & issues
            'problem', 'issue', 'trouble', 'difficulty', 'complication', 'concern', 'worry',
            'complaint', 'complain', 'grievance', 'dispute', 'disagreement',
            // Service failures
            'failed', 'failing', 'failure', "didn't work", "doesn't work", 'broken', 'not working',
            'error', 'mistake', 'wrong', 'incorrect', 'inaccurate', 'faulty', 'defective',
            'out of service', 'down', 'offline', 'unavailable',
            // Communication issues
            'confusing', 'confused', 'unclear', 'complicated', 'difficult to understand', 'vague',
            'ambiguous', 'misleading', 'contradictory', 'inconsistent',
            // Delays & waiting
            'delayed', 'delay', 'late', 'overdue', 'behind schedule', 'taking too long',
            'still waiting', 'not received', 'missing', 'lost', 'waiting indefinitely',
            // Unprofessional behavior
            'rude', 'unprofessional', 'dismissive', 'unhelpful', 'disrespectful', 'impolite',
            'condescending', 'patronizing', 'arrogant', 'ignorant',
            // Helplessness & desperation
            'no help', 'no solution', 'no alternative', 'no option', 'stuck', 'stranded',
            'desperate', 'helpless', 'hopeless',
            // Customer service specific
            'falling behind', 'losing money', 'losing time', 'wasting time', 'cut off',
            'disconnected', 'interrupted', 'disrupted',
            // Billing & payment issues
            'charged twice', 'double charged', 'double billed', 'billed twice', 'duplicate charge',
            'overcharged', 'incorrect charge', 'wrong amount', 'billing error', 'payment error',
            'unauthorized charge', 'unexpected charge', 'charged incorrectly', 'billing mistake',
            'refund', 'refund needed', 'money back', 'charge back', 'incorrect payment',
            // Unexpected bills & high costs
            'facing a bill', 'facing bill', 'unexpected bill', 'huge bill', 'massive bill',
            'high bill', 'expensive bill', 'can\'t afford this', 'too expensive', 'too much',
            'outrageous cost', 'ridiculous price', 'excessive charge', 'inflated bill',
            // Insurance claim issues
            'denial', 'denied', 'claim denied', 'coverage denied', 'rejected claim',
            'not covered', 'no coverage', 'won\'t cover', 'refuse to cover',
            // System/technical failures
            'crashed', 'crash', 'system down', 'unable to run', 'unable to access',
            'nothing helped', 'nothing worked', 'still broken', 'still failing',
            // Time wasted
            'wasted time', 'wasted hours', 'wasted three hours', 'wasting my time',
            'waste of time'
        ]
    },
    neutral: [
        // Insurance terms
        'policy', 'insurance', 'coverage', 'cover', 'premium', 'excess', 'deductible',
        'claim', 'underwriter', 'broker', 'insurer', 'policyholder', 'beneficiary',
        'renewal', 'quote', 'quotation', 'proposal', 'application',
        // Policy types
        'comprehensive', 'third party', 'fire and theft', 'liability', 'indemnity',
        'motor insurance', 'car insurance', 'home insurance', 'life insurance', 'health insurance',
        // Documents & admin
        'document', 'certificate', 'schedule', 'endorsement', 'addendum', 'amendment',
        'terms and conditions', 'policy wording', 'declaration', 'statement',
        // Information requests
        'information', 'details', 'clarification', 'explanation', 'confirmation',
        'question', 'query', 'inquiry', 'enquiry', 'request',
        // Process terms
        'process', 'procedure', 'steps', 'requirements', 'criteria', 'conditions',
        'verification', 'validation', 'assessment', 'evaluation', 'review',
        // Contact & communication
        'contact', 'call', 'calling', 'email', 'letter', 'correspondence', 'communication',
        'message', 'notification', 'reminder', 'update', 'status',
        // General insurance operations
        'payment', 'installment', 'direct debit', 'bank transfer', 'transaction',
        'account', 'reference number', 'policy number', 'claim number', 'account number',
        'effective date', 'expiry date', 'inception date', 'cancellation date',
        // Customer service
        'agent', 'representative', 'advisor', 'consultant', 'specialist', 'team',
        'department', 'service', 'support', 'assistance', 'help',
        // Vehicle-specific (for motor insurance)
        'vehicle', 'car', 'van', 'motorcycle', 'registration', 'make', 'model',
        'mileage', 'driver', 'named driver', 'main driver', 'keeper', 'owner',
        'modification', 'accident', 'incident', 'damage', 'repair',
        // Property-specific (for home insurance)
        'property', 'home', 'house', 'building', 'contents', 'valuables',
        'address', 'postcode', 'location', 'security', 'alarm', 'locks',
        // Tech support specific
        'internet', 'modem', 'router', 'connection', 'network', 'wifi', 'broadband',
        'outage', 'interruption', 'restoration', 'engineers', 'technical',
        // Neutral phrases
        'looking at', 'seems to be', 'aware of', 'working on', 'right now',
        'as i said', 'anything else', 'have a', 'can i have'
    ],
    // Additional context indicators
    urgency: [
        'urgent', 'urgently', 'asap', 'immediately', 'emergency', 'critical', 'pressing',
        'time-sensitive', 'deadline', 'right away', 'straight away', 'important',
        'tomorrow', 'today', 'now'
    ],
    escalation: [
        'manager', 'supervisor', 'senior', 'escalate', 'complaint', 'formal complaint',
        'ombudsman', 'regulator', 'fca', 'legal', 'solicitor', 'compensation'
    ],
    vulnerability: [
        // Financial vulnerability
        'elderly', 'disabled', 'vulnerable', 'difficulty understanding', 'health condition',
        'mental health', 'bereavement', 'financial difficulty', 'hardship', 'struggling',
        'budget', 'budgeting', 'afford', "can't afford", "cannot afford", 'money problems',
        'financial stress', 'financial strain', 'tight budget', 'limited income', 'fixed income',
        'pension', 'benefits', 'unemployment', 'unemployed', 'redundancy', 'redundant',
        'debt', 'in debt', 'owe', 'owing', 'overdue', 'arrears', 'behind on payments',
        'bankruptcy', 'insolvency', 'financial crisis', 'money troubles', 'cash flow',
        'messed up my budget', 'budget constraints', 'financial burden', 'cost concerns',
        // Personal/health vulnerability
        'cancer', 'terminal illness', 'chronic condition', 'disability', 'disabled',
        'mental health', 'depression', 'anxiety disorder', 'ptsd', 'dementia',
        'alzheimer', 'stroke', 'heart condition', 'serious illness', 'medical condition',
        'hospital', 'hospitalized', 'treatment', 'medication', 'care home', 'carer',
        // Life events
        'bereavement', 'bereaved', 'death', 'died', 'passed away', 'funeral',
        'divorce', 'separated', 'separation', 'domestic abuse', 'victim',
        'homeless', 'eviction', 'evicted', 'repossession', 'losing home',
        // Communication/understanding
        'hard to understand', 'difficult to understand', 'confused', 'don\'t understand',
        'language barrier', 'english not first language', 'need help understanding',
        'learning difficulty', 'literacy', 'vision impaired', 'hearing impaired',
        // Age-related
        'elderly', 'pensioner', 'retired', 'senior citizen', 'old age', 'aging'
    ],
    // Emotional states
    emotional_distress: [
        'stressed', 'stress', 'stressful', 'anxious', 'anxiety', 'worried', 'worry',
        'panic', 'panicking', 'overwhelmed', 'breaking down', 'crying', 'tears',
        'desperate', 'desperation', 'hopeless', 'helpless'
    ],
    // Dismissive/unhelpful handler phrases
    dismissive: [
        'just have to wait', 'nothing i can do', 'nothing we can do', "can't help",
        "can't provide", "you'll just have to", 'as i said', 'like i said',
        'already told you', 'not my department', 'not my problem'
    ]
};

// Coaching feedback templates
const COACHING_TEMPLATES = {
    positive: {
        strong: 'Excellent customer experience! Continue this approach.',
        moderate: 'Good interaction. Customer satisfaction achieved.',
        mild: 'Acceptable service delivery.'
    },
    negative: {
        strong: 'Critical: Immediate coaching required. Customer highly dissatisfied.',
        moderate: 'Attention needed: Address customer concerns and improve communication.',
        mild: 'Minor improvement area: Focus on clarity and efficiency.'
    },
    neutral: 'Standard interaction. Monitor for quality assurance.'
};

class VerbatimAnalyzer {
    constructor() {
        this.sessionKey = 'arbis_verbatim_history';
        this.init();
    }

    init() {
        // Bind UI elements
        this.inputField = document.getElementById('verbatimInput');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.resetBtn = document.getElementById('resetAnalysisBtn');
        this.resultsContainer = document.getElementById('analysisResult');
        this.historyContainer = document.getElementById('analysisHistory');

        // Event listeners
        if (this.analyzeBtn) {
            this.analyzeBtn.addEventListener('click', () => this.performAnalysis());
        }
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.resetCurrentAnalysis());
        }

        // Load and display history on init
        this.displayHistory();

        // Update dashboard widget if history exists
        this.updateDashboardWidget();
    }

    // Split text into phrases/sentences
    splitIntoPhrases(text) {
        // Split by sentence endings, keeping the punctuation
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        return sentences.map(s => s.trim()).filter(s => s.length > 0);
    }

    // Analyze individual phrase
    analyzePhrase(phrase) {
        const lowerPhrase = phrase.toLowerCase();
        let score = 0.5; // neutral baseline
        let sentiment = 'Neutral';
        let detectedKeywords = [];
        let phraseCoaching = '';

        // Helper function for whole-word matching
        const matchesWholeWord = (text, keyword) => {
            // Escape special regex characters in keyword
            const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // Create regex with word boundaries
            const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'i');
            return regex.test(text);
        };

        // Check positive keywords
        let positiveWeight = 0;
        let positiveKeywords = [];
        for (const [strength, keywords] of Object.entries(SENTIMENT_KEYWORDS.positive)) {
            for (const keyword of keywords) {
                if (matchesWholeWord(lowerPhrase, keyword)) {
                    positiveKeywords.push(keyword);
                    if (strength === 'strong') positiveWeight += 0.3;
                    else if (strength === 'moderate') positiveWeight += 0.2;
                    else positiveWeight += 0.1;
                }
            }
        }

        // Check negative keywords
        let negativeWeight = 0;
        let negativeKeywords = [];
        for (const [strength, keywords] of Object.entries(SENTIMENT_KEYWORDS.negative)) {
            for (const keyword of keywords) {
                if (matchesWholeWord(lowerPhrase, keyword)) {
                    negativeKeywords.push(keyword);
                    if (strength === 'strong') negativeWeight += 0.3;
                    else if (strength === 'moderate') negativeWeight += 0.2;
                    else negativeWeight += 0.1;
                }
            }
        }

        // Check emotional distress (strong negative indicator)
        if (SENTIMENT_KEYWORDS.emotional_distress) {
            for (const keyword of SENTIMENT_KEYWORDS.emotional_distress) {
                if (matchesWholeWord(lowerPhrase, keyword)) {
                    negativeKeywords.push(`[emotional] ${keyword}`);
                    negativeWeight += 0.25;
                }
            }
        }

        // Check dismissive phrases (negative for service quality)
        if (SENTIMENT_KEYWORDS.dismissive) {
            for (const keyword of SENTIMENT_KEYWORDS.dismissive) {
                if (matchesWholeWord(lowerPhrase, keyword)) {
                    negativeKeywords.push(`[dismissive] ${keyword}`);
                    negativeWeight += 0.2;
                }
            }
        }

        // Check urgency (context-dependent)
        let hasUrgency = false;
        let urgencyKeywords = [];
        if (SENTIMENT_KEYWORDS.urgency) {
            for (const keyword of SENTIMENT_KEYWORDS.urgency) {
                if (matchesWholeWord(lowerPhrase, keyword)) {
                    urgencyKeywords.push(`[urgent] ${keyword}`);
                    hasUrgency = true;
                }
            }
        }

        // IMPROVED: Detect "I need" + urgency as frustration/negative
        if (hasUrgency && (lowerPhrase.includes('i need') || lowerPhrase.includes('i really need'))) {
            negativeWeight += 0.15; // Add negative weight for urgent customer need
        }

        // Amplify negative if urgency + existing problem
        if (hasUrgency && negativeWeight > 0.15) {
            negativeWeight += 0.1;
        }

        // Check escalation indicators (strong negative) with context awareness
        if (SENTIMENT_KEYWORDS.escalation) {
            for (const keyword of SENTIMENT_KEYWORDS.escalation) {
                if (matchesWholeWord(lowerPhrase, keyword)) {
                    // CONTEXT-AWARE FILTERING for "manager"
                    if (keyword === 'manager') {
                        // Only flag as escalation if customer is DEMANDING manager, not handler offering
                        const isHandlerOffering = lowerPhrase.includes('notify a manager') ||
                            lowerPhrase.includes('notify manager') ||
                            lowerPhrase.includes('flag for manager') ||
                            lowerPhrase.includes('manager will review') ||
                            lowerPhrase.includes('manager review') ||
                            lowerPhrase.includes('escalate to manager') && lowerPhrase.includes('i will') ||
                            lowerPhrase.includes('i\'ve') || lowerPhrase.includes('i have');

                        if (isHandlerOffering) {
                            continue; // Skip, this is proactive handler action, not customer escalation
                        }
                    }

                    negativeKeywords.push(`[escalation] ${keyword}`);
                    negativeWeight += 0.25;
                }
            }
        }

        // Check vulnerability indicators with context awareness
        let hasVulnerability = false;
        let vulnerabilityTypes = [];
        let vulnerabilityKeywords = [];
        if (SENTIMENT_KEYWORDS.vulnerability) {
            for (const keyword of SENTIMENT_KEYWORDS.vulnerability) {
                if (matchesWholeWord(lowerPhrase, keyword)) {
                    // CONTEXT-AWARE FILTERING for "afford" and "can't afford"
                    if (keyword.includes('afford')) {
                        // Only flag as vulnerability if it's about money, NOT time
                        const isAboutTime = lowerPhrase.includes('afford time') ||
                            lowerPhrase.includes('afford that kind of time') ||
                            lowerPhrase.includes('afford the time') ||
                            lowerPhrase.includes('afford to wait');

                        if (isAboutTime) {
                            continue; // Skip this keyword, it's not financial vulnerability
                        }
                    }

                    // CONTEXT-AWARE FILTERING for "hospital"
                    if (keyword === 'hospital' || keyword === 'hospitalized') {
                        // Only flag as health vulnerability if about medical condition, NOT bills
                        const isAboutBill = lowerPhrase.includes('hospital bill') ||
                            lowerPhrase.includes('hospital bills') ||
                            lowerPhrase.includes('medical bill') ||
                            lowerPhrase.includes('hospital cost') ||
                            lowerPhrase.includes('hospital charge');

                        if (isAboutBill) {
                            continue; // Skip, this is a financial issue, not health vulnerability
                        }
                    }

                    vulnerabilityKeywords.push(`[vulnerable] ${keyword}`);
                    hasVulnerability = true;

                    // Categorize vulnerability type
                    if (['budget', 'afford', 'money', 'debt', 'financial', 'income', 'pension', 'unemployment', 'messed up my budget'].some(k => keyword.includes(k))) {
                        vulnerabilityTypes.push('Financial');
                    } else if (['elderly', 'pensioner', 'retired', 'senior', 'old age'].some(k => keyword.includes(k))) {
                        vulnerabilityTypes.push('Age-Related');
                    } else if (['health', 'illness', 'medical', 'hospital', 'disability', 'disabled'].some(k => keyword.includes(k))) {
                        vulnerabilityTypes.push('Health');
                    } else if (['bereavement', 'death', 'divorce', 'abuse', 'homeless'].some(k => keyword.includes(k))) {
                        vulnerabilityTypes.push('Life Event');
                    } else if (['understand', 'confused', 'language', 'literacy', 'learning'].some(k => keyword.includes(k))) {
                        vulnerabilityTypes.push('Communication');
                    }
                }
            }
        }

        // Add negative weight if vulnerability detected (vulnerable customers are in distress)
        if (hasVulnerability) {
            negativeWeight += 0.2; // Vulnerability indicates customer distress/concern
        }

        // Calculate score
        score = 0.5 + positiveWeight - negativeWeight;
        score = Math.max(0, Math.min(1, score)); // Clamp between 0 and 1

        // Determine sentiment
        if (score >= 0.7) {
            sentiment = 'Positive';
        } else if (score <= 0.3) {
            sentiment = 'Negative';
        } else {
            sentiment = 'Neutral';
        }

        // CONTEXT-AWARE KEYWORD FILTERING
        // Only show keywords that match the phrase sentiment
        if (sentiment === 'Positive') {
            detectedKeywords = [...positiveKeywords];
        } else if (sentiment === 'Negative') {
            detectedKeywords = [...negativeKeywords];
        }
        // For neutral sentiment, don't show regular keywords

        // Always show special context keywords regardless of sentiment
        detectedKeywords = [...detectedKeywords, ...urgencyKeywords, ...vulnerabilityKeywords];

        // Determine coaching based on sentiment
        if (score >= 0.7) {
            if (score >= 0.85) {
                phraseCoaching = COACHING_TEMPLATES.positive.strong;
            } else if (score >= 0.7) {
                phraseCoaching = COACHING_TEMPLATES.positive.moderate;
            } else {
                phraseCoaching = COACHING_TEMPLATES.positive.mild;
            }
        } else if (score <= 0.3) {
            if (score <= 0.15) {
                phraseCoaching = COACHING_TEMPLATES.negative.strong;
            } else if (score <= 0.3) {
                phraseCoaching = COACHING_TEMPLATES.negative.moderate;
            } else {
                phraseCoaching = COACHING_TEMPLATES.negative.mild;
            }
        } else {
            phraseCoaching = COACHING_TEMPLATES.neutral;
        }

        // Add specific coaching for emotional distress
        if (negativeKeywords.some(k => k.includes('[emotional]'))) {
            phraseCoaching = 'Critical: Customer in emotional distress. Provide empathy and immediate support.';
        }

        // Add specific coaching for dismissive behavior
        if (negativeKeywords.some(k => k.includes('[dismissive]'))) {
            phraseCoaching = 'Warning: Dismissive language detected. Agent needs coaching on empathy and problem-solving.';
        }

        // Add specific coaching for escalation
        if (negativeKeywords.some(k => k.includes('[escalation]'))) {
            phraseCoaching = 'Alert: Customer requesting escalation. Review interaction and provide senior support.';
        }

        // Add specific coaching for vulnerability - HIGHEST PRIORITY
        if (hasVulnerability) {
            const vulnType = [...new Set(vulnerabilityTypes)].join(', ');
            phraseCoaching = `🚨 VULNERABILITY ALERT: ${vulnType} vulnerability detected. Handle with extra care, empathy, and consider specialist support. Document in customer notes.`;
        }

        return {
            phrase: phrase,
            sentiment: sentiment,
            score: parseFloat(score.toFixed(2)),
            keywords: [...new Set(detectedKeywords)],
            phrase_coaching: phraseCoaching,
            has_vulnerability: hasVulnerability,
            vulnerability_types: [...new Set(vulnerabilityTypes)]
        };
    }

    // Perform full analysis
    performAnalysis() {
        const text = this.inputField.value.trim();

        if (!text) {
            alert('Please enter text to analyze.');
            return;
        }

        // Split into phrases
        const phrases = this.splitIntoPhrases(text);

        // Analyze each phrase
        const phraseBreakdown = phrases.map(phrase => this.analyzePhrase(phrase));

        // Calculate overall metrics
        const avgScore = phraseBreakdown.reduce((sum, p) => sum + p.score, 0) / phraseBreakdown.length;
        const negativeCount = phraseBreakdown.filter(p => p.sentiment === 'Negative').length;
        const positiveCount = phraseBreakdown.filter(p => p.sentiment === 'Positive').length;

        // Check for vulnerabilities
        const vulnerablePhrases = phraseBreakdown.filter(p => p.has_vulnerability);
        const hasVulnerability = vulnerablePhrases.length > 0;
        const allVulnerabilityTypes = vulnerablePhrases.flatMap(p => p.vulnerability_types);
        const uniqueVulnerabilityTypes = [...new Set(allVulnerabilityTypes)];

        let overallSentiment = 'Neutral';
        let overallCoaching = '';

        if (avgScore >= 0.6) {
            overallSentiment = 'Positive';
            overallCoaching = 'Overall positive customer interaction. Agent performed well.';
        } else if (avgScore <= 0.4) {
            overallSentiment = 'Negative';
            overallCoaching = 'Overall negative sentiment detected. Review agent performance and provide coaching.';
        } else {
            overallSentiment = 'Neutral';
            overallCoaching = 'Mixed sentiment. Monitor for quality assurance.';
        }

        // Override coaching if vulnerability detected
        if (hasVulnerability) {
            overallCoaching = `🚨 VULNERABILITY ALERT: Customer has expressed ${uniqueVulnerabilityTypes.join(', ')} vulnerability. This interaction requires special handling. Ensure agent showed appropriate empathy and offered specialist support. Document vulnerability in customer record and consider follow-up.`;
        }

        // Create analysis result object
        const analysisResult = {
            timestamp: new Date().toISOString(),
            agent_id: 'MOCK_AGENT_' + Math.floor(Math.random() * 1000),
            source: 'Call/Interaction Transcripts',
            overall_sentiment_score: parseFloat(avgScore.toFixed(2)),
            overall_sentiment: overallSentiment,
            overall_coaching_feedback: overallCoaching,
            phrase_breakdown: phraseBreakdown,
            metrics: {
                total_phrases: phraseBreakdown.length,
                positive_count: positiveCount,
                negative_count: negativeCount,
                neutral_count: phraseBreakdown.length - positiveCount - negativeCount,
                vulnerability_detected: hasVulnerability,
                vulnerability_types: uniqueVulnerabilityTypes,
                vulnerable_phrase_count: vulnerablePhrases.length
            }
        };

        // Save to session storage
        this.saveToHistory(analysisResult);

        // Display results
        this.displayResults(analysisResult);

        // Push to dashboard
        this.pushToDashboard(analysisResult);

        // Update history display
        this.displayHistory();
    }

    // Display analysis results
    displayResults(result) {
        this.resultsContainer.style.display = 'block';

        const sentimentColor = result.overall_sentiment === 'Positive' ? '#10B981' :
            result.overall_sentiment === 'Negative' ? '#EF4444' : '#F59E0B';

        const scorePercentage = (result.overall_sentiment_score * 100).toFixed(0);

        let html = `
            <div class="analysis-header">
                <h4>Analysis Results</h4>
                <span class="analysis-timestamp">${new Date(result.timestamp).toLocaleString()}</span>
            </div>
            `;

        // Add vulnerability alert if detected
        if (result.metrics.vulnerability_detected) {
            html += `
            <div class="vulnerability-alert">
                <div class="vulnerability-header">
                    <span class="vulnerability-icon">🚨</span>
                    <strong>VULNERABILITY DETECTED</strong>
                </div>
                <div class="vulnerability-details">
                    <p><strong>Types:</strong> ${result.metrics.vulnerability_types.join(', ')}</p>
                    <p><strong>Phrases Affected:</strong> ${result.metrics.vulnerable_phrase_count} of ${result.metrics.total_phrases}</p>
                    <p class="vulnerability-action"><strong>Action Required:</strong> Review interaction for appropriate empathy and support. Document in customer record. Consider specialist referral.</p>
                </div>
            </div>
            `;
        }

        html += `
            <div class="overall-metrics">
                <div class="metric-card">
                    <div class="metric-label">Overall Sentiment</div>
                    <div class="metric-value" style="color: ${sentimentColor}">
                        ${result.overall_sentiment}
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Quality Score</div>
                    <div class="metric-value" style="color: ${sentimentColor}">
                        ${scorePercentage}%
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Total Phrases</div>
                    <div class="metric-value">${result.metrics.total_phrases}</div>
                </div>
            </div>

            <div class="coaching-section">
                <h5>Coaching Feedback</h5>
                <p>${result.overall_coaching_feedback}</p>
            </div>

            <div class="phrase-breakdown-section">
                <h5>Phrase-by-Phrase Analysis</h5>
                ${result.phrase_breakdown.map((phrase, idx) => this.renderPhraseCard(phrase, idx + 1)).join('')}
            </div>

            <div class="metrics-breakdown">
                <div class="mini-metric positive">
                    <span class="mini-label">Positive</span>
                    <span class="mini-value">${result.metrics.positive_count}</span>
                </div>
                <div class="mini-metric neutral">
                    <span class="mini-label">Neutral</span>
                    <span class="mini-value">${result.metrics.neutral_count}</span>
                </div>
                <div class="mini-metric negative">
                    <span class="mini-label">Negative</span>
                    <span class="mini-value">${result.metrics.negative_count}</span>
                </div>
            </div>
        `;

        this.resultsContainer.innerHTML = html;
    }

    // Render individual phrase card
    renderPhraseCard(phrase, index) {
        const sentimentClass = phrase.sentiment.toLowerCase();
        const sentimentIcon = phrase.sentiment === 'Positive' ? '✅' :
            phrase.sentiment === 'Negative' ? '❌' : '⚪';

        const vulnerabilityClass = phrase.has_vulnerability ? ' has-vulnerability' : '';

        return `
            <div class="phrase-card ${sentimentClass}${vulnerabilityClass}">
                <div class="phrase-header">
                    <span class="phrase-number">#${index}</span>
                    <span class="phrase-sentiment">${sentimentIcon} ${phrase.sentiment}</span>
                    <span class="phrase-score">Score: ${(phrase.score * 100).toFixed(0)}%</span>
                </div>
                <div class="phrase-text">"${phrase.phrase}"</div>
                ${phrase.keywords.length > 0 ? `
                    <div class="phrase-keywords">
                        <strong>Keywords:</strong> ${phrase.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join(' ')}
                    </div>
                ` : ''}
                <div class="phrase-coaching">
                    <strong>Coaching:</strong> ${phrase.phrase_coaching}
                </div>
            </div>
        `;
    }

    // Save to session storage
    saveToHistory(result) {
        let history = this.getHistory();
        history.unshift(result); // Add to beginning

        // Keep only last 10 analyses
        if (history.length > 10) {
            history = history.slice(0, 10);
        }

        sessionStorage.setItem(this.sessionKey, JSON.stringify(history));
    }

    // Get history from session storage
    getHistory() {
        const stored = sessionStorage.getItem(this.sessionKey);
        return stored ? JSON.parse(stored) : [];
    }

    // Display history list
    displayHistory() {
        if (!this.historyContainer) return;

        const history = this.getHistory();

        if (history.length === 0) {
            this.historyContainer.innerHTML = '<p class="no-history">No analysis history in this session.</p>';
            return;
        }

        let html = '<h5>Session History</h5><div class="history-list">';

        history.forEach((item, index) => {
            const date = new Date(item.timestamp);
            const sentimentClass = item.overall_sentiment.toLowerCase();

            html += `
                <div class="history-item ${sentimentClass}" onclick="verbatimAnalyzer.loadHistoryItem(${index})">
                    <div class="history-meta">
                        <span class="history-date">${date.toLocaleString()}</span>
                        <span class="history-sentiment">${item.overall_sentiment}</span>
                    </div>
                    <div class="history-score">Score: ${(item.overall_sentiment_score * 100).toFixed(0)}%</div>
                    <div class="history-preview">${item.phrase_breakdown.length} phrases analyzed</div>
                </div>
            `;
        });

        html += '</div>';
        this.historyContainer.innerHTML = html;
    }

    // Load a history item
    loadHistoryItem(index) {
        const history = this.getHistory();
        if (history[index]) {
            this.displayResults(history[index]);
            // Scroll to results
            this.resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Reset current analysis
    resetCurrentAnalysis() {
        this.inputField.value = '';
        this.resultsContainer.style.display = 'none';
        this.resultsContainer.innerHTML = '';
        console.log('✨ Current analysis cleared. History preserved in session.');
    }

    // Push metrics to dashboard
    pushToDashboard(result) {
        const metric = {
            timestamp: result.timestamp,
            agent_id: result.agent_id,
            overall_score: result.overall_sentiment_score,
            sentiment: result.overall_sentiment,
            negative_phrase_count: result.metrics.negative_count,
            positive_phrase_count: result.metrics.positive_count,
            improvement_theme: result.metrics.negative_count > result.metrics.positive_count ?
                'Customer Satisfaction' : 'Maintain Excellence',
            total_phrases: result.metrics.total_phrases,
            coaching_feedback: result.overall_coaching_feedback
        };

        window.ARBIS_DASHBOARD.pushMetric(metric);

        // Update dashboard widget
        this.updateDashboardWidget();
    }

    // Update dashboard widget with aggregated insights
    updateDashboardWidget() {
        const dashboardEl = document.getElementById('verbatimDashboard');
        if (!dashboardEl) return;

        const history = this.getHistory();
        if (history.length === 0) {
            dashboardEl.innerHTML = '<p class="no-data">No analysis data yet. Visit <a href="#" onclick="showModule(\'verbatimAnalyzer\')">Verbatim Analyzer</a> to start analyzing.</p>';
            return;
        }

        // Calculate aggregated metrics
        const totalAnalyses = history.length;
        const avgScore = history.reduce((sum, h) => sum + h.overall_sentiment_score, 0) / totalAnalyses;
        const totalNegative = history.reduce((sum, h) => sum + h.metrics.negative_count, 0);
        const totalPositive = history.reduce((sum, h) => sum + h.metrics.positive_count, 0);
        const totalPhrases = history.reduce((sum, h) => sum + h.metrics.total_phrases, 0);

        // Count sentiment distribution
        const sentimentCounts = {
            Positive: history.filter(h => h.overall_sentiment === 'Positive').length,
            Neutral: history.filter(h => h.overall_sentiment === 'Neutral').length,
            Negative: history.filter(h => h.overall_sentiment === 'Negative').length
        };

        // Track vulnerabilities
        let vulnerabilityCount = 0;
        let vulnerabilityTypes = { Financial: 0, Health: 0, 'Age-Related': 0, 'Life Event': 0, Communication: 0 };
        history.forEach(h => {
            h.phrase_breakdown.forEach(p => {
                if (p.has_vulnerability) {
                    vulnerabilityCount++;
                    p.vulnerability_types.forEach(type => {
                        if (vulnerabilityTypes[type] !== undefined) {
                            vulnerabilityTypes[type]++;
                        }
                    });
                }
            });
        });

        // Track escalations
        const escalationCount = history.reduce((sum, h) => {
            return sum + h.phrase_breakdown.filter(p => p.has_escalation).length;
        }, 0);

        // Track urgency
        const urgencyCount = history.reduce((sum, h) => {
            return sum + h.phrase_breakdown.filter(p => p.has_urgency).length;
        }, 0);

        // Track emotional distress
        const distressCount = history.reduce((sum, h) => {
            return sum + h.phrase_breakdown.filter(p => p.has_emotional_distress).length;
        }, 0);

        // Get top negative keywords
        const keywordFrequency = {};
        history.forEach(h => {
            h.phrase_breakdown.forEach(p => {
                p.keywords.forEach(kw => {
                    if (kw.includes('[escalation]') || kw.includes('[vulnerable]') || kw.includes('[emotional]')) {
                        const cleanKw = kw.replace(/\[.*?\]\s*/g, '');
                        keywordFrequency[cleanKw] = (keywordFrequency[cleanKw] || 0) + 1;
                    }
                });
            });
        });
        const topKeywords = Object.entries(keywordFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        // Calculate trend (last 3 vs previous)
        let trend = 'stable';
        let trendIcon = '➡️';
        if (history.length >= 6) {
            const recent3 = history.slice(0, 3).reduce((sum, h) => sum + h.overall_sentiment_score, 0) / 3;
            const previous3 = history.slice(3, 6).reduce((sum, h) => sum + h.overall_sentiment_score, 0) / 3;
            if (recent3 > previous3 + 0.1) {
                trend = 'improving';
                trendIcon = '📈';
            } else if (recent3 < previous3 - 0.1) {
                trend = 'declining';
                trendIcon = '📉';
            }
        }

        // Determine primary coaching theme
        let coachingTheme = 'Monitor Quality';
        let coachingColor = '#F59E0B';
        let actionableInsights = [];

        if (avgScore < 0.4) {
            coachingTheme = 'Urgent: Improve Customer Experience';
            coachingColor = '#EF4444';
            actionableInsights.push('Focus on empathy and acknowledgment');
            actionableInsights.push('Reduce response time and improve first-call resolution');
        } else if (avgScore >= 0.6) {
            coachingTheme = 'Good Performance - Maintain Standards';
            coachingColor = '#10B981';
            actionableInsights.push('Continue excellent customer service approach');
        } else {
            actionableInsights.push('Improve clarity in communication');
            actionableInsights.push('Enhance proactive problem-solving');
        }

        if (vulnerabilityCount > 0) {
            actionableInsights.push(`⚠️ ${vulnerabilityCount} vulnerable customer(s) detected - ensure specialist support`);
        }
        if (escalationCount > 2) {
            actionableInsights.push(`🚨 ${escalationCount} escalation(s) - review escalation procedures`);
        }
        if (distressCount > 2) {
            actionableInsights.push(`💔 ${distressCount} emotionally distressed phrase(s) - prioritize empathy training`);
        }

        // Get most common vulnerability type
        const topVulnerability = Object.entries(vulnerabilityTypes)
            .filter(([_, count]) => count > 0)
            .sort((a, b) => b[1] - a[1])[0];

        const html = `
            <div class="dashboard-verbatim-summary">
                <div class="verbatim-stat-row">
                    <div class="verbatim-stat">
                        <span class="stat-value">${totalAnalyses}</span>
                        <span class="stat-label">Analyses</span>
                    </div>
                    <div class="verbatim-stat">
                        <span class="stat-value" style="color: ${avgScore >= 0.6 ? '#10B981' : avgScore >= 0.4 ? '#F59E0B' : '#EF4444'}">${(avgScore * 100).toFixed(0)}%</span>
                        <span class="stat-label">Avg Quality ${trendIcon}</span>
                    </div>
                    <div class="verbatim-stat">
                        <span class="stat-value">${totalPhrases}</span>
                        <span class="stat-label">Total Phrases</span>
                    </div>
                </div>
                
                <div class="coaching-insight" style="border-left-color: ${coachingColor}">
                    <strong>Coaching Focus:</strong> ${coachingTheme}
                </div>

                <div class="sentiment-distribution">
                    <div class="sentiment-bar">
                        <div class="bar-segment positive" style="width: ${(sentimentCounts.Positive / totalAnalyses * 100)}%" title="${sentimentCounts.Positive} Positive"></div>
                        <div class="bar-segment neutral" style="width: ${(sentimentCounts.Neutral / totalAnalyses * 100)}%" title="${sentimentCounts.Neutral} Neutral"></div>
                        <div class="bar-segment negative" style="width: ${(sentimentCounts.Negative / totalAnalyses * 100)}%" title="${sentimentCounts.Negative} Negative"></div>
                    </div>
                    <div class="sentiment-labels">
                        <span class="label-positive">✅ ${sentimentCounts.Positive} Positive</span>
                        <span class="label-neutral">⚪ ${sentimentCounts.Neutral} Neutral</span>
                        <span class="label-negative">❌ ${sentimentCounts.Negative} Negative</span>
                    </div>
                </div>

                ${vulnerabilityCount > 0 || escalationCount > 0 || urgencyCount > 0 ? `
                    <div class="alert-metrics">
                        <h4 style="margin: 10px 0 5px 0; font-size: 0.9em; color: #6B7280;">⚠️ Alert Metrics</h4>
                        <div class="alert-row">
                            ${vulnerabilityCount > 0 ? `<span class="alert-badge vulnerability">🚨 ${vulnerabilityCount} Vulnerable</span>` : ''}
                            ${escalationCount > 0 ? `<span class="alert-badge escalation">📞 ${escalationCount} Escalations</span>` : ''}
                            ${urgencyCount > 0 ? `<span class="alert-badge urgency">⏰ ${urgencyCount} Urgent</span>` : ''}
                            ${distressCount > 0 ? `<span class="alert-badge distress">💔 ${distressCount} Distressed</span>` : ''}
                        </div>
                        ${topVulnerability ? `<p style="font-size: 0.85em; margin: 5px 0; color: #6B7280;">Most common: ${topVulnerability[0]} (${topVulnerability[1]})</p>` : ''}
                    </div>
                ` : ''}

                ${topKeywords.length > 0 ? `
                    <div class="keyword-trends">
                        <h4 style="margin: 10px 0 5px 0; font-size: 0.9em; color: #6B7280;">🔍 Top Alert Keywords</h4>
                        <div class="keyword-list">
                            ${topKeywords.map(([kw, count]) => `<span class="keyword-tag">${kw} (${count})</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${actionableInsights.length > 0 ? `
                    <div class="actionable-insights">
                        <h4 style="margin: 10px 0 5px 0; font-size: 0.9em; color: #6B7280;">💡 Actionable Insights</h4>
                        <ul style="margin: 5px 0; padding-left: 20px; font-size: 0.85em;">
                            ${actionableInsights.map(insight => `<li>${insight}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                <div class="phrase-stats" style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #E5E7EB;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.85em; color: #6B7280;">
                        <span>📊 Positive Phrases: <strong style="color: #10B981;">${totalPositive}</strong></span>
                        <span>📊 Negative Phrases: <strong style="color: #EF4444;">${totalNegative}</strong></span>
                    </div>
                </div>

                <a href="#" onclick="showModule('verbatimAnalyzer')" class="view-details-link">View Full Analysis →</a>
            </div>
        `;

        dashboardEl.innerHTML = html;
    }
}

// Initialize when DOM is ready
let verbatimAnalyzer;
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on a page with the verbatim analyzer
    if (document.getElementById('verbatimInput')) {
        verbatimAnalyzer = new VerbatimAnalyzer();
        console.log('✅ Advanced Verbatim Analyzer initialized');
    }
});
