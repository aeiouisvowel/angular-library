// a prototype for a user
export class User {
  public email: string;
  public name: string;
  public role: string;
  public profilePic: string;
  public friends: Array<string>;
  public recommends: Array<string>;
  public booksInHand: Array<{bookId: string, renewed: number}>;
  public favCategories: Array<string>;

  constructor(email: string, name: string, role: string, profilePic: string ) {
    this.email = email;
    this.name = name;
    this.role = role;
    this.profilePic = profilePic;
    this.friends = [];
    this.recommends = [];
    this.booksInHand = [];
    this.favCategories = [];
  }
}
