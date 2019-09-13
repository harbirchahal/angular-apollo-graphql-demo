export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address
  phone: string;
  website: string;
  company: Company;
  posts: Post[];
}

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
}

export type Geo = {
  lat: number;
  lng: number;
}

export type Post = {
  id: number;
  title: string;
  body: string;
  author: User;
  comments: Comment[];
}

export type Comment = {
  id: number;
  body: string;
  post: Post;
  author: User;
}
