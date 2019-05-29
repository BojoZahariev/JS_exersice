function book(title, author, pages, read) {
    this.title = title;
    this.autor = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return title + ", " + author + ", " + pages + ", " + read;
    }
}

const book1 = new book("Vinetou", "Karl May", "450", "read it twice");
console.log(book1.info());
