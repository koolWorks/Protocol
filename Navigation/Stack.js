import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WEBVIEW from '../Screens/Welcome'
import { Colors } from '../Components/Colors';
import Splash from '../Splash/Splash';
const stack = createNativeStackNavigator();
const Stack = () => {
    const [showSplashScreen, setshowSplashScreen] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setshowSplashScreen(false)
        }, 3400);
    }, []);
    return (
        <stack.Navigator >
            {showSplashScreen ? (<stack.Screen name='Splash' component={Splash} options={{ headerShown: false, }} />) : null}
            <stack.Screen name='WEBVIEW' component={WEBVIEW} options={{ headerShown: false, gestureEnabled: true }} />
        </stack.Navigator>
    )
}
export default Stack