import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import HeaderUc from '../../../../components/Header/HeaderUc';
import { CardObjetoAprendizagem } from '../../../../components/Cards/CardObjetoAprendizagem';
import { CardAtividade } from '../../../../components/Cards/CardAtividade';
import { API } from '../../../../http/API';
import { useLocalSearchParams, useSearchParams } from 'expo-router';

import { Atividade } from '../../../../models/Atividade';
import { ObjetoAprendizagem } from '../../../../models/ObjetoAprendizagem';


export default function ObjetosDeAprendizagem() {

  const [objetos, setObjetos] = useState<ObjetoAprendizagem[]>([]);
  const [atividades, setAtividades] = useState<Atividade[]>([])
  // const params = useLocalSearchParams();
  const {id, descricao} = useLocalSearchParams();
  useEffect(() => {
    async function getSituacaoAprendizagen() {
      try {
        const {data} = await API.get(`/ObjetoAprendizagem/FiltrarObjetoAprendizagemBySituacaoAprendizagemId/${id}`);

        setObjetos(data);

      } catch (err) {
        console.log(err);
      }
    }

    getSituacaoAprendizagen();

    async function getAtividades() {
      try {
          const {data} = await API.get(`Atividade/FiltrarAtividadeBySituacaoAprendizagemId/${id}`);
          setAtividades(data);
      } catch (err) {
          alert(err);
      }
    }
    getAtividades();
  }, [id]);


  return (
    <>
      <HeaderUc data={descricao} />

      <View style={styles.container}>

        <View style={styles.contentTitle}>
          <Text style={styles.title}>Objetos de Aprendizagem</Text>
        </View>

        <View>
          <FlatList
            scrollEnabled={true}
            horizontal={false}
            data={objetos}
            renderItem={({ item }) => <CardObjetoAprendizagem key={item.id} data={item} />}
          />
        </View>


        <View style={styles.contentTitle}>
          <Text style={styles.title}>Atividades</Text>
        </View>

        <View>
          <FlatList
            numColumns={1}
            scrollEnabled={false}
            horizontal={false}
            data={atividades}
            renderItem={({ item }) => <CardAtividade key={item.id} data={item} />}
          />
        </View>


      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentTitle: {
    width: '95%',
    borderRadius: 50,
    backgroundColor: '#EF8F2F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
    marginTop: 5,
    elevation: 10,
    alignSelf: 'center'
  },
  title: {
    color: 'white',
    fontSize: 15,
    padding: 5
  },
  fabButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    elevation: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})