import 'moment/locale/pt-br';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Moment from 'moment';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get("screen");

export function CardAtividade({ data }) {
  const { push } = useRouter();
  const navigation = useNavigation();

  const [isSelected, setSelection] = useState(false);

  const descricao = data.descricao;
  const image = `data:image/png;base64,${data.blob}`;
  
  const handleNavigation = () => {
    navigation.navigate('Atividades');
  };
  


  return (
  
    
        <View
          style={[
            styles.cardContainer,
            Platform.OS === "android"
              ? styles.cardContainerAndroid
              : styles.cardContainerIos,
          ]}
        >
         
          <View style={styles.cardHeaderContainer}>
          <MaterialCommunityIcons name="book-edit-outline" size={29} color="black" style={styles.iconBook}/>
            <View>
              <Text style={[styles.title, { color: '#0F2552' }]}>Prazo de entrega:</Text>
              <Text style={[styles.title, { color: '#0F2552' }]}>
                {Moment(data.dataFim).format("llll")}
              </Text>
            </View>
          </View>
          <View style={styles.cardContentContainer}>
            <Text numberOfLines={3} style={styles.text}>
              {data.descricao}
            </Text>
            <TouchableOpacity onPress={() => push(`/atividades/${data.id}`)}>
            <View style={styles.iconSeta}>
              <AntDesign name="rightcircleo" size={24} color="#0F2552" />
                </View>
            </TouchableOpacity>



          </View>
          
        </View> 
       
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    width: width - 20,
    paddingHorizontal: 10,
    // paddingHorizontal: width * 0.08,
  },
  cardContainer: {
    
    gap: 5,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 4, // Espaçamento horizontal
    marginBottom: 25, // Espaçamento vertical

    
  },
  cardContainerIos: {
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardContainerAndroid: {
    elevation: 5
  },
  cardHeaderContainer: {
    //backgroundColor: 'red',
    //paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: -150,
  },
  iconSeta:{
    marginLeft: 300, 
    fontSize: 16,
  },
  iconBook:{
    marginLeft: -85,
  }
  
  
});