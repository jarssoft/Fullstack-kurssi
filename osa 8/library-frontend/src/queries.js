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

export const CREATE_PERSON = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;
