var userName = "";
while (userName === "") {
  userName = prompt("Enter Your Name ");
  if (userName !== ""){
    break;
  }
}

const ul = document.querySelector(".message-list");
const sendBtn = document.querySelector(".send-btn");
const messageInput = document.querySelector(".message-input");
const form = document.querySelector("form");

// connect to the server
// const socket = io("https://server-domain.com");
const socket = io("http://localhost:3000");
socket.on("check", (data)=> {
  console.log(data);
})

socket.on("sendthis", (obj)=>{
  let runShowChat = false;
  if(isInViewport(ul.lastElementChild)){
    runShowChat = true;
  }
  var li = document.createElement("li");
  li.innerHTML = `<span>${obj.user}</span>${obj.msg}`;
  ul.appendChild(li);

  if(runShowChat){
    showLastChat();
  }
})




form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(messageInput.value === ""){
    return;
  }
  var li = document.createElement("li");
  li.innerText = messageInput.value;
  li.classList.add("right");
  ul.appendChild(li);

  socket.emit("message",{msg:messageInput.value, user:userName});

  messageInput.value = "";
  showLastChat();
});

function showLastChat() {
  ul.lastElementChild.scrollIntoView({ behavior: "smooth" });
}

var nameList = ["Mahesh", "Meet", "Shimon", "Shreya", "Aman"];
var greetMsgList = ["Hi", "Hello", "Namaste", "what's up", "good morning"];

// https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/#:~:text=Code%20language%3A%20JavaScript%20%28javascript%29%20If%20the%20element%20is,the%20function%20returns%20true.%20Otherwise%2C%20it%20returns%20false.
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// showLastChat();
// setInterval(() => {

//     var runShowChat = false;
//     if (isInViewport(ul.lastElementChild)) {
//         runShowChat = true;
//     }

//     var li = document.createElement("li");
//     let randomName = nameList[Math.random()*nameList.length | 0]

//     li.innerHTML = `<span>${randomName}</span>${greetMsgList[Math.random()*greetMsgList.length | 0]}`

//     ul.appendChild(li);
//     if (runShowChat) {
//         showLastChat();
//     }
// }, 500);
