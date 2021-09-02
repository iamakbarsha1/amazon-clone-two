
// Functions

function getCartItems(items) {
   db.collection("cart-items").onSnapshot ((snapshot) => {
      let cartItems = [];
      snapshot.docs.forEach((doc) => {
         cartItems.push({
            id: doc.id,
            ...doc.data()
         })
      })
      generateCartItems(cartItems);
      getTotalCost(cartItems);
   })
}

function getTotalCost(items) {
   let totalCost = 0;
   items.forEach((item) => {
      totalCost += (item.price * item.quantity);
   })
   document.querySelector(".total-cost-number").innerText = numeral(totalCost).format(`$0,0.0'`);
}

function decreaseCount(itemId) {
   let cartItem = db.collection("cart-items").doc(itemId);
   cartItem.get().then(function (doc) {
      if(doc.exists) {
         if(doc.data().quantity > 1) {
            cartItem.update({
               quantity: doc.data().quantity - 1
            })
         }
      }
   })
}

function increaseCount(itemId) {
   let cartItem = db.collection("cart-items").doc(itemId);
   cartItem.get().then(function (doc) {
      if(doc.exists) {
         if(doc.data().quantity > 0) {
            cartItem.update({
               quantity: doc.data().quantity + 1
            })
         }            
      }
   })
}

function deleteItem(itemId) {
   db.collection("cart-items").doc(itemId).delete();
}

function generateCartItems(cartItems) {
   let itemsHTML = "";
   cartItems.forEach((item) => {
      itemsHTML += 
      
      `
         <!-- Cart Airpods Max Item (Starts) -->
         <div class="cart-item flex items-center pb-4 border-b border-gray-200">
            <div class="flex flex-grow items-center justify-center ">

               <div class="cart-item-image w-28 h-28 p-2 rounded-lg bg-white">
                     <img class="w-full h-full object-contain"
                        src="${item.image}">
               </div>
               <div class="cart-item-details flex-grow ">
                     <div class="cart-item-name font-bold text-sm text-gray-600">
                        ${item.name}
                     </div>
                     <div class="cart-item-brand text-sm font-bold text-gray-400">
                        ${item.brand}
                     </div>
               </div>
            </div>
            <div class="cart-item-counter w-48 flex items-center">
               <!-- SVG minus Icon -->
               <div
                     data-id="${item.id}" class="cart-item-decrease rounded text-gray-400 w-6 h-6 flex items-center  justify-center cursor-pointer mr-2 hover:bg-gray-300">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                           d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                           clip-rule="evenodd" />
                     </svg>
               </div>

               <h4 class="text-gray-400 font-bold flex items-center">x${item.quantity}</h4>

               <!-- SVG Plus Icon -->
               <div
                     data-id="${item.id}" class="cart-item-increase rounded text-gray-400 w-6 h-6 flex items-center justify-center cursor-pointer ml-2 hover:bg-gray-300">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                           d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                           clip-rule="evenodd" />
                     </svg>
               </div>
            </div>
            <div class="cart-item-cost w-48 font-bold text-gray-400">
               ${numeral(item.price * item.quantity).format(`$0,0.0'`)}
            </div>
            <div class="cart-item-delete">
               <!-- SVG Delete Icon -->
               <svg xmlns="http://www.w3.org/2000/svg"
                     data-id="${item.id}" class="cart-item-delete h-6 w-6 rounded text-gray-400 cursor-pointer hover:bg-gray-300"
                     viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd" />
               </svg>
            </div>
         </div>
         <!-- Cart Airpods Max Item (Ends) -->
      `

      })
      document.querySelector(".cart-items").innerHTML = itemsHTML;
      createEventListeners();

}

function createEventListeners() {
   let decreaseButtons = document.querySelectorAll(".cart-item-decrease");
   let increaseButtons = document.querySelectorAll(".cart-item-increase");

   let deleteButtons = document.querySelectorAll(".cart-item-delete");

   decreaseButtons.forEach((button) => {
      button.addEventListener("click" , function() {
         decreaseCount(button.dataset.id);
      })
   })

   increaseButtons.forEach((button) => {
      button.addEventListener("click", function() {
         increaseCount(button.dataset.id);
      })
   })

   deleteButtons.forEach((button) => {
      button.addEventListener("click", function() {
         deleteItem(button.dataset.id);
      })
   })
}


getCartItems();











