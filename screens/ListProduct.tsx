import React, { useEffect, useState } from 'react'
import { Button, FlatList, Modal, Pressable, Text, View, TextInput } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { eliminar, actualizar, obtenerListado } from "../src/api/server";
import { estilos, modal } from '../themes/appTheme';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

interface Props extends StackScreenProps<any, any> { };

export const ListProduct = ({ navigation }: Props) => {

  const [data, setdata] = useState<Products[]>();

  useEffect(() => {
    obtenerListado(setdata);
  }, [])

  interface Products {
    Id: string,
    Name: string;
    Description: string;
    Quantity: Int32;
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [idActualizar, setidActualizar] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [nuevaCantidad, setNuevaCantidad] = useState("");

  const openModal = (idUpdate: string) => {
    setModalVisible(true); // Modifica el estado para mostrar el modal
    setidActualizar(idUpdate)
  };

  const closeModal = () => {
    setModalVisible(false); // Modifica el estado para ocultar el modal
    setidActualizar("");
    setNuevoNombre("");
    setNuevaDescripcion("");
    setNuevaCantidad("");

  };

  return (
    <View style={estilos.marginGlobal}>
      <Text style={estilos.title2}>Lista Productos</Text>
      <Button
        color={'#2B3D41'}
        title='Regresar'
        onPress={() => navigation.pop()} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={estilos.container}>
            <Text style={estilos.subtitle}>ID: {item.Id}</Text>
            <Text style={estilos.subtitle}>Nombre: {item.Name}</Text>
            <Text style={estilos.subtitle}>Descripcion: {item.Description}</Text>
            <Text style={estilos.subtitle}>Cantidad: {item.Quantity}</Text>
            <View style={estilos.fixToText}>
              <Button title="Actualizar" color={'green'} onPress={() => { openModal(item.Id.toString()) }} />
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <View style={modal.centeredView}>
                  <View style={modal.modalView}>
                    <Text style={modal.modalText}>Id del Producto = {idActualizar}</Text>
                    <Text style={modal.modalText}>Nombre:</Text>
                    <TextInput style={modal.input}
                      value={nuevoNombre}
                      onChangeText={(nombre) => { setNuevoNombre(nombre) }} />
                    <Text style={modal.modalText}>Descripción:</Text>
                    <TextInput style={modal.input}
                      value={nuevaDescripcion}
                      onChangeText={(descript) => { setNuevaDescripcion(descript) }}
                    />
                    <Text style={modal.modalText}>Cantidad:</Text>
                    <TextInput style={modal.input}
                      value={nuevaCantidad}
                      onChangeText={(cantida) => { setNuevaCantidad(cantida) }}
                    />
                    <Pressable
                      style={[modal.button, modal.buttonClose]}
                      onPress={() => {
                        actualizar(idActualizar, nuevoNombre, nuevaDescripcion, parseInt(nuevaCantidad));
                        obtenerListado(setdata);
                        setModalVisible(!modalVisible);
                        closeModal()
                      }}>
                      <Text style={modal.textStyle}>Actualizar</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              <Button
                title="Eliminar"
                color={'red'}
                onPress={() => {
                  eliminar(item.Id)
                  obtenerListado(setdata);
                }}
              />
            </View>
          </View>
        )}
      />
    </View >
  )
}