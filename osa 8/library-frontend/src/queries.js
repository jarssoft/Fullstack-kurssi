import { gql } from "@apollo/client";

export const ALL_PERSONS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      id
    }
  }
`;

export const FIND_PERSON = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;
