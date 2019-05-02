$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCM34i7qZJ-N-AWtCTJP5JE-sEJQGVCFBU",
        authDomain: "harcamp1-f7669.firebaseapp.com",
        databaseURL: "https://harcamp1-f7669.firebaseio.com",
        projectId: "harcamp1-f7669",
        storageBucket: "harcamp1-f7669.appspot.com",
        messagingSenderId: "1044240317624"
    };
    firebase.initializeApp(config);
    // var uiConfig = {
    //     signInSuccessUrl: '<url-to-redirect-to-on-success>',
    //     signInOptions: [
    //         // Leave the lines as is for the providers you want to offer your users.
    //         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //     ],

    // };

    // // Initialize the FirebaseUI Widget using Firebase.
    // var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // // The start method will wait until the DOM is loaded.
    // ui.start('#firebaseui-auth-container', uiConfig);
})