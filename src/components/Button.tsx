import React from 'react';
import colors from '../styles/colors';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button({ title, ...rest } : ButtonProps) {
    return (
        <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8}
            {...rest}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 20,
        height: 56,
        width: 56
    },
    buttonText: {
        color: colors.white,
        fontSize: 24
    }
  });