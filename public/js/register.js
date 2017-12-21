$(document).ready(function() {
    

  var signUpForm = $("form.signup");
  var usernameInput = $("input#username");
  var emailInput = $("input#email");
  var passwordInput = $("input#password");
  var passCheck = $("input#passCheck");

  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    console.log(passwordInput.val().trim() + " = " + passCheck.val().trim());

    if (!userData.email || !userData.password) {
      return;
    }
    if(passwordInput.val().trim() != passCheck.val().trim()){
      passCheck.val("Your passwords do not match");
      return;
    }
    signUpUser(userData.username, userData.email, userData.password);
    usernameInput.val("");
    emailInput.val("");
    passwordInput.val("");
    passCheck.val("");
  });

  function signUpUser(username, email, password) {
    $.post("/user/register", {
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
  }
});
