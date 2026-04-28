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

        row.innerHTML = `
        <td class="text-xl font-semibold p-2">${book.title}</td>
        <td class="text-xl font-semibold p-2">${book.author}</td>
        <td class="text-xl font-semibold p-2">${book.isbn}</td>
        <td class="text-xl font-semibold p-2"><a href="#" class="bg-red-500 text-white
        delete">X</a></td>
        `;

        list.appendChild(row);
    }
}

// Storage class : Handles storage

// Event : Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks)

// Event : Add a Book

// Event : Remove a Book