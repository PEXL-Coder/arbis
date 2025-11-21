const enhancedGuidedFlow = {
  steps: [
    {
      id: 31,
      title: "Update Account Details",
      customerExperience: "Please provide your updated information.",
      rebuttal: "I can’t update my details, can you assist?",
      knowledgeHubLinks: ["link-to-update-account"],
      navigationScreenshots: ["screenshot-update-account.png"],
    },
    {
      id: 32,
      title: "Request Documents",
      customerExperience: "What documents do you need?",
      rebuttal: "I am not sure what documents are required.",
      knowledgeHubLinks: ["link-to-request-documents"],
      navigationScreenshots: ["screenshot-request-documents.png"],
    },
    {
      id: 33,
      title: "Billing/Payment Query",
      customerExperience: "Please describe your billing question.",
      rebuttal: "My payment was not processed, can you check?",
      knowledgeHubLinks: ["link-to-billing-query"],
      navigationScreenshots: ["screenshot-billing-query.png"],
    },
    {
      id: 34,
      title: "Other Service Request",
      customerExperience: "What service can I assist you with today?",
      rebuttal: "I'm not sure how to proceed with my request.",
      knowledgeHubLinks: ["link-to-other-service-request"],
      navigationScreenshots: ["screenshot-other-service-request.png"],
    },
    {
      id: 35,
      title: "Support/Escalation Routing",
      customerExperience: "I will escalate your request to a specialist.",
      rebuttal: "I need further assistance with this issue.",
      knowledgeHubLinks: ["link-to-support-routing"],
      navigationScreenshots: ["screenshot-support-routing.png"],
    },
  ],
};

module.exports = enhancedGuidedFlow;