import React, { useEffect, useState } from "react";
import AnadirTarea from "./AnadirTarea";
import "../../styles/index.css";
import { eliminarTodoService } from "../services/services";

//create your first component
const Home = () => {

	const usuario_servicio = "tom";	
		
	const eliminarTodo = () => {
		eliminarTodoService(usuario_servicio)
		.then (datosRespuesta => {
			console.log(datosRespuesta);
		})
	}	



	return (
		<div className="container-fluid d-flex justify-content-center bg-dark">
			<div className="principal ">
				<div className="titulo d-flex justify-content-center align-items-center">
					<h1 className="d-flex align-items-center">TAREAS</h1>
				</div>

				<div className="botonEliminarTodo container	">
					<button type="button" className="btn btn-primary" onClick={eliminarTodo}>Eliminar todo

					</button>
				</div>

				<div className="tareas">
					<div className="container">
						<AnadirTarea
						/>
					</div>

				</div>

			</div>
		</div>


	);
};

export default Home;
