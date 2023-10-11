import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ObterGruposByPeriodoAtivoByEstudanteId } from "../../../core/services/GrupoService";
import ListaGrupo from "../../../components/ListaGrupo";
import Colors from "../../../common/constants/Colors";
import { useAuth } from "../../../contexts/AuthContext";
import ProximasAtividades from "../../../components/ProximasAtividades/ProximasAtividades";
import UserCard from "../../../components/Dashboard/UserCard";
import { useEffect, useMemo, useState } from "react";
import { FrequenciaViewModel } from "../../../models/FrequenciaViewModel";
import { Grupo } from "../../../models/Grupo";
import { obterFrequenciaByEstudanteIdByPeriodoId } from "../../../core/services/FrequenciaService";
import { handleError } from "../../../http/API";

export default function ListaUC() {

  const {estudanteId} = useAuth().authState.userData;
  const [grupos, setGrupos] = useState<Grupo[]>([])
  const [frequencia, setFrequencia] = useState<FrequenciaViewModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      Promise.all([ObterGruposByPeriodoAtivoByEstudanteId(estudanteId), obterFrequenciaByEstudanteIdByPeriodoId(estudanteId, 2)])
        .then(res => {
          setGrupos(res[0])
          setFrequencia(res[1])
        })
        .catch(err => handleError(err))
  },[estudanteId])

  useMemo(() => {
    grupos.forEach(
      (g) => {
          var freq = frequencia.find((f) =>(f.grupoId == g.id));
          g.frequencia = freq.frequencia;
        }
    )
    setGrupos(grupos)
    setLoading(false)

  },[frequencia])

  return (
    <>
      { !loading ? (
        <View style={styles.container}>
          <FlashList
            ListHeaderComponent={
              <>
                <UserCard/>
                <ProximasAtividades/>
                <HeaderCursos />
              </>
            }
            data={grupos}
            estimatedItemSize={8}
            numColumns={1}
            renderItem={({ item }) => <ListaGrupo {...item} />}
            keyExtractor={(item) => item.id.toString()}
          />
          {/* <ProfileScreen /> */}
        </View>
      ) : (
        <ActivityIndicator size={"large"}/>
      )}
    </>
  );
}

const HeaderCursos = () => {
  return (
    <Text
      style={styles.textCurso}
    >
      Meus Cursos
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  textCurso: {
    paddingHorizontal: 115,
    marginTop: 10,
    fontSize: 24,
    fontWeight: "600",
    fontFamily: 'PoppinsBold',
    color: '#000000',
  }
  
});
