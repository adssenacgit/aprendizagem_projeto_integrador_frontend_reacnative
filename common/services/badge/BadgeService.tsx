import {useEffect, useState} from 'react';
import {Badge} from '../../model/badge/Badge';
import {API} from '../../http/Http';
import {AxiosError, AxiosResponse} from 'axios';

export function getAllBadges() {
    // const [badges, setBadges] = useState<Badge[]>([]);

    // useEffect(() => {
    //   api.get<Badge[]>('/Badge').then((response) => {
    //     setBadges(response.data);
    //   });
    // }, []);

    // return badges;

    //MOCK
    // const mock: any[] = require('../../components/utils/badges.json');

    // useEffect(() => {
    //   setBadges(mock);
    //   setMasterData(mock);
    //   setFilteredData(mock);
    // }, []);

    const [badges, setBadges] = useState<Badge[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Badge[]>([]);
    const [masterData, setMasterData] = useState<Badge[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        API.get<Badge[]>('/Badge')
            .then((response: AxiosResponse) => {
                setBadges(response.data);
                setMasterData(response.data);
                setFilteredData(response.data);
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

    // if (badges === null) {
    //   const mock: Badge[] = require('../../../common/utils/mock/Badges.json');

    //   useEffect(() => {
    //     setBadges(mock);
    //     setMasterData(mock);
    //     setFilteredData(mock);
    //   }, []);
    // }
    return {badges, setBadges, search, setSearch, filteredData, setFilteredData, masterData, setMasterData, isLoading};
}

export function filtrarBadgeByGrupoId(id: Badge['id']) {

    const [badges, setBadges] = useState<Badge[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Badge[]>([]);
    const [masterData, setMasterData] = useState<Badge[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        API.get<Badge[]>('/Badge')
            .then((response: AxiosResponse) => {
                setBadges(response.data);
                setMasterData(response.data);
                setFilteredData(response.data);
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

    return {badges, setBadges, search, setSearch, filteredData, setFilteredData, masterData, setMasterData, isLoading};
}

export function getBadgeById(id: number | any) {
    const [badge, setBadges] = useState<Badge>(new Badge());
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        API.get<Badge>(`/Badge/${id ?? 5}`)
            .then((response: AxiosResponse) => {
                setBadges(response.data);
            })
            .catch((error: AxiosError<Badge>) => {
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
    }, [id]);

    return {badge, isLoading}
}

export function createBadge(badgeModel: Badge) {
    const [badge, setBadges] = useState<Badge>(new Badge());
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        API.post<Badge>(`/Badge`, badgeModel)
            .then((response: AxiosResponse) => {
                setBadges(response.data);
            })
            .catch((error: AxiosError<Badge>) => {
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
    }, [badgeModel]);

    return {badge, isLoading}
}
