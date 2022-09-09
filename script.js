let divElement = document.getElementById("p-tag");
let content = document.getElementById("div-wrapper");
let peginationItem = document.getElementById("nav-number");
let currentNumPost = document.querySelectorAll(".num-item");

let pageIndex = 1;
let itemPerPage = 10;
let isFetching = 0;
let postList = [];
let totalNum = 100;



getPosts();

function getPosts() {

  let start = itemPerPage * (pageIndex-1);
  let limit = itemPerPage;
  
  fetch(
    `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`
  )
    .then((response) => response.json())
    .then((jsonData) => {
      // sleepTimer(1);
      postList = jsonData;
      drawAllPosts();
      loadPagination();
    });
}

function sleepTimer(sec) {
  let endTime = new Date().getTime() + sec*1000;
  while (new Date().getTime() <= endTime) {
    
  }
  console.log('Time Out');
}

function pageRowChangeEventHandler() {
  itemPerPage = document.getElementById("page-row-number").value;
  console.log(itemPerPage);
  getPosts();
}

function drawSinglePost(item) {
  return `
    <div class="card m-3 hover" style="width: 18rem;">
      <img src="${item.url}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${item.id}</h5>
        <p class="card-text">${item.title}</p>
        <a href="#" class="btn btn-primary">View</a>
      </div>
    </div>
  `
}

function drawAllPosts() {
  let mainDiv = document.getElementById("postList");
  mainDiv.innerHTML = "";
  let content = "";
  postList.forEach((e) => {
    content += drawSinglePost(e);
  });
  mainDiv.innerHTML = content;
}

function paginateNum(i) {
  let tempClass = i == pageIndex ? "active" : "";
  return `
    <li class="page-item ${tempClass}" onclick="paginationClickEventHandler(${i})"> <a class="page-link" href="#"> ${i} </a></li>
  `
}

function paginationClickEventHandler(i) {
  pageIndex = i;
  getPosts();
}

function loadPagination() {
  peginationItem.innerHTML = '';
  let content ="";
  for (let i = 0; i < totalNum/itemPerPage; i++) {
    content += paginateNum (i+1);
  }
peginationItem.innerHTML = content;
}

