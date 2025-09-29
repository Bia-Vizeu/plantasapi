import { criarPlanta } from "@/components/api";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../components/styles";

export default function CadastroPlanta() {
  const [nomePopular, setNomePopular] = useState("");
  const [nomeCientifico, setNomeCientifico] = useState("");
  const [especie, setEspecie] = useState("");
  const [classe, setClasse] = useState("");
  const [origem, setOrigem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [beneficios, setBeneficios] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const salvar = async () => {
    setLoading(true);
    try {
      await criarPlanta({
        nome_p: nomePopular,
        nome_c: nomeCientifico,
        especie,
        classe,
        origem,
        descricao,
        beneficios,
        img,
      });

      setNomePopular("");
      setNomeCientifico("");
      setEspecie("");
      setClasse("");
      setOrigem("");
      setDescricao("");
      setBeneficios("");
      setImg("");

      Alert.alert("Sucesso", "Planta cadastrada com sucesso!");
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