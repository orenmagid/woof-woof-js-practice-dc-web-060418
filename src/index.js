document.addEventListener("DOMContentLoaded", function() {
  fetchAllDogs();

  let filter = document.getElementById("good-dog-filter");
  filter.addEventListener("click", function(e) {
    if (e.target.innerText === `Filter good dogs: OFF`) {
      e.target.innerText = `Filter good dogs: ON`;
      fetchGoodDogs();
    } else {
      e.target.innerText = `Filter good dogs: OFF`;
      fetchAllDogs();
    }
  });
});

function fetchGoodDogs() {
  let dogBar = document.getElementById("dog-bar");
  dogBar.innerHTML = ``;
  fetch(`http://localhost:3000/pups`)
    .then(response => response.json())
    .then(jsonData =>
      jsonData.forEach(function(dog) {
        if (dog.isGoodDog === true) {
          renderDog(dog);
        }
      })
    );
}

function fetchAllDogs() {
  let dogBar = document.getElementById("dog-bar");
  dogBar.innerHTML = ``;
  fetch(`http://localhost:3000/pups`)
    .then(response => response.json())
    .then(jsonData =>
      jsonData.forEach(function(dog) {
        renderDog(dog);
      })
    );
}

function renderDog(dog) {
  let dogBar = document.getElementById("dog-bar");
  let span = document.createElement("span");
  dogBar.appendChild(span);
  span.innerHTML = `${dog.name}`;
  span.addEventListener("click", function(event) {
    renderDisplay(dog);
  });
}

function renderDisplay(dog) {
  let dogInfo = document.getElementById("dog-info");
  dogInfo.innerHTML = `<img src=${dog.image}>
 <h2>${dog.name}</h2>
 <button id="${dog.id}">${
    dog.isGoodDog == true ? "Good Dog!" : "Bad Dog!"
  }</button>`;

  button = document.getElementById(`${dog.id}`);
  button.addEventListener("click", function() {
    isGoodDog = !dog.isGoodDog;
    patchDog(dog, isGoodDog);
  });
}

function patchDog(dog, isGoodDog) {
  let data = { isGoodDog: isGoodDog };
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(dog => {
      renderDisplay(dog);

      let filter = document.getElementById("good-dog-filter");

      if (filter.innerText === `Filter good dogs: OFF`) {
        fetchAllDogs();
      } else {
        fetchGoodDogs();
      }
    });
}
