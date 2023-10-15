import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View,TouchableOpacity  } from "react-native";
import { CardAtividade } from "../../../../components/Cards/CardAtividade";
import { Atividade } from "../../../../models/Atividade";
import { API } from "../../../../http/API";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";


export default function Atividades(){
  const route = useRouter();
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const params = useLocalSearchParams();
  const { id, descricao } = useLocalSearchParams();
  const [filterDate, setFilterDate] = useState(null);
  
  const [ordenarPorMaisRecente, setOrdenarPorMaisRecente] = useState(true);





  const handleDateFilter = () => {
    
  const atividadesOrdenadas = atividades.slice().sort((a, b) => {
    const dataA = new Date(a.dataFim).getTime();
    const dataB = new Date(b.dataFim).getTime();
    const ordenacao = ordenarPorMaisRecente ? dataB - dataA : dataA - dataB;
    return ordenacao;
  });

  setAtividades(atividadesOrdenadas);
  setOrdenarPorMaisRecente((prevState) => !prevState);
  
  };




  useEffect(() => {
    API.get(`Atividade`).then(({data}) => {
      console.log('Dados recebidos:', data);
      setAtividades(data)
    })
    .catch((error) =>{
      console.error('Erro na solicitacao API: ', error);
    })
  }, []);



 


  return (
    <View style={styles.container}>
      
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
          <Text style={[styles.rotaText, { color: 'orange' }]}>Ativdades</Text>
        </TouchableOpacity>

        <Text style={styles.textIcon}>por data</Text>
        <TouchableOpacity onPress={handleDateFilter}>
          
          <AntDesign  name="filter" size={30} color="black" style={styles.iconStyle} />
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
    marginTop:10,
  },
  rotaText: {
    marginTop:10,
    textDecorationLine: "underline",
    
  },
  rotaSeparator: {
    marginTop:22,
    paddingHorizontal: -10, 
  },
  textIcon:{
    marginLeft:150,
    marginTop:18,
    fontSize:16,
  },
  iconStyle:{
    marginTop:15,
  }
});
