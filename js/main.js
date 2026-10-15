var pNameInput = document.getElementById('pName');
var pPriceInput = document.getElementById('pPrice');
var pCatInput = document.getElementById('pCat');
var pDescInput = document.getElementById('pDesc');
var pImageInput = document.getElementById('pImage');

var addBtn = document.getElementById('addBtn')
var updateBtn = document.getElementById('updateBtn')

var indexToBeUpdate ;



var allProduct = JSON.parse(localStorage.getItem('allProduct')) || [];
displayProduct(allProduct)

// if(localStorage.getItem('allProduct') != null){
//     allProduct = JSON.parse(localStorage.getItem('allProduct'));
//     displayProduct(allProduct)
// }

function addProuduct(){
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