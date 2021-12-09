const ul = document.querySelector(".people");
const getBtn = document.getElementById("get");
const postBtn = document.getElementById("post");
const deleteBtn = document.getElementById("delete");
const locationList = document.querySelector(".location-list");
const url = "/locations";

getBtn.addEventListener("click", async (e) => {
  const res = await fetch(url);
  const json = await res.json();
  locationList.innerHTML = json
    .map(
      (loc) =>
        `<li>id: ${loc.id} lat: ${loc.latitude} long: ${loc.longitude}</li>`
    )
    .join("");
});

postBtn.addEventListener("click", async (e) => {
  const lat = document.querySelector('[name="lat"]');
  const long = document.querySelector('[name="long"]');
  const obj = {
    longitude: parseInt(long.value),
    latitude: parseInt(lat.value),
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const json = await res.json();
});

deleteBtn.addEventListener("click", async (e) => {
  const del = document.querySelector('[name="del"]');
  const res = await fetch(`${url}/${del.value}`, { method: "DELETE" });
  const json = await res.json();
  alert(json.msg);
});

async function fetchPeople() {
  const res = await fetch("/people");
  const json = await res.json();

  ul.innerHTML = json.map((person) => `<li>${person.name}</li>`).join("");
}

fetchPeople();
