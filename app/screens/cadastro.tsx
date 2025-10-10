import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../components/styles";

export default function CadastroPlanta() {
  const router = useRouter();
  const [nomePopular, setNomePopular] = useState("");
  const [nomeCientifico, setNomeCientifico] = useState("");
  const [especie, setEspecie] = useState("");
  const [classe, setClasse] = useState("");
  const [origem, setOrigem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [beneficios, setBeneficios] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const api = "https://floralles-api.vercel.app";

  const salvar = async () => {
    const token = await AsyncStorage.getItem("token");
    setLoading(true);
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: `{"nome_p":"${nomePopular}","nome_c":"${nomeCientifico}","especie":"${especie}","classe":"${classe}","origem":"${origem}","descricao":"${descricao}","beneficios":"${beneficios}","img":"${img}"}`
      };

      fetch(api+'/plantas', options)
        .then(response => response.status)
        .then(response => {
          if (response != 201) {
            Alert.alert("Erro", "Erro ao cadastrar planta!");
            return;
          } else {
            setNomePopular("");
            setNomeCientifico("");
            setEspecie("");
            setClasse("");
            setOrigem("");
            setDescricao("");
            setBeneficios("");
            setImg("");
            Alert.alert("Sucesso", "Planta cadastrada com sucesso!");
            router.replace({ pathname: "/screens/lista" });
            return;
          }
        })
        .catch(err => console.error(err));
    } catch (e: any) {
      Alert.alert("Erro", e.message || "Erro ao cadastrar planta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Plantas</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Popular"
        value={nomePopular}
        onChangeText={setNomePopular}
      />

      <TextInput
        style={styles.input}
        placeholder="Nome Científico"
        value={nomeCientifico}
        onChangeText={setNomeCientifico}
      />

      <TextInput
        style={styles.input}
        placeholder="Espécie"
        value={especie}
        onChangeText={setEspecie}
      />

      <TextInput
        style={styles.input}
        placeholder="Classe"
        value={classe}
        onChangeText={setClasse}
      />

      <TextInput
        style={styles.input}
        placeholder="Origem"
        value={origem}
        onChangeText={setOrigem}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Benefícios"
        value={beneficios}
        onChangeText={setBeneficios}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="URL da Imagem"
        value={img}
        onChangeText={setImg}
      />

      <TouchableOpacity style={styles.button} onPress={salvar} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Salvando..." : "Salvar"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}