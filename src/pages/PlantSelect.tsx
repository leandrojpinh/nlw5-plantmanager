import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';

import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';

interface EnvironmentProps {
    key: string;
    title: string;
}

export function PlantSelect() {
    const navigation = useNavigation();

    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);

    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');

            setEnvironments([{
                key: 'all',
                title: 'Todos'
            }, ...data]);
        }

        fetchEnviroment();
    }, []);

    useEffect(() => {
        async function fetchPlants() {
            const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

            if (!data) {
                return setLoading(true);
            }

            if (page > 1) {
                setPlants(oldValue => [...oldValue, ...data]);
                setFilteredPlants(oldValue => [...oldValue, ...data]);
            } else {
                setPlants(data);
                setFilteredPlants(data);
            }

            setLoading(false);
            setLoadingMore(false);
        }

        fetchPlants();
    }, [page]);

    function handleEnvironmentSelected(environment: string) {
        setEnvironmentSelected(environment);

        if (environment === 'all') {
            setFilteredPlants(plants);

            return;
        }

        const filtered = plants
            .filter(plant => plant.environments.includes(environment));

        setFilteredPlants(filtered);
    }

    function handleFetchMore(distance: number) {
        if (distance < 1) {
            return;
        }

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
    }

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate('PlantSave', { plant });
    }

    if (loading) {
        return <Load />
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>você quer colocar sua planta</Text>
            </View>

            <View>
                <FlatList
                    keyExtractor={(item) => String(item.key)}
                    data={environments}
                    renderItem={({ item }) => <EnviromentButton
                        title={item.title}
                        active={item.key === environmentSelected}
                        onPress={() => handleEnvironmentSelected(item.key)}
                    />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    keyExtractor={(item) => String(item.id)}
                    data={filteredPlants}
                    renderItem={({ item }) => <PlantCardPrimary data={item} onPress={() => handlePlantSelect(item)} />}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) =>
                        handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore ?
                            <ActivityIndicator color={colors.green} />
                            : <></>
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
})