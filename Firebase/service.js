"use strict";
async function main () {
    const firebase = import( 'firebase-app.js' );
    const an = import( 'firebase-analytics.js' );
    console.log( firebase, an );
    let firebaseConfig = {
        apiKey: "AIzaSyDvkDeFaHhM03jsAVGU1Q--STWk6rXpGtg",
        authDomain: "comic-grabber.firebaseapp.com",
        projectId: "comic-grabber",
        storageBucket: "comic-grabber.appspot.com",
        messagingSenderId: "935573870609",
        appId: "1:935573870609:web:64adf11ebb4851187fb9b0",
        measurementId: "G-P0DMWRQBT7"
    }
    firebase.initializeApp( firebaseConfig );
    firebase.analytics();
}

main()
    .then( msg => console.log( msg ) );