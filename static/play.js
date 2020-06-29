const cards = document.querySelectorAll(".card");
const startBtn = document.getElementById("start_btn");
const resetBtn = document.getElementById("reset_btn");
const finishBtn = document.getElementById("finish_btn");
const table = document.querySelector("table");
const match = document.querySelector(".count").children[1];
const count = document.querySelector(".count").children[3];
var CLICKED = false;
const URL = "http://localhost:3000/";

const getMethod = {
  method: "GET", // Method itself
  headers: {
    "Content-type": "application/json; charset=UTF-8", // Indicates the content
  },
};

const postMethod = {
  method: "POST", // Method itself
  headers: {
    "Content-type": "application/json; charset=UTF-8", // Indicates the content
  },
};

const putMethod = {
  method: "PUT", // Method itself
  headers: {
    "Content-type": "application/json; charset=UTF-8", // Indicates the content
  },
};

const deleteMethod = {
  method: "DELETE", // Method itself
  headers: {
    "Content-type": "application/json; charset=UTF-8", // Indicates the content
  },
};
function startGame() {
  console.log("start");
  fetch(URL + "start", getMethod)
    .then((response) => response.json())
    .then((data) => {
      var cardArr = document.querySelectorAll(".card");
      for (let idx = 0; idx < cardArr.length; idx++) {
        cardArr[idx].innerHTML = data[idx].value;
        cardArr[idx].style.color = "red";
        cardArr[idx].style.backgroundColor = "black";
        cardArr[idx].classList.add("CLICKED");
      }
      setTimeout(function () {
        for (let idx = 0; idx < cardArr.length; idx++) {
          cardArr[idx].innerHTML = data[idx].id;
          cardArr[idx].style.color = "black";
          cardArr[idx].style.backgroundColor = "darkgray";
          cardArr[idx].classList.remove("CLICKED");
        }
      }, 5000);
      console.log(data);
    }); // Manipulate t
}

function finishGame() {
  console.log("finish");
  fetch(URL, deleteMethod)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
function resetGame() {
  console.log("reset");
  fetch(URL, postMethod)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function clickCard(event) {
  const id = event.target.innerHTML;
  fetch(URL + id, getMethod)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var target = event.target;
      target.innerHTML = data.value;
      if (localStorage.getItem("id") == undefined) {
        target.classList.add("CLICKED");
        localStorage.setItem("id", data.id);
        localStorage.setItem("value", data.value);
      } else {
        count.innerHTML = parseInt(count.innerHTML) + 1;
        const clickBox = document.querySelector(".CLICKED");
        target.classList.add("CLICKED");
        if (data.value == localStorage.getItem("value")) {
          match.innerHTML = parseInt(match.innerHTML) + 1;
          localStorage.removeItem("id");
          localStorage.removeItem("value");
          target.style.backgroundColor = "blue";
          clickBox.style.backgroundColor = "blue";
          clickBox.classList.remove("card");
          target.classList.remove("card");
          clickBox.classList.remove("CLICKED");
          target.classList.remove("CLICKED");
          target.innerHTML = data.value;
        } else {
          clickBox.style.backgroundColor = "rgb(220,20,60)";
          target.style.backgroundColor = "rgb(220,20,60)";
          setTimeout(function () {
            console.log(clickBox);
            clickBox.innerHTML = localStorage.getItem("id");
            clickBox.style.backgroundColor = "rgb(169,169,169)";
            target.style.backgroundColor = "rgb(169,169,169)";
            localStorage.removeItem("id");
            localStorage.removeItem("value");
            event.target.innerHTML = data.id;
            clickBox.classList.remove("CLICKED");
            target.classList.remove("CLICKED");
          }, 1500);
        }
      }
    });
}

function mouseoverCard(event) {
  if (
    !event.target.classList.contains("CLICKED") &&
    event.target.classList.contains("card")
  )
    event.target.style.backgroundColor = "blue";
  console.log(event.target.style.backgroundColor);
}

function mouseleaveCard(event) {
  var target = event.target;
  if (
    target.classList.contains("CLICKED") == false &&
    target.classList.contains("card")
  ) {
    event.target.style.backgroundColor = "rgb(169,169,169)";
  }

  console.log(event.target.style.backgroundColor);
}

cards.forEach((card) => {
  card.addEventListener("click", clickCard);
  card.addEventListener("mouseover", mouseoverCard);
  card.addEventListener("mouseleave", mouseleaveCard);
});
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
finishBtn.addEventListener("click", finishGame);
