const API_URL: string = "https://receitasapi-b-2025.vercel.app";

export async function listarPlanta(): Promise<any> {
  const response = await fetch(`${API_URL}/plantas`);
  return response.json();
}

export async function criarPlanta(planta: any): Promise<any> {
  const response = await fetch(`${API_URL}/plantas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(planta),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Erro ao cadastrar planta: ${error}`);
  }

  return response.json();
}