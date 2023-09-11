const addBookButton = document.getElementById("addBookButton")
const newBookFormContainer = document.querySelector(".formContainer")
const newBookForm = document.querySelector("form")
const newBook = document.getElementById("title")
const newAuthor = document.getElementById("author")
const newPageNumber = document.getElementById("pages")
const readStatusCheckBox = document.getElementById("readStatus")
const submitButton = document.getElementById("submit")
const books = document.querySelector(".books")

const myLibrary = [{
  "title": "harry Potter and The Philosopher Stone",
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
}];

function Book(title, author, pages, readStatus) {
  this.title = title
  this.author = author
  this.pages = pages
  this.readStatus = readStatus
}

function updateLibary() {
  // clear the library from the previous data
  const bookItems = document.querySelectorAll(".bookItem");
  bookItems.forEach((item) => {
    item.remove();
  });
  // recalculate the library
  for (const element of myLibrary) {
    let bookItem = document.createElement("div")
    console.log(element.title)
    bookItem.classList = "bookItem"
    const bookTitle = document.createElement("p")
    const bookAuthor = document.createElement("p")
    const bookPages = document.createElement("p")
    const readingStatus = document.createElement("button")
    books.append(bookItem)
    bookItem.append(bookTitle)
    bookItem.append(bookAuthor)
    bookItem.append(bookPages)
    bookItem.append(readingStatus)

    bookTitle.innerHTML = element.title
    bookAuthor.innerHTML = element.author
    bookPages.innerHTML = element.pages
    readingStatus.innerHTML = element.readStatus ? "Read" : "Not Read"
    readingStatus.classList = element.readStatus ? "bookRead" : "bookNotRead"
    bookItem.classList.add("bookItem")
  }
}

function addBookToLibrary(bookTitle) {
  myLibrary.push(new Book(newBook.value, newAuthor.value, newPageNumber.value, readStatusCheckBox.checked))
}


addBookButton.addEventListener("click", () => {
  newBookFormContainer.classList.toggle("active");
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block"
  overlay.addEventListener("click", () => {
    overlay.style.display = "none"
    newBookFormContainer.classList.remove("active");
  })
});

submitButton.addEventListener("click", (e) =>  {
  addBookToLibrary(newBook.value)
  newBookFormContainer.classList.toggle("active")
  updateLibary()
  overlay.style.display = "none"
  newBookForm.reset()
})


updateLibary()