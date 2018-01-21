//  Versione Js ES5
// Costruttore Libri
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


// UI Costruttore
function UI() {}

    UI.prototype.addBookToList = function(book) {
      const list = document.getElementById('book-list');
      // Crea un elemento tr
      const row = document.createElement('tr');
      // Inserisci colonne
      row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
      `;

      list.appendChild(row);
    };

    // Mostra Messaggio Errore
    UI.prototype.showAlert = function (message, className) {
      // Crea un div
      const div = document.createElement('div');
      // Aggiungi classe
      div.className = `alert ${className}`;
      // Aggiungi testo
      div.appendChild(document.createTextNode(message));
      // Ottieni il parent
      const container = document.querySelector('.container');
      // Ottieni il form
      const form = document.querySelector('#book-form');
      // Aggiungi il messaggio di errore in un div prima del form
      container.insertBefore(div, form);
      // Eliminazione del messaggio dopo 3 secondi
      setTimeout(function(){
        document.querySelector('.alert').remove();

      }, 3000);
    }

    // Cancella la singola row e quindi il libro
    UI.prototype.deleteBook = function(target) {
      if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
      }
    }


    // Cancella campi
   UI.prototype.clearFields = function clearFields() {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
    }

// Metodo Eventi SUBMIT e aggiunta libri
document.getElementById('book-form').addEventListener('submit', function(e) {
  // Ottieni i valori dal form
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  

    // Instanzia Book
      const book = new Book(title, author, isbn);

      // Instanzia UI
      const ui = new UI(); 

      // Validazione
      if(title === '' || author === '' || isbn === '') {
        // Messaggio di errore
        ui.showAlert('Si prega di riempire tutti i campi', 'error');
      } else {
      // aggiungi i libri alla lista
        ui.addBookToList(book);

        // Mostra il corretto inserimento del libro
        ui.showAlert('Libro aggiunto !', 'success');

      // Cancella campi
        ui.clearFields();
      }      

        e.preventDefault();
});

// Metodo Eventi DELETE e rimozione libri
  document.getElementById('book-list').addEventListener('click', function (e) {
    
    // Instanzia UI
    const ui = new UI();

    ui.deleteBook(e.target);

    // Mostra messaggio
    ui.showAlert('Libro rimosso !', 'success');
    
    e.preventDefault();
  });

