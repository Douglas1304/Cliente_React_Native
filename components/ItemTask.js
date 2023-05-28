import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
//import Ionicons from '@expo/vector-icons/Ionicons';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'
import appFirebase from '../credenciales'

const db = getFirestore(appFirebase)

const ItemTask = (props) => (
    <TouchableOpacity style={styles.cardView}
        onPress={() => eliminarProducto(props)}>
        <View style={{ flexDirection: 'column' }}>
            <Text style={styles.texto} >{"Nombre: "}
                {props.nombre}</Text>
            <Text style={styles.texto} >{"Color: "}
                {props.color}</Text>
            <Text style={styles.texto} >{"Cantidad: "}
                {props.cantidad}</Text>
        </View>
    </TouchableOpacity>
);

function eliminarProducto(props) {
    Alert.alert(
        `Producto: ${props.nombre}`,
        "¿Que deseas hacer?",
        [{
            text: "Cancelar"
        },
        {
            text: "Editar", onPress: () => {
                navigation.navigate('CreateProduct')
            }
        },
        {
            text: "Eliminar", onPress: () => {
                eliminar(props.id)
            }
        }
        ]
    )
}

//arrow function
const eliminar = async (idparam) => {
    const response = await getDocs(collection(db, 'productos'))
    if (!response.empty) {
        response.forEach(document => {
            if (document.id == idparam) {
                if (deleteDoc(doc(db, 'productos', document.id))) {
                    Alert.alert('Campo eliminado');
                }
                else {
                    Alert.alert('Error al eliminar');
                }

            }

        })
    }
}

const editar = async (idparam) => {
    const response = await getDocs(collection(db, 'productos'))
    if (!response.empty) {
        response.forEach(document => {
            if (document.id == idparam) {
  
            }
        })
    }
}

const styles = StyleSheet.create({
    cardView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        marginHorizontal: 8,
        marginVertical: 5,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    texto: {
        fontSize: 22,
        textTransform: 'uppercase',
        color: 'black',
        paddingBottom:5,
        paddingLeft:10
    }

});

export default ItemTask;
