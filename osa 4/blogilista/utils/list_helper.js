const dummy = (blogs) => {
    return 1;
  }
  
const totalLikes = (blogs) => {

    const reducer = (sum, item) => {
        return sum + item.likes
      }

    return blogs.reduce(reducer, 0);
  }
  
  module.exports = {
    dummy, totalLikes
  }

const favoriteBlog = (blogs) => {

    const reducer = (sum, item) => {
        if(sum==undefined){
            return item
        }
        return sum.likes > item.likes ? sum : item
        }

    return blogs.reduce(reducer, undefined);
}

const authorsList = (blogs) => {

    let uniqueAuthors = [];
    blogs.forEach((element) => {
        if (!uniqueAuthors.includes(element.author)) {
            uniqueAuthors.push(element.author);
        }
    });
    
    console.log(uniqueAuthors);

    return uniqueAuthors;
}

const authorsBlogs = (blogs) => {
    
    const totalLikes = (total, blog) => (
        total + blog.likes
    )

    const authors = authorsList(blogs).map( author =>
      {
      const authorsBlogs = blogs.filter(b => b.author == author)
      return {
        "author": author,
        "blogs": authorsBlogs,
        "totalLikes": authorsBlogs.reduce(totalLikes, 0)
      }
      }
    )

    console.log(authors);
    console.log(authors.length);

    return authors;
}

const mostBlogs = (blogs) => {

    const reducer = (most, author) => {
        
        console.log(author);

        if(most==undefined){
            return author
        }
        return most.blogs.length > author.blogs.length 
            ? most 
            : author
        }
    
    const mostBlogsBlogs = authorsBlogs(blogs).reduce(reducer, undefined);

    return ({
        "author": mostBlogsBlogs.author,
        "blogs": mostBlogsBlogs.blogs.length
      });

}

const mostLikes = (blogs) => {

    const mostLiked = (most, author) => {
        
        console.log(author.blogs);

        if(most==undefined){
            return author
        }

        return most.totalLikes > author.totalLikes 
            ? most 
            : author
    }
    
    const mostLikesBlogs = authorsBlogs(blogs).reduce(mostLiked, undefined);

    return ({
        "author": mostLikesBlogs.author,
        "likes": mostLikesBlogs.totalLikes
    });

}
    
module.exports = {
dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}