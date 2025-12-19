import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Creates a unified chat session for the EnvirosAgro AI Assistant.
 * This persona integrates the expertise of an agro-consultant with a technical assistant.
 */
export const createAgroChat = (): Chat => {
  const ai = getClient();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the "EnvirosAgro AI Assistant", a world-class expert in sustainable agriculture and technical innovation. 
      Your mission is to support farmers, researchers, and industrial stakeholders through the EnvirosAgro Five Thrusts Framework:
      1. Social Agriculture (SA): Community, education, and cultural heritage.
      2. Environmental Agriculture (EA): Soil health, water conservation, and biodiversity.
      3. Health Agriculture (HA): Safety, disease prevention, and nutrition.
      4. Technical Agriculture (TA): AI diagnostics, IoT, and precision tools.
      5. Industrial Agriculture (IA): Scalability, supply chains, and processing.

      You are an expert in the "Sustainable Time Constant m(t)" formula: m = √[((Dn × In) × C(a)) / S]. 
      - Dn: Rainfall Duration
      - In: Soil Moisture/Indirect Natural Factors
      - C(a): Sustainability Coefficient
      - S: Crop Requirement
      
      Your tone is professional, scientific, empathetic, and proactive. 
      Help users interpret sensor data, plan crop rotations, and improve their sustainability scores.
      Always prioritize organic and regenerative practices over chemical-heavy alternatives.`,
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

export const summarizeResearch = async (articles: any[]) => {
  const ai = getClient();
  const context = articles.map(a => `${a.title}: ${a.excerpt}`).join('\n\n');
  const prompt = `Summarize the following agricultural research findings into a cohesive "Intelligence Brief". 
  Identify the most important cross-thrust connections. Use professional yet inspiring language. 
  
  Articles:
  ${context}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.5,
      systemInstruction: "You are a lead researcher at EnvirosAgro. Focus on data integrity and regional resilience.",
    }
  });
  
  return response.text;
};

export const generateScoutReport = async (tileData: any) => {
  const ai = getClient();
  const prompt = `Generate a precision management report for a specific field plot with the following data:
  Moisture: ${tileData.moisture}%
  pH: ${tileData.ph}
  Nitrogen: ${tileData.nitrogen} ppm
  Overall Plant Health: ${tileData.health}%
  
  Advise on:
  1. Immediate intervention needs.
  2. Long-term soil health adjustments.
  3. Risk of specific diseases based on these parameters.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.3,
      systemInstruction: "You are an AI Field Scout. Be precise, technical, and concise.",
    }
  });
  
  return response.text;
};

export const analyzeSatelliteScan = async (region: string) => {
  const ai = getClient();
  const prompt = `Generate a high-resolution satellite interpretation report for a designated farm block in the ${region} region. 
  Focus on:
  1. NDVI (Normalized Difference Vegetation Index) analysis.
  2. Water stress levels detected via thermal imaging.
  3. Biomass density compared to the regional m(t) baseline.
  4. Specific spatial anomalies (potential erosion or nutrient runoff).
  Be highly technical and use EnvirosAgro framework terminology.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.4,
      systemInstruction: "You are the EnvirosAgro Satellite Intelligence Interface (Sentinel-Sync). Provide structured, analytical data.",
    }
  });
  
  return response.text;
};

export const generateRawDataset = async (article: any) => {
  const ai = getClient();
  const prompt = `Generate a technical raw dataset (JSON format) that would back the research titled "${article.title}". 
  Include fields like sensor_readings, m_score_history, soil_delta, and adoption_metrics. 
  The data should look realistic and highly technical, reflecting the EnvirosAgro 5-Thrusts standards.
  Wrap it in a text block, and add a brief technical metadata header.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.2,
      systemInstruction: "You are an EnvirosAgro Data Architect. You generate high-fidelity raw agricultural datasets for research purposes.",
    }
  });
  
  return response.text;
};

export const validateCommunityPost = async (content: string) => {
  const ai = getClient();
  const prompt = `Analyze this community agricultural post and determine its alignment with the EnvirosAgro Five Thrusts. 
  Post Content: "${content}"
  
  Provide:
  1. Primary Thrust Assignment (SA, EA, HA, TA, or IA).
  2. Sustainability Score (1-10).
  3. A brief encouragement message to the community.
  Output in a structured, friendly tone.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.6,
      systemInstruction: "You are the EnvirosAgro Community Moderator AI. You validate and reward sustainable practices shared by members.",
    }
  });
  
  return response.text;
};

export const sendMessageStream = async (chat: Chat, message: string) => {
  return chat.sendMessageStream({ message });
};