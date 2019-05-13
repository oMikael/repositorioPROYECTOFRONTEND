var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

var todos = document.querySelectorAll("input[type=checkbox]");

$(document).ready(function() {
  // Cargar acrilicos
  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/articulos/acrylics',
    // url: 'http://localhost:3000/articulos',
    // url: 'https://tuapp.herokuapp.com/library',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      //console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        var div = createElement(data[i]._id, data[i].name, data[i].price, data[i].description, data[i].stock)
        $("#acrylicArticles").append(div)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
      window.location = './index.html' //se direcciona a esta pagina
    }
  });
  // Cargar cartas
  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/articulos/cards',
    // url: 'http://localhost:3000/articulos',
    // url: 'https://tuapp.herokuapp.com/library',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      //console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        var div = createElement(data[i]._id, data[i].name, data[i].price, data[i].description, data[i].stock)
        $("#cardArticles").append(div)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
      window.location = './index.html' //se direcciona a esta pagina
    }
  });
  // Cargar foils
  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/articulos/foils',
    // url: 'http://localhost:3000/articulos',
    // url: 'https://tuapp.herokuapp.com/library',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      //console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        var div = createElement(data[i]._id, data[i].name, data[i].price, data[i].description, data[i].stock)
        $("#foilArticles").append(div)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
      window.location = './index.html' //se direcciona a esta pagina
    }
  });
  // Cargar marbled
  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/articulos/marbled',
    // url: 'http://localhost:3000/articulos',
    // url: 'https://tuapp.herokuapp.com/library',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      //console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        var div = createElement(data[i]._id, data[i].name, data[i].price, data[i].description, data[i].stock)
        $("#marbledArticles").append(div)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
      window.location = './index.html' //se direcciona a esta pagina
    }
  });
  $(window).scrollTop(0)
})

function createElement(id, nombre, precio, descripcion, stock) {
    var div = document.createElement('div')
    div.setAttribute('class', 'col-md-6')
    var innerHtml = `
            <div class="mt-25px mb-25px wow fadeInLeft" data-wow-delay="0.6s">
            <div class="card">
                <h1>${nombre}</h1>
                <p class="price">$${precio}</p>
                <p>${descripcion}</p>
                <p>Hay ${stock} en stock</p>
                <p>${stock > 0 ? '<button onclick="addToCart(\'' + id + '\')">Agregar al carrito</button>' : ''}</p>
            </div>  
            </div>`
    div.innerHTML = innerHtml
    return div
}

function addToCart(articleId) {
  json_to_send = {
    "articleId": articleId
  }
  json_to_send = JSON.stringify(json_to_send)
  $.ajax({
    url: 'https://webproyectomacarena.herokuapp.com/cart',
    // url: 'http://localhost:3000/cart',
    headers: {
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data) {
      alert("Agregado item al carrito de " + data.id)
      location.reload();
    },
    error: function(error_msg) {
      console.log(error_msg)
      alert((error_msg['responseText']))
    }
  })
}

function addArticle(id, articleName, articleDescription, articlePrice, articleType, articleStock) {
  var li = document.createElement("li")
  var innerHtml = "<div class='article'><b>" + articleName + "</b><br/>" 
  innerHtml += "<i>" + articleDescription + "</i><br/>" + articlePrice + "$<br/>" + articleType + "</br>Stock: " + articleStock + "</br></div>"
  li.innerHTML = innerHtml
  if (articleStock > 0) {
    var button = document.createElement('button')
    button.innerHTML = "Add to cart"
    button.id = id
    button.onclick = addToCart
    li.appendChild(button)
  }
  document.getElementById("articulos").appendChild(li)
}