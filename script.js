// Book Class : Represents a Book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};

// UI class : Handles UI Tasks
class UI{
    static displayBooks(){
        const storedBooks = [
            {
                title : "Book One",
                author : "John",
                isbn : 1234
            },
            
            {
                title : "Book Two",
                author : "Jenny",
                isbn : 5678
            }
        ];

        const books = storedBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.getElementById("book-list");

        const row = document.createElement("tr");
        row.classList.add("border", "border-slate-300")
        row.innerHTML = `
        <td class="text-xl font-semibold p-4 ">${book.title}</td>
        <td class="text-xl font-semibold p-4 ">${book.author}</td>
        <td class="text-xl font-semibold p-4 ">${book.isbn}</td>
        <td class="text-xl p-4 "><a href="#" class="bg-red-500 text-white p-2
        delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static clearFields(){
        const title = document.querySelector("#title").value = "";
        const author = document.querySelector("#author").value = "";
        const isbn = document.querySelector("#isbn").value = "";
    }

    static deleteBook(el){
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement("div");
        div.className = `alert text-white h-12 text-2xl p-2 m-2 bg-${className}-700`;
        const text = document.createTextNode(message);
        div.appendChild(text);
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector(".alert").remove(), 3000)
    };

    
}

// Storage class : Handles storage

// Event : Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks)

// Event : Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
    // prevent actual submit 
    e.preventDefault();

    // Get Form Values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    // Validate form
    if(title === "" || author === "" || isbn === ""){
        UI.showAlert("Please fill in all fields", "red");
    }else{
        //Intatiate Book
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Success message
    UI.showAlert("Book Added", "green")

    //Clear Fields
    UI.clearFields();
    }

    
})

// Event : Remove a Book

document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.deleteBook(e.target)

    UI.showAlert("Book Removed", "green")
})