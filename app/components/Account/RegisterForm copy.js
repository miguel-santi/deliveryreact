import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";

//import * as firebase from "firebase";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

import { withNavigation } from "react-navigation";
import Loading from "../Loading";
const db = firebase.firestore(firebaseApp);

function RegisterForm(props) {
  const { toastRef, navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRepeatPassword, setHideRepeatPassword] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userRegisteredExito, setUserRegisteredExito] = useState(null);

  // useEffect(() => {
  //   //addUsuario();
  //   // firebase.auth().onAuthStateChanged(user => {
  //   //   !user ? setUserRegisteredExito(false) : setUserRegisteredExito(true);
  //   // });
  //   // if (!userRegisteredExito) {
  //   //   console.log("No hay usuario recien registrado");
  //   // } else {
  //   //   console.log("Se acaba de registrar un nuevo usuario");
  //   //   db.collection("usuarios").add({
  //   //     Id_UsuarioFirebase: firebase.auth().currentUser.uid,
  //   //     Id_Rol: 1,
  //   //     Nombres: "Jose Miguel",
  //   //     Apellidos: "Santillano Escobar",
  //   //     Id_Fotografia: "",
  //   //     fechaCreacion: new Date(),
  //   //     Direccion:
  //   //       "Colonia Maria Auxiliadora, Calle Prof Luis A Cortez,casa tal",
  //   //     ubicacionGPG: "",
  //   //     Telefono: "6016 3986",
  //   //     Facebook: "miguel.santillano"
  //   //   });
  //   //   setUserRegisteredExito(false);
  //   // }
  // }, [userRegisteredExito]);

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
    // console.log("Usuario registrado");
    // console.log("Email:" + email);
    // console.log("Password: " + password);
    // console.log("Repeat Password: " + repeatPassword);
    // const resultEmailValidation = validateEmail(email);
    // console.log("Validacion del email: " + resultEmailValidation);
    setIsVisibleLoading(true);
    if (!email || !password || !repeatPassword) {
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
              //console.log("Usuario creado correctamente");
              //toastRef.current.show("Usuario creado correctamentes");
              //AQUI CREAMOS LA TABLA USUARIOS y agregamos el usuario de firebase y otros datos
              // console.log("Usuario firebase recien registrado");
              // //console.log(user);
              // const { uid } = user.user;
              // console.log(uid);
              //navigation.navigate("MyAccount");
              //setUserRegisteredExito(true);
              db.collection("usuarios").add({
                Id_UsuarioFirebase: firebase.auth().currentUser.uid,
                Id_Rol: 1,
                Nombres: "Jose Miguel",
                Apellidos: "Santillano Escobar",
                Id_Fotografia: "",
                fechaCreacion: new Date(),
                Direccion:
                  "Colonia Maria Auxiliadora, Calle Prof Luis A Cortez,casa tal",
                ubicacionGPG: "",
                Telefono: "6016 3986",
                Facebook: "miguel.santillano"
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
      <Input
        placeholder="Correo Electronico"
        containerStyle={styles.inputForm}
        //onChange={() => console.log("Email actualizado")}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      ></Input>
      <Input
        placeholder="Contraseña"
        password={true}
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      ></Input>
      <Input
        placeholder=" Repetir contraseña"
        password={true}
        secureTextEntry={hideRepeatPassword}
        containerStyle={styles.inputForm}
        onChange={e => setRepeatPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
          />
        }
      ></Input>
      <Button
        //title={<Text style={{ color: "#000000" }}>Unirse</Text>}
        title="Unirse"
        titleStyle={{ color: "black" }}
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={register}
      />
      <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
    </View>
  );
}
export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#fff"
  },
  iconRight: {
    color: "#c1c1c1"
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "100%"
  },
  btnRegister: {
    backgroundColor: "#fff"
  }
});
