const ul = document.querySelector(".people");

async function fetchPeople() {
  const res = await fetch("/people");
  const json = await res.json();

  ul.innerHTML = json.map((person) => `<li>${person.name}</li>`).join("");
}

fetchPeople();
