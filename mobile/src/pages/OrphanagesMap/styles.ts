import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,

    paddingHorizontal: 16,

    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,

    justifyContent: 'center',
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    height: 56,

    paddingLeft: 24,

    backgroundColor: '#fff',
    borderRadius: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },
  footerText: {
    color: '#8fa7b3',
  },
  createOrphanageButton: {
    width: 56,
    height: 56,

    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
