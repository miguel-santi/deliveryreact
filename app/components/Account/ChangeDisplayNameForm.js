import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
//Inicializamos nuesta base de datos
const db = firebase.firestore(firebaseApp);

export default function ChangeDisplaynameForm(props) {
  const {
    displayName,
    nombreCompleto,
    idDocUsuario,
    setIsVisibleModal,
    setReloadData,
    toastRef
  } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //console.log(nombreCompleto);
  //console.log("NombreCompleto desde currentUser: " + displayName);
  const updateDisplayName = () => {
    // console.log("Nombre del usuario actualizado");
    setError(null);
    if (!newDisplayName) {
      setError("El nombre del usuario no ha cambiado.");
    } else {
      ///////
      setIsLoading(true);
      const update = {
        displayName: newDisplayName
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show("Nombre actualizado correctamente");
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el nombre.");
          setIsLoading(false);
        });
      ///////
    }
    //actualizacion de prueba
    const idUser = firebase.auth().currentUser.uid;
    db.collection("usuarios")
      .doc(idDocUsuario)
      .update({ Id_Fotografia: 1 })
      .then(() => {
        console.log("la actualizacion fue un exito xddd");
      });
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre"
        containerStyle={styles.input}
        defaultValue={displayName && displayName}
        onChange={e => setNewDisplayName(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2"
        }}
        errorMessage={error}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateDisplayName}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btn: {
    backgroundColor: "#00a680"
  }
});
