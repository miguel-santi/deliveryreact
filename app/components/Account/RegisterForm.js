import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList
} from "react-native";
import {
  Item,
  Input,
  Form,
  Button,
  Thumbnail,
  Text,
  Icon,
  Card,
  CardItem,
  Body,
  Textarea
} from "native-base";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
//import { Icon } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
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
  const [referenciaVivienda, setReferenciaVivienda] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationGPSCreacion, setLocationGPSCreacion] = useState(null);
  const [userRegisteredExito, setUserRegisteredExito] = useState(null);

  const [locationInitial3, setLocationInitial3] = useState(null);
  console.log(referenciaVivienda);
  useEffect(() => {
    (async () => {
      if (Platform.OS === "ios") {
        //console.log("Esta usando un iphone xd");
        const { status, permissions } = await Permissions.askAsync(
          Permissions.LOCATION
        );
        if (status === "granted") {
          //return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
          console.log("Si hay permiso");
          const loc = await Location.getCurrentPositionAsync({});
          //console.log(loc);
          setLocationInitial3({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          });
          setLocationGPSCreacion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          });
        } else {
          //throw new Error("Location permission not granted");
          console.log("No hay permiso");
        }
      } else {
        const resultPermissions = await Permissions.askAsync(
          Permissions.LOCATION
        );
        const statusPermissions = resultPermissions.permissions.location.status;
        //console.log("Si entra aqui tambien");
        //console.log(statusPermissions);
        if (statusPermissions !== "granted") {
          toastRef.current.show(
            "Tienes que aceptar los permisos de localizacion para crear un restaurante."
          );
        } else {
          const loc = await Location.getCurrentPositionAsync({});
          //console.log(loc);
          setLocationInitial3({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          });
          setLocationGPSCreacion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          });
        }
      }
    })();
  }, []);

  const register = async () => {
    setIsVisibleLoading(true);
    if (
      !nombres ||
      !apellidos ||
      !email ||
      !password ||
      !repeatPassword ||
      !telefono ||
      !facebook ||
      !direccion ||
      !referenciaVivienda ||
      !locationInitial3 ||
      !locationGPSCreacion
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("El email no es correcto");
      } else {
        if (password !== repeatPassword) {
          toastRef.current.show("Las contraseñas deben ser iguales");
        } else {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              const nombresPayLoad = nombres;
              const nombreCompleto = nombresPayLoad.concat(" ", apellidos);

              const payload = {
                Id_UsuarioFirebase: firebase.auth().currentUser.uid,
                //Id_UsuarioFirebase: 1,
                Id_Rol: 1,
                // Nombres: nombres,
                // Apellidos: apellidos,
                nombreCompleto: nombreCompleto,
                correoElectronico: email,
                Telefono: telefono,
                Facebook: facebook,
                direccionMapa: direccion,
                referenciaVivienda: referenciaVivienda,
                ubicacionGPSDireccion: locationInitial3,
                ubicacionGPSCreacion: locationGPSCreacion,
                Id_Fotografia: "",
                tokenNotificacion: "",
                fechaCreacion: new Date()
              };
              const updateDisplayName = {
                displayName: nombreCompleto
              };
              db.collection("usuarios")
                .add(payload)
                .then(() => {
                  //console.log("Usuario registrado en clod tore");
                  //toastRef.current.show("Usuario registrado con exito!");
                });
              ///////
              firebase
                .auth()
                .currentUser.updateProfile(updateDisplayName)
                .then(() => {
                  //console.log("display name actualizado con exito");
                  navigation.navigate("MyAccount");
                })
                .catch(() => {
                  console.log("Error al actualizar display name");
                });
              ///////
            })

            .catch(() => {
              //console.log("Error al crear la cuenta, intentelo mas tarde");
              toastRef.current.show(
                "Error al crear la cuenta, intentelo mas tarde"
              );
            });
          ////
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
          {direccion ? (
            <Icon
              type="MaterialCommunityIcons"
              name="google-maps"
              style={{ fontSize: 25, marginLeft: 10, color: "#03d1fa" }}
              onPress={() => setIsVisibleMap(true)}
            />
          ) : (
            <Icon
              type="MaterialCommunityIcons"
              name="google-maps"
              style={{ fontSize: 25, marginLeft: 10, color: "white" }}
              onPress={() => setIsVisibleMap(true)}
            />
          )}

          <Input
            disabled
            style={styles.inputStyle}
            value={direccion}
            placeholder="Direccion"
            placeholderTextColor="white"
            onChangeText={direccion => setDireccion(direccion)}
          />
        </Item>
        <TextInput
          style={styles.inputAreaStyle}
          value={referenciaVivienda}
          placeholder="¿Mas o menos por donde vives? -Calle,pasaje,bloque o numero de casa"
          multiline={true}
          numberOfLines={4}
          placeholderTextColor="#ffffff"
          underlineColorAndroid="transparent"
          onChangeText={referenciaVivienda =>
            setReferenciaVivienda(referenciaVivienda)
          }
        />
        <Button block rounded style={styles.btnStyle} onPress={register}>
          <Text style={{ color: "#000" }}>REGISTRARSE</Text>
        </Button>
      </Form>
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        locationInitial3={locationInitial3}
        setLocationInitial3={setLocationInitial3}
        setDireccion={setDireccion}
      />
      <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
    </View>
  );
}
function Map(props) {
  const {
    isVisibleMap,
    setIsVisibleMap,
    locationInitial3,
    setLocationInitial3,
    setDireccion
  } = props;
  const [inputTextSearch, setInputTextSearch] = useState("");
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
            fetchDetails,
            clearSearch
          }) => (
            <React.Fragment>
              {/* {console.log(locationResults)} */}
              <View style={styles.viewResultadosBusqueda}>
                <View style={styles.inputSearchWrapper}>
                  <Item regulars style={styles.itemMapStyle}>
                    <Input
                      style={styles.inputStyle}
                      value={inputValue}
                      placeholder="Colonia, ciudad, barrio,etc..."
                      placeholderTextColor="white"
                      // onChangeText={handleTextChange}
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
                <Card
                  dataArray={locationResults}
                  renderRow={item => (
                    <ItemBusqueda
                      itemBusquedaGoogle={item}
                      fetchDetails={fetchDetails}
                      clearSearch={clearSearch}
                      setLocationInitial3={setLocationInitial3}
                      setDireccion={setDireccion}
                    />
                  )}
                ></Card>
              </View>
            </React.Fragment>
          )}
        </GoogleAutoComplete>
        <View style={{ marginTop: 100 }}>
          {locationInitial3 && (
            <MapView
              provider={MapView.PROVIDER_GOOGLE}
              style={styles.mapStyle}
              showsUserLocation={true}
              showsMyLocationButton={true}
              rotateEnabled={false}
              followsUserLocation={false}
              region={locationInitial3}
              onRegionChangeComplete={region => setLocationInitial3(region)}
            >
              <Marker
                coordinate={{
                  latitude: locationInitial3.latitude,
                  longitude: locationInitial3.longitude
                }}
                title="Yo merengues xd"
                //image={require("./assets/map-marker-icon.png")}
                graggable
              />
            </MapView>
          )}
        </View>
      </View>
    </Modal>
  );
}

