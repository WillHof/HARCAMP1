var uservar;
var userID;
//identifies basic status of user
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
    uservar = user
    userID = user.uid
  } else {
    console.log('user logged out');
  }
})

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    console.log(cred)
    userID = cred.user.uid
    database.ref(`users/${cred.user.uid}`).set({
      UserEmail: email,
    })
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  userID = ""
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in ------ with messages
   
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    cred.user.uid = userID
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    if (userID){
      messageWelcome("Welcome to Intercar!!!");
    }
  }).catch(function(error) {
    // Handle Errors here.
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    messageWelcome("Sorry, it appears your ID/Password are wrong");
    // ...
  });

});

// Modal Message
function messageWelcome(displayText) {
// Get the modal message
var modal = document.getElementById('modal-message');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var displayMessage = document.getElementById('display-text');
displayMessage.innerHTML=displayText;
// Open the modal 
  modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

}