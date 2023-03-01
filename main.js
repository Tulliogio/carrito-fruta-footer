const carrito = document.getElementById('carrito')
const template = document.getElementById('template')
const footer = document.getElementById('footer')
const templateFooter = document.getElementById('templateFooter')
const fragment = document.createDocumentFragment()
const botones = document.querySelectorAll('.card .btn')

document.addEventListener('click', (e) => {
     if (e.target.matches('.card .btn-outline-primary')) {
          console.log('agregar al carro')
          agregarCarrito(e)
     }
     //console.log(e.target.matches('.list-group-item .btn-success'))
     if (e.target.matches('.list-group-item .btn-success')) {
          btnAgregar(e)
     }
     if (e.target.matches('.list-group-item .btn-danger')) {
          btnQuitar(e)
     }
    

})

let carritoObjecto = []

const agregarCarrito = (e) => {


     const producto = {
          titulo: e.target.dataset.fruta,
          id:e.target.dataset.fruta,
          cantidad: 1,
          precio: parseInt(e.target.dataset.precio)
     };

     const indice = carritoObjecto.findIndex((item) =>
          item.id === producto.id)
     
   

     if (indice === -1) {
          carritoObjecto.push(producto)
     } else {
          carritoObjecto[indice].cantidad++
          //carritoObjecto[indice].precio =  carritoObjecto[indice].cantidad * producto.precio
          
     }
     console.log(carritoObjecto);

     pintarCarrito();
}

const pintarCarrito = () => {
     carrito.textContent = ""


     carritoObjecto.forEach((item) => {
          const clone = template.content.cloneNode(true)
          clone.querySelector('.text-white .lead').textContent = item.titulo
          clone.querySelector('.badge').textContent = item.cantidad 
          clone.querySelector('div .lead span').textContent = item.precio * item.cantidad;
          clone.querySelector(' .btn-danger').dataset.id = item.id
          clone.querySelector(' .btn-success').dataset.id = item.id



          fragment.appendChild(clone)



     })
     carrito.appendChild(fragment)
     pintarFooter()
}

const pintarFooter = () => {
     console.log('pintar footer');
     footer.textContent = ""

     const total = carritoObjecto.reduce((acc, current) => 
          acc + current.cantidad * current.precio, 0);
     const clone = templateFooter.content.cloneNode(true)
     clone.querySelector('span').textContent = total

     footer.appendChild(clone)
     
}

const btnAgregar = (e) => {
     console.log('me diste click', e.target.dataset.id);
     carritoObjecto = carritoObjecto.map(item => {
          if (item.id === e.target.dataset.id) {
               item.cantidad ++
          }
          return item
     })
     pintarCarrito()
}

const btnQuitar = (e) => {
     carritoObjecto = carritoObjecto.filter(item => {
          if (item.id === e.target.dataset.id) {
               if (item.cantidad > 0) {
                   item.cantidad--
              }
               if (item.cantidad === 0) return
               return item
          }
          else {return item}
          
     })
     pintarCarrito()
}





