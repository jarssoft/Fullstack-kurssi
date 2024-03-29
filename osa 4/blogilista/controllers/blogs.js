const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response, next) => {
  try {
    let blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  //console.log(`pyytäjä ${request.user}`);

  try {
    if (!request.user) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(request.user);

    blog.user = user.toJSON().id;

    const saved = await blog.save();
    console.log(saved);

    user.blogs = user.blogs.concat(saved.id);
    console.log(user);

    await user.save();
    response.status(201).json(saved);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  console.log("oma delete-metodi");

  try {
    if (!request.user) {
      return response.status(401).json({ error: "token invalid" });
    }

    const blog = await Blog.findById(request.params.id);
    console.log(`Poistetaan ${blog}:n blogi`);

    const user = await User.findById(request.user);
    console.log(`Pyytäjä: ${user}`);

    if (blog.user.toString() !== request.user.toString()) {
      return response
        .status(403)
        .json({ error: "user is not owner this data" });
    }

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const person = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    await Blog.findByIdAndUpdate(request.params.id, person, { new: true });
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/:id/comments", async (request, response, next) => {
  const body = request.body;

  try {
    console.log(request.params.id);
    let blog = await Blog.findById(request.params.id);

    console.log(blog);

    comments = [body.comment];
    if (blog.comments) {
      comments = comments.concat(blog.comments);
    }

    const newblog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      comments: comments,
    };

    console.log(newblog);

    try {
      await Blog.findByIdAndUpdate(request.params.id, newblog, { new: true });
      response.status(204).end();
    } catch (exception) {
      next(exception);
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get("/:id/", async (request, response, next) => {
  try {
    let blog = await Blog.findById(request.params.id);
    response.json(blog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
