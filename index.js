import { menuArray } from './data.js'

const completeBtn = document.getElementById('complete-btn')
const menuList = document.getElementById('menu-list')
const orderList = document.getElementById('order-list')
const orderPrice = document.getElementById('order-price')
const cardDetails = document.getElementById('card-details')
const yourOrder = document.getElementById('your-order')
const thankYouWrapper = document.getElementById('thank-you')
const inputFields = document.getElementsByClassName('cc-input')
const currentMenuIds = []
let totalPrice = 0
let orderNumber = 0


cardDetails.addEventListener('submit', function(event) {
    event.preventDefault()
    let name = inputFields[0].value
    thankYouWrapper.innerHTML = `
    <p class="thanks">Thanks, ${name}! Your order is on its way!</p>
    `
    cardDetails.style.display = 'none'
    thankYouWrapper.style.display = 'block'
    console.log(inputFields)
    resetShop()
});


document.addEventListener('click', (event) => {
    if (event.target.id === 'pay-btn'){
        event.preventDefault()
        cardDetails.style.display = 'none'
        inputFields.value = ''
        thankYouWrapper.style.display = 'block'
    }
    
    if (currentMenuIds.includes(event.target.id)) {
        let i = event.target.id.split('-').pop()
        addItem(Number(i))
    }
    else if (event.target.classList.contains('remove-btn')){
        let i = event.target.id.split('-').pop()
        removeItem(Number(i))
    }
    else if (event.target === completeBtn){
        cardDetails.style.display = 'flex'
    }
    else if (cardDetails.style.display === 'flex' && !cardDetails.contains(event.target)) {
        cardDetails.style.display = 'none';
    }
});


const renderMenu = (menuArray) => {
    menuArray.forEach((menu) => {
        const { name, ingredients, id, price, emoji } = menu;
    menuList.innerHTML +=`
    <li class="item">
        <p class="emoji">${emoji}</p>
        <div class="item-text-wrapper">
            ${name}<br>
            <span class="ingredients">${ingredients}</span><br>
            <span class="price">$${price}</span>
        </div>
        <button class="add-item" id="item-id-${id}">+</button>
    </li>`
    currentMenuIds.push(`item-id-${id}`)
    });
};

const addItem = (itemID) => {
    if (orderList.childElementCount === 0) {
        yourOrder.style.display = 'block'
    }
    if (thankYouWrapper.style.display = 'block') {
        thankYouWrapper.style.display = 'none'
    }
    
    orderNumber++
    
    menuArray.forEach((menu) => {
        const { name, ingredients, id, price, emoji } = menu; 
        if (itemID === id) {
            console.log('adding item to order: ' + name)
            orderList.innerHTML +=`
            <li class="order-item" id="order-${orderNumber}">
                        ${name}
                        <button class="remove-btn" id="remove-btn-${orderNumber}">remove</button>
                        <span class="order-price">$${price}</span>
                    </li>`
            updateOrderPrice(price)
        }
    })
}

const removeItem = (itemID) => {
    const orderItem = document.getElementById(`order-${itemID}`)
    const priceStr = orderItem.getElementsByClassName("order-price")[0].textContent
    const priceNum = Number(priceStr.split('$').pop())
    updateOrderPrice(-priceNum)
    orderItem.remove()
    if (orderList.childElementCount === 0) {
        yourOrder.style.display = 'none'
    }
}

const updateOrderPrice = (price = 0) => {
    totalPrice += price
    orderPrice.innerHTML = `$${totalPrice}`
}

const resetShop = () => {
    totalPrice = 0
    orderNumber = 0
    updateOrderPrice()
    cardDetails.reset()
    orderList.innerHTML = ''
    if (orderList.childElementCount === 0) {
        yourOrder.style.display = 'none'
    }
}


renderMenu(menuArray)