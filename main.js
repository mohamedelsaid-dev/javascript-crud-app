let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


// ===============================
// Global Variables
// ===============================

let mood = 'create';
let tmp;


// ===============================
// Get Total
// ===============================

function getTotal() {

    if (price.value !== '') {

        let result =
            (+price.value || 0) +
            (+taxes.value || 0) +
            (+ads.value || 0) -
            (+discount.value || 0);

        total.innerHTML = result;
        total.style.background = '#040';

    } else {

        total.innerHTML = '';
        total.style.background = '#ee030ffb';

    }
}


// ===============================
// Local Storage
// ===============================

let datapro;

if (localStorage.product != null) {

    datapro = JSON.parse(localStorage.product);

} else {

    datapro = [];

}


// ===============================
// Create / Update Product
// ===============================

submit.onclick = function () {

    // ===========================
    // Validate Data
    // ===========================

    if (
        title.value.trim() === '' ||
        price.value.trim() === '' ||
        category.value.trim() === ''
    ) {

        alert('Please enter Title, Price and Category.');
        return;

    }


    // ===========================
    // Create Product Object
    // ===========================

    let newpro = {

        title: title.value.toLowerCase(),

        price: price.value,

        taxes: taxes.value || 0,

        ads: ads.value || 0,

        discount: discount.value || 0,

        total: total.innerHTML,

        count: count.value || 1,

        category: category.value.toLowerCase()

    };


    // ===========================
    // CREATE
    // ===========================

    if (mood === 'create') {

        let productCount = Number(newpro.count) || 1;

        for (let i = 0; i < productCount; i++) {

            datapro.push({
                ...newpro,
                count: 1
            });

        }

    }


    // ===========================
    // UPDATE
    // ===========================

    else {

        datapro[tmp] = newpro;

        mood = 'create';

        submit.innerHTML = 'create';

        count.style.display = 'block';

    }


    // ===========================
    // Save To Local Storage
    // ===========================

    localStorage.setItem(
        'product',
        JSON.stringify(datapro)
    );


    // ===========================
    // Clear Inputs
    // ===========================

    clearData();


    // ===========================
    // Show Data
    // ===========================

    showData();

};


// ===============================
// Clear Inputs
// ===============================

function clearData() {

    title.value = '';

    price.value = '';

    taxes.value = '';

    ads.value = '';

    discount.value = '';

    total.innerHTML = '';

    total.style.background = '#ee030ffb';

    count.value = '';

    category.value = '';

}


// ===============================
// Read / Show Data
// ===============================

function showData() {

    let table = '';

    for (let i = 0; i < datapro.length; i++) {

        table += `

            <tr>

                <td>${i+1}</td>

                <td>${datapro[i].title}</td>

                <td>${datapro[i].price}</td>

                <td>${datapro[i].taxes}</td>

                <td>${datapro[i].ads}</td>

                <td>${datapro[i].discount}</td>

                <td>${datapro[i].total}</td>

                <td>${datapro[i].category}</td>

                <td>
                    <button onclick="updateData(${i})">
                        update
                    </button>
                </td>

                <td>
                    <button onclick="deletData(${i})">
                        delete
                    </button>
                </td>

            </tr>

        `;

    }


    document.getElementById('tbody').innerHTML = table;


    // ===========================
    // Delete All Button
    // ===========================

    let btnDelete = document.getElementById('deleteAll');

    if (datapro.length > 0) {

        btnDelete.innerHTML = `

            <button onclick="deleteAll()">
                delete All(${datapro.length})
            </button>

        `;

    } else {

        btnDelete.innerHTML = '';

    }

}


// Run At Start

showData();


// ===============================
// Delete Product
// ===============================

function deletData(i) {

    datapro.splice(i, 1);

    localStorage.setItem(
        'product',
        JSON.stringify(datapro)
    );

    showData();

}


// ===============================
// Delete All Products
// ===============================

function deleteAll() {

    datapro.splice(0);

    localStorage.setItem(
        'product',
        JSON.stringify(datapro)
    );

    clearData();

    showData();

}


// ===============================
// Update Product
// ===============================

function updateData(i) {

    title.value = datapro[i].title;

    price.value = datapro[i].price;

    taxes.value = datapro[i].taxes;

    ads.value = datapro[i].ads;

    discount.value = datapro[i].discount;

    category.value = datapro[i].category;


    getTotal();


    count.style.display = 'none';

    submit.innerHTML = 'update';

    mood = 'update';

    tmp = i;


    scroll({

        top: 0,

        behavior: 'smooth'

    });

}


// ===============================
// Search
// ===============================

let searchMood = 'title';


// ===============================
// Search Mood
// ===============================

function getsearchMood(id) {

    let search = document.getElementById('search');


    if (id === 'searchTitle') {

        searchMood = 'title';

        search.placeholder = 'Search By Title';

    } else {

        searchMood = 'category';

        search.placeholder = 'Search By Category';

    }


    search.focus();

}


// ===============================
// Search Data
// ===============================

function seachData(value) {

    let table = '';

    value = value.toLowerCase();


    for (let i = 0; i < datapro.length; i++) {

        if (
            searchMood === 'title' &&
            datapro[i].title.includes(value)
        ) {

            table += createTableRow(i);

        }


        else if (
            searchMood === 'category' &&
            datapro[i].category.includes(value)
        ) {

            table += createTableRow(i);

        }

    }


    document.getElementById('tbody').innerHTML = table;

}


// ===============================
// Create Table Row
// ===============================

function createTableRow(i) {

    return `

        <tr>

            <td>${i}</td>

            <td>${datapro[i].title}</td>

            <td>${datapro[i].price}</td>

            <td>${datapro[i].taxes}</td>

            <td>${datapro[i].ads}</td>

            <td>${datapro[i].discount}</td>

            <td>${datapro[i].total}</td>

            <td>${datapro[i].category}</td>

            <td>
                <button onclick="updateData(${i})">
                    update
                </button>
            </td>

            <td>
                <button onclick="deletData(${i})">
                    delete
                </button>
            </td>

        </tr>

    `;

}