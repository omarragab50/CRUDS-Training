var pNameInput = document.getElementById('pName');
var pPriceInput = document.getElementById('pPrice');
var pCatInput = document.getElementById('pCat');
var pDescInput = document.getElementById('pDesc');
var pImageInput = document.getElementById('pImage');

var addBtn = document.getElementById('addBtn')
var updateBtn = document.getElementById('updateBtn')
var pNameAlert = document.getElementById('pNameAlert')
var pPriceAlert = document.getElementById('pPriceAlert');
var pCatAlert = document.getElementById('pCatAlert');
var pDescAlert = document.getElementById('pDescAlert');
var pImageAlert = document.getElementById('pImageAlert');

var regex = {
    name: /^[\w\s-]{1,10}$/,
    category: /^(mobile|electronics)$/i,
    Des: /^.{3,20}$/,
    image: /^.{1,20}\.(png|jpg)$/
}


var indexToBeUpdate ;


function validatePName(){
    if(regex.name.test(pNameInput.value) === true){
        console.log('valid name');
        pNameAlert.classList.add('d-none');
        return true
    }else{
        console.log('invalid name');
        pNameAlert.classList.remove('d-none');
        return false
    }
}
function validatepPriceInput(){
    if(Number(pPriceInput.value) >= 1){
        console.log('valid price');
        pPriceAlert.classList.add('d-none');
        return true
    }else{
        console.log('invalid price');
        pPriceAlert.classList.remove('d-none');
        return false
    }
}
function validateCategory(){
    if(regex.category.test(pCatInput.value) === true){
    console.log('valid category');
        pCatAlert.classList.add('d-none');
        return true
    }else{
        console.log('invalid category');
        pCatAlert.classList.remove('d-none');
        return false
    }
}
function validateDes(){
    if(regex.Des.test(pDescInput.value) === true){
    console.log('valid Des');
        pDescAlert.classList.add('d-none');
        return true
    }else{
        console.log('invalid Des');
        pDescAlert.classList.remove('d-none');
        return false
    }
}
function validateImage(){
    if(pImageInput.files[0]){
        if(regex.image.test(pImageInput.files[0].name) === true){
            console.log('valid image');
        pImageAlert.classList.add('d-none');
            return true
        }else{
            console.log('invalid image');
        pImageAlert.classList.remove('d-none');
            return false
        }
    }
    return true;
}

var allProduct = JSON.parse(localStorage.getItem('allProduct')) || [];
displayProduct(allProduct)

// if(localStorage.getItem('allProduct') != null){
//     allProduct = JSON.parse(localStorage.getItem('allProduct'));
//     displayProduct(allProduct)
// }

function addProuduct(){
    var isValidName = validatePName()
    var isValidPrice = validatepPriceInput()
    var isValidCategory = validateCategory()
    var isValidDes = validateDes()
    var isValidImage = validateImage()

        if(isValidName === false || isValidPrice === false || isValidCategory === false || isValidDes === false || isValidImage === false)
            return;


    var product = {
        name: pNameInput.value,
        price: pPriceInput.value,
        category: pCatInput.value,
        Des: pDescInput.value,
        image: pImageInput.files[0]?.name ? `images/${pImageInput.files[0]?.name}` : 'images/download.png',
    };
    allProduct.push(product);
    localStorage.setItem('allProduct',JSON.stringify(allProduct));
    displayProduct(allProduct);
    Swal.fire({
    title: "Good job!",
    text: " product Added SuccsessFullyy!",
    icon: "success"
    });
    clearForm()
}


function displayProduct(list){
    var htmlMarkub = list.map(function(product, idx){
        return `
        <tr>
        <th scope="row">${idx + 1} </th>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>${product.Des}</td>
            <td><img class="p-img" src="${product.image}" alt="fgfgfg"></td>
            <td>
                <button onclick="deleteProduct(${idx})" class="btn btn-danger">Delete</button>
                <button onclick="setProductForUpdate(${idx})" class="btn btn-warning">Update</button>
        `;
    }).join('');
    document.getElementById('actionTable').innerHTML = htmlMarkub;
    
}

function deleteProduct(index){
    allProduct.splice(index, 1);
    displayProduct(allProduct);
    localStorage.setItem('allProduct',JSON.stringify(allProduct)); 
}

function clearForm(){
    pNameInput.value = '';
    pPriceInput.value = '';
    pCatInput.value = '';
    pDescInput.value = '';
    pImageInput.value = '';
}

function setProductForUpdate(index){
    indexToBeUpdate = index;
    pNameInput.value = allProduct[index].name;
    pPriceInput.value =  allProduct[index].price;
    pCatInput.value =  allProduct[index].category;
    pDescInput.value =  allProduct[index].Des;
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');

}

function updateProduct(){
    var newProduct = {
        name: pNameInput.value,
        price: pPriceInput.value,
        category: pCatInput.value,
        Des: pDescInput.value,
        image: pImageInput.files[0]?.name ? `images/${pImageInput.files[0]?.name}` : 'images/download.png',
    };
    allProduct.splice(indexToBeUpdate,1,newProduct);
    displayProduct(allProduct)
    localStorage.setItem('allProduct',JSON.stringify(allProduct)); 
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    clearForm()
}

function productSearch(term){
    var filterProduct = allProduct.filter(function(product){
        return product.name.toLowerCase().includes(term.toLowerCase())
    })
    
    
    displayProduct(filterProduct)
}