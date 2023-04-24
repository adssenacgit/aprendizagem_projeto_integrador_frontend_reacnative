import { MaterialIcons } from '@expo/vector-icons';
import { Link, useNavigation, useRouter } from 'expo-router';
import { Icon, NativeBaseProvider } from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import EditScreenInfo from '../../../components/custom/EditScreenInfo';
import { ButtonNativeBase } from '../../../components/nativeBase/Button';
import { InputNativeBase } from '../../../components/nativeBase/Input';
import { ModalNativeBase } from '../../../components/nativeBase/Modal';
import { Text, View } from '../../../components/custom/Themed';
import { Badge } from '../../../common/model/badge/Badge';
import { getAllBadges } from '../../../common/services/badge/BadgeService';
import { routes } from '../../../common/routes/routes';

export default function ListBadgesScreen() {
  const { badges, setBadges, search, setSearch, filteredData, setFilteredData, masterData, setMasterData } =
    getAllBadges();

  const ROUTES: routes = new routes();
  const router = useRouter();

  const { ViewModal, setShowModal } = ModalNativeBase();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'column',
    },
    flex: {
      flexDirection: 'row',
      marginVertical: 25,
      marginHorizontal: 30,
      gap: 10,
    },
    cardList: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 20,
      marginVertical:30,
      backgroundColor: '#ffffff',
    },
    card: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      width: 130,
      height: 'auto',
      backgroundColor: '#ffffff',
    },
    image: {
      width: 100,
      height: 100,
      padding: 15,
      backgroundColor: '#ffffff',
    },
  });

  function handlePress(badge: Badge) {
    router.push(`${ROUTES.badge.detail}`);
  }

  const searchFilter = (text: string) => {
    if (text) {
      const newData = masterData.filter((item) => {
        if (item.descricao) {
          const itemData = item.descricao.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
    } else {
      setFilteredData(masterData);
    }
    setSearch(text);
  };

  const viewTemplateRight = (): JSX.Element => {
    return (
        <>
          <Icon
              as={<MaterialIcons name='filter-alt' />}
              size={6}
              mr='2'
              color='muted.400'
              onPress={(e) => {
                setShowModal(true);
              }}
          />
        </>
  );
  };

  const searchTag = (badge: Badge['descricao']) => {
    const newData = masterData.filter((item) => {
      if (item.descricao === badge) {
        const itemData = item.descricao.toUpperCase();
        return itemData.indexOf(itemData) > -1;
      }
    });
    setFilteredData(newData);
  };

  const viewTemplate = (): JSX.Element => {
    return (
      <ScrollView>
        <View style={styles.cardList}>
          {filteredData.map((badge) => {
            if (filteredData !== null) {
              return (
                <View key={badge.id}>
                    <Card style={styles.card} elevation={5} mode={'elevated'} onPress={(e)=>handlePress(badge)}>
                      <Card.Content>
                        <Card.Cover style={styles.image} source={{ uri: `data:image/png;base64,${badge.imagem}` }} />
                        <Text>{badge.descricao}</Text>
                      </Card.Content>
                    </Card>
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
    );
  };

  const viewTemplateLeft = (): JSX.Element => {
    return <Icon as={<MaterialIcons name='search' />} size={6} ml='2' color='muted.400' />;
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <InputNativeBase
          value={search}
          fontSize='16'
          inputMode='search'
          variant='rounded'
          type='text'
          templateLeft={viewTemplateLeft()}
          templateRight={viewTemplateRight()}
          onChange={(e) => {
            searchFilter(e);
          }}
        ></InputNativeBase>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true}>
          <View style={styles.flex}>
            <ButtonNativeBase
              size='sm'
              borderRadius={'2xl'}
              _android={{
                bg: 'amber.100',
                _text: {
                  color: 'coolGray.800',
                  fontWeight: 'medium',
                },
              }}
              _pressed={{
                bg: 'amber.400',
                _text: {
                  color: 'warmGray.100',
                },
              }}
              onPress={() => setFilteredData(masterData)}
            >
              Todas
            </ButtonNativeBase>
            {masterData.map((badge) => {
              return (
                <View key={badge.id}>
                  <ButtonNativeBase
                    size='sm'
                    borderRadius={'2xl'}
                    _android={{
                      bg: 'blue.100',
                      _text: {
                        color: 'coolGray.800',
                        fontWeight: 'medium',
                      },
                    }}
                    _pressed={{
                      bg: 'blue.400',
                      _text: {
                        color: 'warmGray.100',
                      },
                    }}
                    onPress={(e) => {
                      searchTag(badge.descricao);
                    }}
                  >
                    {badge.descricao}
                  </ButtonNativeBase>
                </View>
              );
            })}
          </View>
        </ScrollView>
        {ViewModal}
      </View>
      <EditScreenInfo view={viewTemplate()} />
    </NativeBaseProvider>
  );
}
