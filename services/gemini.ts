import { GoogleGenAI } from "@google/genai";
import type { Chat, GenerateContentResponse } from "@google/genai";

/**
 * Creates a unified chat session for the EnvirosAgro AI Assistant.
 */
export const createAgroChat = (): Chat => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the "EnvirosAgro AI Assistant", a world-class expert in sustainable agriculture and technical innovation. 
      Your mission is to support farmers, researchers, and industrial stakeholders through the EnvirosAgro Five Thrusts Framework.
      Help users interpret sensor data, plan crop rotations, and improve their sustainability scores.`,
      temperature: 0.7,
    },
  });
};

export const analyzeIndustrialGaps = async (metrics: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Perform a high-level scientific gap analysis for an industrial agricultural supply chain with the following metrics:
  Cost Control: ${metrics.cost}%, Quality: ${metrics.quality}%, Resources: ${metrics.resources}%, Relations: ${metrics.relations}%, Market Timing: ${metrics.market}%.
  Output a technical assessment (3 sentences) identifying the most critical 'Process Disconnect' and suggesting a specific 'Technical Agriculture' intervention.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: { temperature: 0.3 }
  });
  return response.text;
};

export const generateFarmVision = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const enhancedPrompt = `Architectural 3D visualization of a highly sustainable, future-optimized farm. Theme: ${prompt}. Style: Cinematic, ultra-realistic, lush vegetation, integrated technology (solar, sensors, drones), vibrant agro-green and blue color palette. High resilience m(t) constant look.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [{ parts: [{ text: enhancedPrompt }] }],
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const analyzeCropHealth = async (imageData: string, mimeType: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = "Analyze this image of a plant/crop. Identify any pests, diseases, or nutrient deficiencies. Provide a clear diagnosis and recommended sustainable treatments following the EnvirosAgro Five Thrusts framework.";

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: imageData.split(',')[1], mimeType } },
        { text: prompt }
      ]
    },
    config: {
      temperature: 0.4,
    }
  });
  
  return response.text;
};

export const generateRoadmap = async (params: {
  thrustScores: Record<string, number>,
  region: string,
  crops: string
}) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Based on the following farm status, generate a structured 12-month sustainability roadmap.
  Region: ${params.region} | Crops: ${params.crops}
  Scores: SA:${params.thrustScores.SA}, EA:${params.thrustScores.EA}, HA:${params.thrustScores.HA}, TA:${params.thrustScores.TA}, IA:${params.thrustScores.IA}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      temperature: 0.4,
      systemInstruction: "You are a professional agricultural strategist. Output in clear Markdown.",
    }
  });
  
  return response.text;
};

export const summarizeResearch = async (articles: any[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const context = articles.map(a => `${a.title}: ${a.excerpt}`).join('\n\n');
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize this research: ${context}`,
    config: { systemInstruction: "You are a lead researcher at EnvirosAgro." }
  });
  return response.text;
};

export const validateCommunityPost = async (content: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this community post for alignment with sustainable agriculture and community resilience. Provide a brief (1-2 sentence) validation or feedback.
    Post: "${content}"`,
    config: { temperature: 0.5 }
  });
  return response.text;
};

export const generateRawDataset = async (type: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a sample CSV dataset for agricultural ${type} research. Include realistic columns and 5 rows of data.`,
  });
  return response.text;
};

export const generateScoutReport = async (tileData: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a detailed agricultural scout report for a plot with these parameters:
    - Moisture: ${tileData.moisture}%
    - Nitrogen: ${tileData.nitrogen} ppm
    - pH: ${tileData.ph}
    - Health Index: ${tileData.health}%
    Provide actionable insights and recommendations following the Five Thrusts framework.`,
    config: { temperature: 0.6 }
  });
  return response.text;
};

export const analyzeSatelliteScan = async (fieldName: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a high-level satellite analysis summary for the field block: "${fieldName}". 
    Simulate NDVI (Normalized Difference Vegetation Index) data and biomass deltas. 
    Focus on environmental resilience (EA Thrust).`,
    config: { temperature: 0.6 }
  });
  return response.text;
};

export const sendMessageStream = async (chat: Chat, message: string) => {
  return chat.sendMessageStream({ message });
};