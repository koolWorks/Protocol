import React, {useEffect} from 'react';
import {StyleSheet, View, Image, StatusBar, Platform, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

const Splash = ({navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';

    useEffect(() => {
        // Configure status bar for Android 15 compatibility
        if (Platform.OS === 'android') {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('transparent', true);
        }
    }, []);

    return (
        <SafeAreaView style={[styles.safeArea, isDarkMode && { backgroundColor: '#000' }]}>
            <StatusBar
                backgroundColor="transparent"
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                translucent={true}
                hidden={false}
            />
            <View style={styles.container}>
                <FastImage
                    style={styles.image}
                    // source={require('../Splash/Splash.png')}
                    resizeMode='stretch'
                    priority={FastImage.priority.high}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    image: {
        width: '100%',
        height: '90%',
    },
});

export default Splash;