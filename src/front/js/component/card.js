import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const Card = props => {
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
				to="/city"
				onMouseOver={() => {
					console.log("info funciton");
				}}>
				<p>{city.city_name}</p>
				<img src={city.image} className="card-img-top" alt={city.city_name} />
			</Link>
			<button id="likeButton" onClick={() => handleClick(event)}>
				<i className={like} title={city.city_name} />
			</button>
		</div>
	);
};
Card.propTypes = {
	city: PropTypes.object
};
