let data = [];

axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json")
     .then(function(response){
      data = response.data.data;
      renderData(data);
     })
     .catch(function(error){
      console.log(error);
     })

////////////////////////
const ticketCard_area = document.querySelector(".ticketCard-area")
const regionSearch = document.querySelector(".regionSearch")
const searchResult_text = document.querySelector("#searchResult-text")
const cantFind_area = document.querySelector(".cantFind-area")

function renderData(data){
    let str = "";
    data.forEach(function(item){
        str += `<li class="ticketCard">
            <div class="ticketCard-img">
              <a href="#">
                <img src=${item.imgUrl}>
              </a>
              <div class="ticketCard-region">${item.area}</div>
              <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
              <div>
                <h3>
                  <a href="#" class="ticketCard-name">${item.name}</a>
                </h3>
                <p class="ticketCard-description">
                  ${item.description}
                </p>
              </div>
              <div class="ticketCard-info">
                <p class="ticketCard-num">
                  <span><i class="fas fa-exclamation-circle"></i></span>
                  剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                </p>
                <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">$${item.price}</span>
                </p>
              </div>
            </div>
          </li>`;
    });
    ticketCard_area.innerHTML = str ; 
}

function filter(){
    let filterResult = [];
    data.forEach(function(item){
        if (item.area === regionSearch.value){
            filterResult.push(item);
        }
        if (!regionSearch.value){
            filterResult.push(item);
        }
    })
    if (filterResult.length > 0 ){
        cantFind_area.style.display = "none";
    } else if (filterResult.length == 0){
        cantFind_area.style.display = "block";
    }
    renderData(filterResult);
    searchResult_text.innerHTML = `<p>本次搜尋共 ${filterResult.length} 筆資料</p>`;
}
regionSearch.addEventListener("change", function(){
    filter();
})

const ticketName = document.querySelector("#ticketName")
const ticketImgUrl = document.querySelector("#ticketImgUrl")
const ticketRegion = document.querySelector("#ticketRegion")
const ticketPrice = document.querySelector("#ticketPrice")
const ticketNum = document.querySelector("#ticketNum")
const ticketRate = document.querySelector("#ticketRate")
const ticketDescription = document.querySelector("#ticketDescription")
const addTicket_btn = document.querySelector(".addTicket-btn")
const addTicket_form = document.querySelector(".addTicket-form")

let obj = {};
function addData(){
    obj = {
      "id": data.length,
      "name": ticketName.value.trim(),
      "imgUrl": ticketImgUrl.value.trim(),
      "area": ticketRegion.value.trim(),
      "description": ticketDescription.value.trim(),
      "group": Number(ticketNum.value.trim()),
      "price": Number(ticketPrice.value.trim()),
      "rate": Number(ticketRate.value.trim())
    };
    data.push(obj);
}

addTicket_btn.addEventListener("click", function(){
    addData();
    renderData(data);
    addTicket_form.reset();
    regionSearch.value = "";
    searchResult_text.innerHTML = `<p>本次搜尋共 ${data.length} 筆資料</p>`
})



