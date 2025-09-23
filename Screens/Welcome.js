import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  BackHandler,
  View,
  Alert,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import ErrorPage from './ErrorPage';

const generateNoCacheUrl = (url) => {
  const timestamp = new Date().getTime();
  return `${url}?nocache=${timestamp}`;
};

const App = () => {
  const webViewRef = useRef(null);
  const canGoBackRef = useRef(false); // Ref for latest back status
  const [canGoBack, setCanGoBack] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [isConnected, setIsConnected] = useState(null);
  const [webUrl, setWebUrl] = useState(generateNoCacheUrl('https://divyaweb-view.vercel.app/'));

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleBackPress = useCallback(() => {
    if (canGoBackRef.current && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    } else {
      Alert.alert(
        'Exit App',
        'Do you want to exit the app?',
        [
          { text: 'No', onPress: () => null, style: 'cancel' },
          { text: 'Yes', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
      return true;
    }
  }, []);

  useEffect(() => {
    const unsubscribeNet = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      unsubscribeNet();
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [handleBackPress]);

  if (isConnected === null) {
    return (
      <SafeAreaView style={[styles.container, styles.safeArea]}>
        <Spinner visible={true} textContent={'Checking Connection...'} textStyle={{ color: '#FFF' }} />
      </SafeAreaView>
    );
  }

  if (!isConnected) {
    return (
      <SafeAreaView style={[styles.container, styles.safeArea]}>
        <ErrorPage />
      </SafeAreaView>
    );
  }

  const resetScrollPosition = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript('window.scrollTo(0, 0); true;');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <StatusBar
        backgroundColor={isDarkMode ? '#000' : '#ffffff'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent={Platform.OS === 'android'}
      />
      <Spinner
        visible={showSpinner}
        textContent={'Please Wait ..'}
        textStyle={{ color: '#FFF', fontWeight: '400' }}
        size="large"
        color="#bb5533"
      />

      <WebView
        ref={webViewRef}
        source={{ uri: webUrl }}
        javaScriptEnabled={true}
        injectedJavaScript={`
          const meta = document.createElement('meta');
          meta.setAttribute('name', 'viewport');
          meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
          document.getElementsByTagName('head')[0].appendChild(meta);
          true;
        `}
        onLoadStart={() => setShowSpinner(true)}
        onLoadProgress={({ nativeEvent }) => {
          if (nativeEvent.progress === 1) {
            setShowSpinner(false);
            resetScrollPosition();
          }
        }}
        onLoadEnd={() => {
          setShowSpinner(false);
          resetScrollPosition();
        }}
        onError={() => setShowSpinner(false)}
        onNavigationStateChange={(navState) => {
          const isHome = navState.url === 'https://divyaweb-view.vercel.app/'; //https://protocol.shrikashivishwanath.org/
          const canGo = !isHome && navState.canGoBack;
          setCanGoBack(canGo);
          canGoBackRef.current = canGo;
        }}
        scalesPageToFit={false}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: '#ffffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});