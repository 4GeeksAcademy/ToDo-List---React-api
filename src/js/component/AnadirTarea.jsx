import React, { useEffect, useState } from "react";
import '../../styles/anadirTarea.css';

const AnadirTarea = () => {

    const [anadirTarea, setAnadirTarea] = useState(""); //creamos la variable que nos permitirá añadir una tarea, la inicializamos con string vacío
    const [listaTareas, setListaTareas] = useState([]); //creamos la variable que almanecena el listado de tareas en un array vacio
    const [sinTareas, setSinTareas] = useState(false);
    const [totalTareas, setTotalTareas] = useState(0);

    const recogerTarea = (evento) => {
        setAnadirTarea(evento.target.value);
    }


    const pulsarIntro = (evento) => { //evento: usado  para cuando ocurre un evento en el navegador, en este caso referido a una tecla.
        setAnadirTarea(evento.target.value) //actualiza el estado anadirTarea cada vez que se ejecute una tecla (e.t ->input donde esta escribiendo / e.t.v --lo que contiene el input)
        if (evento.key === 'Enter' && evento.target.value !== '') { //si la tecla es Enter y el input no está vacío...
            setListaTareas([...listaTareas, evento.target.value]) //...añade la tarea al array listaTareas
            //crea copia array , añade el valor del input        
            setAnadirTarea("") //deja el input vacío
        }
    };

    const eliminarTarea = (tarea) => {
        setListaTareas(listaTareas.filter((_, i) => i !== tarea));
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
                        {listaTareas.map((tareaNueva, index) => (
                            <li className="enTarea" key={index}>{tareaNueva}
                                <span
                                    className="close-icon"
                                    onClick={() => eliminarTarea(index)}
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