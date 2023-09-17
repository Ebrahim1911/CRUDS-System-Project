const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const allPrices = document.querySelectorAll(".price input");
const allInputs = document.querySelectorAll(".inputs input");
const tbody = document.getElementById("tbody");
const btnDeleteAll = document.getElementById("deleteAll");
let mood = "create";
let tmp;
let searchMode = "title";
const search = document.getElementById("search");
// Functions
//Get Total
function getTotal() {
  price.value != ""
    ? (total.innerHTML =
        +price.value + +taxes.value + +ads.value - +discount.value)
    : (total.innerHTML = "");
  price.value != ""
    ? (total.style.background = "#040")
    : (total.style.background = "#a00d02");
}
allPrices.forEach((price) => {
  price.addEventListener("keyup", () => {
    getTotal();
  });
});
// Create products
let productsData;
localStorage.product != null
  ? (productsData = JSON.parse(localStorage.product))
  : (productsData = []);
submit.addEventListener("click", () => {
  const newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newProduct.count <= 100
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          productsData.push(newProduct);
        }
      } else {
        productsData.push(newProduct);
      }
    } else {
      productsData[tmp] = newProduct;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }
  localStorage.setItem("product", JSON.stringify(productsData));
  showData();
});
//Clear Data
function clearData() {
  allInputs.forEach((input) => {
    input.value = "";
  });
  total.innerHTML = "";
  total.style.background = "#a00d02";
}
// Read
function showData() {
  getTotal();
  let tabel = "";
  for (let i = 0; i < productsData.length; i++) {
    tabel += `
        <tr>
        <td>${i + 1}</td>
        <td>${productsData[i].title}</td>
        <td>${productsData[i].price}</td>
        <td>${productsData[i].taxes}</td>
        <td>${productsData[i].ads}</td>
        <td>${productsData[i].discount}</td>
        <td>${productsData[i].total}</td>
        <td>${productsData[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delte</button></td>
    </tr>`;
  }
  tbody.innerHTML = tabel;
  productsData.length > 0
    ? (btnDeleteAll.innerHTML = `<button onclick="deleteAll()" id="delete">Delte All(${productsData.length})</button>`)
    : (btnDeleteAll.innerHTML = "");
}
showData();
//Delete
function deleteData(i) {
  productsData.splice(i, 1);
  localStorage.product = JSON.stringify(productsData);
  showData();
}
//DeleteAll
function deleteAll() {
  localStorage.clear();
  productsData.splice(0);
  showData();
}
//Update
function updateData(i) {
  title.value = productsData[i].title;
  price.value = productsData[i].price;
  taxes.value = productsData[i].taxes;
  ads.value = productsData[i].ads;
  getTotal();
  count.style.display = "none";
  category.value = productsData[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({ top: 0, behavior: "smooth" });
}
//Search
// Get Search Mood
function getSearchMode(id) {
  id === "searchTitle"
    ? (searchMode = "title")
    : (searchMode = "searchCategory");
  id === "searchTitle"
    ? (search.placeholder = "Seacrh By Title")
    : (search.placeholder = "Seacrh By Category");
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let tabel = "";
  for (let i = 0; i < productsData.length; i++) {
    if (searchMode == "title") {
      if (productsData[i].title.includes(value.toLowerCase())) {
        tabel += `
               <tr>
               <td>${i + 1}</td>
               <td>${productsData[i].title}</td>
               <td>${productsData[i].price}</td>
               <td>${productsData[i].taxes}</td>
               <td>${productsData[i].ads}</td>
               <td>${productsData[i].discount}</td>
               <td>${productsData[i].total}</td>
               <td>${productsData[i].category}</td>
               <td><button onclick="updateData(${i})" id="update">Update</button></td>
               <td><button onclick="deleteData(${i})" id="delete">Delte</button></td>
               </tr>`;
      }
    } else {
      if (productsData[i].category.includes(value.toLowerCase())) {
        tabel += `
                <tr>
                <td>${i + 1}</td>
                <td>${productsData[i].title}</td>
                <td>${productsData[i].price}</td>
                <td>${productsData[i].taxes}</td>
                <td>${productsData[i].ads}</td>
                <td>${productsData[i].discount}</td>
                <td>${productsData[i].total}</td>
                <td>${productsData[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delte</button></td>
                </tr>`;
      }
    }
  }
  tbody.innerHTML = tabel;
}
//Clean Data
