import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://floralles-api.vercel.app";



export async function listarPlanta(): Promise<any> {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/plantas`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Erro ao listar plantas: ${error}`);
  }

  return response.json();
}

export async function criarPlanta(planta: any): Promise<any> {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/plantas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(planta),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Erro ao cadastrar planta: ${error}`);
  }

  return response.json();
}
