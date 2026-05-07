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

        const books = Store.getBooks();

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
        <td class="text-xl p-4 ">
            <a href="#" class="bg-red-500 text-white p-2 delete">X</a>
        </td>
        <td class="text-xl p-4 ">
            <a href="#" class=" edit ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-12 rounded-lg border border-gray-300 p-2">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>
            </a>
        </td>
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

    static editBook(el){
            const row = el.closest("tr");

            // Get the current values from the table row
            const title = row.cells[0].innerText;
            const author = row.cells[1].innerText;
            const isbn = row.cells[2].innerText;

            // Fill the inputs 
            document.querySelector("#title").value = title;
            document.querySelector("#author").value = author;
            document.querySelector("#isbn").value = isbn;

            document.querySelector("#isbn").readOnly = true;

            const submitBtn = document.querySelector('input[type = "submit"]');
            submitBtn.value = "Update Book";

        
    }


    static resetForm(){
        this.clearFields();
        document.querySelector("#isbn").readOnly = false;
        const submitBtn = document.querySelector('input[type = "submit"]');
        submitBtn.value = "Add Book";

    }
    static searchBooks(e){
        // input to search
        const searchedTerm = e.target.value.toLowerCase();
        
        // Get the books from the storage
        const books = Store.getBooks();

        // filter method to find matches
        const filteredBooks = books.filter(book => {
            return(
                book.title.toLowerCase().includes(searchedTerm) ||
                book.author.toLowerCase().includes(searchedTerm) ||
                book.isbn.includes(searchedTerm)
            );
        });
        
        // Clear the current UI
        document.getElementById("book-list").innerHTML = "";

        //Re-display the only filtered books
        filteredBooks.forEach(book => UI.addBookToList(book))
    }
}

// Storage class : Handles storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem("books") === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));

    }
    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }

    static updateBook(updatedBook){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === updatedBook.isbn){
                books[index] = updatedBook;
            }
        })

        localStorage.setItem("books", JSON.stringify(books));
    }
}

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
    const submitBtnValue = document.querySelector('input[type="submit"]').value;

    // Validate form
    if(title === "" || author === "" || isbn === ""){
        UI.showAlert("Please fill in all fields", "red");
    }else{
        //Intatiate Book
        const book = new Book(title, author, isbn);
        if(submitBtnValue === "Add Book"){
                // Add Book to UI
                UI.addBookToList(book);

                // Add Book to store
                Store.addBook(book);

                // Success message
                UI.showAlert("Book Added", "green")
                UI.clearFields();
        }else{
            // Edit Mode
            Store.updateBook(book);
            document.querySelector('#book-list').innerHTML = '';
            UI.displayBooks();
            UI.showAlert('Book Updated', 'green');
            UI.resetForm();
        }
        
    }
})

// Event : Remove / Edit a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
    
    if(e.target.classList.contains("delete")){
        UI.deleteBook(e.target)

        // Remove from store
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

        // Removed message
        UI.showAlert("Book Removed", "green")
    }

    //Edit a book
    const editBtn = e.target.closest(".edit");
    if(editBtn){
        UI.editBook(editBtn);
    }
});

// Event : Search / Filter books

document.querySelector(".search").addEventListener("input", (e) => {
    UI.searchBooks(e);
})