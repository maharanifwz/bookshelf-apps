const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageExist(){
   if(typeof(Storage) === undefined){
        return false;
   } 
   return true;
}

function saveBook(){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event('ondatasaved'));
}

function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if(data !== null){
        books = data;
    }

    document.dispatchEvent(new Event('ondataloaded'));
}

function updateBook(){
    if(isStorageExist()){
        saveBook();
    }
}

function composeBookObject(judul, penulis, tahun, checkbox){
    return{
        id: +new Date(),
        judul,
        penulis,
        tahun,
        checkbox
    }
}

function findBook(bookId){
    for(book of books){
        if(book.id === bookId)
        return book;
    }
    return null;
}

function findbookIndex(bookId){
    let index = 0;
    for(book of books){
        if(book.id === bookId)
        return index;

        index++;
    }
    return -1;
}
