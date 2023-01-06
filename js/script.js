
'use strict'

const openModal = () => document.getElementById('modal')
     .classList.add('active')

const closeModal = () => {
     clearFields()
     document.getElementById('modal').classList.remove('active')

}



// const tempClient = {
//      nome: "Nicolas",
//      email: "nicolas@gmail.com",
//      cidade: "Blumenau",
//      celular: "(47) 99738-4156"

// }
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbclient) => localStorage.setItem("db_client", JSON.stringify(dbclient))

// CRUD - create read update delete 
const deleteClient = (index) => {
     const dbclient = readClient()
     dbclient.splice(index, 1)
     setLocalStorage(dbclient)
}
const updateCliente = (index, client) => {
     const dbclient = readClient()
     dbclient[index] = client
     setLocalStorage(dbclient)
}

const readClient = () => getLocalStorage()


const createClient = (client) => {
     const dbclient = getLocalStorage()
     dbclient.push(client)
     setLocalStorage(dbclient)


}

const validaCampo = () => {
     return document.getElementById('form').reportValidity()

}
const clearFields = () => {
     const fields = document.querySelectorAll('.modal-field')
     fields.forEach(field => field.value = "")
}

// intereção com o usuario
const saveClient = () => {
     if (validaCampo()) {
          const client = {
               nome: document.getElementById('nome').value,
               email: document.getElementById('email').value,
               celular: document.getElementById('celular').value,
               cidade: document.getElementById('cidade').value
          }
          const index = document.getElementById('nome').dataset.index
          if (index == 'new') {

               createClient(client)
               updateTable()
               closeModal()
          } else {
               updateCliente(index, client)
               updateTable()
               closeModal()
          }

     }
}
// enviando dados para tabela
const createRow = (client, index) => {
     const newRow = document.createElement('tr')
     newRow.innerHTML = `
     <td>${client.nome}</td>
     <td>${client.email}</td>
     <td>${client.celular}</td>
     <td>${client.cidade}</td>
     
     <td>
         <button type="button" class="button green" id="edit-${index}">editar</button>
         <button type="button" class="button red" id="delete-${index}">excluir</button>
     </td>
   `

     document.querySelector('#tableClient>tbody').appendChild(newRow)
}
const clearTable = () => {
     const rows = document.querySelectorAll('#tableClient>tbody tr')
     rows.forEach(row => row.parentNode.removeChild(row))
}


const updateTable = () => {
     const dbclient = readClient()
     clearTable()
     dbclient.forEach(createRow)
}
const fillFields = (client) => {
     document.getElementById('nome').value = client.nome
     document.getElementById('email').value = client.email
     document.getElementById('celular').value = client.celular
     document.getElementById('cidade').value = client.cidade
     document.getElementById('nome').dataset.index = client.index
}


const editClient = (index) => {
     const client = readClient()[index]
     client.index = index
     fillFields(client)
     openModal()
}

const editDelete = (event) => {
     if (event.target.type == 'button') {
          const [action, index] = event.target.id.split('-')

          if (action == 'edit') {
               editClient(index)
          } else {
               const client = readClient()[index]
               const response = confirm(`Deseja realmente excluir o cliente ${client.nome} `)
               if (response) {
                    deleteClient(index)
                    updateTable()
               }
          }
     }
}


updateTable()



// Eventos
document.getElementById('cadastrarCliente')
     .addEventListener('click', openModal)

document.getElementById('modalClose')
     .addEventListener('click', closeModal)

document.getElementById('salvar')
     .addEventListener('click', saveClient)

  document.querySelector('#tableClient>tbody')
     .addEventListener('click', editDelete)     
