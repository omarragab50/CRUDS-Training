var pNameInput = document.getElementById('pName');
var pPriceInput = document.getElementById('pPrice');
var pCatInput = document.getElementById('pCat');
var pDescInput = document.getElementById('pDesc');
var pImageInput = document.getElementById('pImage');

var allProduct = [];


if(localStorage.getItem('allProduct') != null){
    allProduct = JSON.parse(localStorage.getItem('allProduct'));
    displayProduct(allProduct)
}
function addProuduct(){
    var product = {
        name: pNameInput.value,
        price: pPriceInput.value,
        category: pCatInput.value,
        Des: pDescInput.value,
        image: "images/about.jpg",
    };
    allProduct.push(product);
    localStorage.setItem('allProduct',JSON.stringify(allProduct));
    displayProduct(allProduct);
    Swal.fire({
    title: "Good job!",
    text: " product Added SuccsessFullyy!",
    icon: "success"
    });
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
                <button class="btn btn-warning">Update</button>
        `;
    }).join('');
    document.getElementById('actionTable').innerHTML = htmlMarkub;
    
}

function deleteProduct(index){
    allProduct.splice(index, 1);
    displayProduct(allProduct);
}






