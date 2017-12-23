$(document).ready(function() {
    

  var signUpForm = $("form.signup");
  var usernameInput = $("#username");
  var emailInput = $("#email");
  var passwordInput = $("#password");

  signUpForm.on("submit", function(event) {
    //event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };


    if (!userData.email || !userData.password) {
      return;
    }
    signUpUser(userData.username, userData.email, userData.password);
    usernameInput.val("");
    emailInput.val("");
    passwordInput.val("");
    passCheck.val("");
  });

  function signUpUser(username, email, password) {
    alert(password);
    $.post("/register", {
      username: username,
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }*/
});
