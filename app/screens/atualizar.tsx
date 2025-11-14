import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

async function getToken() {
  if (Platform.OS === "web") {
    return localStorage.getItem("token");
  } else {
    return await AsyncStorage.getItem("token");
  }
}

export default function AtualizarPlanta() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [nomePopular, setNomePopular] = useState("");
  const [nomeCientifico, setNomeCientifico] = useState("");
  const [especie, setEspecie] = useState("");
  const [classe, setClasse] = useState("");
  const [origem, setOrigem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [beneficios, setBeneficios] = useState("");
  const [img, setImg] = useState("");

  const [dadosOriginais, setDadosOriginais] = useState<any>(null);

  const carregarPlanta = async () => {
    try {
      const response = await fetch(`https://floralles-api.vercel.app/plantas/${id}`);

      if (!response.ok) {
        Alert.alert("Erro", "Não foi possível carregar os dados da planta!");
        return;
      }

      const data = await response.json();
      setDadosOriginais(data);

      setNomePopular(data.nome_p || "");
      setNomeCientifico(data.nome_c || "");
      setEspecie(data.especie || "");
      setClasse(data.classe || "");
      setOrigem(data.origem || "");
      setDescricao(data.descricao || "");
      setBeneficios(data.beneficios || "");
      setImg(data.img || "");

    } catch (error) {
      Alert.alert("Erro", "Erro ao carregar a planta.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPlanta();
  }, []);

  const salvarAlteracoes = async () => {
    try {
      const token = await getToken();

      console.log("TOKEN ENVIADO:", token);

      if (!token) {
        Alert.alert("Erro", "Token ausente! Faça login novamente.");
        return;
      }

      if (!dadosOriginais) {
        Alert.alert("Erro", "Dados originais não carregados.");
        return;
      }

      const updatedData: any = {};

      if (nomePopular !== dadosOriginais.nome_p) updatedData.nome_p = nomePopular;
      if (nomeCientifico !== dadosOriginais.nome_c) updatedData.nome_c = nomeCientifico;
      if (especie !== dadosOriginais.especie) updatedData.especie = especie;
      if (classe !== dadosOriginais.classe) updatedData.classe = classe;
      if (origem !== dadosOriginais.origem) updatedData.origem = origem;
      if (descricao !== dadosOriginais.descricao) updatedData.descricao = descricao;
      if (beneficios !== dadosOriginais.beneficios) updatedData.beneficios = beneficios;
      if (img !== dadosOriginais.img) updatedData.img = img;

      if (Object.keys(updatedData).length === 0) {
        Alert.alert("Nenhuma alteração", "Você não modificou nenhum campo.");
        return;
      }

      const response = await fetch(`https://floralles-api.vercel.app/plantas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      console.log("STATUS ATUALIZAÇÃO:", response.status);

      if (response.status === 401) {
        Alert.alert("Erro", "Token inválido ou expirado. Faça login novamente.");
        return;
      }

      if (!response.ok) {
        Alert.alert("Erro", "Falha ao atualizar a planta!");
        return;
      }

      Alert.alert("Sucesso!", "Planta atualizada com sucesso!");
      router.replace("/screens/lista");

    } catch (error) {
      Alert.alert("Erro", "Erro ao salvar alterações.");
      console.log(error);
    }
  };


  const cancelarAlteracoes = () => {
    router.replace("/screens/lista");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6B8F71" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={styles.titulo}>Atualizar Planta</Text>

      <TextInput placeholder="Nome Popular" value={nomePopular} onChangeText={setNomePopular} style={styles.input} />
      <TextInput placeholder="Nome Científico" value={nomeCientifico} onChangeText={setNomeCientifico} style={styles.input} />
      <TextInput placeholder="Espécie" value={especie} onChangeText={setEspecie} style={styles.input} />
      <TextInput placeholder="Classe" value={classe} onChangeText={setClasse} style={styles.input} />
      <TextInput placeholder="Origem" value={origem} onChangeText={setOrigem} style={styles.input} />
      <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={styles.input} />
      <TextInput placeholder="Benefícios" value={beneficios} onChangeText={setBeneficios} style={styles.input} />
      <TextInput placeholder="URL da imagem" value={img} onChangeText={setImg} style={styles.input} />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAlteracoes}>
        <Text style={styles.textoBotao}>Salvar Alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoCancelar} onPress={cancelarAlteracoes}>
        <Text style={styles.textoBotao}>Cancelar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
  },
  botaoSalvar: {
    backgroundColor: "#6B8F71",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botaoCancelar: {
    backgroundColor: "#B84C4C",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
