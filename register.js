//Create variables
let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let userName = document.getElementById("user-name");
let userGender = document.getElementById("gender");
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");
let rePassword = document.getElementById("re-password");
let registerBtn = document.getElementById("register");
let message = document.getElementById("message");

//create user obj with class

class User {
  static usersCounter = 0;
  constructor(firstname, lastname, username, gender, email, password, orders) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.gender = gender;
    this.email = email;
    this.password = password;
    this.orders = orders;
    User.usersCounter++;
  }
  getCounter() {
    return User.usersCounter;
  }
}

// ######################################################
// Check Email in data base
function checkEmail(data, email) {
  let out = data.find((e) => {
    return e.email == email;
  });
  if (Boolean(out)) {
    console.log("already token");
  } else {
    sendUser();
    window.open("login.html", "_self");
  }
}
// ########################################################
//Check validation

function checkValidation(fname, lname, uname, email, pass, repass, btn) {
  btn.preventDefault();
  let valid = true;
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
  if (fname == "") {
    console.log("entervallid fname");
    valid = false;
  }
  if (lname == "") {
    console.log("enter valid lname");
    valid = false;
  }
  if (uname == "") {
    console.log("enter valid uname");
    valid = false;
  }
  if (!regex.test(email)) {
    console.log("enter valid email like name@gmail.com");
    valid = false;
  }
  if (pass.length < 6) {
    console.log("password must be more than 6 character");
    valid = false;
  }
  if (repass != pass) {
    console.log("password dosnt match");
    valid = false;
  }
  if (valid == true) {
    console.log("Validation successful");
    fetch("http://localhost:3000/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        checkEmail(data, userEmail.value);
      });
  }
}
// ######################################################
//to create new user to json file
function sendUser() {
  let newUser = new User(
    firstName.value,
    lastName.value,
    userName.value,
    userGender.value,
    userEmail.value,
    userPassword.value,
    []
  );
  var req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/users");
  req.send(JSON.stringify(newUser));
}

registerBtn.addEventListener("click", (btn) => {
  checkValidation(
    firstName.value,
    lastName.value,
    userName.value,
    userEmail.value,
    userPassword.value,
    rePassword.value,
    btn
  );
});
// ##############################
localStorage.getItem("active-user") ? location.replace("customer.html") : "";
