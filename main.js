const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title
  this.author = author
  this.pages = pages
  this.readStatus = readStatus
}

function addBookToLibrary(newBook) {
  // do stuff here
}

const addBookButton = document.getElementById("addBookButton")
const newBookForm = document.querySelector(".formContainer")
const newBook = document.getElementById("title")
const newAuthor = document.getElementById("author")
const newPageNumber = document.getElementById("pages")
const readStatusCheckBox = document.getElementById("readStatus")

addBookButton.addEventListener("click", ()=> {
  newBookForm.classList.toggle("active")
})