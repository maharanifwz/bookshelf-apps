const searchContainer = document.getElementById('searchBook');

searchContainer.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchBookTitle = document.getElementById('searchBookTitle').value.toLowerCase();
    const bookDescription = document.querySelectorAll("article");
    let condition = false;

    for (book of bookDescription) {
        let text = book.querySelector("article > h3").innerText;
        if (text.toLowerCase().indexOf(searchBookTitle) > -1) {
            condition = true;
            book.style.display = '';
        } else {
            book.style.display = 'none';
        }
    }

    if (condition == false) {
        alert("Maaf, buku yang Anda cari tidak tersedia");
    }

})