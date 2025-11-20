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
