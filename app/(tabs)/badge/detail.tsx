import {Image, StyleSheet, View} from 'react-native';

import {getBadgeById} from '../../../common/services/badge/BadgeService';
import {AspectRatio, Box, Button, Heading, NativeBaseProvider, Stack, Text} from "native-base";
import {useRouter, useSearchParams} from "expo-router";

export default function DetailBadgeScreen() {
    const {id} = useSearchParams();
    const {badge} = getBadgeById(id);

    const router = useRouter();

    const onBack = () => {
        router.back();
    }

    return (
        <NativeBaseProvider>
            <Box alignItems="center" bottom="20">
                <Box maxW="80" rounded="lg" overflow="hidden" borderWidth="0" _web={{
                    shadow: 2,
                    borderWidth: 0
                }}>
                    <Stack>
                        <Text bottom="-45" margin="83">

                            <Button.Group isAttached colorScheme="blue" size="sm">
                                <Button>Descrição</Button>
                                <Button variant="outline">Histórico</Button>
                            </Button.Group>

                        </Text>
                    </Stack>
                    <Box margin="44" bottom="5">
                        <AspectRatio p="100" w="70%" ratio={10 / 10}>
                            <Image source={
                                {uri: `data:image/png;base64, ${badge.imagem}`}
                            } alt="imagem"/>
                        </AspectRatio>

                    </Box>
                    <Stack p="7" space={3}>
                        <Stack space={2}>
                            <Heading bottom="23" size="md" ml="-1">
                                {badge.descricao}
                            </Heading>
                        </Stack>
                        <Text fontWeight="700" bottom="25">
                            {badge.badgeNivel?.descricao}
                        </Text>
                        <Stack>
                            <View style={{flexDirection: 'row', marginTop: 70, gap: 10}}>
                                <Button
                                    bottom="20"
                                    _text={{
                                        color: 'black',
                                        fontWeight: 'bold',

                                    }}
                                    onPress={onBack}
                                >
                                    Voltar
                                </Button>

                                <Button
                                    bottom="20"
                                    _text={{
                                        color: 'black',
                                        fontWeight: 'bold',

                                    }}
                                >
                                    EVOLUIR BADGE
                                </Button>
                            </View>
                        </Stack>


                    </Stack>
                </Box>
            </Box>
        </NativeBaseProvider>
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
