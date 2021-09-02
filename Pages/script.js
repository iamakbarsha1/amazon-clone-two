
// Functions
function getItems() {
   db.collection("items").get().then((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
         items.push({
            id: doc.id,
            image: doc.data().image,
            name: doc.data().name,
            brand: doc.data().brand,
            rating: doc.data().rating,
            price: doc.data().price
         })
      });
      generateItems(items);
  });
}

function addToCart(item) {
   console.log(item);
   let cartItem = db.collection("cart-items").doc(item.id);
   cartItem.get()
   .then(function(doc) {
      if(doc.exists){
         cartItem.update({
            quantity: doc.data().quantity + 1 
         }) 
      } else{
         cartItem.set({
            image: item.image,
            name: item.name,
            brand: item.brand,
            rating: item.rating,
            price: item.price,
            quantity: 1
         })
      }
   })   
   
}

function generateItems(items) {
   let itemsHTML = "";
   items.forEach((item) => {
      
      let doc = document.createElement("div");
      doc.classList.add("main-product", "mr-5" ,"mb-4" ,"shadow-sm", "rounded-xl");
      doc.innerHTML = 
      `
         <!-- PRODUCT Nintendo Switch(2019) -->
         <div class="">
         <div class="product-image bg-white w-48 h-52 p-2 rounded-lg ">
            <img class="w-full h-full object-contain"
            src="${item.image}">    
         </div>
         <div class="product-name text-gray-700 font-bold ml-1 mt-2 text-sm">
            ${item.name}
         </div>
         <div class="product-madeby text-green-700 font-bold ml-1 text-sm">
            ${item.brand}
         </div>
         <div class="product-rating text-yellow-600 font-bold ml-1 my-1">
            ⭐⭐⭐⭐ ${item.rating}
         </div>
         <div class="product-price font-bold text-gray-700 text-lg ml-1 ">
         ${numeral(item.price).format(`$0,0.00`)}
         </div>
         </div>
      `

      let addToCartEl = document.createElement("div");
      addToCartEl.classList.add("product-addtocart", "text-white", "bg-yellow-500", "flex", "items-center", "justify-center", "w-32", "rounded", "hover:bg-yellow-600");
      addToCartEl.innerText = "Add To Cart";
      addToCartEl.addEventListener("click" , function() {
         addToCart(item);
      })
      doc.appendChild(addToCartEl);
      document.querySelector(".main-section-products").appendChild(doc);


   })
}

getItems();