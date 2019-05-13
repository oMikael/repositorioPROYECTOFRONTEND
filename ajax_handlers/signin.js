var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

$('#login_form').submit(function(e) {
  e.preventDefault()
  // cargar email y password
  let email = $("#email_signin").val()
  let password = $("#password_signin").val()

  json_to_send = {
    "email": email,
    "password" : password
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/users/login',
    // url: 'http://localhost:3000/users/login',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      // guardar token en localstorage o cookie
      token = data.token
      localStorage.setItem('token', data.token)
      alert("Sesion iniciada")
      $('#id01').hide()
      $('.log-in').hide()
      $('.log-out').show()
    },
    error: function(error_msg) {
      console.log(error_msg)
      alert((error_msg["responseText"]));
    }
  });
})

$('#cart_link').on('click', function(e) {
  e.preventDefault()
  if (localStorage.getItem('token')) {
    window.location ="./cart.html"
  } else {
    alert("Please authenticate")
    $('#id01').show()
  }
})