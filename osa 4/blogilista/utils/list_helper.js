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

module.exports = {
dummy, totalLikes, favoriteBlog
}