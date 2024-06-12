import React, { useEffect, useState } from "react";
import AnadirTarea from "./AnadirTarea";
import "../../styles/index.css";

//create your first component
const Home = () => {

	return (
		<div className="container-fluid d-flex justify-content-center align-items-center bg-dark">
			<div className="principal d-flex align-items-center">
				<div className="tituloalign-items-center">
					<h1>TAREAS</h1>
				</div>

				<div className="tareas">
					<AnadirTarea
					/>					
				</div>	
						
			</div>
		</div>


	);
};

export default Home;
