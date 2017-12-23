 $(document).ready(function() {
 	var $toastContent = $('<p class="black-text">Sign Up Successful! Please log in</p>');
 	if(fromSignUp){
 		Materialize.toast($toastContent, 4000, 'light-green accent-2');
 		$("input#usernameInput:text").val(username);
 	}
   var loginForm = $("form.login");
   var usernameInput = $("input#usernameInput");
   var passwordInput = $("input#passwordInput");

/*loginForm.on("submit", function(event) {
  console.log("onclick triggering");
   	event.preventDefault();
    var userData = {
       username: usernameInput.val().trim(),
       password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
       return;
    }

    loginUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
});

function loginUser(username, password) {
    $.post("/login", {
       username: username,
       password: password
    }).then(function(data) {
       window.location.replace(data);
    }).catch(function(err) {
       console.log(err);
    });
}*/

 });
