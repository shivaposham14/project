import { GoogleGenAI, Type } from "@google/genai";
import { CurriculumData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateCurriculum = async (params: any): Promise<CurriculumData> => {
  const { mode, ...details } = params;
  
  const prompt = `Generate a production-level ${mode} curriculum for:
  ${JSON.stringify(details)}
  
  STRICT RULES:
  - 8 Semesters
  - Exactly 20 credits per semester
  - Total 160 credits
  - Labs are 1 credit
  - Include 1 Non-Credit subject
  - Logical difficulty progression (Foundation -> Intermediate -> Advanced)
  - Types: Core, Adaptive, Emerging, Elective, Non-Credit
  - Include industry alignment score (0-100)
  - Map skills to subjects
  - Provide analytics for layer distribution and importance index.
  - For each subject, provide a brief description, a list of industry tools involved, and future employment opportunities.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          degree: { type: Type.STRING },
          branch: { type: Type.STRING },
          specialization: { type: Type.STRING },
          semesters: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                semester: { type: Type.NUMBER },
                total_credits: { type: Type.NUMBER },
                subjects: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      code: { type: Type.STRING },
                      name: { type: Type.STRING },
                      credits: { type: Type.NUMBER },
                      type: { type: Type.STRING },
                      lab_required: { type: Type.BOOLEAN },
                      description: { type: Type.STRING },
                      tools: { type: Type.ARRAY, items: { type: Type.STRING } },
                      employment: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                  }
                }
              }
            }
          },
          total_credits: { type: Type.NUMBER },
          non_credit_subject: { type: Type.STRING },
          industry_score: { type: Type.NUMBER },
          skill_mapping: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skill: { type: Type.STRING },
                subjects: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          analytics: {
            type: Type.OBJECT,
            properties: {
              layer_distribution: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    value: { type: Type.NUMBER }
                  }
                }
              },
              importance_index: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    value: { type: Type.NUMBER }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text);
  } catch (error: any) {
    if (error.message?.includes("quota") || error.message?.includes("429") || error.message?.includes("exceeded")) {
      throw new Error("API Quota Exceeded. Please wait a minute and try again.");
    }
    throw error;
  }
};

export const analyzeTrends = async (): Promise<any> => {
  const prompt = `Provide current industry trends for technology (2024-2025). 
  Include Stable, Growing, and Emerging categories.
  For each tech, provide adoption %, demand %, career roles, and growth history (2018-2024).
  Technologies to include: Python, AWS, React, Kubernetes, TensorFlow, PostgreSQL, Rust, Flutter, LangChain, Blockchain/Web3.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              adoption: { type: Type.NUMBER },
              demand: { type: Type.NUMBER },
              learningCurve: { type: Type.STRING },
              category: { type: Type.STRING },
              roles: { type: Type.ARRAY, items: { type: Type.STRING } },
              growth: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    year: { type: Type.NUMBER },
                    value: { type: Type.NUMBER }
                  }
                }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error: any) {
    if (error.message?.includes("quota") || error.message?.includes("429") || error.message?.includes("exceeded")) {
      return []; // Return empty array for trends if quota exceeded
    }
    throw error;
  }
};
