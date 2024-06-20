
//Variables para montar la url del fetch//
const ApiUrl = 'https://playground.4geeks.com/todo';
const postToDo = '/todos/';
const obtener = '/users/'
const stVacio = "";

/******************************
 * 
 *      CONEXIÓN API 
 * 
 *****************************/


/**
 * Función API para añadir una tarea. 
 * @param {user_name } nombre de usuario que permite la conexion a la api
 * @param {label} es la tarea que se recibe cuando el usuario agrega una tarea. 
 * @returns devuelve: id, label, is_done
 */
const anadirTareaService = (user_name, label) => {
    return fetch(`${ApiUrl}${postToDo}${user_name}`, {
        method: 'POST', //metodo para enviar algún dato al servidor, en este caso la tarea
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name, label }), //stringify - convierte los string a formato json // En la api aparece como requerido
    })
        .then(respuesta => {
            console.log(respuesta);
            if (!respuesta.ok) {
                throw new Error('No fue ok ' + respuesta.statusText)
            } else {
                return respuesta.json()
            }
        })
        .then(datosRespuesta => {
            console.log(datosRespuesta);
        })
        .catch(esError => {  //catch captura el error del if si fueserroneo, no es obligatorio pero si buena práctica
            console.log('Error: ' + esError);
        })
};

export { anadirTareaService };


const obtenerTareasServices = (user_name) => {
    return fetch(`${ApiUrl}${obtener}${user_name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(respuesta => {
            console.log(respuesta);
            if (!respuesta.ok) {
                throw new Error('No fue ok ' + respuesta.statusText)
            }
            return respuesta.json()

        })
        .then(datosRespuesta => {
            console.log(datosRespuesta);
            return datosRespuesta;
        })
        .catch(esError => {  //catch captura el error del if si fueserroneo, no es obligatorio pero si buena práctica
            console.log('Error: ' + esError);
        })
};

export { obtenerTareasServices };


const eliminarTareaService = (todo_id) => {
    return fetch(`${ApiUrl}${postToDo}${todo_id}`, {
        method: 'DELETE'
    })
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('No fue ok ' + respuesta.statusText)
            }
            // Verifica si la respuesta tiene contenido
            if (respuesta.status === 204 || respuesta.headers.get('Content-Length') === '0') {
                return {}; // Devuelve un objeto vacío si no hay contenido
            }
            return respuesta.json(); // Intenta analizar como JSON si hay contenido

        })
        .then(datosRespuesta => {
            console.log(datosRespuesta);
            return datosRespuesta;
        })

        .catch(esError => {
            console.log('Error: ' + esError);
            throw esError; // Opcionalmente, vuelve a lanzar el error para manejarlo en otros lugares
        });
}
export { eliminarTareaService }


const eliminarTodoService = (user_name) => {
    return fetch(`${ApiUrl}${obtener}${user_name}`, {
        method: 'DELETE',
    })
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('No fue ok ' + respuesta.statusText)
            }
            return respuesta

        })
        .then(datosRespuesta => {
            alert("Usuario eliminado: " + datosRespuesta);
            return crearUsuarioService(user_name)
        })

        .then(datosRespuesta => {
            return datosRespuesta
        })

        .catch(esError => {
            console.log('Error: ' + esError);
        })
}
export { eliminarTodoService }



const crearUsuarioService = (user_name) => {
    return fetch(`${ApiUrl}${obtener}${user_name}`, {
        method: 'POST',
    })
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('No fue ok ' + respuesta.statusText)
            }
            return respuesta

        })
        .then(datosRespuesta => {
            console.log(datosRespuesta);
            return datosRespuesta;
        })
        .catch(esError => {
            console.log('Error: ' + esError);
        })
}
export { crearUsuarioService }


const obtenerListaUsuariosService = () => {
    return fetch(`${ApiUrl}${obtener}`, {
        method: 'GET'
    })
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('No fue ok ' + respuesta.statusText)
            }
            return respuesta.json()

        })
        .then(datosRespuesta => {
            console.log(datosRespuesta);
            return datosRespuesta;
        })
        .catch(esError => {
            console.log('Error: ' + esError);
        })
}
export { obtenerListaUsuariosService }



