import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

function UserGuest(props) {
  //console.log(props);
  const { navigation } = props;
  return (
    <View style={{ backgroundColor: "#ff6100", flex: 1 }}>
      <ScrollView style={styles.viewBody} centerContent={true}>
        <Image
          source={require("../../../assets/img/user-guest.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Consulta tu perfil de Yaya!</Text>
        <Text style={styles.description}>
          ¿Hamburguesas? ¿Comida Mexicana? ¿Crepas? Dejá de esperar tanto por tu
          comida, nosotros nos encargamos de llevártela hasta la puerta de tu
          casa o dondequiera que te encontrés. Sin tráfico, ni largas
          distancias.
        </Text>
        <Text style={styles.description}> Lo querés. Lo tenés. Ya!</Text>
        <View style={styles.viewBtn}>
          <Button
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            title="Ver tu perfil"
            titleStyle={{ color: "black" }}
            onPress={() => navigation.navigate("Login")}
          ></Button>
        </View>
      </ScrollView>
    </View>
  );
}

export default withNavigation(UserGuest);
const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
    color: "#ffffff"
  },
  description: {
    textAlign: "center",
    marginBottom: 20
  },
  viewBtn: {
    flex: 1,
    alignItems: "center"
  },
  btnStyle: {
    backgroundColor: "#fff"
  },
  btnContainer: {
    width: "70%"
  }
});
