const guidedFlowSteps = [
    {
        id: 0,
        question: "Has ID&V (Identity and Verification) been passed?",
        phrases: [
            "Before we proceed, I need to verify your identity for security purposes.",
            "Can you confirm your full name and date of birth please?",
            "For data protection, I'll need to verify a few details with you."
        ],
        rebuttals: [
            "I understand it can be frustrating, but this is to protect your personal data.",
            "It will only take a moment and ensures we are speaking to the policyholder."
        ],
        articleIds: [6],
        screenshot: "Customer Search & ID&V Panel",
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
        rebuttals: [
            "We need to ensure your policy is up to date to guarantee valid cover.",
            "Regular checks help prevent any issues in the event of a claim."
        ],
        articleIds: [10],
        screenshot: "Policy Summary Screen",
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
        rebuttals: [
            "Making this change now ensures you are fully covered immediately.",
            "We can review the impact on your premium before finalizing anything."
        ],
        articleIds: [10],
        screenshot: "MTA Initiation Screen",
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
        rebuttals: [
            "We can backdate slightly if needed, subject to approval, or set it for a future date.",
            "The effective date determines when your new cover terms begin."
        ],
        articleIds: [],
        screenshot: "Date Selection Calendar",
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
        rebuttals: [],
        articleIds: [8, 9, 13],
        screenshot: "MTA Reason Dropdown",
        options: ["Vehicle Change", "Driver Change", "Address Change", "Cover Change", "Other"],
        next: { "Vehicle Change": 5, "Driver Change": 6, "Address Change": 31, "Cover Change": 14, "Other": 34 }
    },
    {
        id: 5,
        question: "Confirm main driver - Who will be the main driver of this vehicle?",
        phrases: [
            "Who will be the primary driver of the vehicle?",
            "Can you confirm who the main driver is?",
            "Who will be driving this vehicle most often?"
        ],
        rebuttals: [
            "The main driver must be the person who uses the car the most to avoid 'fronting'.",
            "Incorrectly listing the main driver can invalidate your insurance."
        ],
        articleIds: [8],
        screenshot: "Driver Allocation Screen",
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
        rebuttals: [
            "The registered keeper is the person named on the V5C logbook.",
            "This information affects the risk profile and premium."
        ],
        articleIds: [],
        screenshot: "Vehicle Keeper Details",
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
        rebuttals: [
            "Accurate mileage ensures you aren't paying for more than you need, or underinsured.",
            "You can update this mid-term if your driving habits change significantly."
        ],
        articleIds: [],
        screenshot: "Mileage Input Field",
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
        rebuttals: [],
        articleIds: [12],
        screenshot: "NCD/Transfer Source",
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
        rebuttals: [
            "Engine size is a key factor in calculating your insurance premium.",
            "We can usually find this from the registration number, but need to confirm."
        ],
        articleIds: [13],
        screenshot: "Vehicle Lookup Results",
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
        rebuttals: [
            "Undeclared modifications can void your policy in the event of a claim.",
            "Even cosmetic changes or factory-fitted options can count as modifications."
        ],
        articleIds: [13],
        screenshot: "Modifications Checklist",
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
        rebuttals: [
            "The vehicle must be registered to the address where it is kept most of the time.",
            "Incorrect address details can lead to policy cancellation."
        ],
        articleIds: [9],
        screenshot: "Keeper Address Verification",
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
        rebuttals: [],
        articleIds: [],
        screenshot: "Purchase Date Calendar",
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
        rebuttals: [
            "We can only insure vehicles that you currently own or are in the process of buying.",
            "If you've sold the vehicle, we need to cancel or transfer the policy."
        ],
        articleIds: [7],
        screenshot: "Ownership Status Toggle",
        options: ["Yes", "No"],
        next: { "Yes": 14, "No": 15 }
    },
    {
        id: 14,
        question: "Type of Cover - What level of cover do you require?",
        phrases: [
            "What type of insurance cover would you like?",
            "Which level of cover do you need?",
            "Let's select your cover type."
        ],
        rebuttals: [
            "Comprehensive covers damage to your own vehicle as well as others.",
            "Third Party Fire & Theft only covers your car if it's stolen or damaged by fire."
        ],
        articleIds: [10],
        screenshot: "Cover Type Selection",
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
        rebuttals: [],
        articleIds: [],
        screenshot: "Alternative Quote Search",
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
        rebuttals: [
            "Without this, you might be left without a vehicle if yours is stolen and not recovered.",
            "It provides peace of mind and keeps you mobile."
        ],
        articleIds: [11],
        screenshot: "Add-on Selection: GRSC",
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
        rebuttals: [
            "Standard courtesy cars are subject to availability; this guarantees you get one.",
            "It ensures you're not stranded while your car is in the garage."
        ],
        articleIds: [11],
        screenshot: "Add-on Selection: GHC",
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
        rebuttals: [
            "It's included in your premium, so there's no extra cost to keep it.",
            "Removing it won't significantly reduce your premium but will reduce your cover."
        ],
        articleIds: [11],
        screenshot: "Add-on Review: GHC",
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
        rebuttals: [
            "Our rates are tailored to your specific profile and vehicle.",
            "I can break down the premium for you once we generate the quote."
        ],
        articleIds: [],
        screenshot: "Quote Generation Screen",
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
        rebuttals: [],
        articleIds: [],
        screenshot: "Policy Summary Review",
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
        rebuttals: [
            "It's a small addition to your premium for significant peace of mind.",
            "You can always remove it at renewal if you find you don't need it."
        ],
        articleIds: [11],
        screenshot: "Final Add-on Check",
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
        rebuttals: [
            "This provides financial support for you and your family in case of serious injury.",
            "It covers you even if the accident was your fault."
        ],
        articleIds: [],
        screenshot: "Add-on Selection: PRCT",
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
        rebuttals: [],
        articleIds: [11],
        screenshot: "Add-on Confirmation",
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
        rebuttals: [],
        articleIds: [],
        screenshot: "Final Quote Review",
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
        rebuttals: [
            "This quote is valid for 30 days.",
            "We can set up a direct debit to spread the cost."
        ],
        articleIds: [],
        screenshot: "Quote Presentation",
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
        rebuttals: [],
        articleIds: [],
        screenshot: "Policy Activation Success",
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
        rebuttals: [],
        articleIds: [],
        screenshot: "Dashboard / Main Menu",
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
        rebuttals: [],
        articleIds: [],
        screenshot: "Call Wrap-up Screen",
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
        rebuttals: [
            "We cannot discuss policy details without passing security.",
            "You can call back later when you have the necessary information."
        ],
        articleIds: [6],
        screenshot: "ID&V Failure Alert",
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
        rebuttals: [
            "These are the best available options based on your criteria.",
            "We can compare these against your previous cover."
        ],
        articleIds: [],
        screenshot: "Alternative Quotes List",
        options: ["Yes - Hear Options", "No Thanks"],
        next: { "Yes - Hear Options": 14, "No Thanks": 28 }
    },
    {
        id: 31,
        question: "New Address Details - Please provide the new address details.",
        phrases: [
            "Could you please give me the postcode and house number of the new address?",
            "I'll need the full address where the vehicle will be kept.",
            "Let's take down the details of your new residence."
        ],
        rebuttals: [
            "We need the full address to accurately calculate the premium for the new location.",
            "The risk profile changes based on the specific postcode."
        ],
        articleIds: [9],
        screenshot: "Address Lookup Tool",
        options: ["Details Captured", "Customer doesn't have details"],
        next: { "Details Captured": 32, "Customer doesn't have details": 28 }
    },
    {
        id: 32,
        question: "Confirm Move Date - When did you or when will you move to this address?",
        phrases: [
            "What is the effective date for this change of address?",
            "When will the vehicle be kept at this new location?",
            "Is this move immediate or in the future?"
        ],
        rebuttals: [
            "We need to know the exact date the vehicle will be at the new address to ensure valid cover.",
            "If you've already moved, we need to update the policy from that date."
        ],
        articleIds: [9],
        screenshot: "Move Date Selector",
        options: ["Today", "Future Date", "Past Date"],
        next: { "Today": 33, "Future Date": 33, "Past Date": 33 }
    },
    {
        id: 33,
        question: "Parking Arrangements - Will the parking arrangements change at the new address?",
        phrases: [
            "Will the vehicle still be parked in the same way (e.g., garage, driveway)?",
            "Are there any changes to where the car is kept overnight?",
            "Do you have a garage or driveway at the new property?"
        ],
        rebuttals: [
            "Parking on a driveway or in a garage can sometimes lower your premium.",
            "Street parking may increase the risk of theft or damage."
        ],
        articleIds: [9],
        screenshot: "Parking Details Form",
        options: ["Garage", "Driveway", "Street", "Other"],
        next: { "Garage": 20, "Driveway": 20, "Street": 20, "Other": 20 }
    },
    {
        id: 34,
        question: "Admin Task Selection - How can I assist you with your account today?",
        phrases: [
            "What specific administrative task can I help you with?",
            "Is this regarding documents, billing, or your personal details?",
            "Please select the type of assistance you need."
        ],
        rebuttals: [],
        articleIds: [],
        screenshot: "Admin Dashboard",
        options: ["Update Personal Details", "Request Documents", "Billing Query", "Other Inquiry"],
        next: { "Update Personal Details": 35, "Request Documents": 36, "Billing Query": 37, "Other Inquiry": 38 }
    },
    {
        id: 35,
        question: "Update Personal Details - What details would you like to update?",
        phrases: [
            "I can update your email, phone number, or marketing preferences.",
            "Which contact information needs to be changed?",
            "Let's get your personal records up to date."
        ],
        rebuttals: [
            "Keeping your contact details up to date ensures you receive important policy documents.",
            "We need a valid email address to send your renewal notice."
        ],
        articleIds: [3],
        screenshot: "Customer Profile Edit",
        options: ["Email/Phone", "Name Change", "Marketing Prefs"],
        next: { "Email/Phone": 20, "Name Change": 20, "Marketing Prefs": 20 }
    },
    {
        id: 36,
        question: "Request Documents - Which documents do you require?",
        phrases: [
            "I can send you your certificate, schedule, or full policy wording.",
            "Which document copy do you need?",
            "Would you like these by email or post?"
        ],
        rebuttals: [
            "We can email these to you immediately for free.",
            "Posting documents may take 3-5 working days."
        ],
        articleIds: [],
        screenshot: "Document Repository",
        options: ["Certificate", "Schedule", "Proof of NCD"],
        next: { "Certificate": 28, "Schedule": 28, "Proof of NCD": 28 }
    },
    {
        id: 37,
        question: "Billing Query - How can I help with your payments?",
        phrases: [
            "Do you need to change payment date or method?",
            "Are you inquiring about a recent charge?",
            "I can help you set up a new direct debit."
        ],
        rebuttals: [
            "Changing your payment date may result in a slightly different installment amount next month.",
            "We can explain any changes to your premium breakdown."
        ],
        articleIds: [2],
        screenshot: "Billing & Payments Panel",
        options: ["Change Date", "Change Method", "Payment Dispute"],
        next: { "Change Date": 20, "Change Method": 20, "Payment Dispute": 38 }
    },
    {
        id: 38,
        question: "General Inquiry - Please describe your query.",
        phrases: [
            "I'm listening, please go ahead.",
            "I'll do my best to answer your question.",
            "Let me check that for you."
        ],
        rebuttals: [],
        articleIds: [5],
        screenshot: "General Inquiry Log",
        options: ["Resolved", "Escalate"],
        next: { "Resolved": 28, "Escalate": 28 }
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
    },
    {
        id: 7,
        title: "Policy Cancellation Procedure",
        category: "Policy Management",
        steps: [
            "Verify customer identity (ID&V)",
            "Confirm reason for cancellation",
            "Check for any outstanding balance or refund due",
            "Calculate cancellation fee if applicable",
            "Explain 'No Claims Bonus' implications",
            "Confirm effective date of cancellation",
            "Process cancellation in the system",
            "Send cancellation confirmation email/letter"
        ],
        screenshot: "Cancellation Workflow"
    },
    {
        id: 8,
        title: "Adding a Named Driver",
        category: "Policy Management",
        steps: [
            "Verify customer identity (ID&V)",
            "Collect new driver's details (Name, DOB, License type)",
            "Check driving history (accidents, convictions)",
            "Check relationship to policyholder",
            "Calculate additional premium",
            "Process payment if accepted",
            "Update policy and issue new certificate"
        ],
        screenshot: "Driver Addition Screen"
    },
    {
        id: 9,
        title: "Change of Address Process",
        category: "Policy Management",
        steps: [
            "Verify customer identity (ID&V)",
            "Take new address details (Postcode, House number)",
            "Confirm move-in date",
            "Ask about overnight parking arrangements",
            "Recalculate premium based on new risk address",
            "Advise customer of any price change",
            "Confirm and save changes",
            "Issue updated schedule"
        ],
        screenshot: "Address Update Portal"
    },
    {
        id: 10,
        title: "Understanding Cover Types",
        category: "Policy Information",
        steps: [
            "Comprehensive: Covers damage to own car + third party",
            "Third Party Fire & Theft: Covers third party + fire/theft of own car",
            "Third Party Only: Covers damage to others only",
            "Explain excesses applicable to each cover type",
            "Check if driving other cars (DOC) is included"
        ],
        screenshot: "Cover Selection Matrix"
    },
    {
        id: 11,
        title: "Guaranteed Hire Car (GHC) Explained",
        category: "Add-ons",
        steps: [
            "Explain difference between standard courtesy car and GHC",
            "Standard: Subject to availability, usually small car",
            "GHC: Guaranteed provision, specific class options",
            "Duration of hire (usually 14 or 28 days)",
            "Check eligibility (e.g., not for total loss unless specified)"
        ],
        screenshot: "Add-on Configurator"
    },
    {
        id: 12,
        title: "No Claims Discount (NCD) Guide",
        category: "Policy Information",
        steps: [
            "Explain how NCD is earned (years of claim-free driving)",
            "Protected NCD: Allows claims without losing years",
            "Step-back rules: How many years lost per claim",
            "Proof of NCD requirements for new policies",
            "NCD expiry (usually valid for 2 years)"
        ],
        screenshot: "NCD Validation Tool"
    },
    {
        id: 13,
        title: "Vehicle Modifications Policy",
        category: "Policy Management",
        steps: [
            "Ask customer for full list of modifications",
            "Check if modifications are cosmetic or performance-enhancing",
            "Refer to Underwriting Guide for acceptable mods",
            "Calculate additional premium if applicable",
            "Note modifications on policy schedule"
        ],
        screenshot: "Modifications Tab"
    },
    {
        id: 14,
        title: "UK Consumer Rights Act 2015 (Insurance)",
        category: "Legal & Compliance",
        content: `
            <p><strong>Overview:</strong> The Consumer Rights Act 2015 replaces the Sale of Goods Act, Unfair Terms in Consumer Contracts Regulations, and the Supply of Goods and Services Act. It sets out clear rules for what happens when goods or services are unsatisfactory.</p>
            <p><strong>Key Principles for Insurance:</strong></p>
            <ul>
                <li><strong>Fairness:</strong> Contract terms must be fair and transparent. Hidden clauses or significant exclusions must be highlighted.</li>
                <li><strong>Service Quality:</strong> Services must be performed with reasonable care and skill.</li>
                <li><strong>Remedies:</strong> If a service is not provided with reasonable care and skill, the consumer can require repeat performance or a price reduction.</li>
            </ul>
            <p><strong>Disclaimer:</strong> This is a summary for guidance only. Refer to the full Act for legal definitions.</p>
        `,
        screenshot: "Compliance Repository"
    },
    {
        id: 15,
        title: "GDPR & Data Protection in Insurance",
        category: "Legal & Compliance",
        content: `
            <p><strong>General Data Protection Regulation (GDPR):</strong> Controls how your personal information is used by organizations, businesses, or the government.</p>
            <p><strong>Lawful Basis for Processing:</strong> In insurance, we typically process data under 'Contractual Necessity' (to provide the quote/policy) or 'Legal Obligation' (fraud prevention).</p>
            <p><strong>Customer Rights:</strong></p>
            <ul>
                <li>Right to be informed</li>
                <li>Right of access (Subject Access Request)</li>
                <li>Right to rectification (correcting errors)</li>
                <li>Right to erasure ('Right to be forgotten') - *Subject to retention periods for claims history*</li>
            </ul>
            <div style="background: #ffebee; padding: 10px; border-left: 4px solid #f44336; margin-top: 10px;">
                <strong>Warning:</strong> Never share customer data with unauthorized third parties. Always verify ID&V before discussing policy details.
            </div>
        `,
        screenshot: "Data Protection Portal"
    },
    {
        id: 16,
        title: "Understanding Policy Wordings & Definitions",
        category: "Policy Management",
        content: `
            <p><strong>Definitions:</strong> Clear understanding of policy terms is crucial for accurate cover.</p>
            <p><strong>Common Terms:</strong></p>
            <dl>
                <dt><strong>Excess:</strong></dt>
                <dd>The amount the customer must pay towards a claim. Includes Compulsory and Voluntary excess.</dd>
                <dt><strong>Indemnity:</strong></dt>
                <dd>Putting the customer back in the financial position they were in before the loss.</dd>
                <dt><strong>Subrogation:</strong></dt>
                <dd>The right of the insurer to take over the insured's legal rights to recover losses from a third party.</dd>
            </dl>
            <p><strong>Exclusions:</strong> Always check the 'What is not covered' section of the policy booklet.</p>
        `,
        screenshot: "Policy Booklet PDF"
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

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initDashboardWidgets();
    initGuidedFlow();
    initKnowledgePortal();
    initComplaintsAssistant();
    initVCAssistant();
    initVerbatimAnalyzer();
});

