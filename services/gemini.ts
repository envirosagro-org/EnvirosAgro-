import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const createAgroChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
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

export const sendMessageStream = async (chat: Chat, message: string) => {
  return chat.sendMessageStream({ message });
};
