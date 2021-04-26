import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSelect } from '../pages/PlantSelect';
import { PlantSave } from '../pages/PlantSave';
import { MyPlants } from '../pages/MyPlants';
import { MaterialIcons } from '@expo/vector-icons';

const stackTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return (
        <stackTab.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: 'below-icon',
                style: {
                    paddingVertical: 20,
                    height: 88
                }
            }}
        >
            <stackTab.Screen
                name='Nova planta'
                component={PlantSelect}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name='add-circle-outline'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <stackTab.Screen
                name='Minhas plantas'
                component={MyPlants}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </stackTab.Navigator>
    );
}

export default AuthRoutes;