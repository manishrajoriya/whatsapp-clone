import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'
const welcome_image = Image.resolveAssetSource(require('../assets/images/welcome.png')).uri

const index = () => {
  const openLink = () => {
    Linking.openURL('https://reactnative.dev/docs/getting-started')
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: welcome_image }} style={styles.welcome} />
      <Text style={styles.headline}>welcome to the whatsapp</Text>
      <Text style={styles.description}>
        Read the documentation to learn the basics of React Native and modern
        React.
      </Text>
     
      <Link href="/otp" asChild replace>
       <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Agree and continue</Text>
       </TouchableOpacity>
      </Link>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    width: '100%',
    height: 300,
    marginBottom: 80,
  },
  headline:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: Colors.gray,
  },
  link: {
    color: Colors.primary,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  button: {
    
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  }
});

export default index