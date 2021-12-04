const formCrear = document.querySelector("#form-crear")
const inputNombre = document.querySelector("#nombre")
const inputEmail = document.querySelector("#email")
const inputTelefono = document.querySelector("#telefono")
const inputDireccion = document.querySelector("#direccion")


// funciones auxiliares 


//funciones para boton borrar
const crearBotonesBorrar = () => {
  const botonesBorrar = document.querySelectorAll(".boton-borrar")
    
  for (let i = 0; i < botonesBorrar.length; i++) {
    botonesBorrar[i].onclick = () => {
     const idDelUsuarioABorrar = botonesBorrar[i].dataset.id 
     borrarUsuario(idDelUsuarioABorrar)
    }
  }
}

const borrarUsuario = (id) => {
  console.log("Borrando usuario", id)
  fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
    method: "DELETE"
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    obtenerUsuarios()
  })
}

// funciones auxiliares de boton editar

const editarUsuario = (id) => {
  console.log("Usuario editado", id)
  fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
    method: "PUT"
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    obtenerUsuarios()
  })
}

const crearBotonesEditar = () => {
  const botonesEditar = document.querySelectorAll(".boton-editar")
    
  for (let i = 0; i < botonesEditar.length; i++) {
    botonesEditar[i].onclick = () => {
     const idDelUsuarioEditar = botonesEditar[i].dataset.id  
     const formEditar = `  
      <form id="form-Editar" class="form-editar">
      <label>Nombre
      <input type="text" id="nombre">
      </label>
      <label>Email
      <input type="email" id="email">
      </label>
      <label>Telefono
      <input type="number" id="telefono">
      </label>
      <label>Direccion
      <input type="text" id="direccion">
      </label>

      <input type="submit" value="Editar nuevo usuario">
      </form>
      `
      
      tabla.innerHTML = formEditar 
      //seleccionar el nuevo formulario creado
      //hacerme evento onsubmit 
      //adentro de ese evento leer los valores del form
      //Mandarselo a la funcion editarUsuario 
  //    editarUsuario(idDelUsuarioEditar)
    }

    }   
  }



const crearTablaHTML = (data) => {
  const tabla = document.querySelector("#tabla")
  const html = data.reduce((acc, curr) => {
    return acc + `  
    <tr>
      <td>${curr.fullname}</td>
      <td>${curr.email}</td>
      <td>${curr.address}</td>
      <td>${curr.phone}</td>
      <td>
      <button class="boton-borrar" data-id="${curr.id}">Borrar usuario</button>
      <button class="boton-editar" data-id="${curr.id}">Editar usuario</button>
      </td>
    </tr>
    `
  }, `
    <tr>
      <th>Nombre</th>
      <th>Email</th>
      <th>Direccion</th>
      <th>Telefono</th>
      <th>Acciones</th>
    </tr>
    `)

    tabla.innerHTML = html
    crearBotonesBorrar()
    
    crearBotonesEditar()
}



const obtenerUsuarios = () => {
  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users")
  .then((res) =>  res.json())
  .then((data) => {
    console.log(data)
    crearTablaHTML(data)
  })
}



// funciones de eventos 

obtenerUsuarios()


formCrear.onsubmit = (e) => {
  e.preventDefault()

  const nuevoUsuario = {
    fullname: inputNombre.value, 
    phone: inputTelefono.value, 
    address: inputDireccion.value, 
    email: inputEmail.value
  }

  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users", {
    method: "POST", 
    body: JSON.stringify(nuevoUsuario), 
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((res) =>  res.json())
  .then((data) => {
    console.log(data)
    obtenerUsuarios()
  })
}

