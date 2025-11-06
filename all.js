const url = "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";

let data = [];
axios.get(url).then(function(response){
      data = response.data.data;
      renderData(data);
      areaObj(data);
      let areaColor = donutColors(data)
      chart(areaColor)
     })
     .catch(function(error){
      console.log(error);
     })

////////////////////////
const ticketCard_area = document.querySelector(".ticketCard-area")
const regionSearch = document.querySelector(".regionSearch")
const searchResult_text = document.querySelector("#searchResult-text")
const cantFind_area = document.querySelector(".cantFind-area")

//渲染卡片
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
//篩選地區
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
    searchResult_text.textContent = `本次搜尋共 ${filterResult.length} 筆資料`;
}
//觸發篩選地區
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

//驗證新增欄位
function validation(){
  if(ticketName.value.trim() === "" || 
     ticketImgUrl.value.trim() === "" || 
     ticketRegion.value.trim() === "" || 
     ticketDescription.value.trim() === "" || 
     Number(ticketNum.value.trim()) ==="" || 
     Number(ticketPrice.value.trim()) === "" ||
     Number(ticketRate.value.trim()) === ""){
      alert("欄位不得為空白，請重新輸入")
      return false;
     } else {
      return true;
     }
    }

//新增欄位
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
      "rate": Number(ticketRate.value.trim()),
    };
    data.push(obj);
}

//觸發新增欄位
addTicket_btn.addEventListener("click", function(){
   if (!validation()){
      return;
   } else {
     addData();
     totalAreaObj = {};
     renderData(data);
     areaObj(data);
     addTicket_form.reset();
     regionSearch.value = "";
     searchResult_text.textContent = `本次搜尋共 ${data.length} 筆資料`;
   }
})

//建立chart內資料
let totalAreaObj = {};
let donutData;
function areaObj(data){
  data.forEach(function(item){
    if(totalAreaObj[item.area] === undefined){
      totalAreaObj[item.area] = 1;
    } else {
      totalAreaObj[item.area] += 1;
    }    
  })
  donutData = Object.entries(totalAreaObj);
}

//建立chart內顏色對應資料
function donutColors(data){
    let areaColor = {}
    data.forEach(function(item){
      if(item.area === "台北"){
        areaColor[item.area]= "#26C0C7";
      } else if(item.area === "台中"){
        areaColor[item.area] = "#5151D3";
      } else if(item.area === "高雄"){
        areaColor[item.area] = "#E68618";
      }
    })
    return areaColor
  }

//C3.js
function chart(areaColor){
  const chart = c3.generate({
    data: {
        columns: donutData,
        type : 'donut',
        colors: areaColor,
    },
    size: {
          width: 200,
          height: 200,
    },
    donut: {
        title: "套票地區比重",
        width: 20,
        label: {
          show: false,
        }
    }
});
}

