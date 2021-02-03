import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Camera} from 'expo-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

const Response = (props) => {
  return (
    <View>
      <Text>Последние полученные данные:</Text>
      <Text>{JSON.stringify(props.response)}</Text>
    </View>
  );
};

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.torch);
  const [response, setResponse] = useState({});

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Шикарная библиотека expo-camera</Text>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        onBarCodeScanned={(resp) => {
          Alert.alert('Прочитаны данные:', JSON.stringify(resp));
          setResponse(resp);
        }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}>
            <Text style={styles.text}> Flip camera </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.torch
                  ? Camera.Constants.FlashMode.off
                  : Camera.Constants.FlashMode.torch,
              );
            }}>
            <Text style={styles.text}> Flash </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Response response={response} />
    </SafeAreaView>
  );
}
