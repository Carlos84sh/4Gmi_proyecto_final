import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

import "../../styles/all.scss";

export const Card = props => {
	const { store, actions } = useContext(Context);

	const { city } = props;

	const [like, setLike] = useState("far fa-heart text-danger");
	const handleClick = event => {
		if (like == "far fa-heart text-danger") {
			setLike("fas fa-heart text-danger");
			actions.addFav(event.target.title);
		} else {
			setLike("far fa-heart text-danger");
			actions.deleteFav(event.target.title);
		}
	};

	return (
		<div className="card d-flex flex-column topCityCard">
			<Link
				to={`/city/${city.city_name}`}
				onMouseOver={() => {
					console.log("info funciton");
				}}>
				<img src={city.image} className="card-img-top" alt={city.city_name} />
			</Link>
			<div className="card-img-overlay d-flex flex-column  pt-2">
				<p className="text-right" id="lobster">
					{city.city_name}
				</p>
			</div>
			<div className="card-img-overlay d-flex flex-column  pt-2">
				<button id="likeButton" onClick={() => handleClick(event)}>
					<i className={like} title={city.city_name} />
				</button>
			</div>
		</div>
	);
};
Card.propTypes = {
	city: PropTypes.object
};
