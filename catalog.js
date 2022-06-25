//console.log('connected')


//temporary memory [object within the code]
//database
//local storage , session storate

(function(){
    const formElm = document.querySelector('form')
    const nameInputElm = document.querySelector('.product-name')
    const priceInputElm = document.querySelector('.product-price')
    const listGroupElm = document.querySelector('.list-group')
    const filterElm = document.querySelector('#filter')
    const addProductElm = document.querySelector('.add-product')
    
    //tracking item
    let products =[]
    
    function showAllItemToUI(items){
        listGroupElm.innerHTML = ''
        items.forEach((item) => {
            const listElm = `<li class="list-group-item item-${item.id} collection-item">
            <strong>${item.name}</strong>- <span class="price">$${item.price}</span>
            <i class="fa fa-trash delete-item float-right"></i>
            <i class="fa fa-edit edit-item float-right"></i>
            </li>`
            listGroupElm.insertAdjacentHTML('afterbegin', listElm)
        });
    }
    
    function updateAfterRemove(products, id){
        return products.filter(product => product.id !== id)
    }

    function removeItemFromObj(id){
        const productsAfterDelete = updateAfterRemove(products, id)
        products = productsAfterDelete
        //console.log(productsAfterDelete)
    }

    function removeItemFromUI(id){
        document.querySelector(`.item-${id}`).remove()
    }
    
    function getItemID(elm){
        const liElm = elm.parentElement
        return Number(liElm.classList[1].split('-')[1])
    }
    
    function resetInput(){
        nameInputElm.value = ''
        priceInputElm.value = ''
    }
    
    function addItemToUI(id, name, price){
        //generate id and add to li
        //const id = ;
        const listElm = `<li class="list-group-item item-${id} collection-item">
                <strong>${name}</strong>- <span class="price">$${price}</span>
                <i class="fa fa-trash delete-item float-right"></i>
                <i class="fa fa-edit edit-item float-right"></i>
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
    
    function addItemToStorage(product){
        if (localStorage.getItem('storedProducts')){
            const products = JSON.parse(localStorage.getItem('storedProducts'))
            products.push(product)
            //update to localstorage
            localStorage.setItem('storedProducts',JSON.stringify(products))
        }else{
            let products = []
            products.push(product)
            localStorage.setItem('storedProducts',JSON.stringify(products))
        }
    }

    function removeItemFromStorage(id){
        //const products = updateAfterRemove(id)
        //pick data from localStorage
        const products = JSON.parse(localStorage.getItem('storedProducts'))
        //filter
        const itemsAfterDelete = updateAfterRemove(products, id)
        localStorage.setItem('storedProducts', JSON.stringify(itemsAfterDelete))
    }

    function populateUIInEditState(foundProduct){
        nameInputElm.value = foundProduct.name
        priceInputElm.value = foundProduct.price
    }

    function showUpdateBtn(){
        const elm =`<button type="button" class="btn mt-3 btn-block btn-secondary update-product">Update</button>`
        addProductElm.style.display = 'none'
        formElm.insertAdjacentHTML('beforeend', elm)
    }

    function updateProductToStorage(){
        if(localStorage.getItem('storedProducts')){
            localStorage.setItem('storedProducts', JSON.stringify(products))
        }
    }

    function init(){
        let updatedItemID;
        formElm.addEventListener('submit', (evt) =>{
            evt.preventDefault()
            const {nameInput, priceInput} = receiveInputs()
            //console.log(inputValues)
        
            //validate input
            const isError = validateInput(nameInput, priceInput)
            if (isError){
                alert ('Product name must be greater than 5 character')
                return
            } //if true code will return and not run the next codes, working as an else condition
        
            //add item to data source 
            //generate item id
            const id = products.length

            const product = {
                id: id,
                name: nameInput,
                price: priceInput
            }

            products.push(product)
            //add item to UI
            addItemToUI(id, nameInput, priceInput)

            //add item to local storage
            addItemToStorage(product)

            //reset input field
            resetInput()
            //console.log(products)
        })
    
        //search/filter
        filterElm.addEventListener('keyup', evt =>{
            
            const filterValue = evt.target.value
            //filter depending the value
            const filteredArray = products.filter((product) =>
                product.name.includes(filterValue)
            )
            //console.log(result)
            //show item to UI
            showAllItemToUI(filteredArray)
        })
    
    
        //deleting item (event delegation)
        listGroupElm.addEventListener('click', evt =>{
            if (evt.target.classList.contains('delete-item')){
                const id = getItemID(evt.target)
                //delete item from UI 
                removeItemFromUI(id)
                //delete item from products object
                removeItemFromObj(id)
                //remove from local storage
                removeItemFromStorage(id)
            }else if(evt.target.classList.contains('edit-item')){
                //pick the id
                const updatedItemID = getItemID(evt.target)
                //find the item
                const foundProduct = products.find(product => product.id === updatedItemID)
                console.log(foundProduct)
                //populate the item data to UI
                populateUIInEditState(foundProduct)
                //show update button
                if (!document.querySelector('update-product')){
                    showUpdateBtn()
                }               

                //updating the data from user
                // save to Obj
                // save LocalStorage
                //save to UI, 

            }

        })

        formElm.addEventListener('click', (evt) =>{
            if (evt.target.classList.contains('update-product')){
                //updating the data from user
                //pick data
                const {name, price}=receiveInputs()
                //validate input
                const isError = validateInput(name, price)
                if (isError){
                    alert ('Please enter valid info')
                    return
                }
                // save to Obj
                products = products.map((product) =>{
                    if (product.id === updatedItemID){
                        return {
                            id: product.id,
                            name: name,
                            price: price
                        }
                    }else{
                        return product
                    }
                })
                console.log(updatedProductsArr)

                //reset input
                resetInput()
                //show submit button
                addProductElm.style.display = 'block'
                //hide update button
                document.querySelector('update-product').remove()
                //save to UI
                showAllItemToUI(products)
                // save LocalStorage
                updateProductToStorage()
            }
        })

        //showing from local storage
        document.addEventListener('DOMContentLoaded', evt =>{
            //checking item in local storage
            if(localStorage.getItem('storedProducts')){
                products = JSON.parse(localStorage.getItem('storedProducts'))
                //console.log(products)
                //update object [from the variable]
                //update UI
                showAllItemToUI(products)
            }
        })
    }
    
    init()
})()

//Local Storage
//const data = 20
    // const data = [
    //     {
    //         name: 'Farid'
    //     },
    //     {
    //         name: 'Samim'
    //     }
    // ]
    // localStorage.setItem('ourVal', JSON.stringify(data))
    // console.log(JSON.parse(localStorage.getItem('ourVal')))`
