const firebase = require('firebase')
const fetch = require('node-fetch')
require('firebase/firestore')
const url = "https://assets.breatheco.de/apis/fake/contact/";

var firebaseConfig = {
	apiKey: "AIzaSyDIQV8s86trzHADBLHRWLrP_Yqc5KrXl-4",
	authDomain: "authentication-exercise-6b47a.firebaseapp.com",
	projectId: "authentication-exercise-6b47a",
	storageBucket: "authentication-exercise-6b47a.appspot.com",
	messagingSenderId: "207069567467",
	appId: "1:207069567467:web:0e7a788e8a59054790a1ae",
	measurementId: "G-5TBVDLS227"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

const populateFirebase = (collectionName, items) => {
    return Promise.all(
        items && items.map((item) => {
            const { id, ...data } = item;
            return db.collection(collectionName).doc(id).set(data)
        })
    )
}
const getContacts = () => {
    fetch(url + "agenda/rosheika_summer2021")
        .then((res) => res.json())
        .then((response) => contacts = response).then(() => Promise.all([
            populateFirebase('contacts', contacts)
        ]))
        .then(() => {
            console.log("done")
            process.exit(0)
        }).catch((err) => console.log(err))
}
getContacts()