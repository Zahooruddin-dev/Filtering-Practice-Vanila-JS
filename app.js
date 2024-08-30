/* using process of writing everything to make it functional
and then optimzing it */
let filteredProducts = [...products];

const productsContainer = document.querySelector('.products-container');

const displayProducts = () => {
  productsContainer.innerHTML = filteredProducts.length < 1 
    ? `<h6>Sorry, no products matched your search</h6>`
    : filteredProducts.map(({ id, title, image, price }) => 
        `<article class="product" data-id="${id}">
          <img src="${image}" class="product-img img" alt="" />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">${price}</span>
          </footer>
        </article>`
      ).join('');
};

displayProducts();

// Text Filter
const form = document.querySelector('.input-form');
const searchInput = document.querySelector('.search-input');

form.addEventListener('keyup', () => {
  const inputValue = searchInput.value.toLowerCase();
  filteredProducts = products.filter(({ title }) => title.toLowerCase().includes(inputValue));
  displayProducts();
});

// Filter Buttons
const companiesDOM = document.querySelector('.companies');

const displayButtons = () => {
  const buttons = ['all', ...new Set(products.map(({ company }) => company))];
  companiesDOM.innerHTML = buttons.map(company => 
    `<button class='company-btn' data-id="${company}">${company}</button>`
  ).join('');
};

displayButtons();

companiesDOM.addEventListener('click', ({ target }) => {
  if (target.classList.contains('company-btn')) {
    filteredProducts = target.dataset.id === 'all' ? [...products] : products.filter(({ company }) => company === target.dataset.id);
    searchInput.value = '';
    displayProducts();
  }
});
