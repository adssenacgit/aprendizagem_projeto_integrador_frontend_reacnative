import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Dimensions } from 'react-native'
import React from 'react'
import { Grupo } from '../models/Grupo'
import { ProgressBar } from 'react-native-paper'
import { Link, useRouter } from 'expo-router'
import Colors from '../common/constants/Colors'
import CircularProgress from 'react-native-circular-progress-indicator'
import { Ionicons } from '@expo/vector-icons';


const {width} = Dimensions.get('screen')
const ListaGrupo = (grupo: Grupo) => {
  const router = useRouter()

  return (
    <View style={styles.mainCardContainer} >
        <TouchableOpacity onPress={() => router.push(`/ucs/${grupo.id}`)}>
          <View style={[styles.cardContainer, Platform.OS === "android" ? styles.cardContainerAndroid : styles.cardContainerIos]}>
            {/* <Image
              style={{height:50, width: 50, borderRadius: 50}}
              resizeMode='contain'
              source={
                require('../assets/images/UCimage.png')
              }
              alt="image"
            /> */}
            <View style={styles.cardHeaderContainer}>
              <Text style={styles.cardTitle} numberOfLines={1} adjustsFontSizeToFit={false}>
                {grupo.unidadeCurricular.nome}
              </Text>
              <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Ionicons name="school-outline" size={20} color="#333333" />
                <Text style={{color: '#333333', fontFamily:'Poppins'}}>
                  Módulo {grupo.unidadeCurricular.numeroModulo}
                </Text>
              </View>
            </View>
            <View style={styles.cardInfoContainer}>
              <View style={styles.progressStats}>
                <CircularProgress
                  value={30}
                  radius={30}
                  inActiveStrokeColor={'#2ecc71'}
                  inActiveStrokeOpacity={0.2}
                  progressValueColor={'#000'}
                  valueSuffix={'%'}
                  rotation={180}
                />
                <Text style={styles.progressInfo}>
                  Meu progresso
                </Text>
              </View>
              <View style={styles.progressStats}>
                <CircularProgress
                  value={60}
                  radius={30}
                  inActiveStrokeColor={'#2ecc71'}
                  inActiveStrokeOpacity={0.2}
                  progressValueColor={'#000'}
                  valueSuffix={'%'}
                  rotation={180}
                />
                <Text style={styles.progressInfo}>
                  Progresso UC
                </Text>
              </View>
              <View style={styles.progressStats}>
                <CircularProgress
                  value={parseInt(grupo.frequencia)}
                  radius={30}
                  inActiveStrokeColor={'#2ecc71'}
                  inActiveStrokeOpacity={0.2}
                  progressValueColor={'#000'}
                  valueSuffix={'%'}
                  rotation={180}
                />
                <Text style={styles.progressInfo}>
                  Frequência
                </Text>
              </View>
            </View>
          </View>

        </TouchableOpacity>
      </View>
  )
}

export default ListaGrupo

const styles = StyleSheet.create({
  mainCardContainer: {
    marginVertical: 8,
    paddingHorizontal: width*0.08,
  },
  cardContainer: {
    padding: 15,
    backgroundColor: Colors.light.cardBackground,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 15,
    gap: 8,
    
  },
  cardContainerIos: {
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cardContainerAndroid: {
    elevation: 5
  },
  cardHeaderContainer:{
    gap: 5,
  },
  cardInfoContainer :{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardTitle: {
    fontWeight:'600',
    fontSize: 20,
  },
  progressInfo: {
    //marginTop: 5,
    color: '#333333'
  },
  progressStats: {
    alignItems: 'center',
    
  }
})