var uservar;
var userID;
var carURL = "test"
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
    database.ref(`users/${userID}`).set({
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
  console.log(cred)
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    cred.user.uid = userID
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});

const saveSearch = document.querySelector('#saveSearch');
  saveSearch.addEventListener('click', (e) => {
    e.preventDefault();
    database.ref(`users/${userID}/searches`).set({
      Searches: carURL,
    });
  });