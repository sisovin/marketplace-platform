document.addEventListener('DOMContentLoaded', function () {
  const productItems = document.querySelectorAll('.shop-products li');

  productItems.forEach((item) => {
    item.addEventListener('click', function () {
      alert(`Product: ${this.querySelector('h3').innerText}`);
    });
  });
});
