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

const authorList = (blogs) => {
    const counts = {};
    for (const blog of blogs) {
        const author = blog.author
        counts[author] = counts[author] ? counts[author] + 1 : 1;
    }

    console.log(counts);
    
    const authors = Object.entries(counts).map(([k,v]) => 
      ({"author": k,  "blogs": v })
    )

    console.log(authors);

    return authors;
}

const mostBlogs = (blogs) => {

    const reducer = (most, author) => {
        
        console.log(author);

        if(most==undefined){
            return author
        }
        return most.blogs > author.blogs ? most : author
        }
    
    return authorList(blogs).reduce(reducer, undefined);
    
}
    
module.exports = {
dummy, totalLikes, favoriteBlog, mostBlogs
}