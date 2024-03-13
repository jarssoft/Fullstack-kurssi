const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

const mongoose = require("mongoose");
//mongoose.set('strictQuery', false)
const Book = require("./models/book");
const Author = require("./models/author");

require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

/*
  you can remove the placeholder query once your first one has been implemented 

  bookCount ja authorCount
*/

const typeDefs = `

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  } 

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  } 
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author    
    }
`;

const resolvers = {
  Query: {
    //bookCount: () => books.length,
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // filters missing
      return Book.find({});
    },
    /*
    allBooks: (root, args) =>
      books.filter(
        (book) =>
          (!args.author || book.author === args.author) &&
          (!args.genre || book.genres.includes(args.genre))
      ),
      */
    allAuthors: async (root, args) => {
      // filters missing
      const authors = await Author.find({});

      return authors.map((oldauthor) => {
        oldauthor.bookCount = Book.collection.countDocuments({
          author: oldauthor._id,
        });
        return oldauthor;
      });
    },
  },

  /*
  Author: {
    bookCount: (root) => {
      return books.filter((book) => book.author === root.name).length;
    },
  },
  */
  Mutation: {
    addBook: async (root, args) => {
      //Author.findOne({ name: args.author }),
      //const author = { name: args.author, id: uuid() };
      const author = new Author({ name: args.author, bookCount: 1 });
      await author.save();
      const book = new Book({ ...args, author: author });
      //author.save();
      return book.save();
      /*
      if (authors.filter((author) => author.name === args.author).length == 0) {
        const author = { name: args.author, id: uuid() };
        authors = authors.concat(author);
      }
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      return book;
      */
    },
    /*
    editAuthor: (root, args) => {
      match = authors.filter((author) => author.name === args.name);
      if (match.length > 0) {
        const updateauthor = { ...match[0], born: args.setBornTo };
        authors = authors.map((oldauthor) =>
          oldauthor.name === args.name ? updateauthor : oldauthor
        );
        return updateauthor;
      } else {
        return null;
      }
    },
    */
  },
};

/*
const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      // filters missing
      return Person.find({});
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  Mutation: {
    addPerson: async (root, args) => {
      const person = new Person({ ...args });
      return person.save();
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;
      return person.save();
    },
  },
};
*/
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
