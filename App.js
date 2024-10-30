import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const App = () => {
  const [imageUri, setImageUri] = useState(
    'https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg'
  );

  const pickerImageGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  const pickerImageFoto = async (fromCamera = false) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>Inicio de Sesión</Text>
        
        <TouchableOpacity onPress={pickerImageGaleria}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Sharing.shareAsync(imageUri)} style={styles.button3}>
          <Text style={styles.buttontext}>COMPARTIR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={() => pickerImageFoto(true)}>
          <Text style={styles.buttontext}>TOMAR UNA FOTO</Text>
        </TouchableOpacity>
        
        <View style={styles.subcontainer2}>
          <Text style={styles.subtitle}>Nombre de usuario:</Text>
          <TextInput style={styles.input} placeholder='Nombre' placeholderTextColor="#bbb" />
          
          <Text style={styles.subtitle}>Contraseña:</Text>
          <TextInput style={styles.input} placeholder='Contraseña' secureTextEntry placeholderTextColor="#bbb" />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Usuario Registrado')}>
          <Text style={styles.buttontext}>ACEPTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subcontainer: {
    borderColor: '#444',
    backgroundColor: '#2c2c2c',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    borderRadius: 10,
  },
  subcontainer2: {
    marginTop: 25,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: 'monospace',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#bbb',
  },
  image: {
    height: 180,
    width: 180,
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 15,
    borderColor: '#555',
    borderWidth: 3,
  },
  input: {
    padding: 5,
    height: 40,
    width: 200,
    borderRadius: 5,
    backgroundColor: '#3c3c3c',
    color: '#fff',
    marginTop: 5,
    marginBottom: 10,
    borderColor: '#555',
    borderWidth: 2,
  },
  button: {
    height: 40,
    width: 90,
    backgroundColor: '#340448',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    height: 40,
    width: 120,
    backgroundColor: '#340448',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button3: {
    padding: 5,
    marginBottom: 50,
    height: 40,
    width: 90,
    backgroundColor: '#340448',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontext: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default App;