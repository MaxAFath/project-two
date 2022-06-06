const handleNewProduct = async function (event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]');
    const description = document.querySelector('textarea[name="description"]');
    const price = document.querySelector('input[name="price"]');

    const response = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({
            name: name.value,
            description: description.value,
            price: parseFloat(price.value)
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    const parsedResponse = await response.json();

    const file = document.querySelector('input[name="upload"]');
    const formData = new FormData();
    formData.append('file', file.files[0], 'file-' + parsedResponse.id);

    const fileResponse = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData
    });

    if (fileResponse && response) {
        window.location.reload();
    }
}

document.querySelector('#product-form').addEventListener('submit', handleNewProduct);