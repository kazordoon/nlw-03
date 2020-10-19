import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import mapMarker from '../../../assets/images/map-marker.png';
import api from '../../services/api';
import Orphanage from '../../contracts/Orphanage';

export default function OrphanagesMap() {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api
      .get('/orphanages')
      .then((response) => setOrphanages(response.data))
      .catch(() => alert('Não foi possível carregar os orfanatos.'));
  }, []);

  function handleNavigationToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  function handleNavigationToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -12.9799063,
          longitude: -38.5115833,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(({ id, name, latitude, longitude }) => (
          <Marker
            key={id}
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            coordinate={{
              latitude,
              longitude,
            }}
          >
            <Callout
              tooltip
              onPress={() => handleNavigationToOrphanageDetails(id)}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length === 1
            ? '1 orfanato encontrado.'
            : `${orphanages.length} orfanatos encontrados.`}
        </Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigationToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </>
  );
}
