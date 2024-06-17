import React, { useEffect, useState } from "react";
import '../../styles/anadirTarea.css';
import { anadirTareaService } from "../services/services";
import { obtenerTareasServices } from "../services/services";
import { eliminarTareaService } from "../services/services";
import {eliminarTodoService} from "../services/services";

const AnadirTarea = () => {

    const [anadirTarea, setAnadirTarea] = useState(""); //creamos la variable que nos permitirá añadir una tarea, la inicializamos con string vacío
    const [listaTareas, setListaTareas] = useState([]); //creamos la variable que almanecena el listado de tareas en un array vacio
    const [sinTareas, setSinTareas] = useState(false);
    const [totalTareas, setTotalTareas] = useState(0);
    const usuario_servicio = 'tom';
    const recogerTarea = (evento) => {
        setAnadirTarea(evento.target.value);
    }


    const pulsarIntro = (evento) => { //evento: usado  para cuando ocurre un evento en el navegador, en este caso referido a una tecla.
         //actualiza el estado anadirTarea cada vez que se ejecute una tecla (e.t ->input donde esta escribiendo / e.t.v --lo que contiene el input)
        if (evento.key === 'Enter' && anadirTarea.trim() !== '') { //si la tecla es Enter y el input no está vacío...
            anadirTareaService(usuario_servicio, anadirTarea)
            .then (() => {
                setAnadirTarea("");
                return obtenerTareasServices(usuario_servicio);
            })
            .then(data => {
                if (Array.isArray(data.todos)) {
                    setListaTareas(data.todos);
                } else {
                    console.error("La respuesta no es un array de tareas:", data);
                }
            })
            .catch(error => {
                console.log("Error al añadir tarares: "+error);
            });
        


        }
    };
    ////////////////////////////////////// API  MOSTRAR TAREAS ///////////////////////////////////////////////////
    useEffect(() => {
        // Obtiene las tareas al montar el componente
        obtenerTareasServices(usuario_servicio)
            .then(data => {
                if (Array.isArray(data.todos)) {
                    setListaTareas(data.todos);
                } else {
                    console.error("La respuesta no es un array de tareas:", data);
                }

            })
            .catch(error => {
                console.error("Error al obtener tareas:", error);
            });
    }, [usuario_servicio]);


    ////////////////////////////////////// API  ELIMINAR UNA TAREA ///////////////////////////////////////////////////
    const eliminarTarea = (todo_id) => {
        eliminarTareaService(todo_id)
            .then(() => {
                setListaTareas(listaTareas.filter(tarea => tarea.id !== todo_id));
            })
            .catch(error => {
                console.error("Error al eliminar tarea:", error);
            });
    }



    //Contador de tareas
    useEffect(() => {
        setTotalTareas(listaTareas.length)
    }, [listaTareas])



    return (
        <div className="d-flex flex-column align-items-center">
            <div className="bloc">
                <div className="campoTarea justify-content-center d-flex">
                    <input className="noTeOlvides"
                        type="text"
                        value={anadirTarea}
                        onChange={recogerTarea}
                        onKeyDown={pulsarIntro}
                        placeholder="No te olvides de..."
                    />
                </div>
                {listaTareas.length === 0 ? (<p className="mt-2 ms-2">No hay tareas, agrega una</p>) : (
                    <ul>
                        {listaTareas.map((tareaNueva) => (
                            <li className="enTarea" key={tareaNueva.id}>
                                {tareaNueva.label}
                                <span
                                    className="close-icon"
                                    onClick={() => eliminarTarea(tareaNueva.id)}
                                >
                                    X
                                </span>
                                <hr />
                            </li>

                        ))}
                    </ul>
                )}
                <p className="contador">Total tareas: {totalTareas}</p>
            </div>

        </div>
    );
}

export default AnadirTarea;