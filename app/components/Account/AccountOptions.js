import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, normalize } from "react-native-elements";
import ModalGeneral from "../../components/ModalGeneral";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
//import ChangeEmailForm from "./ChangeEmailForm";
//import ChangePasswordForm from "./ChangePasswordForm";
import { render } from "react-dom";
export default function AccountOptions(props) {
  const { userInfo, userInfoUsuario, setReloadData, toastRef } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  console.log(userInfoUsuario);
  //AQUI TENGO EL PROBLEMA :(
  const { nombreCompleto } = userInfoUsuario[0];

  console.log(nombreCompleto);

  const menuOptions = [
    {
      title: "Cambiar Nombre y Apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ff6100",
      iconNameRight: "chevron-right",
      iconColorRight: "#ff6100",
      onPress: () => selectedComponent("displayName")
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ff6100",
      iconNameRight: "chevron-right",
      iconColorRight: "#ff6100",
      onPress: () => selectedComponent("email")
    },
    {
      title: "Cambiar Contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ff6100",
      iconNameRight: "chevron-right",
      iconColorRight: "#ff6100",
      onPress: () => selectedComponent("password")
    },
    {
      title: "Cambiar numero de WhatsApp",
      iconType: "material-community",
      iconNameLeft: "whatsapp",
      iconColorLeft: "#ff6100",
      iconNameRight: "chevron-right",
      iconColorRight: "#ff6100",
      onPress: () => selectedComponent("password")
    },
    {
      title: "Cambiar usuario de Facebook",
      iconType: "material-community",
      iconNameLeft: "facebook",
      iconColorLeft: "#ff6100",
      iconNameRight: "chevron-right",
      iconColorRight: "#ff6100",
      onPress: () => selectedComponent("password")
    },
    {
      title: "Cambiar Direccion",
      iconType: "material-community",
      iconNameLeft: "google-maps",
      iconColorLeft: "#ff6100",
      iconNameRight: "chevron-right",
      iconColorRight: "#ff6100",
      onPress: () => selectedComponent("password")
    }
  ];

  const selectedComponent = key => {
    // setIsVisibleModal(true);
    //console.log(key);
    switch (key) {
      case "displayName":
        //console.log("Abriendo formulario de cambio de Nombre ");
        setRenderComponent();
        //   <ChangeDisplayNameForm
        //     displayName={userInfo.displayName}
        //     nombreCompleto={nombreCompleto}
        //     idDocUsuario={idDocUsuario}
        //     setIsVisibleModal={setIsVisibleModal}
        //     setReloadData={setReloadData}
        //     toastRef={toastRef}
        //   />

        //   <Text>Opcion 1</Text>
        setIsVisibleModal(true);
        break;
      case "email":
        //console.log("Abriendo formulario de cambio de email");
        setRenderComponent(
          //   <ChangeEmailForm
          //     email={userInfo.email}
          //     setIsVisibleModal={setIsVisibleModal}
          //     setReloadData={setReloadData}
          //     toastRef={toastRef}
          //   />
          <Text>Opcion 2</Text>
        );
        setIsVisibleModal(true);
        break;
      case "password":
        //console.log("Abriendo formuarlio de cambio de contrasena");
        setRenderComponent(
          //   <ChangePasswordForm
          //     setIsVisibleModal={setIsVisibleModal}
          //     toastRef={toastRef}
          //   />
          <Text>Opcion 3</Text>
        );
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <View>
      {menuOptions.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight
          }}
          onPress={menu.onPress}
          containerStyle={styles.menuItem}
        />
      ))}
      {renderComponent && (
        <ModalGeneral
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
        >
          {renderComponent}
        </ModalGeneral>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3"
  }
});
