import React, { useRef } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "../../components/Account/RegisterForm";
import Toast from "react-native-easy-toast";
export default function Register() {
  const toastRef = useRef();
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "#ff5910", flex: 1 }}>
      <Image
        source={require("../../../assets/img/ya-login.png")}
        style={styles.logo}
        resizeMode="contain"
      ></Image>
      <Text style={styles.logoText}>DELIVERY</Text>
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewForm: {
    marginRight: 15,
    marginLeft: 15
  },
  logoText: {
    color: "white",
    fontSize: 40,
    fontWeight: "500",
    marginTop: 0,
    opacity: 0.5,
    textAlign: "center"
  }
});
