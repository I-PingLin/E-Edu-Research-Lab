
import { Injectable } from '@angular/core';
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });

  async generateActivity(age: string, theme: string): Promise<any> {
    const prompt = `幼児・小学生向けの教育活動を提案してください。対象年齢: ${age}歳, テーマ: ${theme}。
    具体的な活動内容、ねらい、必要な道具、保護者へのアドバイスを含めてください。`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            objective: { type: Type.STRING },
            steps: { type: Type.ARRAY, items: { type: Type.STRING } },
            materials: { type: Type.ARRAY, items: { type: Type.STRING } },
            advice: { type: Type.STRING }
          },
          required: ["title", "objective", "steps", "materials", "advice"]
        }
      }
    });

    try {
      return JSON.parse(response.text);
    } catch (e) {
      console.error("Failed to parse activity JSON", e);
      return null;
    }
  }

  async getResearchSnippet(): Promise<any> {
    const prompt = "幼児教育または初等教育に関する最新の学術的トレンドや研究結果を1つ、簡潔に紹介してください。";
    
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            summary: { type: Type.STRING },
            key_takeaway: { type: Type.STRING },
            source_type: { type: Type.STRING }
          },
          required: ["topic", "summary", "key_takeaway", "source_type"]
        }
      }
    });

    return JSON.parse(response.text);
  }
}
