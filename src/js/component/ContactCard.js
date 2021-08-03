import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import MikePhoto from "../../img/m101.jpg";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Modal } from "./Modal";

export const ContactCard = props => {
	const [state, setState] = useState({
		//initialize state here
		showModal: false
	});

	const { store, actions } = useContext(Context);
	console.log("storee", store.contacts);

	return (
		<div>
			<li className="list-group-item">
				<div className="row w-100">
					<div className="col-12 col-sm-6 col-md-3 px-0">
						<img
							src={MikePhoto}
							alt="Mike Anamendolla"
							className="rounded-circle mx-auto d-block img-fluid"
						/>
					</div>
					<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
						<div className=" float-right">
							<Link to={"/edit/" + props.e.id + "/" + props.index}>
								<button className="btn">
									<i className="fas fa-pencil-alt mr-3" />
								</button>
							</Link>

							<button className="btn" onClick={() => setState({ showModal: true })}>
								<i className="fas fa-trash-alt" />
							</button>
						</div>

						<label className="name lead">{props.e.full_name}</label>
						<br />
						<i className="fas fa-map-marker-alt text-muted mr-3" />
						<span className="text-muted">{props.e.address}</span>
						<br />
						<span
							className="fa fa-phone fa-fw text-muted mr-3"
							data-toggle="tooltip"
							title=""
							data-original-title="(870) 288-4149"
						/>
						<span className="text-muted small">{props.e.phone}</span>
						<br />
						<span
							className="fa fa-envelope fa-fw text-muted mr-3"
							data-toggle="tooltip"
							data-original-title=""
							title=""
						/>
						<span className="text-muted small text-truncate">{props.e.email}</span>
					</div>
				</div>
			</li>
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} id={props.e.id} />
		</div>
	);
};

/**
 * Define the data-types for
 * your component's properties
 **/
ContactCard.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object,
	onDelete: PropTypes.func,
	e: PropTypes.object,
	index: PropTypes.number
};

/**
 * Define the default values for
 * your component's properties
 **/
ContactCard.defaultProps = {
	onDelete: null
};
