import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Text, TouchableOpacity, View, } from "react-native";
import { listarPlanta } from "../../components/api";
import styles from "../../components/styles";

export default function Lista() {
  const [plantas, setPlantas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlantas = async () => {
      try {
        const data = await listarPlanta();
        if (data && Array.isArray(data)) {
          setPlantas(data);
        } else {
          Alert.alert("Erro", "Não foi possível carregar as plantas.");
        }
      } catch (error: any) {
        console.error("Erro ao listar plantas:", error.message);
        Alert.alert(
          "Erro de conexão",
          "Não foi possível conectar à API. Verifique sua internet."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlantas();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#6B8F71" />
        <Text style={{ marginTop: 10, color: "#6B8F71" }}>
          Carregando plantas...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.lista}
        data={plantas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.receitaItem}
            onPress={() =>
              router.push({
                pathname: "/screens/detalhes",
                params: {
                  nome_p: item.nome_p,
                  nome_c: item.nome_c,
                  especie: item.especie,
                  classe: item.classe,
                  origem: item.origem,
                  descricao: item.descricao,
                  beneficios: item.beneficios,
                  img: item.img,
                },
              })
            }
          >
            <Image source={{ uri: item.img }} style={styles.thumbnail} />
            <Text style={styles.title}>{item.nome_p}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#555" }}>
            Nenhuma planta encontrada.
          </Text>
        }
      />
    </View>
  );
}
