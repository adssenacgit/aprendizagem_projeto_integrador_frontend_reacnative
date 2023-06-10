import {useEffect, useState} from 'react';
import {Badge} from '../../model/badge/Badge';
import {API} from '../../http/Http';
import {AxiosError, AxiosResponse} from 'axios';
import {SituacaoAprendizagem} from "../../model/situacaoAprendizagem/situacaoAprendizagem";

export function getAllSituacoesAprendizagem() {

    const [situacaoAprendizagem, setSituacaoAprendizagem] = useState<SituacaoAprendizagem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        API.get<SituacaoAprendizagem[]>('/SituacaoAprendizagem')
            .then((response: AxiosResponse) => {
                setSituacaoAprendizagem(response.data);
            })
            .catch((error: AxiosError<SituacaoAprendizagem[]>) => {
                switch (error.response?.status) {
                    case 404: {
                        alert('Erro de endereçamento');
                        break;
                    }
                    case 400: {
                        alert('Erro de cliente');
                        break;
                    }
                    case 500: {
                        alert('Erro de servidor');
                    }
                }
            })
            .finally(() => setIsLoading(true));
    }, []);

    return {situacaoAprendizagem, isLoading};
}
