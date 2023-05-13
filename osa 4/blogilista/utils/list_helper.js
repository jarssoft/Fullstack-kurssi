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

const makeauthorlist = (blogs) => {
    const counts = {};
    for (const blog of blogs) {
        const author = blog.author
        counts[author] = counts[author] ? counts[author] + 1 : 1;
    }

    console.log(counts);
    
    authors=[];
    for (const [key, value] of Object.entries(counts)) {
        authors=authors.concat([{
            author: key,
            blogs: value
          }])
    }

    console.log(authors);

    return authors;
}

const mostBlogs = (blogs) => {

    const reducer2 = (sum, item) => {
        
        console.log(item);
        console.log(item.blogs);

        if(sum==undefined){
            return item
        }
        return sum.blogs > item.blogs ? sum : item
        }
    
    return makeauthorlist(blogs).reduce(reducer2, undefined);
    
}
    
module.exports = {
dummy, totalLikes, favoriteBlog, mostBlogs
}