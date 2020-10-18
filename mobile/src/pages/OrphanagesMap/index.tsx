import React from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import mapMarker from '../../../assets/images/map-marker.png';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

export default function OrphanagesMap() {
  const navigation = useNavigation();

  function handleNavigationToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  function handleNavigationToOrphanageDetails() {
    navigation.navigate('OrphanageDetails');
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
        <Marker
          icon={mapMarker}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
          coordinate={{
            latitude: -12.9799063,
            longitude: -38.5115833,
          }}
        >
          <Callout tooltip onPress={handleNavigationToOrphanageDetails}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar das meninas</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>404 Orfanatos encontrados.</Text>

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
