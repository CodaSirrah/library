let gridContainer = document.querySelector("#gridContainer");
let myLibrary = [];
let btnNewBook = document.querySelector("#newForm");
let bookForm = document.getElementById("newBookForm");
let form = document.getElementById("formContainer");
let titleField = document.getElementById("titleField");
let titleFieldLabel = document.getElementById("titleFieldLabel");
let authorField = document.getElementById("authorField");
let authorFieldLabel = document.getElementById("authorFieldLabel");
let pagesField = document.getElementById("pagesField");
let pagesFieldLabel = document.getElementById("pagesFieldLabel");
let submitBtn = document.querySelector("#submit");
let read = document.querySelector("#read");


// Object Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

addBookToLibrary("Empire of Silver", "Conn Iggulden", 573, true);
addBookToLibrary("Colorless Tsukuru Tazaki and his Years of Pilgrimage", "Haruki Murakami", 613, true);

function displayCurrentBooks() {
    for (i = 0; i < myLibrary.length; i++) {
        let createCard = document.createElement("section");
        let createTitle = document.createElement("h4");
        let createAuthor = document.createElement("p");
        let createPages = document.createElement("p");
        let createRead = document.createElement("button");
    
        // write information.
        createTitle.innerHTML = myLibrary[i].title;
        createAuthor.innerHTML = myLibrary[i].author;
        createPages.innerHTML = myLibrary[i].pages;
        createRead.innerHTML = "Read?";
    
        // styling.
        createCard.classList.add("bookCard");
        createTitle.classList.add("itemSpacing")
        createAuthor.classList.add("itemSpacing")
        createPages.classList.add("itemSpacing")
        createRead.classList.add("itemSpacing");
        createRead.classList.add("readButton");
        
        // appending.
        createCard.appendChild(createTitle);
        createCard.appendChild(createAuthor);
        createCard.appendChild(createPages);
        createCard.appendChild(createRead);
    
        // adding to document.
        gridContainer.appendChild(createCard);
    }
}

displayCurrentBooks();

// pushes new book from constructor into myLibrary array.
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read)); 
};

function displayBooks() {

    let lastBook = myLibrary.pop();
    myLibrary.push(lastBook);
    // create items.
    let createCard = document.createElement("section");
    let createTitle = document.createElement("h4");
    let createAuthor = document.createElement("p");
    let createPages = document.createElement("p");
    let createRead = document.createElement("button");

    // write information.
    createTitle.innerHTML = lastBook.title;
    createAuthor.innerHTML = lastBook.author;
    createPages.innerHTML = lastBook.pages;
    createRead.innerHTML = "Read?";

    // styling.
    createCard.classList.add("bookCard");
    createTitle.classList.add("itemSpacing")
    createAuthor.classList.add("itemSpacing")
    createPages.classList.add("itemSpacing")
    createRead.classList.add("itemSpacing");
    createRead.classList.add("readButton");
    
    // appending.
    createCard.appendChild(createTitle);
    createCard.appendChild(createAuthor);
    createCard.appendChild(createPages);
    createCard.appendChild(createRead);

    // adding to document.
    gridContainer.appendChild(createCard);
    
};
function toggleForm() {
    form.classList.toggle("hidden");
    form.classList.toggle("formIn");
    }

btnNewBook.addEventListener("click", () => {
    toggleForm();
})

titleField.addEventListener("input", () => {
    return (titleField.value !== "") ? titleFieldLabel.classList.add("hideLabel") :
        titleFieldLabel.classList.remove("hideLabel");
});

authorField.addEventListener("input", () => {
    return (authorField.value !== "") ? authorFieldLabel.classList.add("hideLabel") :
        authorFieldLabel.classList.remove("hideLabel");
});

pagesField.addEventListener("input", () => {
    return (pagesField.value !== "") ? pagesFieldLabel.classList.add("hideLabel") :
        pagesFieldLabel.classList.remove("hideLabel");
});


form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (myLibrary.title) {
        for (i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].title === titleField.value) return alert("That book has already been added.");
        }
    }
    newBook();
    resetForm();
    toggleForm();
    console.log(myLibrary);
    displayBooks();
})


function newBook() {
let titleData = titleField.value;
let authorData = authorField.value;
let pagesData = parseInt(pagesField.value);
let readData = read.value;
return addBookToLibrary(titleData, authorData, pagesData, readData);
}; 

function resetForm() {
    titleField.value = "";
    authorField.value = "";
    pagesField.value = "";
    read.value = false;
    titleFieldLabel.classList.remove("hideLabel");
    authorFieldLabel.classList.remove("hideLabel");
    pagesFieldLabel.classList.remove("hideLabel");
}