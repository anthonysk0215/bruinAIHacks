export const therapeuticResources = {
  emergencyContacts: {
    suicideHotline: {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      website: "https://988lifeline.org/",
      description: "24/7 free and confidential support for people in suicidal crisis or emotional distress"
    },
    crisisTextLine: {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      website: "https://www.crisistextline.org/",
      description: "24/7 text support for any type of crisis"
    },
    veteransCrisisLine: {
      name: "Veterans Crisis Line",
      number: "988 then press 1",
      website: "https://www.veteranscrisisline.net/",
      description: "24/7 support for veterans and their families"
    }
  },
  
  mentalHealthResources: {
    nationalAlliance: {
      name: "National Alliance on Mental Illness (NAMI)",
      website: "https://www.nami.org/",
      description: "Education, support, and advocacy for individuals and families affected by mental illness"
    },
    mentalHealthAmerica: {
      name: "Mental Health America",
      website: "https://www.mhanational.org/",
      description: "Resources for mental health conditions and wellness"
    },
    psychologyToday: {
      name: "Psychology Today Therapist Finder",
      website: "https://www.psychologytoday.com/us/therapists",
      description: "Find licensed therapists in your area"
    }
  },

  selfHelpTools: {
    meditation: {
      name: "Mindfulness and Meditation Resources",
      resources: [
        {
          name: "Headspace",
          website: "https://www.headspace.com/",
          description: "Guided meditation and mindfulness exercises"
        },
        {
          name: "Calm",
          website: "https://www.calm.com/",
          description: "Meditation, sleep, and relaxation resources"
        }
      ]
    },
    breathingExercises: {
      name: "Breathing Exercise Guides",
      description: "Techniques for managing anxiety and stress",
      techniques: [
        "4-7-8 Breathing",
        "Box Breathing",
        "Diaphragmatic Breathing"
      ]
    },
    journaling: {
      name: "Journaling Resources",
      description: "Guides and prompts for therapeutic writing",
      benefits: [
        "Emotional processing",
        "Stress reduction",
        "Self-reflection",
        "Problem-solving"
      ]
    }
  },

  supportGroups: {
    depressionAndBipolar: {
      name: "Depression and Bipolar Support Alliance",
      website: "https://www.dbsalliance.org/",
      description: "Support groups for depression and bipolar disorder"
    },
    anxietyAndDepression: {
      name: "Anxiety and Depression Association of America",
      website: "https://adaa.org/",
      description: "Support groups and resources for anxiety and depression"
    },
    griefSupport: {
      name: "GriefShare",
      website: "https://www.griefshare.org/",
      description: "Support groups for those grieving the loss of a loved one"
    }
  },

  educationalResources: {
    mentalHealthBasics: {
      name: "Mental Health Basics",
      topics: [
        "Understanding mental health",
        "Common mental health conditions",
        "Treatment options",
        "Self-care strategies"
      ]
    },
    therapyTypes: {
      name: "Types of Therapy",
      descriptions: {
        "Cognitive Behavioral Therapy (CBT)": "Focuses on changing negative thought patterns",
        "Dialectical Behavior Therapy (DBT)": "Teaches skills for emotional regulation",
        "Psychodynamic Therapy": "Explores unconscious patterns and past experiences",
        "Humanistic Therapy": "Emphasizes personal growth and self-actualization"
      }
    }
  },

  wellnessTips: {
    dailyPractices: [
      "Regular exercise",
      "Healthy sleep habits",
      "Balanced nutrition",
      "Social connection",
      "Time in nature",
      "Creative expression",
      "Mindfulness practice"
    ],
    stressManagement: [
      "Identify stress triggers",
      "Practice relaxation techniques",
      "Set healthy boundaries",
      "Maintain work-life balance",
      "Seek social support"
    ],
    selfCare: [
      "Prioritize rest",
      "Engage in hobbies",
      "Practice gratitude",
      "Set realistic goals",
      "Celebrate small victories"
    ]
  }
};

export const getEmergencyResources = () => {
  return therapeuticResources.emergencyContacts;
};

export const getMentalHealthResources = () => {
  return therapeuticResources.mentalHealthResources;
};

export const getSelfHelpTools = () => {
  return therapeuticResources.selfHelpTools;
};

export const getSupportGroups = () => {
  return therapeuticResources.supportGroups;
};

export const getEducationalResources = () => {
  return therapeuticResources.educationalResources;
};

export const getWellnessTips = () => {
  return therapeuticResources.wellnessTips;
}; 