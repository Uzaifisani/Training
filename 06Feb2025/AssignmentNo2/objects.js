const BookLibrary = {
  books: [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      yearPublished: 1925,
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      yearPublished: 1960,
    },
  ],
  addBook(book) {
    this.books.push(book);
    console.log(`Book added: "${book.title}" by ${book.author}`);
  },
  getbookByAuthor(author) {
    this.books.filter((book) => {
      if (book.author === author) {
        return book.author;
      }
    });
  },
  removeBook(title) {
    const index = this.books.findIndex((book) => book.title === title);
    if (index !== -1) {
      this.books.splice(index, 1);
      console.log(`Book removed: "${title}"`);
    } else {
      console.log(`Book not found: "${title}"`);
    }
  },
  getAllBooks() {
    return this.books.map((book) => book.title);
  },
};

//console.log(BookLibrary);
BookLibrary.addBook({
  title: "1984",
  author: "George Orwell",
  yearPublished: 1949,
});

console.log(
  "To Kill a Mockingbird:",
  BookLibrary.getbookByAuthor("Harper Lee")
);
BookLibrary.removeBook("1984");
console.log("All Books:", BookLibrary.getAllBooks());

// output:
// PS C:\Users\uzaif\OneDrive\Desktop\CompanyAssignment\Training\06Feb2025\AssignmentNo2> node .\objects.js
// Book added: "1984" by George Orwell
// Books by George Orwell: undefined
// Book removed: "1984"
// All Books: [ 'The Great Gatsby', 'To Kill a Mockingbird' ]
