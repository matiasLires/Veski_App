// ALTA USER
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Button,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";

const background = require("../assets/Fondo1.png");

export default function register({ navigation }) {
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors
  } = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      phone: "",
      dni: "",
      address: "",
      postalcode: "",
      province: "",
      city: "",
      nacimiento: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(4, "El nombre ingresado debe tener mas de 4 caracteres")
        .max(50, "El nombre ingresado debe tener tener menos de 50 caracteres")
        .required("Campo requerido"),
      lastname: Yup.string()
        .min(4, "El nombre ingresado debe tener mas de 4 caracteres")
        .max(50, "El nombre ingresado debe tener tener menos de 50 caracteres")
        .required("Campo requerido"),
      phone: Yup.string()
        .required("Ingrese su numero de telefono")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Numero de telefono no valido"
        ),
    }),
    onSubmit: ({ name, lastname, phone }) => {
      console.log("register params: ", values);
      alert(`name: ${name}, lasname: ${lastname}, phone: ${phone}`);
      Axios.post(`http://192.168.2.159:3000/api/registration/create_users`,
        values
        )
        .then(({ data }) => {
          if (data.error) {
            alert(data.error);
          } else {
            console.log(data);
            navigation.navigate("Profile");
          }
        })
        .catch((error) => console.log(error));
    },
  });

  return (
    <ScrollView style={styles.scrollView}>
      <View style={{ backgroundColor: "#FFF", height: "100%" }}>
        <ImageBackground source={background} style={styles.image}>
          <Text style={styles.title}>
            Alta de cliente
          </Text>

          <Text style={styles.subtitle}>
            Complete los campos para registrarse.
          </Text>

          <TextInput
            placeholder="Nombre"
            placeholderTextColor="#fff"
            onChangeText={handleChange("name")}
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={values.name}
            id="name"
            name="name"
            style={styles.input}
          />

          {touched.name && errors.name ? <div>{errors.name}</div> : null}

          <TextInput
            placeholder="Apellido"
            placeholderTextColor="#fff"
            onChangeText={handleChange("lastname")}
            onChange={handleChange}
            onSubmit={handleSubmit}
            id="lastname"
            name="lastname"
            value={values.lastname}
            style={styles.input}
          />
          {touched.lastname && errors.lastname ? (
            <div>{errors.lastname}</div>
          ) : null}

          <TextInput
            placeholder="Telefono"
            placeholderTextColor="#fff"
            onChangeText={handleChange("phone")}
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={values.phone}
            keyboardType="numeric"
            id="phone"
            name="phone"
            style={styles.input}
          />
          {touched.phone && errors.phone ? <div>{errors.phone}</div> : null}

          <TextInput
            placeholder="DNI"
            placeholderTextColor="#fff"
            onChangeText={handleChange("dni")}
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={values.dni}
            keyboardType="numbers-and-punctuation"
            id="dno"
            name="dni"
            style={styles.input}
          />

          <TextInput
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#fff"
            onChangeText={handleChange("nacimiento")}
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={values.nacimiento}
            id="nacimiento"
            name="nacimiento"
            style={styles.input}
          />

          <TextInput
            placeholder="Direccion"
            placeholderTextColor="#fff"
            onChangeText={handleChange("address")}
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={values.address}
            id="address"
            name="address"
            style={styles.input}
          />

          <TextInput
            placeholder="Codigo Postal"
            placeholderTextColor="#fff"
            onChangeText={handleChange("postalcode")}
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={values.postalcode}
            id="postalcode"
            name="postalcode"
            style={styles.input}
          />

          <TextInput
            placeholder="Provincia"
            placeholderTextColor="#fff"
            onChangeText={handleChange("province")}
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={values.province}
            id="province"
            name="province"
            style={styles.input}
          />

          <TextInput
            placeholder="Ciudad"
            placeholderTextColor="#fff"
            onChangeText={handleChange("city")}
            onChange={handleChange}
            id="city"
            name="city"
            onSubmit={handleSubmit}
            value={values.city}
            style={styles.input}
          />

          <TouchableOpacity
            mode="contained"
            secureTextEntry={true}
            title="Register"
            onPress={handleSubmit}
            style={styles.boton}
          >
            <Text>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Go back"
            onPress={() => navigation.goBack()}
            style={styles.boton}
          >
            <Text>Volver</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 50,
  },
  input: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 3,
    marginTop: 50,
    paddingHorizontal: 10,
    borderColor: "#00716F",
    borderRadius: 23,
    paddingVertical: 2,
  },
  boton: {
    backgroundColor: "#FFF",
    marginHorizontal: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: "#00716F",
    paddingVertical: 10,
    borderRadius: 23,
  },
  title: {
    paddingTop: 30,
    fontSize: 50,
    alignSelf: "center",
    color: "#FFF",
    fontFamily: "Verdana",
  },
  subtitle: {
    fontFamily: "Verdana",
    fontSize: 20,
    marginHorizontal: 55,
    textAlign: "center",
    marginTop: 10,
    opacity: 0.8,
    color: "#FFF",
  }
});
