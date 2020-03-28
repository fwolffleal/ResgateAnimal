import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { FlatList, Image, Text, View, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

import logoImg from '../../assets/logo.png';
import currency from '../../utils/currency';

export default function Details() {
  const navigation = useNavigation();
  const route = useRoute();

  const { incident } = route.params;
  const value = currency(incident.value);
  const message = `Olá ${incident.name}, estou entrando em contato porque quero ajudar no caso ${incident.title} com o valor de ${value}`

  function backToIncidentsList() {
    navigation.goBack();
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `${incident.title}`,
      recipients: [`${incident.email}`],
      body: message
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={logoImg} />
            <TouchableOpacity
              style={styles.backButton}
              onPress={backToIncidentsList}
            >
                <Feather name="arrow-left" size={28} color="#e02041" />
            </TouchableOpacity>
        </View>

        <View style={styles.incident}>
            <Text style={[styles.incidentProperty, { marginTop: 0 }]} >ONG:</Text>
            <Text style={styles.incidentValue} >{incident.name} de {incident.city}/{incident.uf}</Text>

            <Text style={styles.incidentProperty} >CASO:</Text>
            <Text style={styles.incidentValue} >{incident.description}</Text>

            <Text style={styles.incidentProperty} >VALOR:</Text>
            <Text style={styles.incidentValue} >{value}</Text>

        </View>

        <View style={styles.contactBox}>
            <Text style={styles.heroTitle} >Salve o dia!</Text>
            <Text style={styles.heroTitle} >Seja o herói deste caso.</Text>

            <Text style={styles.heroDescription} >Entre em contato:</Text>

            <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.action}
                  onPress={sendWhatsapp}
                >
                    <Text style={styles.actionText} >Whatsapp</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.action}
                  onPress={sendEmail}
                >
                    <Text style={styles.actionText} >E-mail</Text>
                </TouchableOpacity>
            </View>
        </View>

    </View>
  );
}
