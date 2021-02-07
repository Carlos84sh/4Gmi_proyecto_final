import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

import "../../styles/all.scss";
import "../../styles/cards.scss";

{
	/*no está funcionando bien la card, no veo muy bien como resolverlo */
}

export const Card = props => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	const { city } = props;

	const [background, setBackgroung] = useState("card-img-top");
	const [showCardText, setShowCardText] = useState(false);

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

	const setCardBackground = (effect, text) => {
		setBackgroung(effect);
		setShowCardText(text);
	};

	const info = (
		<>
			<div
				className="d-flex btn-block card-img-overlay cardHeart"
				id="likeButton"
				onMouseEnter={() => setCardBackground("card-img-top toBlur", true)}
				onMouseOut={() => setCardBackground("card-img-top", false)}
				onClick={() => handleClick(event)}>
				<i className={store.token ? like : ""} title={city.city_name} />
			</div>
		</>
	);

	return (
		<>
			<div
				className="card d-flex flex-column topCityCard"
				onMouseOut={() => setCardBackground("card-img-top", false)}
				onMouseEnter={() => setCardBackground("card-img-top toBlur", true)}>
				<img
					src={city.image}
					className={background}
					alt={city.city_name}
					onClick={() => history.push(`/city/${city.city_name}`)}
					onMouseEnter={() => setCardBackground("card-img-top toBlur", true)}
				/>
				<h5
					onMouseEnter={() => setCardBackground("card-img-top toBlur", true)}
					className="text-right d-flex text-light lobster overlay-h5 ">
					{city.city_name}
				</h5>
				{showCardText ? info : ""}
			</div>
		</>
	);
};
Card.propTypes = {
	city: PropTypes.object
};
