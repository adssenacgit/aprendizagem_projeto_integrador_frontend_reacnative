import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View,TouchableOpacity  } from "react-native";
import { CardAtividade } from "../../../../components/Cards/CardAtividade";
import { Atividade } from "../../../../models/Atividade";
import { API } from "../../../../http/API";
import 'primeicons/primeicons.css';
        

export default function Atividades(){
  const route = useRouter();
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const params = useLocalSearchParams();
  const { id, descricao } = useLocalSearchParams();
  
  useEffect(() => {
    API.get(`Atividade`).then(({data}) => {
      setAtividades(data)
    })
  }, []);


  return (
    <View style={styles.container}>
      <i className="pi-filter" style={{ fontSize: '2.5rem' }}></i>
      <View style={styles.rota}>
      <TouchableOpacity
          style={styles.rotaItem}
          onPress={() => {  }}
        >
          <Text style={styles.rotaText}>Inicio</Text>
        </TouchableOpacity>
        <Text style={styles.rotaSeparator}>/</Text>
        <TouchableOpacity
          style={styles.rotaItem}
          onPress={() => {  }}
        >
          <Text style={styles.rotaText}>Atividades</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={atividades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CardAtividade data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    
    alignItems: "center",
  },
  rota: {
    
    flexDirection: "row",
    paddingBottom:16,
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  rotaItem: {
    flexDirection: 'row',
    padding: 1,
    cursor: "pointer", 
  },
  rotaText: {
    
 
    textDecorationLine: "underline",
  },
  rotaSeparator: {
    paddingHorizontal: -10, // Adicione espaço entre "Inicio" e "Atividades"
  },
});
