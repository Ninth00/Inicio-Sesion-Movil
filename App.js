import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const App = () => {
  const [imageUri, setImageUri] = useState(
    'https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg'
  );
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");

  const pickerImageGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
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

    if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleShare = async () => {
    try {
      await Sharing.shareAsync(imageUri);
    } catch (error) {
      Alert.alert("Error al compartir la imagen", error.message);
    }
  };

  const Validaciones = (Nombre, Contraseña) => {
    if (Nombre === "" || Contraseña === "") {
      alert("Por favor rellena los campos");
      return false;
    }
    if (Nombre.length > 30) {
      alert("El nombre debe tener un máximo de 30 caracteres");
      return false;
    }
    if (Contraseña.length < 8 || Contraseña.length > 16) {
      alert("La contraseña debe tener entre 8 y 16 caracteres");
      return false;
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
    if (!regex.test(Contraseña)) {
      alert("La contraseña debe incluir al menos una letra mayúscula, una minúscula y un número");
      return false;
    }
    if(Nombre === "Usuario" && Contraseña === "Usuario123"){
      alert("Sesion Iniciada");
      return false;
    } else {
      alert("Usuario o contraseña incorrectos");
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>Inicio de Sesión</Text>
        
        <TouchableOpacity onPress={pickerImageGaleria}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShare} style={styles.button3}>
          <Text style={styles.buttontext}>COMPARTIR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={() => pickerImageFoto(true)}>
          <Text style={styles.buttontext}>TOMAR UNA FOTO</Text>
        </TouchableOpacity>
        
        <View style={styles.subcontainer2}>
          <Text style={styles.subtitle}>Nombre de usuario:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#bbb"
            onChangeText={setNombre}
            value={nombre}
          />
          
          <Text style={styles.subtitle}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            placeholderTextColor="#bbb"
            onChangeText={setContraseña}
            value={contraseña}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (Validaciones(nombre, contraseña)) {
              alert("Sesion iniciada");
            }
          }}
        >
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
