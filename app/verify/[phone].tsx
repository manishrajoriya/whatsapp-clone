import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Colors from '@/constants/Colors';

const CELL_COUNT = 6;

const Page = () => {
    const {phone, signin} = useLocalSearchParams<{phone: string, signin: string}>();
    const [code, setCode] = useState('');
    const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
      });

    useEffect(() => {
        if(code.length === 6) {
            if(signin === 'true') {
                verifySignIn();
            } else {
                verifyCode();
            }
        }
    }, [code])

    const verifyCode = async () => {
        //verify code
    }

    const verifySignIn = async () => {
        //verify sign in
    }

    const resendCode = async () => {
        //resend code
    }
  return (
    <View style={styles.container}>
        <Stack.Screen options={{ headerTitle: phone}} />
      <Text style={styles.legal}>Enter the code we sent to the number above</Text>
      <Text style={styles.legal}> 
        to complete the sign in process, please enter the 6 digit code.
      </Text>

      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        // autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
        autoComplete='sms-otp'
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <View
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
                <Text style={styles.cell}>{symbol || (isFocused ? <Cursor/> : null)}</Text>
            </View>
        )}
      />
     
     <TouchableOpacity style={styles.button} onPress={resendCode}>
        <Text style={styles.buttonText}>Don't receive a verification code?</Text>
     </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        alignItems: 'center',
    },
   legal: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
   },
   button: {
    
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
   },
   buttonText: {
    color: Colors.primary,
   },
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 36},
    codeFieldRoot: {
        marginTop: 20,
        width: 260,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 4
    },
    cell: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: 24,
    },
    focusCell: {
        borderColor: '#000',
        paddingBottom: 4,
        borderBottomWidth: 2,
    },
   
});
export default Page