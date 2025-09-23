import { StyleSheet, Text, View, Image, Alert, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
const Error = () => {
    const [showSpinner, setshowSpinner] = useState(true)
    setTimeout(() => {
        setshowSpinner(false)
    }, 2000);
    return (
        <ImageBackground source={require('../Image/Background.png')} style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner visible={showSpinner} textContent={'Please Wait ..'}
                textStyle={{ color: '#FFF', fontWeight: '400' }} size="large" color="#bb5533" />
            <Image source={require('../Image/Connectivity.png')} />
            <Text style={{ fontWeight: 'bold', color: '#5d4317', fontSize: 18 }}>No Internet Connection!</Text>
            <TouchableOpacity onPress={() => { setshowSpinner(true) }} style={{ padding: 10, backgroundColor: '#a53b01', borderRadius: 5, paddingHorizontal: 30, marginTop: 30 }}>
                <Text style={{ color: '#ecddc7', fontWeight: 'bold', fontSize: 18 }}>
                    RETRY
                </Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default Error

const styles = StyleSheet.create({})