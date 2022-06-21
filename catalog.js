//list/select all elements

const formElm = document.querySelector('form')
const nameInputElm = document.querySelector('.product-name')
const priceInputElm = document.querySelector('.product-price')
const listGroupElm = document.querySelector('.list-group')

//tracking item
const products =[]

formElm.addEventListener('submit', (evt) =>{
    evt.preventDefault()
    const {nameInput, priceInput} = receiveInputs()
    //console.log(inputValues)

    //validate input
    const isError = validateInput(nameInput, priceInput)
    if (!isError){
        //add item to data source 
        products.push({
            id: products.length,
            name: nameInput,
            price: priceInput
        })
        //add item to UI
        addItemToUI(nameInput, priceInput)
        //reset input field
        resetInput()
        console.log(products)
   }
})

//deleting item (event delegation)
listGroupElm.addEventListener('click', evt =>{
    if (evt.target.classList.contains('delete-item')){
        console.log(evt)
    }
})


function resetInput(){
    nameInputElm.value = ''
    priceInputElm.value = ''
}

function addItemToUI(name, price){
    //generate id and add to li
    //const id = ;
    const listElm = `<li class="list-group-item collection-item">
            <strong>${name}</strong>- <span class="price">$${price}</span>
            <i class="fa fa-trash delete-item float-right"></i>
            </li>`
            listGroupElm.insertAdjacentHTML('afterbegin', listElm)
}

function validateInput(name, price){
    let isError = false
    if (!name || name.length < 5){
        //console.log('Invalid Input')
        isError = true 
    }
    if (!price || Number(price) <=0){
        //console.log('Invalid Input')
        isError = true
    }
    return isError
}

function receiveInputs(){
    const nameInput = nameInputElm.value
    const priceInput = priceInputElm.value
   return {
    nameInput,
    priceInput
   }
}
