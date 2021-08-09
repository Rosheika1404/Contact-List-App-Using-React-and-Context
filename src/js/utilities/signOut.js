import firebase from "firebase/app";

export const signOut = async () => {
	try {
		await firebase.auth().signOut();
		console.log("logout");
	} catch (e) {
		throw new Error("Error signing out");
	}
};
