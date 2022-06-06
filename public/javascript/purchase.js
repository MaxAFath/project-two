const product_id = window.location.href.split('/')[window.location.href.split('/').length - 1]

const handlePurchase = function() {
    fetch('/api/products/purchase/' + product_id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
    }).then(response => {
        if(response.ok) {
            location.reload();
        }
    })
}






document.querySelector('.purchase-button').addEventListener('click', handlePurchase);