let gridContainer = document.querySelector("#gridContainer");
let myLibrary = [];
let addBookBtn = document.querySelector("#addBookBtn    ");
let bookForm = document.getElementById("newBookForm");
let form = document.getElementById("formContainer");
let titleField = document.getElementById("titleField");
let titleFieldLabel = document.getElementById("titleFieldLabel");
let authorField = document.getElementById("authorField");
let authorFieldLabel = document.getElementById("authorFieldLabel");
let pagesField = document.getElementById("pagesField");
let pagesFieldLabel = document.getElementById("pagesFieldLabel");
let submitBtn = document.querySelector("#submit");
let readCheckBox = document.querySelector("#read");
let htmlArea = document.querySelector("html");


// Object Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

// Template books for display before adding local cache
addBookToLibrary("Empire of Silver", "Conn Iggulden", 573, "true");
addBookToLibrary("Colorless Tsukuru Tazaki and his Years of Pilgrimage", "Haruki Murakami", 613, "true");
addBookToLibrary("Heroes", "Stephen Fry", 411, "false");

// loops over MyLibrary objects to display each book. Creates a card and information based on each objects key values.
function displayCurrentBooks() {
    for (i = 0; i < myLibrary.length; i++) {
        let createCard = document.createElement("section");
        let createTitle = document.createElement("h4");
        let createAuthor = document.createElement("p");
        let createPages = document.createElement("p");
        let createRead = document.createElement("button");
        let createRemove = document.createElement("button");
        let buttonsContainer = document.createElement("div");
        // write information.
        createTitle.innerHTML = myLibrary[i].title;
        createAuthor.innerHTML = "Author: " + myLibrary[i].author;
        createPages.innerHTML = "Pages: " + myLibrary[i].pages;
        createRead.innerHTML = "Read?";
        createRemove.innerHTML = "Remove";

        createRemove.setAttribute("data-index", i);
        createRead.setAttribute("data-index", i);
        
        // styling.
        createCard.classList.add("bookCard");
        createTitle.classList.add("itemSpacing")
        createAuthor.classList.add("itemSpacing")
        createPages.classList.add("itemSpacing")
        createRead.classList.add("itemSpacing");
        createTitle.classList.add("cardTitle");
        createAuthor.classList.add("cardAuthor");
        createPages.classList.add("cardPages");
        createRemove.classList.add("cardRemove");
        createRemove.classList.add("itemSpacing");
        createRead.classList.add("cardRead");
        buttonsContainer.classList.add("buttonsContainer");
        if (myLibrary[i].read === "true" || myLibrary[i].read === "on")  createCard.classList.add("bookRead");
        // appending.
        createCard.appendChild(createTitle);
        createCard.appendChild(createAuthor);
        createCard.appendChild(createPages);
        buttonsContainer.appendChild(createRead);
        buttonsContainer.appendChild(createRemove);
        createCard.appendChild(buttonsContainer);
        // adding to document.
        gridContainer.appendChild(createCard);
    }
}

displayCurrentBooks();

// pushes new book from constructor into myLibrary array.
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read)); 
};

