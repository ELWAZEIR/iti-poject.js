//ADMIN UNIQ DATA
const ADMIN = "admin";
const PASSWORD = "admin";
//create variables
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");
let loginBtn = document.getElementById("login");
let message = document.querySelector(".messages");
// #############################################################
//check email and password in database
function checkEmailPass(data, email, pass) {
  var outEmail = data.find((e) => {
    return e.email == email;
  });
  var outPass = data.find((e) => {
    return e.password == pass;
  });
  if (Boolean(outEmail) && Boolean(outPass)) {
    let activeUser = data.find((e) => {
      return e.email == email;
    });
    localStorage.setItem("active-user", JSON.stringify(activeUser));
    window.open("customer.html");
    // console.log("Email valid");
  } else {
    console.log("you dont have an account");
  }
}
// ############################################################
//Check validation
function checkValidation(email, pass, btn) {
  btn.preventDefault();
  let valid = true;
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;

  if (!regex.test(email)) {
    console.log("enter valid email like name@gmail.com");
    valid = false;
  }
  if (pass.length < 6) {
    console.log("password must be more than 6 character");
    valid = false;
  }
  if (valid == true) {
    // console.log("successfull");
    fetch("http://localhost:3000/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        checkEmailPass(data, userEmail.value, userPassword.value);
      });
  }
}
// #############################################################
loginBtn.addEventListener("click", (btn) => {
  if (userEmail.value == ADMIN && userPassword.value == PASSWORD) {
    window.open("admin.html");
  } else {
    checkValidation(userEmail.value, userPassword.value, btn);
  }
});
// #########################################################
localStorage.getItem("active-user") ? location.replace("customer.html") : "";
