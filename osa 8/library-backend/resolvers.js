const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      filter = {};
      if (args.author) {
        const authors = await Author.find({ name: args.author });
        if (authors.length == 1) {
          filter = { ...filter, author: authors[0]._id };
        } else {
          return [];
        }
      }
      if (args.genre) {
        filter = { ...filter, genres: args.genre };
      }
      return Book.find(filter).populate("author");
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
      return await Author.find({});
    },

    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    bookCount: (root) => {
      return Book.collection.countDocuments({
        author: root._id,
      });
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (context.currentUser == null) {
        return null;
      }

      //Author.findOne({ name: args.author }),
      //const author = { name: args.author, id: uuid() };
      let author = await Author.findOne({ name: args.author });
      if (author == null) {
        author = new Author({ name: args.author, bookCount: 1 });

        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      const book = new Book({ ...args, author: author });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      pubsub.publish("PERSON_ADDED", { bookAdded: book });

      return book;

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

    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name });

      if (context.currentUser == null) {
        return null;
      }

      try {
        author.born = args.setBornTo;
      } catch (error) {
        throw new GraphQLError("Editing author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return author.save();
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return user;
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator("PERSON_ADDED") },
  },
};

module.exports = resolvers;
