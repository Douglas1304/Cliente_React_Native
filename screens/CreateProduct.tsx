import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { styles } from '../themes/appTheme';
import { TextInput } from 'react-native-gesture-handler';
import { agregar } from '../src/api/server';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

interface Props extends StackScreenProps<any, any> { }

interface Products {
  name: string;
  description: string;
  quantity: Int32;
}

interface MyListProps {
  data: Products[];
}

export const CreateProduct = ({ navigation }: Props) => {
  //cantidad
  const [cantidad, setCantidad] = useState('');
  const handleIdChange = (text: string) => {
    setCantidad(text);
  };
  //nombre
  const [nombre, setNombre] = useState('');
  const handleNombreChange = (text: string) => {
    setNombre(text);
  };
  //
  const [descripcion, setDescripcion] = useState('');
  const handleDescripcionChange = (text: string) => {
    setDescripcion(text);
  };

  const limpiarfrm = () => {
    setCantidad('');
    setNombre('');
    setDescripcion('');
  }
  return (
    <View style={styles.globalMargin}>
      <Text style={styles.title}>Registrar Producto:</Text>


      <Text style={styles.subTitle}>Nombre:</Text>

      <TextInput style={styles.input}
        value={nombre}
        onChangeText={handleNombreChange}
      />

      <Text style={styles.subTitle}>Descripcion:</Text>

      <TextInput style={styles.input}
        value={descripcion}
        onChangeText={handleDescripcionChange}
      />
      <Text style={styles.subTitle}>Cantidad:</Text>

      <TextInput
        style={styles.input}
        value={cantidad}
        onChangeText={handleIdChange}
      />
      <View style={{ top: 150 }}>
        <Button color={'#023C40'} title='Agregar' onPress={() => {
          agregar(nombre, descripcion, parseInt(cantidad))
          limpiarfrm()
        }} />

        <View style={{ marginVertical: 10,paddingTop:20 }}>
          <Button
            color={'#4C5F6B'}
            title='Ir al Listado'
            onPress={() => navigation.navigate('PaginaScreen2')}
          />
        </View>
      </View>
    </View>
  );
};
