import React, { useState, useEffect } from 'react';
import { Image, View, ScrollView, Text, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute, RouteProp } from '@react-navigation/native';

import styles from './styles';
import mapMarkerImg from '../../../assets/images/map-marker.png';
import Orphanage from '../../contracts/Orphanage';
import api from '../../services/api';

type RouteParamsList = {
  OrphanageDetails: {
    id: number;
  };
};

export default function OrphanageDetails() {
  const route = useRoute<RouteProp<RouteParamsList, 'OrphanageDetails'>>();

  const [orphanage, setOrphanage] = useState<Orphanage>();

  useEffect(() => {
    api
      .get(`/orphanages/${route.params.id}`)
      .then((response) => setOrphanage(response.data))
      .catch(() =>
        alert('Não foi possível carregar os detalhes deste orfanato.'),
      );
  }, [route.params.id]);

  if (!orphanage) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Carregando...</Text>
      </View>
    );
  }

  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours: openingHours,
    open_on_weekends: openOnWeekends,
    images,
  } = orphanage;

  function handleRoutesOnGoogleMaps() {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {images.map(({ id, path }) => (
            <Image
              key={id}
              style={styles.image}
              source={{
                uri: path,
              }}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{about}</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude,
                longitude,
              }}
            />
          </MapView>

          <TouchableOpacity
            style={styles.routesContainer}
            onPress={handleRoutesOnGoogleMaps}
          >
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              {openingHours}
            </Text>
          </View>
          {openOnWeekends ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="info" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
                Atendemos fim de semana
              </Text>
            </View>
          ) : (
            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
              <Feather name="info" size={40} color="#FF669D" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>
                Não atendemos fim de semana
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
