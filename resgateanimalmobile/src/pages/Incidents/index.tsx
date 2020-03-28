import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { FlatList, Image, Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import currency from '../../utils/currency';

export default function Incidents() {
    const navigation = useNavigation();
    const [ loading, setLoading ] = useState(false);
    const [ page, setPage ] = useState(1);
    const [ incidents, setIncidents ] = useState([]);
    const [ total, setTotal ] = useState(0)

    function navigateToDetails(incident) {
        navigation.navigate('Details', { incident });
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }
        
        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents',
            {
                params: { page }
            }
        );

        setIncidents([... incidents, ... response.data]);
        setTotal(response.headers['x-total-count'])
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
            loadIncidents();
        },
        []
    )

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                Total de <Text style={styles.headerTextBold} >{total} casos</Text>.
                </Text>
            </View>

        <Text style={styles.title} >Boas Vindas!</Text>
        <Text style={styles.description} >Escolha um dos casos abaixo e ajude um animalzinho.</Text>


        <FlatList
            data={incidents}
            keyExtractor={ incident => String(incident.id) }
            // showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.3}
            renderItem={({ item: incident }) => (
                <View style={styles.incidentList}>
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty} >ONG:</Text>
                        <Text style={styles.incidentValue} >{incident.name}</Text>

                        <Text style={styles.incidentProperty} >CASO:</Text>
                        <Text style={styles.incidentValue} >{incident.title}</Text>

                        <Text style={styles.incidentProperty} >VALOR:</Text>
                        <Text style={styles.incidentValue} >{currency(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetails(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
        </View>
    );
}