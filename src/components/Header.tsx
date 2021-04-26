import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../styles/colors';

import userImg from '../assets/user.png';
import fonts from '../styles/fonts';

import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header() {
    const [user, setUser] = useState('');

    useEffect(() => {
        async function loadUser() {
            const user = await AsyncStorage.getItem('@plantmanager:user') || '';
            
            setUser(user);
        }

        loadUser();
    }, []);
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.username}>{user}</Text>
            </View>
            <Image source={userImg} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    username: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading
    }
})