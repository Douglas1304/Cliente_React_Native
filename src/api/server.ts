import axios from "axios";
import { Alert } from "react-native";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

export const agregar = async (nombre: string, detalle: string, cantidad: Int32) => {
    const createTwoButtonAlert = () =>
        Alert.alert('Registro exitoso', 'Se realizo corectamente el ingreso de datos', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    axios.post('http://192.168.43.231:5500/products', {
        name: nombre,
        description: detalle,
        quantity: cantidad,
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log('Datos guardados exitosamente', response);
            createTwoButtonAlert();
        })
        .catch(error => {
            console.error('Error al guardar los datos:', error);
        });
    console.log(
        'Datos',
        `Nombre: ${nombre}\nDescripcion: ${detalle}\nCantidad: ${cantidad}`
    );
}



export const obtenerListado = (setData: ((data: any) => void)) => {
    axios.get('http://192.168.43.231:5500/products')
        .then(function (response) {
            setData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const eliminar = (Id: string) => {
    axios.delete(`http://192.168.43.231:5500/products/${Id}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}


export const actualizar = (Id: string, nombre: string, detalle: string, cantidad: Int32) => {
    axios.put(`http://192.168.43.231:5500/products/${Id}`, {
        name: nombre,
        description: detalle,
        quantity: cantidad
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            console.log('Datos guardados exitosamente', response);
            console.log('Actualizacion exitosa')

        })
        .catch((error) => {
            console.error('Error al guardar los datos:', error);
        });
    console.log(
        'Datos',
        `Nombre: ${nombre}\nDetalle: ${detalle}\nCantidad: ${cantidad}`
    );
}