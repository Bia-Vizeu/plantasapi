import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { listarPlanta } from "../../components/api";
import styles from "../../components/styles";

export default function Lista() {
  const [plantas, setPlantas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleExcluir = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`https://floralles-api.vercel.app/plantas/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        Alert.alert("Não autorizado", "Seu token expirou ou é inválido.");
        return;
      }

      if (!response.ok) {
        Alert.alert("Erro", "Erro ao excluir planta!");
        return;
      }

      Alert.alert("Sucesso", "Planta excluída com sucesso!");
      router.replace("/screens/lista");

    } catch (error) {
      console.error("ERRO:", error);
      Alert.alert("Erro", "Erro de conexão com o servidor!");
    }
  };
  
  const handleAtualizar = (id: string) => {
    router.push({
      pathname: "/screens/atualizar",
      params: { id }
    });
  };

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
        Alert.alert("Erro de conexão", "Não foi possível conectar à API. Verifique sua internet.");
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
        <Text style={{ marginTop: 10, color: "#6B8F71" }}>Carregando plantas...</Text>
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
          <View style={localStyles.itemContainer}>
            <TouchableOpacity
              style={localStyles.itemContent}
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
              <Image source={{ uri: item.img }} style={localStyles.thumbnail} />
              <Text style={localStyles.title}>{item.nome_p}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={localStyles.deleteButton}
              onPress={() => handleExcluir(item.id)}
            >
              <Text style={localStyles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={localStyles.putButton}
              onPress={() => handleAtualizar(item.id)}
            >
              <Text style={localStyles.putButtonText}>Atualizar</Text>
            </TouchableOpacity>
          </View>
          
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

const localStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#233526ff",
  },
  deleteButton: {
    backgroundColor: "#FF5C5C",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  putButton: {
    backgroundColor: "#6B8F71",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginLeft: 5,
  },
  putButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
