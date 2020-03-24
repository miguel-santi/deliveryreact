import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { withNavigation } from "react-navigation";
import LoginForm from "../../components/Account/LoginForm";
import Toast from "react-native-easy-toast";
//import LoginFacebook from "../../components/Account/LoginFacebook";
export default function Login(props) {
  const { navigation } = props;
  const toastRef = useRef();
  return (
    <ScrollView style={{ backgroundColor: "#ff5910", flex: 1 }}>
      <Image
        source={require("../../../assets/img/ya-login.png")}
        style={styles.logo}
        resizeMode="contain"
      ></Image>
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        {/* <Text>Create Account</Text> */}
        <CreateAccount navigation={navigation} />
      </View>
      {/* <Divider style={styles.divider} /> */}
      <View style={styles.viewContainer}>
        {/* <LoginFacebook toastRef={toastRef} navigation={navigation} /> */}
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </ScrollView>
  );
}
function CreateAccount(props) {
  const { navigation } = props;
  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("Register")}
      >
        Regístrarse
      </Text>
    </Text>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40
  },
  textRegister: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10
  },
  btnRegister: {
    color: "#fff",
    fontWeight: "bold"
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40
  }
});
