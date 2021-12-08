const INCOMPLETE_BOOK_LIST_ID = "incompleteBookshelfList";
const COMPLETE_BOOK_LIST_ID = "completeBookshelfList";
const BOOK_LIST_ID = "bookId";

function addBook() {
    const inputanJudul = document.getElementById("inputBookTitle").value;
    const inputanPenulis = document.getElementById("inputBookAuthor").value;
    const inputanTahun = document.getElementById("inputBookYear").value;

    let checkbox = document.getElementById("inputBookIsComplete");

    if (checkbox.checked) {
        checkbox = true;
    }
    else {
        checkbox = false;
    }

    const incompletedBOOKList = document.getElementById(INCOMPLETE_BOOK_LIST_ID);
    const completedBOOKList = document.getElementById(COMPLETE_BOOK_LIST_ID);

    const newBook = makeBookList(inputanJudul, inputanPenulis, inputanTahun, checkbox);

    const bookObject = composeBookObject(inputanJudul, inputanPenulis, inputanTahun, checkbox);
    newBook[BOOK_LIST_ID] = bookObject.id;
    books.push(bookObject);

    if (checkbox) {
        completedBOOKList.append(newBook);
    }
    else {
        incompletedBOOKList.append(newBook);
    }

    updateBook();
}


function makeBookList(judul, penulis, tahun, checkbox) {

    const textTitle = document.createElement("h3");
    textTitle.innerText = judul;

    const textAuthor = document.createElement("p");
    textAuthor.classList.add("author");
    textAuthor.innerText = "Penulis : " + penulis;

    const textYear = document.createElement("p");
    textYear.classList.add("year");
    textYear.innerText = "Tahun : " + tahun;

    const textButton = document.createElement("div");
    textButton.classList.add("action");

    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item");
    textContainer.append(textTitle, textAuthor, textYear);

    if (checkbox) {
        textButton.append(createunfinishedBtn(), createdeleteBtn());
        textContainer.append(textButton);
    }
    else {
        textButton.append(createfinishedBtn(), createdeleteBtn());
        textContainer.append(textButton);
    }

    return textContainer;
}

function createButton(buttonTypeClass, text, color, eventListener) {
    const button = document.createElement("button");
    button.innerText = text;
    button.classList = buttonTypeClass;
    button.classList = color;
    button.addEventListener("click", function (e) {
        eventListener(e);
    });
    return button;
}

function createfinishedBtn() {
    return createButton("finishBtn", "Selesai Dibaca", "green", function (e) {
        if (confirm("Apakah Anda yakin sudah selesai membaca buku?")) {
            addBookToCompleted(e.target.parentElement.parentElement);
        }
    });
}

function createunfinishedBtn() {
    return createButton("unfinishBtn", "Belum Selesai Dibaca", "green", function (e) {
        if (confirm("Apakah Anda yakin ingin mengembalikan ke keranjang belum selesai?")) {
            addBookToNotCompleted(e.target.parentElement.parentElement);
        }
    });
}

function createdeleteBtn() {
    return createButton("deleteBtn", "Hapus Buku", "red", function (e) {
        removeBookFromList(e.target.parentElement.parentElement)
    })
}

function removeBookFromList(taskElement) {
    const bookPosition = findbookIndex(taskElement[BOOK_LIST_ID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateBook();

}

function addBookToCompleted(taskElement) {
    const isCompleted = document.getElementById(COMPLETE_BOOK_LIST_ID);

    const inputanJudul = taskElement.querySelector(".book_item > h3").innerText;
    const inputanPenulis = taskElement.querySelector(".book_item > .author").innerText;
    const inputanTahun = taskElement.querySelector(".book_item > .year").innerText;

    const newBook = makeBookList(inputanJudul, inputanPenulis, inputanTahun, true);
    const book = findBook(taskElement[BOOK_LIST_ID]);
    book.checkbox = true;
    newBook[BOOK_LIST_ID] = book.id;

    isCompleted.append(newBook);

    taskElement.remove();

    updateBook();
}

function addBookToNotCompleted(taskElement) {
    const isNotCompleted = document.getElementById(INCOMPLETE_BOOK_LIST_ID);

    const inputanJudul = taskElement.querySelector(".book_item > h3").innerText;
    const inputanPenulis = taskElement.querySelector(".book_item > .author").innerText;
    const inputanTahun = taskElement.querySelector(".book_item > .year").innerText;

    const newBook = makeBookList(inputanJudul, inputanPenulis, inputanTahun, false);
    const book = findBook(taskElement[BOOK_LIST_ID]);
    book.checkbox = false;
    newBook[BOOK_LIST_ID] = book.id;

    isNotCompleted.append(newBook);

    taskElement.remove();

    updateBook();
}

function refreshDataFromBooks() {
    const isNotCompleted = document.getElementById(INCOMPLETE_BOOK_LIST_ID);
    const isCompleted = document.getElementById(COMPLETE_BOOK_LIST_ID);

    for (book of books) {
        const newBook = makeBookList(book.judul, book.penulis, book.tahun, book.checkbox);
        newBook[BOOK_LIST_ID] = book.id;

        if (book.checkbox) {
            isCompleted.append(newBook);
        } else {
            isNotCompleted.append(newBook);
        }
    }
}



