"use strict";


let container = document.getElementById("container");

let btnList = document.querySelectorAll(".btn");

let prevNextBtnsList = document.querySelectorAll(".btn-prev-next");

let prevBtn = document.getElementById("prev-btn");

let nextBtn = document.getElementById("next-btn");

let apiURL = "https://dummyjson.com/products";

let productsArray = new Array();

let productPerPage = 3;

let currentPage = 1;

let previousPage = 1;

let countObject = {1 : 1, 2 : 4, 3 : 7, 4 : 10}


// function to fetch data from API
   async function fetchAPIData()
   {
    await fetch(apiURL, {
        method : "GET",
        header : {
            "Content-Type" : "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {

       

         productsArray = data["products"];

         createProductContainer();
        
    })
    .catch(err => {
        console.log(err);
    })
   }
       
   // fetch data from API
   fetchAPIData();


    function createProductContainer()
    {
        // for page 1 products 0,1,2 will be created
        // for page 2 products 3,4,5 will be created
        // for page 3 products 6,7,8 will be created

        console.log(productsArray);
        container.innerHTML = "";
         for(let i=countObject[currentPage]-1; i < (countObject[currentPage]-1+productPerPage) ; i++)
            {
                
                let productContainer = `<div class="product-container">
                <div id="img-container${i+1}" class="image-holder">
                </div>

                <div id="product-title" class="title">${productsArray[i]["title"]}</div>
                <div id="product-price" class="price">$ ${productsArray[i]["price"]}</div>
                </div>`;

                container.innerHTML += productContainer;
                
                document.querySelector(`#img-container${i+1}`).style.backgroundImage = `url(${productsArray[i]["images"][0]})`;

               
            }
    }


    btnList.forEach(btn => {
        btn.addEventListener("click",(e)=> {

            let dataAttribute = "data-page-value";
            console.log(e.target.getAttribute("data-page-value"));
            previousPage = currentPage;
            currentPage = e.target.getAttribute("data-page-value");
            

            // disable prev and next btns

            if(currentPage == 1)
            {
                prevBtn.setAttribute("disabled","disabled");
                nextBtn.removeAttribute("disabled");
            }
            else if(currentPage == 4)
            {
                nextBtn.setAttribute("disabled","disabled");
                prevBtn.removeAttribute("disabled");
            }
            else{
                prevBtn.removeAttribute("disabled");
                nextBtn.removeAttribute("disabled");
            }
            // change selection color for buttons
            btnList.forEach(newBtn => {
                console.log("looping :"+btn.id)
                if(newBtn.id == btn.id)
                {
                    newBtn.classList.add("click-btn");
                }
                else
                {
                    newBtn.classList.remove("click-btn");   
                }
            })
            createProductContainer();

            console.log("current : "+currentPage);
            console.log("previous : "+previousPage);
        });
        console.log("Testtingg")
        
    })



    prevNextBtnsList.forEach(navigateBtn => {
        navigateBtn.addEventListener("click",(e)=>{
            console.log(navigateBtn.getAttribute("id"));

            if(navigateBtn.getAttribute("id") == "prev-btn")
            {
                if(currentPage != 1)
                {
                    previousPage = currentPage;
                    currentPage = previousPage-1;
                    if(currentPage == 1)
                        {
                            prevBtn.setAttribute("disabled","disabled");
                        }
                    nextBtn.removeAttribute("disabled")
                    activeStateButtons();
                    createProductContainer();
                }
                else{
                    prevBtn.setAttribute("disabled","disabled");
                }
                
            }
            else{
                if(currentPage != 4)
                {
                    previousPage = currentPage;
                    currentPage = Number(previousPage)+1;
                    if(currentPage == 4)
                        {
                            nextBtn.setAttribute("disabled","disabled");
                        }
                    prevBtn.removeAttribute("disabled")
                    activeStateButtons();
                    createProductContainer();
                }
                else{
                        nextBtn.setAttribute("disabled","disabled");
                    }

                   
            }

            console.log("current : "+currentPage)
            console.log("previous : "+previousPage)
            
        })
    })


   function activeStateButtons()
   {
       btnList.forEach(btn=>{

          if(btn.id.slice(-1) == currentPage)
            {
                btn.classList.add("click-btn")
            }
            else{
                btn.classList.remove("click-btn")
            }
           
       })
   }











// btn.addEventListener("click",()=> {

    
//     let imgContainer = document.querySelector("#img-container");
//     let imgContainerLists = document.querySelectorAll(".image-holder")
//     console.log(imgContainer);
    


//     // API Test 2

    
//     let url = "https://dummyjson.com/products";
    
//     fetch(url, {
//         method : "GET",
//         headers : {
//             "Content-Type" : "application/json"
//         }
//     }

//     ).then(res => {
//        return res.json();
//     })
//     .then(data => {
//         console.log(data["products"])
//        console.log(data["products"][3]["images"][0]);
//     //    imgContainer.style.backgroundImage = `url(${data["products"][0]["images"][0]})`;

//        let productIndex = 13;
//        imgContainerLists.forEach((box)=> {


//         box.style.backgroundImage = `url(${data["products"][productIndex]["images"][0]})`
//         productIndex++;
//        });

//     })
//     .catch((err) => {
//         console.log(err);
//     })
// });