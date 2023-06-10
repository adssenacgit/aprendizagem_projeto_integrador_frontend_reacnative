import {useEffect, useState} from 'react';
import {Badge} from '../../model/badge/Badge';
import {API} from '../../http/Http';
import {AxiosError, AxiosResponse} from 'axios';
import {Ativade} from "../../model/atividade/Atividade";

export function getAllAtivades() {

    const [atividades, setAtividades] = useState<Ativade[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        API.get<Ativade[]>('/Atividade')
            .then((response: AxiosResponse) => {
                setAtividades(response.data);
            })
            .catch((error: AxiosError<Badge[]>) => {
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

    return {atividades, isLoading};
}
