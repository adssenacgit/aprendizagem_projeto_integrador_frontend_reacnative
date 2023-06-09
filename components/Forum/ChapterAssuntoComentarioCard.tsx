import { Alert, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Moment from 'moment';
import 'moment/locale/pt-br';
const { width } = Dimensions.get('screen')
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ChapterAssuntoComentario } from '../../models/ChapterAssuntoComentario';
import { deleteChapterAssuntoComentario } from '../../core/services/chapter/ChapterAssuntoComentarioService';

type ComentarioProps = {
  comentario: ChapterAssuntoComentario,
  usuarioId: string,
  usuarioRole: string,
  handleResponderComentario: (id: number) => any
}

const ChapterAssuntoComentarioCard = ({comentario, usuarioId, usuarioRole, handleResponderComentario}: ComentarioProps) => {

  return (
    <View style={styles.topicosContainer}>
      <TouchableOpacity>
        <View style={styles.cardContainer}>
          <View  style={styles.cardHeaderContainer}>
            <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
              <View style={{borderRadius: 50, backgroundColor: 'gray', width: 18, alignItems:'center', justifyContent:'center', paddingBottom: 2}}>
                <Text style={{color: 'white'}}>{comentario.usuario.nomeCompleto[0].toLowerCase()}</Text>
              </View>
              <View>
              <Text style={styles.cardHeaderInfo}>{comentario.usuario.nomeCompleto} - {Moment(comentario.data).startOf('hour').fromNow()}</Text>
              </View>
            </View>
          </View>
          <Text numberOfLines={2} style={styles.cardDescription}>{comentario.texto}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

          <View  style={styles.cardIconsContainer}>
            <TouchableOpacity>
            <View style={styles.iconContainer}>
              <Ionicons name="heart-outline" size={20} color="black" />
              <Text>5</Text>
            </View>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => handleResponderComentario(comentario.id)}>
                <MaterialCommunityIcons name="reply-outline" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
            {(usuarioId === comentario.usuarioId || usuarioRole === 'Administrador') &&
              <>
              <TouchableOpacity onPress={() => console.log("opcoes: editar ou deletar")}>
                <View>
                <MaterialCommunityIcons name="dots-horizontal" size={20} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => showConfirmDeleteDialog(comentario.id)}>
                <View>
                <AntDesign name="delete" size={20} color="red" />
                </View>
              </TouchableOpacity>
              </>
            }
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const showConfirmDeleteDialog = (id: string | number) => {
  return Alert.alert(
    "Excluir",
    "Tem certeza?",
    [
      {
        text: "Sim",
        onPress: () => {
          deleteChapterAssuntoComentario(id);
        },
      },
      {
        text: "Não",
      },
    ]
  );
};


export default ChapterAssuntoComentarioCard

const styles = StyleSheet.create({
  topicosContainer:{
    alignItems: 'center',
  },
  cardContainer:{
    margin: 5,
    width: width * 0.9,
    padding: width * 0.03,
    backgroundColor: '#fff',
    borderRadius: 15,
    gap: 5,
    ...Platform.select({
      ios: {
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5
      }
    })
  },
  cardHeaderContainer: {
    gap: 5
  },

  cardHeaderInfo: {
    textTransform: 'capitalize', color: 'gray', fontSize: 12
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 18
  },
  cardDescription: {
    marginVertical: 5,
    color: 'black',
  },
  cardIconsContainer: {
    flex: 1,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  }
})