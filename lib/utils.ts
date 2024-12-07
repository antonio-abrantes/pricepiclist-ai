import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function extractJson(response: string) {
  try {
      const jsonMatch = response.match(/{.*}/); // Busca o trecho que contém o JSON
      if (jsonMatch) {
          let jsonString = jsonMatch[0]
              .replace(/(\w+):/g, '"$1":')
              .replace(/'/g, '"');
          return JSON.parse(jsonString);
      } else {
          throw new Error("Nenhum JSON válido encontrado na resposta.");
      }
  } catch (error: any) {
      console.error("Erro ao extrair JSON:", error.message);
      return null;
  }
}

export function extractJsonOpenAI(response: string) {
  try {
      // Localiza o trecho que parece ser um JSON
      const jsonMatch = response.match(/{.*}/);
      if (jsonMatch) {
          const jsonString = jsonMatch[0];

          // Primeira tentativa: verificar se o JSON já é válido
          try {
              return JSON.parse(jsonString);
          } catch {
              // Se falhar, tenta corrigir o formato
              const correctedJsonString = jsonString
                  .replace(/(\w+):/g, '"$1":') // Adiciona aspas nas chaves
                  .replace(/'/g, '"'); // Garante aspas duplas
              return JSON.parse(correctedJsonString);
          }
      } else {
          throw new Error("Nenhum JSON encontrado na resposta.");
      }
  } catch (error: any) {
      console.error("Erro ao processar JSON:", error.message);
      return null;
  }
}