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

var myLibrary

// Sample book data
// if there's already data saved in localstorage, use that, otherwise use the sample data
if (localStorage.getItem('data') === null) {
    myLibrary = [
    {
      "title": "Life 3.0",
      "author": "Max Tegmark",
      "pages": "384",
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
  localStorage.setItem('data', JSON.stringify(myLibrary));
} else {
  var myLibrary = JSON.parse(localStorage.getItem('data'));
}

// Book constructor
class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
}

// Function to update the library display
function updateLibrary() {
  // Clear the library display
  const bookItems = document.querySelectorAll(".bookItem");
  bookItems.forEach((item) => {
    item.remove();
  });

  // Recreate the library display based on the myLibrary array
  myLibrary = JSON.parse(localStorage.getItem('data'));
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
        localStorage.setItem('data', JSON.stringify(myLibrary));
      }
      bookItem.remove();
    });
  }
}

// Function to add a new book to the library
function addBookToLibrary(bookTitle) {
  myLibrary.push(new Book(newBook.value, newAuthor.value, newPageNumber.value, readStatusCheckBox.checked));
  localStorage.setItem('data', JSON.stringify(myLibrary));
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
  // Get the element
  const warningElement = document.querySelector(".warning");
  // Check if the element is not null
  if(warningElement !== null) {
    // Remove the element
    warningElement.remove();
  }
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
