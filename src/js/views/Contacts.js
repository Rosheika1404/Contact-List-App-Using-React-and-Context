import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Context } from "../store/appContext.js";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false
	});
	const { action, store } = useContext(Context);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contacts &&
							store.contacts.map((e, index) => {
								return <ContactCard key={index} e={e} onDelete={() => setState({ showModal: true })} />;
							})}
					</ul>
				</div>
			</div>
		</div>
	);
};
