// a prototype for a book
export class Book {
  public bookId: string;
  public isbn13: string;
  public isbn10: string;
  public title: string;
  public author: string;
  public genre: string;
  public thumbnail: string;
  public description: string;
  public location: string;
  public availability: {
    availableBy: string,
    issuedTo: string,
    issuedDate: string
  };
  public avgRating: {
    rating: number,
    givenBy: number
  };
  public reviews: Array<
  {
    reviewBy: string,
    rating: number,
    comment: string
  }
  >;

  constructor() {
    this.bookId = '';
    this.isbn13 = '';
    this.isbn10 = '';
    this.title = '';
    this.author = '';
    this.genre = '';
    this.thumbnail = '';
    this.location = '';
    this.description = '';
    this.availability = {
      availableBy: 'Available',
      issuedTo: '',
      issuedDate: ''
    };
    this.avgRating = {
      rating: 0,
      givenBy: 0
    };
    this.reviews = [];
  }
}
