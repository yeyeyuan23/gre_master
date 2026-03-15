import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. API calls will fail.");
    }
    aiClient = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
  }
  return aiClient;
}

export interface WordData {
  word: string;
  pronunciation: string;
  chineseMeaning: string;
  englishMeaning: string;
  collocations: string[];
  sentences: { english: string; chinese: string }[];
  memoryAid: string;
}

export async function lookupWord(word: string): Promise<WordData> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Provide detailed information for the GRE vocabulary word: "${word}". Ensure the usage is accurate and reflects native speaker habits. To ensure a fast response, strictly limit the output to exactly 3 collocations and 2 example sentences. Also provide a "memoryAid" which includes mnemonics, etymology, or vivid associations (in Chinese) to help students remember the word effectively.`,
    config: {
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          pronunciation: { type: Type.STRING, description: "IPA pronunciation" },
          chineseMeaning: { type: Type.STRING },
          englishMeaning: { type: Type.STRING },
          collocations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Common fixed collocations or phrases"
          },
          sentences: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                english: { type: Type.STRING },
                chinese: { type: Type.STRING }
              },
              required: ["english", "chinese"]
            },
            description: "Example sentences demonstrating accurate usage"
          },
          memoryAid: { type: Type.STRING, description: "Mnemonics, etymology, or associations to help memory" }
        },
        required: ["word", "pronunciation", "chineseMeaning", "englishMeaning", "collocations", "sentences", "memoryAid"]
      }
    }
  });

  return JSON.parse(response.text || "{}") as WordData;
}

export interface SentenceAnalysisData {
  original: string;
  translation: string;
  structure: {
    part: string;
    content: string;
    explanation: string;
  }[];
  vocabulary: {
    word: string;
    meaning: string;
    usage: string;
  }[];
  grammarPoints: string[];
}

export async function analyzeSentences(text: string): Promise<SentenceAnalysisData[]> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Analyze the following English text (likely from GRE/GMAT/LSAT context): "${text}". 
    First, split the text into individual sentences.
    Then, for each sentence, provide:
    1. The original sentence.
    2. A natural Chinese translation.
    3. A structural breakdown (Subject, Verb, Object, Modifiers, Clauses) with explanations in Chinese.
    4. A list of advanced vocabulary or expressions found in the sentence with their meanings and usage notes (in Chinese).
    5. Key grammar points or rhetorical devices used (in Chinese).
    
    Ensure the analysis is deep and helpful for advanced English learners. All explanations, meanings, and notes must be in Chinese.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            original: { type: Type.STRING },
            translation: { type: Type.STRING },
            structure: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  part: { type: Type.STRING, description: "e.g., Subject, Main Verb, Relative Clause" },
                  content: { type: Type.STRING, description: "The specific text from the sentence" },
                  explanation: { type: Type.STRING, description: "Explanation of its role in Chinese" }
                },
                required: ["part", "content", "explanation"]
              }
            },
            vocabulary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  meaning: { type: Type.STRING, description: "Meaning in Chinese" },
                  usage: { type: Type.STRING, description: "Usage note in Chinese" }
                },
                required: ["word", "meaning", "usage"]
              }
            },
            grammarPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Key grammar points or rhetorical devices used, explained in Chinese"
            }
          },
          required: ["original", "translation", "structure", "vocabulary", "grammarPoints"]
        }
      }
    }
  });

  return JSON.parse(response.text || "[]") as SentenceAnalysisData[];
}

export interface EssayFeedback {
  score: number;
  sentenceReviews: {
    original: string;
    critique: string;
    revised: string;
  }[];
  revisedEssay: string;
  summary: string[];
}

export async function gradeEssay(prompt: string, essay: string): Promise<EssayFeedback> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `
      Act as an expert GRE essay grader. Grade the following essay based on the latest GRE official grading criteria.
      The user's goal is a score of 4.0 or higher.
      
      Prompt:
      ${prompt}

      Essay:
      ${essay}

      Provide a strict evaluation. Crucially, break down the user's essay sentence by sentence (or logical chunk by chunk). 
      For each sentence, provide:
      1. The original text.
      2. A detailed critique pointing out any spelling, grammar, vocabulary, or logic errors. If it's perfect, explain why it works well.
      3. A high-scoring revised version of that specific sentence that elevates the vocabulary and structure.

      Then, provide a fully revised version of the entire essay that maintains the user's original thought process but elevates the vocabulary, examples, and argumentation methods to achieve a 4.0+ score.
      Finally, summarize the key mistakes made and the additions/improvements provided into concise bullet points for easy review.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: "Score from 0.0 to 6.0 in 0.5 increments" },
          sentenceReviews: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING, description: "The original sentence from the user's essay" },
                critique: { type: Type.STRING, description: "Detailed critique of errors or areas for improvement" },
                revised: { type: Type.STRING, description: "A high-scoring revised version of the sentence" }
              },
              required: ["original", "critique", "revised"]
            },
            description: "Sentence-by-sentence breakdown and revision"
          },
          revisedEssay: { type: Type.STRING, description: "The fully revised essay" },
          summary: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Bullet points summarizing mistakes and improvements" }
        },
        required: ["score", "sentenceReviews", "revisedEssay", "summary"]
      }
    }
  });

  return JSON.parse(response.text || "{}") as EssayFeedback;
}
