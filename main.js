// Get DOM elements
const addBookButton = document.getElementById("addBookButton");
const newBookFormContainer = document.querySelector(".formContainer");
const newBookForm = document.querySelector("form");
const newBook = document.getElementById("title");
const newAuthor = document.getElementById("author");
const newPageNumber = document.getElementById("pages");
const readStatusCheckBox = document.getElementById("readStatus");
const submitButton = document.getElementById("submit");
const books = document.querySelector(".books");

// Sample book data
const myLibrary = [
  {
    "title": "Harry Potter and The Philosopher Stone",
    "author": "JK Rowling",
    "pages": "223",
    "readStatus": true
  },
  {
    "title": "21 Lessons for the 21st Century",
    "author": "Yuval Noah Harari",
    "pages": "416",
    "readStatus": false
  },
  {
    "title": "Casino Royale",
    "author": "Ian Fleming",
    "pages": "224",
    "readStatus": true
  }
];

// Book constructor
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

// Function to update the library display
function updateLibrary() {
  // Clear the library display
  const bookItems = document.querySelectorAll(".bookItem");
  bookItems.forEach((item) => {
    item.remove();
  });

  // Recreate the library display based on the myLibrary array
  for (const element of myLibrary) {
    let bookItem = document.createElement("div");
    bookItem.classList = "bookItem";
    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const readingStatus = document.createElement("button");
    const deleteButton = document.createElement("button");

    // Append elements to the DOM
    books.append(bookItem);
    bookItem.append(bookTitle);
    bookItem.append(bookAuthor);
    bookItem.append(bookPages);
    bookItem.append(readingStatus);
    bookItem.append(deleteButton);

    // Set text and classes
    bookTitle.innerText = element.title;
    bookAuthor.innerText = element.author;
    bookPages.innerText = `${element.pages} pages`;
    deleteButton.innerText = "Remove";
    deleteButton.classList = "deleteButton";
    readingStatus.innerText = element.readStatus ? "Read" : "Not Read";
    readingStatus.classList = element.readStatus ? "bookRead" : "bookNotRead";
    bookItem.classList.add("bookItem");

    // Add event listeners to toggle read status and delete book
    readingStatus.addEventListener('click', () => {
      if (readingStatus.classList.contains("bookRead")) {
        readingStatus.classList.replace("bookRead", "bookNotRead");
        element.readStatus = false;
        readingStatus.innerText = "Not Read";
      } else {
        readingStatus.classList.replace("bookNotRead", "bookRead");
        readingStatus.innerText = "Read";
        element.readStatus = true;
      }
    });

    deleteButton.addEventListener("click", () => {
      const index = myLibrary.indexOf(element);
      if (index > -1) {
        myLibrary.splice(index, 1);
      }
      bookItem.remove();
    });
  }
}

// Function to add a new book to the library
function addBookToLibrary(bookTitle) {
  myLibrary.push(new Book(newBook.value, newAuthor.value, newPageNumber.value, readStatusCheckBox.checked));
}


// Event listeners
addBookButton.addEventListener("click", () => {
  newBookFormContainer.classList.toggle("active");
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    newBookFormContainer.classList.remove("active");
  });

  document.querySelector(".warning").remove()
});

submitButton.addEventListener("click", (e) =>  {
  if (!newBook.value || !newAuthor.value || !newPageNumber.value) {
    if (!document.body.contains(document.querySelector(".warning"))) {
      const warning = document.createElement("p");
      warning.classList.add("warning");
      warning.innerText = "‼ Complete all fields";
      newBookFormContainer.append(warning);
      
    }
  } else {
    addBookToLibrary(newBook.value);
    newBookFormContainer.classList.toggle("active");
    updateLibrary(); // Update the library display
    overlay.style.display = "none";
    newBookForm.reset();
  }

});

// Initial library display update
updateLibrary();
