import 'moment/locale/pt-br';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Moment from 'moment';
import React, { useState } from 'react';
import { Atividade } from '../../../models/Atividade';

const { width } = Dimensions.get("screen");

export function CardAtividade({ data }) {
  const { push } = useRouter();
  const navigation = useNavigation();

  const [isSelected, setSelection] = useState(false);

  const descricao = data.descricao;
  const image = `data:image/png;base64,${data.blob}`;

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
            <Feather name="book-open" color="orange" size={30} />
            <View>
              <Text style={styles.title}>Prazo de entrega:</Text>
              <Text style={styles.title}>
                {Moment(data.dataFim).format("llll")}
              </Text>
            </View>
          </View>
          <View style={styles.cardContentContainer}>
            <Text numberOfLines={3} style={styles.text}>
              {data.descricao}
            </Text>
            <TouchableOpacity onPress={() => push(`/atividades/${data.id}`)}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Ir para Detalhes</Text>
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
    fontSize: 15,
    fontWeight: '600'
  },
});