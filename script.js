// let content = document.getElementById("div-wrapper");
let peginationItem = document.getElementById("nav-number");
let currentNumPost = document.querySelectorAll(".num-item");
let postOverlay = document.querySelector('.post-overlay');


let pageIndex = 1;
let itemPerPage = 10;
let isFetching = 0;
let postList = [];
let totalNum = 500;



getPosts();

function getPosts() {

  let start = itemPerPage * (pageIndex-1);
  let limit = itemPerPage;
  
  fetch(
    `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`
  )
    .then((response) => response.json())
    .then((jsonData) => {
      sleepTimer(1);
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
    <div class="card m-3 hover" style="width: 18rem;"  data-id="${item.id}">
      <img src="${item.url}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${item.id}</h5>
        <p class="card-text">${item.title}</p>
        <a href="#" class="btn btn-primary" onclick="openPostCard(this)"" >View</a>
      </div>
    </div>
  `
}


function postCardInfo(item){
  return `
    <button class="btn btn-danger" onclick ="closeOverlay()"> Close </button>
    <div class="card m-3 hover p-5" style="width: 40rem;">
    
      <div class="d-flex">
        <img class="w-50 me-1" src="${item.url}" class="card-img-top" alt="...">
        <img class="w-50" src="${item.thumbnailUrl}" class="card-img-top" alt="...">
      </div>
      <div class="card-body">
        <h2 class="card-text">${item.title}</h2>
      </div>
    </div>`
 }

function closeOverlay(){
  postOverlay.classList.remove('active-ovelay');
}

// // this function opens the specific post that I select
function openPostCard(item){
  postOverlay.classList.add('active-ovelay');
  let id = (item.parentElement.parentElement).getAttribute('data-id');
  console.log(id);
  let exactData = (postList[id-1]);
  console.log(postList[id-1]);
  let content ="";
  content+= postCardInfo(exactData);
  postOverlay.innerHTML = content;
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

