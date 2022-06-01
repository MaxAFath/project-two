const handleNewProduct = async function(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]');
    const description = document.querySelector('input[name="decription"]');
    const price = document.querySelector('input[name="price"]');

    const response = await fetch('/api/products', {
        method: 'POST',
        body: {
            name: name,
            description: description,
            price: price
        }
    })

    const file = document.querySelector('input[name="upload"]');
    const formData = new FormData();
    formData.append('file', file.files[0]);
    formData.append('product_id', response.id);
    console.log(formData.getAll('product_id'));

    const fileResponse = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData
    });

    console.log(response, fileResponse);
}

document.querySelector('#product-form').addEventListener('submit', handleNewProduct);