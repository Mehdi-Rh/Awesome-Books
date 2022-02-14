class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UI {
  static displayBooks () {
    const books = Store.getBooks();

    books.forEach((book) => UI.addbookToList(book));
  }

  static addbookToList(book) {
    const list = document.querySelector('.book-list');

    const row = document.createElement('ul');
    row.classList.add('added-book');
    row.innerHTML = `
    <li>${book.title}</li>
    <li>${book.author}</li>
    <li>    <button type="submit" class="delete">Remove</button>
    </li>
    `;


    list.appendChild(row)
  }

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
  
  // static showAlert(message, className)

  // static clearFields()
  static clearFields() {
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';    
  }
}


class Store {
  static getBooks() {
    let books = [];
    if(localStorage.getItem('books') != null) {
      books ;
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify('books'));
  }

  // static removeBook(isbn) l77


}

// 

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  const book = new Book(title,author);

  UI.addbookToList(book);
  
  Store.addBook(book);
});

document.querySelector('.book-list').addEventListener('click', (e) => {    
  UI.deleteBook(e.target);
    
  Store.removeBook(e.target.parentElement.previouselementSibling.textContent);
});