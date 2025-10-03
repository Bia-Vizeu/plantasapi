import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#103517ff",
        tabBarStyle: { backgroundColor: "#fff" },
        headerShown: false, 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cadastro"
        options={{
          title: "Cadastro",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="plus-square" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lista"
        options={{
          title: "Plantas",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-florist" size={size} color={color} />
          ),
        }}
      />
    <Tabs.Screen
        name="detalhes"
        options={{
          title: "Detalhes",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="description" size={size} color={color} />
          ),
        }}
      />
   
    </Tabs>
    
    
  );
}