// --- Navigation Logic ---
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    // Sidebar Navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetModule = item.dataset.target;
            showModule(targetModule);

            // Update active state in sidebar
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function showModule(moduleId) {
    // Hide all modules
    document.querySelectorAll('.module-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target module
    const targetSection = document.getElementById(moduleId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// --- Dashboard Widgets ---
function initDashboardWidgets() {
    // In a real app, this would fetch data from a backend
    // For now, the HTML is hardcoded or we can dynamically update if needed
    console.log("Dashboard widgets initialized");
}

// Helper to open specific article from dashboard
function openArticle(articleId) {
    showModule('knowledgePortal');
    document.querySelector('[data-target="knowledgePortal"]').classList.add('active');
    document.querySelector('[data-target="dashboard"]').classList.remove('active');

    const article = articles.find(a => a.id === articleId);
    if (article) {
        const searchInput = document.getElementById('knowledgeSearch');
        searchInput.value = article.title;
        const event = new Event('input');
        searchInput.dispatchEvent(event);
    }
}

// Helper to start specific flow from dashboard
function startFlow(stepId) {
    showModule('guidedFlow');
    document.querySelector('[data-target="guidedFlow"]').classList.add('active');
    document.querySelector('[data-target="dashboard"]').classList.remove('active');

    // Reset flow state and jump to specific step if needed
    // For simplicity, we'll just start the flow. 
    // If specific entry points are needed, we'd modify initGuidedFlow or flowState.
    flowState.currentStep = stepId;
    flowState.history = [];
    flowState.answers = {};
    renderFlowStep();
}

function initVerbatimAnalyzer() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultDiv = document.getElementById('analysisResult');
    const sentimentSpan = document.getElementById('sentimentResult');
    const themesSpan = document.getElementById('themesResult');

    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', () => {
            const text = document.getElementById('verbatimInput').value;
            if (text.trim() === "") {
                alert("Please enter some text to analyze.");
                return;
            }

            // Simulate analysis
            resultDiv.style.display = 'block';

            // Simple dummy logic for demo purposes
            const lowerText = text.toLowerCase();
            if (lowerText.includes('angry') || lowerText.includes('upset') || lowerText.includes('complain')) {
                sentimentSpan.textContent = 'Negative 🔴';
                sentimentSpan.style.color = 'red';
            } else if (lowerText.includes('happy') || lowerText.includes('great') || lowerText.includes('thanks')) {
                sentimentSpan.textContent = 'Positive 🟢';
                sentimentSpan.style.color = 'green';
            } else {
                sentimentSpan.textContent = 'Neutral 🟡';
                sentimentSpan.style.color = '#E65100';
            }

            themesSpan.textContent = "Policy Inquiry, Customer Service";
        });
    }
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
    const rebuttalsEl = document.getElementById('flowRebuttals');
    const optionsEl = document.getElementById('flowOptions');
    const articlesEl = document.getElementById('flowArticles');
    const screenshotEl = document.getElementById('flowScreenshot');
    const prevBtn = document.getElementById('flowPrevBtn');
    const nextBtn = document.getElementById('flowNextBtn');

    // 1. Render Question
    questionEl.textContent = step.question;

    // 2. Render Phrases
    phrasesEl.innerHTML = ''; // Clear previous content
    if (step.phrases && step.phrases.length > 0) {
        const header = document.createElement('h5');
        header.style.cssText = 'color: #2C3E50; margin-bottom: 8px; font-size: 0.9rem; font-weight: 700; text-transform: uppercase;';
        header.textContent = 'Standard Phrases:';
        phrasesEl.appendChild(header);

        step.phrases.forEach(phrase => {
            const phraseDiv = document.createElement('div');
            phraseDiv.className = 'phrase-item';
            phraseDiv.textContent = phrase;
            phrasesEl.appendChild(phraseDiv);
        });
    } else {
        phrasesEl.innerHTML = '<p style="color: #999; font-size: 0.9rem; font-style: italic;">No specific phrases for this step.</p>';
    }

    // 3. Render Rebuttals
    if (step.rebuttals && step.rebuttals.length > 0) {
        rebuttalsEl.style.display = 'block';
        rebuttalsEl.innerHTML = '<h5 style="color: #E65100; margin-bottom: 8px; font-size: 0.9rem; font-weight: 700; text-transform: uppercase;">Objection Handling:</h5>';
        step.rebuttals.forEach(rebuttal => {
            const div = document.createElement('div');
            div.className = 'rebuttal-item';
            div.textContent = rebuttal;
            rebuttalsEl.appendChild(div);
        });
    } else {
        rebuttalsEl.style.display = 'none';
        rebuttalsEl.innerHTML = '';
    }

    // 4. Render Options
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

    // 5. Render Related Articles
    articlesEl.innerHTML = '';
    if (step.articleIds && step.articleIds.length > 0) {
        step.articleIds.forEach(id => {
            const article = articles.find(a => a.id === id);
            if (article) {
                const link = document.createElement('div');
                link.className = 'related-article-link';
                link.textContent = `📄 ${article.title}`;
                link.onclick = () => {
                    // Open article in modal instead of navigating away
                    openArticleModal(article);
                };
                articlesEl.appendChild(link);
            }
        });
    } else {
        articlesEl.innerHTML = '<p style="color: #999; font-size: 0.9rem; font-style: italic;">No specific articles linked.</p>';
    }

    // 6. Render Screenshot
    if (step.screenshot) {
        screenshotEl.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 10px;">${step.screenshot}</div>
            <div style="font-size: 0.8rem; color: #666;">(System Screen Placeholder)</div>
        `;
    } else {
        screenshotEl.innerHTML = '<p>No system screenshot available.</p>';
    }

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
    const categorySelect = document.getElementById('knowledgeCategory');
    const searchBtn = document.getElementById('kpSearchBtn');
    const clearBtn = document.getElementById('kpClearBtn');

    populateCategories();

    // Real-time search (optional, keeping for responsiveness)
    searchInput.addEventListener('input', () => {
        renderArticles(searchInput.value, categorySelect.value);
    });

    categorySelect.addEventListener('change', () => {
        renderArticles(searchInput.value, categorySelect.value);
    });

    // Search Button
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            renderArticles(searchInput.value, categorySelect.value);
        });
    }

    // Clear Button
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            categorySelect.value = '';
            renderArticles('', '');
        });
    }

    renderArticles('', '');
}

function populateCategories() {
    const categorySelect = document.getElementById('knowledgeCategory');
    const categories = [...new Set(articles.map(a => a.category))].sort();

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

function renderArticles(searchTerm, categoryFilter) {
    const container = document.getElementById('articlesContainer');
    const resultsCount = document.getElementById('resultsCount');
    container.innerHTML = '';

    const filteredArticles = articles.filter(article => {
        const searchLower = searchTerm.toLowerCase();

        // Check title and category
        const matchesTitle = article.title.toLowerCase().includes(searchLower);
        const matchesCategory = article.category.toLowerCase().includes(searchLower);

        // Check steps if they exist
        let matchesSteps = false;
        if (article.steps && Array.isArray(article.steps)) {
            matchesSteps = article.steps.some(step => step.toLowerCase().includes(searchLower));
        }

        // Check content if it exists
        let matchesContent = false;
        if (article.content) {
            matchesContent = article.content.toLowerCase().includes(searchLower);
        }

        const matchesSearch = matchesTitle || matchesCategory || matchesSteps || matchesContent;
        const matchesCategoryFilter = categoryFilter === '' || article.category === categoryFilter;

        return matchesSearch && matchesCategoryFilter;
    });

    // Update results count
    if (resultsCount) {
        resultsCount.textContent = `Showing ${filteredArticles.length} article${filteredArticles.length !== 1 ? 's' : ''}`;
    }

    if (filteredArticles.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No articles found matching your criteria.</p>';
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
                <span style="font-size: 0.85rem; color: #666; background: #E0E0E0; padding: 2px 8px; border-radius: 12px; margin-top: 4px; display: inline-block;">${article.category}</span>
            </div>
            <span class="article-toggle">+</span>
        `;



        header.addEventListener('click', () => {
            openArticleModal(article);
        });

        card.appendChild(header);
        // Content is no longer appended to card, as it's shown in modal
        container.appendChild(card);
    });
}

function openArticleModal(article) {
    const modal = document.getElementById('articleModal');
    const modalBody = document.getElementById('modalArticleBody');

    let contentHtml = '';
    if (article.content) {
        contentHtml = article.content;
    } else if (article.steps) {
        contentHtml = '<div class="article-steps">';
        article.steps.forEach((step, index) => {
            contentHtml += `<div class="article-step"><strong>${index + 1}.</strong> ${step}</div>`;
        });
        contentHtml += '</div>';
    }

    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${article.title}</h2>
            <span class="article-tag">${article.category}</span>
        </div>
        <div class="modal-body">
            ${contentHtml}
            <div class="article-screenshot" style="margin-top: 20px;">
                [Screenshot: ${article.screenshot}]
            </div>
        </div>
    `;

    modal.style.display = 'block';

    // Close logic
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
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
