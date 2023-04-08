import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../../components/custom/EditScreenInfo';
import { View } from '../../../components/custom/Themed';
import { getAllBadges } from '../../../common/services/badge/BadgeService';

export default function DetailBadgeScreen() {
  const { badges, setBadges, search, setSearch, filteredData, setFilteredData, masterData, setMasterData } =
    getAllBadges();

  return (
    <View style={styles.container}>
      {/* {route.params.id} */}
      {/* <Text style={styles.title}>{guildSelected.descricao}</Text> */}
      {/* {badges.map((value) => {
        return <Text>{value.status}</Text>;
      })} */}
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
      <EditScreenInfo path='app/(tabs)/two.tsx' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
