import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
//import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountOptions from "../../components/Account/AccountOptions";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState({});
  const [userInfoUsuario, setUserInfoUsuario] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      //Aqui obtengo la data del usuario actual logueado . Metodo propio de firebase
      const user = await firebase.auth().currentUser;
      //console.log(user);
      setUserInfo(user.providerData[0]);
      //setBandera(true);
      // console.log(idUser);
    })();
    setReloadData(false);
  }, [reloadData]);

  useEffect(() => {
    (async () => {
      //Aqui obtengo la data del usuario actual , pero de mi tabla usuario por el id de firebase
      const idUser = firebase.auth().currentUser.uid;
      //console.log(idUser);
      db.collection("usuarios")
        .where("Id_UsuarioFirebase", "==", idUser)
        .get()
        .then(response => {
          const userInfoUsuarioArray = [];
          response.forEach(doc => {
            //console.log(doc.data());
            let usuario = doc.data();
            usuario.idDocUsuario = doc.id;
            userInfoUsuarioArray.push(usuario);
          });

          setUserInfoUsuario(userInfoUsuarioArray);
          //console.log(userInfoUsuario);
        });
      /////
    })();
  }, []);

  return (
    <View style={styles.viewUserInfo}>
      <InfoUser
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
      ></InfoUser>
      <AccountOptions
        userInfo={userInfo}
        userInfoUsuario={userInfoUsuario}
        setReloadData={setReloadData}
        toastRef={toastRef}
      ></AccountOptions>
      <Button
        title="Cerrar Sesion"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => firebase.auth().signOut()}
      />
      {/* <Button
        title="Cerrar Sesion"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => console.log(userInfoUsuario)}
      /> */}
      <Toast ref={toastRef} position="center" opacity={0.5}></Toast>
      <Loading text={textLoading} isVisible={isLoading}></Loading>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2"
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10
  },
  btnCloseSessionText: {
    color: "#ff6100"
  }
});
