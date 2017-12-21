 $(document).ready(function() {
 	var $toastContent = $('<p class="black-text">Sign Up Successful! Please log in</p>');
 	if(fromSignUp){
 		Materialize.toast($toastContent, 4000, 'light-green accent-2');
 		$("input#usernameInput:text").val(username);
 	}
//   var loginForm = $("form.login");
//   var emailInput = $("input#email-input");
//   var passwordInput = $("input#password-input");

//   loginForm.on("submit", function(event) {
//     event.preventDefault();
//     var userData = {
//       email: emailInput.val().trim(),
//       password: passwordInput.val().trim()
//     };

//     if (!userData.email || !userData.password) {
//       return;
//     }

//     loginUser(userData.email, userData.password);
//     emailInput.val("");
//     passwordInput.val("");
//   });

//   function loginUser(email, password) {
//     $.post("/api/login", {
//       email: email,
//       password: password
//     }).then(function(data) {
//       window.location.replace(data);
//     }).catch(function(err) {
//       console.log(err);
//     });
//   }

 });
