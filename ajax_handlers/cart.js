var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

$('#checkout').on('click', function(e){
  e.preventDefault()
  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/cart/checkout',
    // url: 'http://localhost:3000/cart/checkout',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    /*data: json_to_send,*/
    success: function(){
      alert("Cart has been checked out!")
      location.reload();
    },
    error: function(error) {
      console.log(error)
      alert(error["responseText"]);
      window.location = './index.html' //se direcciona a esta pagina
    }
  });
})

function deleteFromCart(articleId) { 
  json_to_send = {
    "articleId" : articleId
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      url: 'https://webproyectomacarena.herokuapp.com/cart/' + this.id,
      // url: 'http://localhost:3000/cart/' + this.id,
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'DELETE',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("DELETE!!")
        location.reload();
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}

$(document).ready(function() {
  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/cart',
    // url: 'http://localhost:3000/cart',
    // url: 'https://tuapp.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){

      var total = 0
      for( let i = 0; i < data.length; i++) {
        // Agregar los elementos de la lista
        addArticle(data[i]._id, data[i].name, data[i].description, data[i].price, data[i].type)
        total += data[i].price
      }
      $("#cart_total").html(total)
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
      window.location = './index.html' //se direcciona a esta pagina
    }
  });
})

function addArticle(id, name, description, price) {
  var tr = document.createElement("tr")
  var innerHTML = `<tr>
          <td data-th="Product">
            <div class="row">
              <div class="col-sm-10">
                <h4 class="nomargin">${name}</h4>
                <p>${description}</p>
              </div>
            </div>
          </td>
          <td data-th="Price">$${price}</td>
          <td class="actions" data-th="">
            <button id="id" onclick="deleteFromCart('${id}')" class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>                
          </td>
        </tr>`
  tr.innerHTML = innerHTML
  $("#cart_body").append(tr)
}