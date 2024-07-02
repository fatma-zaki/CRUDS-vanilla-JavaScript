
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let adds = document.getElementById('adds');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = "create";
let imp;
// get total

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +adds.value ) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
        
    }else{
        total.innerHTML = "";
        total.style.backgroundColor = '#8d0c0c';
        
    };
};


// creat product


let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product);
}else{
    datapro = [];
};

submit.onclick = function(){
    let newpro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        adds : adds.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
        
    };

if(title.value != ""&& price.value != "" && category.value != "" && newpro.count < 100){
if(mood === "create"){
    if(newpro.count > 1){
        for(let i = 0; i < newpro.count; i++){
            datapro.push(newpro);

        }
    }else{
    datapro.push(newpro);
    }}else{
        datapro[imp] = newpro;
        mood = "create";
        submit.innerHTML = "Create";
        count.style.display = "block";
    };
    cleardata();

}


// save local storage

    localStorage.setItem('product', JSON.stringify(datapro))

    showdata();
};



// clear inputs
  function cleardata(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    adds.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";

  };






// read

function showdata(){
     getTotal();
    let table = "";


    for (let i = 0; i < datapro.length; i++){
        table += 
      `  <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].adds}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deldata(${i})" id="delete">delete</button></td>
        </tr> `

    };


    document.getElementById('tbody').innerHTML = table;
    let delbtn = document.getElementById("deleteAll");

    if(datapro.length > 0){
         delbtn.innerHTML =     `
         <button onclick="deleteAll()">Delete All (${datapro.length})</button>
         `
    }else{
        delbtn.innerHTML = "";
    }
}showdata();



// delete
function deldata(i){
        datapro.splice(i, 1);
        localStorage.product = JSON.stringify(datapro);
        showdata();
}

function deleteAll() {
        localStorage.clear();
        datapro.splice(0);
        showdata();
}

// count

// update
if(mood= update){
function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    adds.value = datapro[i].adds;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display= "none";
    category.value = datapro[i].category;
    submit.innerHTML = "Update";
    scroll( {
        top : 0,
        behavior: 'smooth',
    })
    mood = "update"
    imp = i;

}}
// search

let searchMood = "title";

function getSearchMood(id){
 

    let search = document.getElementById("search");
    if(id == "searchtitle"){
        searchMood = "title";
        search.placeholder = "Search By Title";
    }else{
        searchMood = "category";
        search.placeholder = "Search By Category";
    };
    search.focus();
    search.value = "";
    showdata(); 
};



function searchData(value){
    let table= '';
    if(searchMood == "title"){

        for(let i = 0; i < datapro.length; i++){
           if(datapro[i].title.includes(value.toLowerCase())){
            table += 
            `  <tr>
              <td>${i}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].taxes}</td>
              <td>${datapro[i].adds}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deldata(${i})" id="delete">delete</button></td>
              </tr> `;
      

           }
        }
    }else{
        for(let i = 0; i < datapro.length; i++){
            if(datapro[i].category.includes(value.toLowerCase())){
             table += 
             `  <tr>
               <td>${i}</td>
               <td>${datapro[i].title}</td>
               <td>${datapro[i].price}</td>
               <td>${datapro[i].taxes}</td>
               <td>${datapro[i].adds}</td>
               <td>${datapro[i].discount}</td>
               <td>${datapro[i].total}</td>
               <td>${datapro[i].category}</td>
               <td><button onclick="updateData(${i})" id="update">update</button></td>
               <td><button onclick="deldata(${i})" id="delete">delete</button></td>
               </tr> `;
       
 
            }

    };}
    document.getElementById('tbody').innerHTML = table;


};
// clean data



