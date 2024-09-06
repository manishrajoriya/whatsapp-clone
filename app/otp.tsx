import { View, Text, KeyboardAvoidingView, Platform, Linking, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Page = () => {
    const [loading, setLoading] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [country, setCountry] = useState('')
    const router = useRouter()
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0
    const {bottom} = useSafeAreaInsets()

    const openLink = () => {
        Linking.openURL(`https://wa.me/${phoneNumber}`)
    }
    const sendOtp = async () => {

    }
    const trySignIn = async () => {

    }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.container}>
            <Text style={styles.description}>
                WhatsApp will need to verify your phone number. We will send you a one-time password via SMS.
            </Text>
            <View style={styles.list}>
                <View style={styles.listItem}>
                    <Text style={styles.listItemText}>
                        India
                    </Text>
                    <Ionicons name='chevron-forward' size={20} color={Colors.gray} />
                </View>
                <View style={styles.separator} />
            </View>
            <Text style={styles.label}>
                You must be {' '}
                <Text style={styles.link}>
                    at least 16 years old
                </Text>
                {' '}to use WhatsApp. Learn how WhatsApp works with your data in our{' '}
                <Text style={styles.link}>
                    Privacy Policy
                </Text>
            </Text>

            <View style={{flex: 1}}/>

        <TouchableOpacity onPress={sendOtp} style={[styles.button,{marginBottom: bottom}, phoneNumber !== '' ? styles.enabled : null]} disabled={phoneNumber === ''} >
            <Text style={[styles.buttonText, phoneNumber !== '' ? styles.enabled : null]}>
                Next
            </Text>
        </TouchableOpacity>
        </View>
       
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.background,
        gap: 20,
        
    },
    description: {
       fontSize: 14,
       fontWeight: '400',
       color: Colors.gray,
       textAlign: 'center',
       
    },
    list: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        
    },
    listItem: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       marginBottom: 10,
       padding: 6
    },
    listItemText: {
        fontSize: 18,
        fontWeight: '400',
        color: Colors.primary,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        width: '100%',
        backgroundColor: Colors.gray,
        opacity: 0.2
    },
    link: {
        color: Colors.primary,
    },
    label: {
        fontSize: 12,
        textAlign: 'center',
        color: '#000'
    },
    button: {
        width: '100%',
        backgroundColor: Colors.lightGray,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        
    },
    buttonText: {
        fontSize: 20,
        color: Colors.gray,
        fontWeight: '500'
    },
    enabled: {
        backgroundColor: Colors.primary,
        color: '#fff'
    }
})

export default Page