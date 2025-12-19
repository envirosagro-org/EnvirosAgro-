
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const createAgroChat = (): Chat => {
  const ai = getClient();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are EnvirosAgro's expert AI consultant. 
      Your mission is to assist farmers, researchers, and stakeholders with sustainable agricultural practices.
      You provide advice on:
      - Crop rotation and soil health.
      - Water conservation techniques.
      - Integrated Pest Management (IPM).
      - Climate resilience strategies.
      - Latest sustainable agricultural technologies.
      
      Keep your answers practical, scientific, yet accessible. 
      If asked about topics outside of agriculture or sustainability, politely redirect the conversation back to EnvirosAgro's mission.`,
      temperature: 0.7,
    },
  });
};

export const analyzeCropHealth = async (imageData: string, mimeType: string) => {
  const ai = getClient();
  const prompt = "Analyze this image of a plant/crop. Identify any pests, diseases, or nutrient deficiencies. Provide a clear diagnosis and recommended sustainable treatments following the EnvirosAgro Five Thrusts framework. If the image is not a plant, politely inform the user.";

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
  const ai = getClient();
  const prompt = `Based on the following farm status, generate a structured 12-month sustainability roadmap.
  Region: ${params.region}
  Primary Crops: ${params.crops}
  Current Thrust Scores (0-100):
  - Social: ${params.thrustScores.SA}
  - Environmental: ${params.thrustScores.EA}
  - Health: ${params.thrustScores.HA}
  - Technical: ${params.thrustScores.TA}
  - Industrial: ${params.thrustScores.IA}
  
  Provide exactly 4 phases (Q1-Q4) with specific, actionable steps for each. Use the EnvirosAgro Five Thrusts terminology.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      temperature: 0.4,
      systemInstruction: "You are a professional agricultural strategist. Output your response in clear Markdown with bold headers for each Quarter.",
    }
  });
  
  return response.text;
};

export const sendMessageStream = async (chat: Chat, message: string) => {
  return chat.sendMessageStream({ message });
};
