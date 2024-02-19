var btnCart=document.querySelector('.cart-icon');
var cart=document.querySelector('.cart-content');
var btnClose=document.querySelector('.cart-close');

btnCart.addEventListener('click',()=>{
    cart.classList.add('cart-content-active');
})
btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-content-active');
})

function cartDelete(){
    let btnRemove=document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
    btn.addEventListener('click',function(){
        let price=this.parentElement.querySelector('.cart-price').innerHTML;
        itemList=itemList.filter(element=>element.price!=price);
        this.parentElement.remove();
        updateTotal()
        })
    })
}
function cartIndex(){
    let qtyBox=document.querySelectorAll('.cart-quantity');
    qtyBox.forEach((input)=>{
        input.addEventListener('change',function(){
            if(isNaN(this.value) || this.value<1){
                this.value=1;
            }
            updateTotal();
        })
    })
}

let itemList=[];

let cartBtns=document.querySelectorAll('.cart');
cartBtns.forEach((btn)=>{
    btn.addEventListener('click',function(e){
        e.preventDefault();
        let food=this.parentElement.parentElement;
        let title=food.querySelector('.card-title').innerHTML;
        let price=food.querySelector('.jacket-price').innerHTML;
        let imgSrc=food.querySelector('.card-img-top').src;

        let newProduct={title,price,imgSrc};
        if(itemList.find((element)=>element.price==newProduct.price)){
            alert("Product Already Added In Cart");
            return;
        }else{
            itemList.push(newProduct);
        }

        let newProductElement= createCartProduct(title,price,imgSrc);
        let element=document.createElement('div');
        element.innerHTML=newProductElement;
        let cartBasket=document.querySelector('.cart-details');
        cartBasket.append(element);
        cartDelete();
        cartIndex();
        updateTotal();
    })
})
function createCartProduct(title,price,imgSrc){
    return ` 
    <div class="cart-added-box">
    <img src="${imgSrc}" class="cart-img">
    <div class="cartdetail-box">
      <div class="cart-food-title">${title}</div>
      <div class="price-box">
        <div class="cart-price">${price}</div>
        <div class="cart-amt">${price}</div>
      </div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="fa-solid fa-trash cart-remove"></i>
    </div>
  `;
}
function updateTotal() {
    const cartItems=document.querySelectorAll('.cart-added-box');
    const totalValue=document.querySelector('.total-price');

    let total=0;
    cartItems.forEach(product=>{
        let priceElement=product.querySelector('.cart-price');
        let price=parseFloat(priceElement.innerHTML.replace("RS.",""));
        let qty=product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        product.querySelector('.cart-amt').innerText="RS."+(price*qty);
    });
    totalValue.innerHTML="RS."+total;

    const cartCount=document.querySelector('.cart-count');
    let count=itemList.length;
    cartCount.innerHTML=count;

    if(count==0){
        cartCount.style.display='none';
    }else{
        cartCount.style.display='block';
    }
}

let btnBuy=document.querySelector('.btn-buy');
btnBuy.addEventListener('click',()=>{
    alert('Please Fill Contact Details First Of All');
})

let sendMessage=document.querySelector('.submitcontact');
sendMessage.addEventListener('click',()=>{
    alert('Please Fill Details');
})