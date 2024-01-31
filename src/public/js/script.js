let user

const main = document.querySelector("main")
const emailInput = document.querySelector("#email-input")
const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
  user = emailInput.value
  form.remove()
  main.innerHTML += `
    <div>
      <input type=text placeholder="Ingrese su mensaje: " id="input-message"/>
      <button id="btn-message">Enviar</button>
    </div>
    <div id="messages-box"></div>
  `
  const socket = io()
  socket.on("messages", messages => {
    document.querySelector("#messages-box").innerHTML = ""
    messages.forEach(m => {
      document.querySelector("#messages-box").innerHTML += `
      <h3>${m.user}: ${m.message}</h3>
      `
    })
  })
  
  document.querySelector("#btn-message").onclick = () => {
    socket.emit("new-message", {user, message: document.querySelector("#input-message").value})
    document.querySelector("#input-message").value = ""
  }
})