// create a card and information based on forms input values. Add to myLibrary array.
function displayNewBook() {
    let lastBook = myLibrary.pop();
    myLibrary.push(lastBook);
    // create items.
    let createCard = document.createElement("section");
    let createTitle = document.createElement("h4");
    let createAuthor = document.createElement("p");
    let createPages = document.createElement("p");
    let createRead = document.createElement("button");
    let createRemove = document.createElement("button");
    let buttonsContainer = document.createElement("div");
    // write information.
    createTitle.innerHTML = lastBook.title;
    createAuthor.innerHTML = "Author: " + lastBook.author;
    createPages.innerHTML = "Pages: " + lastBook.pages;
    createRead.innerHTML = "Read?";
    createRemove.innerHTML = "Remove";
    createRead.setAttribute("data-index", myLibrary.length - 1);
    createRemove.setAttribute("data-index", myLibrary.length - 1);

    // styling.
    createCard.classList.add("bookCard");
    createTitle.classList.add("itemSpacing")
    createAuthor.classList.add("itemSpacing")
    createPages.classList.add("itemSpacing")
    createRead.classList.add("itemSpacing");
    createTitle.classList.add("cardTitle");
    createAuthor.classList.add("cardAuthor");
    createRead.classList.add("cardRead");
    createRemove.classList.add("cardRemove");
    createRemove.classList.add("itemSpacing");
    buttonsContainer.classList.add("buttonsContainer");
    if (lastBook.read === "true" || lastBook.read === "on") createCard.classList.add("bookRead");
    // appending.
    createCard.appendChild(createTitle);    
    createCard.appendChild(createAuthor);
    createCard.appendChild(createPages);
    buttonsContainer.appendChild(createRead);
    buttonsContainer.appendChild(createRemove);
    createCard.appendChild(buttonsContainer);

    // adding to document.
    gridContainer.appendChild(createCard);

    createRead.addEventListener("mouseenter", () => {
        createRead.style.cssText = "background-color: rgba(101, 191, 230, 1); cursor: pointer; border: 2px solid black;"
    });

    createRead.addEventListener("mouseleave", () => {
        createRead.style.cssText = "";
    });

    createRemove.addEventListener("mouseenter", () => {
        createRemove.style.cssText = "background-color: rgba(101, 191, 230, 1); cursor: pointer; border: 2px solid black;"
    });

    createRemove.addEventListener("mouseleave", () => {
        createRemove.style.cssText = "";
    });

    createRead.addEventListener("click", () => {
        if (createRead.parentElement.classList.contains("bookRead")) {
            myLibrary[createRead.dataset.index].read = "false";
            createRead.parentElement.parentElement.classList.toggle("bookRead");
        } else {
            myLibrary[createRead.dataset.index].read = "true";
            createRead.parentElement.parentElement.classList.toggle("bookRead");
        }
    });

    createRemove.addEventListener("click", () => {
        myLibrary.splice(createRemove.dataset.index, 1, "empty");
        createRemove.parentElement.parentElement.remove();
    })
    
};
function toggleForm() {
    form.classList.toggle("hidden");
    form.classList.toggle("formIn");
    }

addBookBtn.addEventListener("click", () => {
    addBookBtn.classList.toggle("addBookAnimation");
    toggleForm();
    resetForm();
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
    for (i = 0; i < myLibrary.length; i++) {
        if (titleField.value === myLibrary[i].title) return alert("That book has already been added."); 
    }
    newBook();
    resetForm();
    toggleForm();
    displayNewBook();
    addBookBtn.classList.toggle("addBookAnimation");
})

function newBook() {
    let titleData = titleField.value;
    let authorData = authorField.value;
    let pagesData = parseInt(pagesField.value);
    let readData = readCheckBox.value;
    return addBookToLibrary(titleData, authorData, pagesData, readData);
}; 

// resets form and hides.
function resetForm() {
    titleField.value = "";
    authorField.value = "";
    pagesField.value = "";
    readCheckBox.checked = false;
    readCheckBox.value = false;
    titleFieldLabel.classList.remove("hideLabel");
    authorFieldLabel.classList.remove("hideLabel");
    pagesFieldLabel.classList.remove("hideLabel");
};

document.querySelectorAll("button").forEach(item => {
    item.addEventListener("mouseenter", () => {
        item.style.cssText = "background-color: rgba(101, 191, 230, 1); cursor: pointer; border: 2px solid black;"
    })
});

document.querySelectorAll("button").forEach(item => {
    item.addEventListener("mouseleave", () => {
        item.style.cssText = "";
    })
});
document.querySelectorAll(".cardRead").forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("readAnimation");
        if (item.parentElement.parentElement.classList.contains("bookRead")) {
            myLibrary[item.dataset.index].read = "false";
            item.parentElement.parentElement.classList.toggle("bookRead");
        } else {
            myLibrary[item.dataset.index].read = "true";
            item.parentElement.parentElement.classList.toggle("bookRead");
        }     
    })
});

document.querySelectorAll(".cardRemove").forEach(item => {
    item.addEventListener("click", () => {  
        myLibrary.splice(item.dataset.index, 1, "empty");
        item.parentElement.parentElement.remove();
    })
});

// close form if click outside of form element or descendant.
document.addEventListener("click", function(e)  {
    let clickInside = form.contains(e.target);
    let clickButton = addBookBtn.contains(e.target);
        if (clickInside === false && clickButton === false && !(form.classList.contains("hidden"))) {
            resetForm();
            toggleForm();
            addBookBtn.classList.toggle("addBookAnimation");
    }
});

// assigns proper value to checkbox when clicked.
readCheckBox.addEventListener("click", () => {
    if (readCheckBox.value === "false" || readCheckBox.vallue === false || readCheckBox.value === "off") {
        return readCheckBox.value = true;
    } else {
        return readCheckBox.value = false;
    }
});


