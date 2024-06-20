import React, { useEffect, useState } from "react";
import AnadirTarea from "./AnadirTarea";
import "../../styles/index.css";
import { eliminarTodoService, crearUsuarioService, obtenerListaUsuariosService } from "../services/services";



const Home = () => {

	const usuario_servicio = "tom";
	const [listaUsuarios, setListaUsuarios] = useState([]);
	const [anadirTarea, setAnadirTarea] = useState(""); //creamos la variable que nos permitirá añadir una tarea, la inicializamos con string vacío
	const [listaTareas, setListaTareas] = useState([]); //creamos la variable que almanecena el listado de tareas en un array vacio.
	

	useEffect(() => {
		obtenerListaUsuariosService()
			.then(usuarios => {
				setListaUsuarios(usuarios.users); // Suponiendo que usuarios es un array de objetos con propiedades, incluyendo name
			})
			.catch(error => {
				console.error('Error al obtener la lista de usuarios:', error);
			});
	}, []); // El array vacío asegura que esto se ejecute una sola vez al montar el componente
	
	useEffect(() => {
		if (listaUsuarios.length > 0) {
			const usuarioYaCreado = listaUsuarios.find(usuario => usuario.name === usuario_servicio);
			console.log('Usuario encontrado:', usuarioYaCreado);
	
			if (!usuarioYaCreado) {
				crearUsuarioService(usuario_servicio)
					.then(() => {
						console.log(`${usuario_servicio} ha sido creado.`);
					})
					.catch(error => {
						console.error('Error al crear el usuario:', error);
					});
			}
		}
	}, [listaUsuarios]); // Este efecto se ejecuta cada vez que listaUsuarios cambia
	



	//construimos la función que eliminará al usuario y todas sus tareas
	const eliminarTodo = () => {
		const confirmacionEliminarTodo = window.confirm("Esta acción borrará el usuario y sus tareas"); //confirm: hace pregunta cerrada

		if (confirmacionEliminarTodo) {
			eliminarTodoService(usuario_servicio)
				.then(datosRespuesta => {
					console.log('DatosRespuesta' + datosRespuesta); //aquí esta llegando ok

					window.location.reload();

					// return crearUsuarioService(usuario_servicio)
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
	}




	// Devuelve la forma del cuerpo principal, el aspecto que tendrá la web//
	return (
		<div className="container-fluid d-flex justify-content-center bg-dark contenedor">
			<div className="principal ">
				<div className="titulo d-flex justify-content-center align-items-center">
					<h1 className="d-flex align-items-center">TAREAS</h1>
				</div>

				{/* //Boton para eliminar todo// */}
				<div className="botonEliminarTodo container	">
					<button type="button"
						className="btn btn-primary"
						onClick={eliminarTodo}>Eliminar todo
					</button>
				</div>

				{/* Campo para añadir tareas, donde se llama al componente AñadirTarea */}
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
