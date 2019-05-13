var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

$('#logout_button').on('click', function(e){
  e.preventDefault()
  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/users/logout',
    // url: 'http://localhost:3000/users/logout',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    /*data: json_to_send,*/
    success: function(){
      // guardar token en localstorage o cookie
      alert("Sesion terminada")
      localStorage.removeItem('token')
      token = null
      $('.log-out').hide()
      $('.log-in').show()
    },
    error: function(error) {
      console.log(error)
      alert(error["responseText"]);
      window.location = './index.html' //se direcciona a esta pagina
    }
  });
})
