import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.scss";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";

import { Card } from "../component/card";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		actions.getAllCities();
	}, []);

	const info = () => {
		console.log("Soy el onMouseOver");
	};

	const handleCityPage = () => {
		history.push("/city");
	};

	const allCities = store.cities.map((city, index) => {
		return <Card key={index} city={city} />;
	});
	return (
		<>
			{/*<Dropdown>      ESTE ES UN BUTON
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    <i className="fas fa-filter" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>*/}

			{
				//ESTE ES OTRO BOTON
			}
			<div>
				{["Warning"].map(variant => (
					<SplitButton
						key={variant}
						id={`dropdown-split-variants-"Warning"`}
						variant={variant.toLowerCase()}
						title="Filter">
						<Dropdown.Item eventKey="1">Más habitantes</Dropdown.Item>
						<Dropdown.Item eventKey="2">Menos habitantes</Dropdown.Item>
						<Dropdown.Item eventKey="3">Con playa</Dropdown.Item>
						<Dropdown.Item eventKey="4">Con Montaña</Dropdown.Item>
						<Dropdown.Item eventKey="5">Más frio</Dropdown.Item>
						<Dropdown.Item eventKey="6">Más caluroso</Dropdown.Item>
						<Dropdown.Item eventKey="7" active>
							{" "}
							Esto es un itme activado{" "}
						</Dropdown.Item>
					</SplitButton>
				))}
			</div>

			<div className="container-fluid d-flex justify-content-center row mb-3">
				<h2 className="col-12 text-center magic">Los más buscados</h2>

				{allCities}

				{/*
			
				<div className="card d-flex flex-column topCityCard">
					<Link to="/city" onMouseOver={info}>
						<img src="https://picsum.photos/id/267/200/200" className="card-img-top" alt="..." />
					</Link>
					<button id="likeButton" onClick={() => handleClick(event)}>
						<i className={like} title="ciudad 1" />
					</button>
				</div>*/}
			</div>
			<h2 className="text-center">Elige el próximo destino</h2>
			<div className="container row">{allCities}</div>
		</>
	);
};

{
	/* <div className="peopleDiv row flex-row flex-nowrap">
                {store.planets.map((planet, index) =>
                    {const {name , climate, population} = planet;
                    return(
                        <div key={index} className="card col-3">
                        <img src="http://via.placeholder.com/400x200" className="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <p>Name :{name}</p>
                            <p>Climate :{climate}</p>
                            <p>Population: {population}</p>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-outline-primary">Learn more!</button>
                                <button className="btn btn-outline-warning">♡</button>
                            </div>
                        </div>
                    </div>
                    )}
                )}

            </div> */
}
