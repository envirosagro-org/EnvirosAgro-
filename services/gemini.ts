import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";

const API_KEY = process.env.VITE_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Creates a unified chat session for the EnvirosAgro AI Assistant.
 */
export const createAgroChat = (): ChatSession => {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `You are the "EnvirosAgro AI Assistant", a world-class expert in sustainable agriculture and technical innovation. 
    Your mission is to support farmers, researchers, and industrial stakeholders through the EnvirosAgro Five Thrusts Framework.
    Help users interpret sensor data, plan crop rotations, and improve their sustainability scores.`,
  });

  return model.startChat({
    generationConfig: {
      temperature: 0.7,
    },
  });
};

export const sendMessageStream = async (chat: ChatSession, message: string) => {
    const result = await chat.sendMessageStream(message);
    return result.stream;
};


export const analyzeIndustrialGaps = async (metrics: any) => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Perform a high-level scientific gap analysis for an industrial agricultural supply chain with the following metrics:
  Cost Control: ${metrics.cost}%, Quality: ${metrics.quality}%, Resources: ${metrics.resources}%, Relations: ${metrics.relations}%, Market Timing: ${metrics.market}%.
  Output a technical assessment (3 sentences) identifying the most critical 'Process Disconnect' and suggesting a specific 'Technical Agriculture' intervention.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating industrial gaps analysis:", error);
    throw new Error(`Failed to get industrial gaps analysis from AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const generateFarmVision = async (prompt: string) => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  // Image generation with Gemini is usually done via Imagen, 
  // currently GoogleGenerativeAI SDK for Gemini 1.5 doesn't directly support text-to-image like this.
  // This is a placeholder for where that integration would go.
  console.warn("Image generation (Imagen 3) requires different API/permissions.");
  return null;
};

export const analyzeCropHealth = async (imageData: string, mimeType: string) => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = "Analyze this image of a plant/crop. Identify any pests, diseases, or nutrient deficiencies. Provide a clear diagnosis and recommended sustainable treatments following the EnvirosAgro Five Thrusts framework.";

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageData.split(',')[1],
        mimeType
      }
    }
  ]);
  
  const response = await result.response;
  return response.text();
};

export const generateRoadmap = async (params: {
  thrustScores: Record<string, number>,
  region: string,
  crops: string
}) => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-pro',
    systemInstruction: "You are a professional agricultural strategist. Output in clear Markdown.",
  });
  
  const prompt = `Based on the following farm status, generate a structured 12-month sustainability roadmap.
  Region: ${params.region} | Crops: ${params.crops}
  Scores: SA:${params.thrustScores.SA}, EA:${params.thrustScores.EA}, HA:${params.thrustScores.HA}, TA:${params.thrustScores.TA}, IA:${params.thrustScores.IA}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw new Error(`Failed to generate roadmap from AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const summarizeResearch = async (articles: any[]) => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: "You are a lead researcher at EnvirosAgro." 
  });
  const context = articles.map(a => `${a.title}: ${a.excerpt}`).join('\n\n');
  const result = await model.generateContent(`Summarize this research: ${context}`);
  const response = await result.response;
  return response.text();
};

export const validateCommunityPost = async (content: string) => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(`Analyze this community post for alignment with sustainable agriculture and community resilience. Provide a brief (1-2 sentence) validation or feedback.
    Post: "${content}"`);
  const response = await result.response;
  return response.text();
};

export const generateRawDataset = async (type: string) => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(`Generate a sample CSV dataset for agricultural ${type} research. Include realistic columns and 5 rows of data.`);
  const response = await result.response;
  return response.text();
};

export const generateScoutReport = async (tileData: any) => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(`Generate a detailed agricultural scout report for a plot with these parameters:
    - Moisture: ${tileData.moisture}%
    - Nitrogen: ${tileData.nitrogen} ppm
    - pH: ${tileData.ph}
    - Health Index: ${tileData.health}%
    Provide actionable insights and recommendations following the Five Thrusts framework.`);
  const response = await result.response;
  return response.text();
};

export const analyzeSatelliteScan = async (fieldName: string) => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(`Provide a high-level satellite analysis summary for the field block: "${fieldName}". 
    Simulate NDVI (Normalized Difference Vegetation Index) data and biomass deltas. 
    Focus on environmental resilience (EA Thrust).`);
  const response = await result.response;
  return response.text();
};
