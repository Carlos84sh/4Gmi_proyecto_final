import React, { useState, useContext } from "react";
import Collapse from "react-bootstrap/Collapse";
import { Context } from "../store/appContext";

export const CollapseInfo = () => {
	const [open, setOpen] = useState(false);
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="container text-light card d-flex row cardBg">
				<button
					className=" infoIcon  text-light  text-center mb-4"
					onClick={() => setOpen(!open)}
					aria-controls="example-collapse-text"
					aria-expanded={open}>
					<i className="fas fa-info " />
				</button>
				<Collapse in={open}>
					<div id="example-collapse-text">
						<h5>{store.cityInfo}</h5>
						<a
							className="d-flex flex-row-reverse bd-highlight"
							href={store.goWiki}
							target="_blank"
							rel="noopener noreferrer">
							Take me to wiki
						</a>
					</div>
				</Collapse>
			</div>
		</>
	);
};