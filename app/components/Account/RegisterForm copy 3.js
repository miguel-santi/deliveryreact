import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput
} from "react-native";
import { Item, Input, Form, Button, Thumbnail, Text, Icon } from "native-base";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
//import { Icon } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";

//import * as firebase from "firebase";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

import { withNavigation } from "react-navigation";
import Loading from "../Loading";
import Modal from "../Modal";

const db = firebase.firestore(firebaseApp);
const { width: WIDTH } = Dimensions.get("window");
function RegisterForm(props) {
  const { toastRef, navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRepeatPassword, setHideRepeatPassword] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [facebook, setFacebook] = useState("");
  const [direccion, setDireccion] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationUsuario, setLocationUsuario] = useState(null);
  const [userRegisteredExito, setUserRegisteredExito] = useState(null);
  const [textPrueba, setTextPrueba] = useState("");

  const addUsuario = () => {
    const payload = {
      //Id_UsuarioFirebase: firebase.auth().currentUser.uid,
      Id_UsuarioFirebase: 1,
      Id_Rol: 1,
      Id_Rol: 1,
      Nombres: "Jose Miguel",
      Apellidos: "Santillano Escobar",
      Id_Fotografia: "",
      fechaCreacion: new Date(),
      Direccion: "Colonia Maria Auxiliadora, Calle Prof Luis A Cortez,casa tal",
      ubicacionGPG: "",
      Telefono: "6016 3986",
      Facebook: "miguel.santillano"
    };

    db.collection("usuarios")
      .add(payload)
      .then(() => {
        console.log("Usuario registrado en clod tore");
      });
  };

  const register = async () => {
    setIsVisibleLoading(true);
    if (
      !nombres ||
      !apellidos ||
      !email ||
      !password ||
      !repeatPassword ||
      !telefono ||
      !facebook // ||
      //!telefono
    ) {
      //console.log("Todos los campos son obligatorios");
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        //console.log("El email no es correcto");
        toastRef.current.show("El email no es correcto");
      } else {
        if (password !== repeatPassword) {
          //console.log("Las contraseñas no son iguales");
          toastRef.current.show("Las contraseñas no son iguales");
        } else {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              db.collection("usuarios").add({
                Id_UsuarioFirebase: firebase.auth().currentUser.uid,
                Id_Rol: 1,
                Nombres: nombres,
                Apellidos: apellidos,
                Id_Fotografia: "",
                fechaCreacion: new Date(),
                Direccion:
                  "Colonia Maria Auxiliadora, Calle Prof Luis A Cortez,casa tal",
                ubicacionGPG: "",
                Telefono: telefono,
                Facebook: facebook
              });
            })
            .catch(() => {
              //console.log("Error al crear la cuenta, intentelo mas tarde");
              toastRef.current.show(
                "Error al crear la cuenta, intentelo mas tarde"
              );
            });
        }
      }
    }
    setIsVisibleLoading(false);
  };

  return (
    <View style={styles.formContainer}>
      <Form style={styles.formRegisterStyle}>
        <Item rounded style={styles.itemStyle}>
          <Icon
            //name={Platform.OS === "ios" ? "ios-person" : "md-person"}
            type="MaterialCommunityIcons"
            name="account"
            style={{ fontSize: 25, color: "white", marginLeft: 10 }}
            onPress={() => console.log("HOLA ")}
          />
          <Input
            style={styles.inputStyle}
            value={nombres}
            placeholder="Nombres"
            placeholderTextColor="white"
            onChangeText={nombres => setNombres(nombres)}
          />
        </Item>
        <Item rounded style={styles.itemStyle}>
          <Icon
            type="MaterialCommunityIcons"
            name="account"
            style={{ fontSize: 25, color: "white", marginLeft: 10 }}
            onPress={() => console.log("HOLA ")}
          />
          <Input
            style={styles.inputStyle}
            value={apellidos}
            placeholder="Apellidos"
            placeholderTextColor="white"
            onChangeText={apellidos => setApellidos(apellidos)}
          />
        </Item>
        <Item rounded style={styles.itemStyle}>
          <Icon
            //name={Platform.OS === "ios" ? "ios-person" : "md-person"}
            name="at"
            style={{ fontSize: 25, color: "white", marginLeft: 10 }}
            onPress={() => console.log("HOLA ")}
          />
          <Input
            style={styles.inputStyle}
            value={email}
            placeholder="Correo electronico"
            placeholderTextColor="white"
            onChangeText={email => setEmail(email)}
          />
        </Item>
        <Item rounded style={styles.itemStyle}>
          <Icon
            type="MaterialCommunityIcons"
            //name={Platform.OS === "ios" ? "ios-person" : "md-person"}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={{ fontSize: 25, color: "white", marginLeft: 10 }}
            onPress={() => setHidePassword(!hidePassword)}
          />
          <Input
            style={styles.inputStyle}
            password={true}
            secureTextEntry={hidePassword}
            value={password}
            placeholder="Contraseña"
            placeholderTextColor="white"
            onChangeText={password => setPassword(password)}
          />
        </Item>
        <Item rounded style={styles.itemStyle}>
          <Icon
            type="MaterialCommunityIcons"
            //name={Platform.OS === "ios" ? "ios-person" : "md-person"}
            name={hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
            style={{ fontSize: 25, color: "white", marginLeft: 10 }}
            onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
          />
          <Input
            style={styles.inputStyle}
            password={true}
            secureTextEntry={hideRepeatPassword}
            value={repeatPassword}
            placeholder="Repetir contraseña"
            placeholderTextColor="white"
            onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
          />
        </Item>
        <Item rounded style={styles.itemStyle}>
          <Icon
            type="MaterialCommunityIcons"
            name="whatsapp"
            style={{ fontSize: 25, color: "white", marginLeft: 10 }}
            onPress={() => console.log("HOLA ")}
          />
          <Input
            style={styles.inputStyle}
            value={telefono}
            placeholder="WhatsApp"
            placeholderTextColor="white"
            onChangeText={telefono => setTelefono(telefono)}
          />
        </Item>
        <Item rounded style={styles.itemStyle}>
          <Icon
            type="MaterialCommunityIcons"
            name="facebook"
            style={{ fontSize: 25, color: "white", marginLeft: 10 }}
            onPress={() => console.log("HOLA ")}
          />
          <Input
            style={styles.inputStyle}
            value={facebook}
            placeholder="Nombre en facebook"
            placeholderTextColor="white"
            onChangeText={facebook => setFacebook(facebook)}
          />
        </Item>
        <Item rounded style={styles.itemStyle}>
          <Icon
            type="MaterialCommunityIcons"
            name="google-maps"
            style={{ fontSize: 25, color: "white", marginLeft: 10 }}
            onPress={() => setIsVisibleMap(true)}
          />
          <Input
            disabled
            style={styles.inputStyle}
            value={direccion}
            placeholder="Direccion"
            placeholderTextColor="white"
            onChangeText={direccion => setDireccion(direccion)}
          />
        </Item>
        <Button block rounded style={styles.btnStyle} onPress={register}>
          <Text style={{ color: "#000" }}>REGISTRARSE</Text>
        </Button>
      </Form>
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        //setLocationRestaurant={setLocationRestaurant}
        //toastRef={toastRef}
      />
      <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
    </View>
  );
}
function Map(props) {
  const {
    isVisibleMap,
    setIsVisibleMap
    //setLocationRestaurant,
    //toastRef
  } = props;
  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        <Text>Busque su direccion:</Text>
        <GoogleAutoComplete
          apiKey="AIzaSyAAly3_XKTdtDoFqA_gYokHWja3yu9YuWE"
          debounce={500}
          minLength={10}
          queryTypes={("establishment", "geocode|establishment")}
          components="country:sv"
        >
          {({
            inputValue,
            handleTextChange,
            locationResults,
            fetchDetails
          }) => (
            <React.Fragment>
              {/* {console.log("LocationResults: ", locationResults)} */}
              <View style={styles.inputSearchWrapper}>
                {/* <TextInput
                  style={styles.textInputMapSearch}
                  value={inputValue}
                  onChangeText={handleTextChange}
                  placeholder="Colonia, ciudad, barrio,etc..."
                /> */}
                <Item regulars style={styles.itemMapStyle}>
                  <Input
                    style={styles.inputStyle}
                    value={inputValue}
                    placeholder="Colonia, ciudad, barrio,etc..."
                    placeholderTextColor="white"
                    onChangeText={handleTextChange}
                  />
                  <Icon
                    //name={Platform.OS === "ios" ? "ios-person" : "md-person"}
                    type="MaterialCommunityIcons"
                    name="magnify"
                    style={{ fontSize: 25, color: "white", marginLeft: 10 }}
                    onPress={() => console.log("HOLA ")}
                  />
                </Item>
              </View>
              <ScrollView>
                {locationResults.map(result => (
                  <Text key={result.id}>{result.description}</Text>
                ))}
              </ScrollView>
              {/* <ScrollView>
              {locationResults.map(el => (
                <LocationItem {...el} key={el.id} />
              ))}
            </ScrollView> */}
            </React.Fragment>
          )}
        </GoogleAutoComplete>
      </View>
    </Modal>
  );
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1
  },
  formRegisterStyle: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  itemStyle: {
    marginTop: 10,
    backgroundColor: "#da4f13"
  },
  inputStyle: {
    color: "white",
    marginBottom: 1,
    marginLeft: 5,
    fontSize: 20
  },
  btnStyle: {
    marginTop: 20,
    paddingTop: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "#fff"
  },
  mapContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputSearchWrapper: {
    marginTop: 10
  },
  textInputMapSearch: {
    height: 40,
    width: "99%",
    borderWidth: 2,
    paddingHorizontal: 20
  },
  itemMapStyle: {
    marginTop: 10,
    backgroundColor: "#f6915e"
  }
});