function ItemBusqueda(props) {
  const {
    itemBusquedaGoogle,
    fetchDetails,
    clearSearch,
    setLocationInitial3,
    setDireccion
  } = props;
  const { description, place_id } = itemBusquedaGoogle.item;
  //console.log(itemBusquedaGoogle);
  //const res =await  fetchDetails(place_id);
  //console.log(JSON.stringify(res));

  const _handlePress = async () => {
    const res = await fetchDetails(place_id);
    let locationSearch = {
      latitude: res.geometry.location.lat,
      longitude: res.geometry.location.lng,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001
    };
    //inputValue("");
    //const res = await fetchDetails(place_id);
    //alert(JSON.stringify(res));
    console.log(res.geometry.location);
    setLocationInitial3(locationSearch);
    setDireccion(description);
    clearSearch();
  };

  return (
    <CardItem
      button
      onPress={_handlePress}
      style={{
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "black"
      }}
    >
      <Body>
        <Text>{description}</Text>
      </Body>
    </CardItem>
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
  },
  viewResultadosBusqueda: {
    position: "absolute",
    zIndex: 1,
    width: "100%"
  },
  mapStyle: {
    width: "100%",
    height: "95%"
  },
  inputAreaStyle: {
    width: 340,
    height: 100,
    borderRadius: 25,
    fontSize: 20,
    paddingLeft: 68,
    paddingRight: 20,
    marginRight: 100,
    marginLeft: 0,
    marginTop: 10,
    borderColor: "white",
    borderWidth: 0.5,
    backgroundColor: "#da4f13",
    color: "#ffffff",
    marginHorizontal: 25
  },
  itemAreaStyle: {
    marginTop: 10,
    backgroundColor: "#da4f13",
    height: 100
  }
});
