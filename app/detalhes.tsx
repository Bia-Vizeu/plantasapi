import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text } from "react-native";
import styles from "../components/styles";

export default function Detalhes() {
  const { nome_p, nome_c, especie, classe, origem, descricao, beneficios, img } =
    useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{nome_p}</Text>
      <Image
        source={{ uri: img as string }}
        style={{
          width: "100%",
          height: 250,
          borderRadius: 12,
          marginVertical: 16,
        }}
      />

      <Text style={styles.subTitle}>Nome Científico</Text>
      <Text style={styles.text}>{nome_c}</Text>

      <Text style={styles.subTitle}>Espécie</Text>
      <Text style={styles.text}>{especie}</Text>

      <Text style={styles.subTitle}>Classe</Text>
      <Text style={styles.text}>{classe}</Text>

      <Text style={styles.subTitle}>Origem</Text>
      <Text style={styles.text}>{origem}</Text>

      <Text style={styles.subTitle}>Descrição</Text>
      <Text style={styles.text}>{descricao}</Text>

      <Text style={styles.subTitle}>Benefícios</Text>
      <Text style={styles.text}>{beneficios}</Text>
    </ScrollView>
  );
}
