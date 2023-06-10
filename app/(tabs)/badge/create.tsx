import {StyleSheet, Image, View, Text, ScrollView, Alert, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import {Button, Input, NativeBaseProvider} from "native-base";
import {useEffect, useState} from "react";
import {getAllSituacoesAprendizagem} from "../../../common/services/situacaoAprendizagem/SituacaoAprendizagemService";
import {getAllAtivades} from "../../../common/services/ativade/AtividadeService";
import {getAllBadges} from "../../../common/services/badge/BadgeService";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CreateScreen() {
    const [image, setImage] = useState<any>(null);
    const {situacaoAprendizagem} = getAllSituacoesAprendizagem();
    const {atividades} = getAllAtivades();
    const {badges} = getAllBadges();

    const [selectedOptionSituacaoAprendizagem, setSelectedOptionSituacaoAprendizagem] = useState('');
    const [selectedOptionAtividade, setSelectedOptionAtividade] = useState('');
    const [selectedOptionBadgeNivel, setSelectedOptionBadgeNivel] = useState('');

    useEffect(() => {
        (async () => {
            // Solicitar permissões de acesso à biblioteca de mídia do dispositivo
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Desculpe, precisamos de permissão para acessar a biblioteca de mídia para fazer o upload de imagens.');
            }
        })();
    }, []);

    const pickImage = async () => {
        // Abrir o seletor de imagem
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true, // Definir para true para obter o base64 da imagem selecionada
        });

        if (!result.canceled) {
            setImage(result);
        }
    };

    const uploadImage = () => {
        // Fazer o upload da imagem usando o base64
        if (image && image.base64) {
            // Aqui você pode fazer a lógica de upload da imagem usando o base64
            console.log('Base64 da imagem:', image.base64);
        }
    };


    const handleOptionChangeBadgeNIvel = (itemValue: string) => {
        setSelectedOptionBadgeNivel(itemValue);
    };

    const handleOptionChangeSituacaoAprendizagem = (itemValue: string) => {
        setSelectedOptionSituacaoAprendizagem(itemValue);
    };

    const handleOptionChangeAtividade = (itemValue: string) => {
        setSelectedOptionAtividade(itemValue);
    };

    // Remover badges duplicados com base na propriedade "descricao"
    const uniqueBadges = badges.filter((badge, index) => {
        return badges.findIndex(b => b.badgeNivel.descricao === badge.badgeNivel.descricao) === index;
    });

    return (
        <NativeBaseProvider>

            <View style={styles.container}>
                <ScrollView style={{height: '100%', width: '100%'}}>
                    <View style={styles.view}>
                        <Text style={styles.title}>Descrição</Text>
                        <Input placeholder={"Descrição"} style={styles.input}></Input>
                    </View>

                    <View style={styles.view}>
                        <Text style={styles.title}>Nível Badge</Text>
                        <RNPickerSelect
                            placeholder={{label: 'Selecione uma opção', value: null}}
                            value={selectedOptionBadgeNivel}
                            onValueChange={handleOptionChangeBadgeNIvel}
                            items={uniqueBadges.map(item => (
                                {
                                    label: item.badgeNivel.descricao,
                                    value: item.badgeNivel.descricao,
                                }))}
                            Icon={() => <View style={{
                                paddingVertical: 10,
                                paddingHorizontal: 10
                            }}><Icon name="chevron-down" size={20} style={{color: 'rgba(0,0,0,0.22)'}}/></View>
                            }
                            style={pickerSelectStyles}
                        />
                    </View>

                    <View style={styles.view}>
                        <Text style={styles.title}>Situação de Aprendizagem</Text>
                        <RNPickerSelect
                            placeholder={{label: 'Selecione uma opção', value: null}}
                            value={selectedOptionSituacaoAprendizagem}
                            onValueChange={handleOptionChangeSituacaoAprendizagem}
                            items={situacaoAprendizagem.map(item => ({
                                label: item.descricao,
                                value: item.descricao,
                            }))}
                            Icon={() => <View style={{
                                paddingVertical: 10,
                                paddingHorizontal: 10
                            }}><Icon name="chevron-down" size={20} style={{color: 'rgba(0,0,0,0.22)'}}/></View>
                            }
                            style={pickerSelectStyles}
                        />
                    </View>

                    <View style={styles.view}>
                        <Text style={styles.title}>Atividades</Text>
                        <RNPickerSelect
                            placeholder={{label: 'Selecione uma opção', value: null}}
                            value={selectedOptionAtividade}
                            onValueChange={handleOptionChangeAtividade}
                            items={atividades.map(item => ({
                                label: item.descricao,
                                value: item.descricao,
                            }))}
                            Icon={() => <View style={{
                                paddingVertical: 10,
                                paddingHorizontal: 10
                            }}><Icon name="chevron-down" size={20} style={{color: 'rgba(0,0,0,0.22)'}}/></View>
                            }
                            style={pickerSelectStyles}
                        />
                    </View>

                    <View style={styles.view}>
                        <Text style={styles.title}>Imagem</Text>

                        {image && (
                            <View>
                                <Image source={{uri: image.uri}} style={{width: 200, height: 200}}/>
                                {/*<Button onPress={uploadImage}>Upload</Button>*/}
                            </View>
                        )}
                        <Button onPress={pickImage} color={'blueGray.800'} backgroundColor={'blue.500'}
                                style={{marginVertical: 20}}>Escolher
                            Imagem</Button>
                    </View>
                    <Button backgroundColor={'blue.500'}
                            onPress={() => Alert.alert('Sucesso', 'Enviado com sucesso')}>Enviar</Button>

                </ScrollView>
            </View>
        </NativeBaseProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent:'center',
        backgroundColor: '#fff',
        height: "auto",
        width: "100%",
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 10
    },
    view: {
        flex: 1,
        alignItems: "flex-start",
        width: "100%",
        marginVertical: 20,
    },
    input: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },
    marginVertical: {
        marginVertical: 10
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        ...Platform.select({
            ios: {
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 4,
                color: 'black',
                paddingRight: 30, // Para exibir o ícone de seta à direita
            },
            android: {
                // Estilos para dispositivos Android
            },
        }),
    },
    inputAndroid: {
        ...Platform.select({
            ios: {
                // Estilos para dispositivos iOS
            },
            android: {
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 8,
                color: 'black',
                paddingRight: 30, // Para exibir o ícone de seta à direita
            },
        }),
    },
});
