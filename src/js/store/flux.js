import firebase from "firebase/app";
const url = "https://assets.breatheco.de/apis/fake/contact/";
const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: []
		},
		actions: {
			getContactFromFB: async () => {
				try {
					const getContacts = firebase.firestore().collection("contacts");
					const response = await getContacts.get();
					let aux = [];
					response.forEach(contact => {
						aux.push({ ...contact.data(), id: contact.id });
						// [...getStore().contactsFB, { ...contact.data(), id: contact.id }]
					});
					setStore({
						contacts: aux
					});
					console.log("data from Firebase", getStore().contacts);
				} catch (e) {
					console.log(e);
				}
			},
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			loadContact() {
				fetch(url + "agenda/rosheika_summer2021")
					.then(response => response.json())
					.then(result => {
						console.log("Get Contact", result),
							setStore({
								contacts: result
							});
					})
					.catch(e => console.error(e));
			},

			addContact(name, phone, email, address) {
				fetch(url, {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						full_name: name,
						phone: phone,
						address: address,
						email: email,
						agenda_slug: "rosheika_summer2021"
					})
				}).then(() => getStore().loadContact());
			},

			editContact(id, name, phone, email, address) {
				fetch(url + id, {
					method: "PUT",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						phone: phone,
						address: address,
						email: email,
						agenda_slug: "rosheika_summer2021"
					})
				}).then(() => getStore().loadContact());
			},

			deleteContact(id) {
				fetch(url + id, {
					method: "DELETE"
				}).then(() => getStore().loadContact());
			}
		}
	};
};

export default getState;
