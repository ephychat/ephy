var login_username = $('#login-name');
var login_password = $('#login-pass');
var signin_btn = $('#sign-in-btn');

signin_btn.click((e) => {
    e.preventDefault();
    var username = login_username.val();
    var URI = 'http://api.ephy.chat:12540/users/' + username; 
    // console.log(`${username.val()} : ${password.val()}`);
    axios.get(URI).then(
     (res) => {
        //  console.log(`${res.data[0].email} : ${res.data[0].password}`);
         if(res.data.length != 0) {
             if((res.data[0].email != username) || (res.data[0].password != login_password.val())) {
                 console.log('Invalid username or password! Try again.');
             }
             else {
                 localStorage.setItem('ephy-nn', res.data[0].username);
                 window.location.replace('http://localhost:8080/chat');
             }
         } else {
             console.log('User doesn\'t exist!');
         }
     }
    );
});



var signup_username = $('#signup-username');
var signup_email = $('#signup-email');
var signup_password = $('#signup-password');
var signup_btn = $('#signup-btn');
var params = {};
var URI = 'http://api.ephy.chat:12540/users/'; 

signup_btn.click(async (e) => {
    e.preventDefault();
    var username = signup_username.val();
        email = signup_email.val();
        password = signup_password.val();
        params = {
            username: username,
            email: email,
            password: password,
        };

    await axios.get(URI + params.email).then(
            (res) => {
                if(res.data.length == 0) {
                    registerUser();
                }
                else if(res.data[0].email === params.email) {
                    console.log('User already exists!');
                }
            }
        );
    }
);

registerUser = async() => {
    await axios.post(URI, params).then(
        (res) => {
            console.log(res.data);
            localStorage.setItem('ephy-nn', params.username);
            window.location.replace('http://localhost:8080/chat');
        }
    );
}