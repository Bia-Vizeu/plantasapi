import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { listarPlanta } from "../../components/api";
import styles from "../../components/styles";

export default function Lista() {
  const [plantas, setPlantas] = useState<any[]>([]); 
  const router = useRouter();

  useEffect(() => {
    listarPlanta().then((data) => setPlantas(data));
  }, []);

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
            <Text style={styles.title}>{item.nome_p}</Text>
            <Image source={{ uri: item.img }} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
