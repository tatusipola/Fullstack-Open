const dummy = (blogs) => {
    return 1
  }
  
  

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (prev, curr) => {
        return prev.likes > curr.likes ? prev : curr
    }

    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const authors = blogs.map(blog => blog.author)


    //count number of blogs by each author
    let counter = {}
    for (element of authors) {
        if (counter[element]) {
            counter[element] +=1
        } else {
            counter[element] = 1
        }
    } 

    const max = Math.max.apply(null, Object.values(counter))
    for (key in counter) {
        if (counter[key] === max) {
            return {
                [key]: max
            }
        }
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    //count number of likes for each author
    let counter = {}
    for (const blog of blogs) {
        if (counter[blog.author]) {
            counter[blog.author] += blog.likes
        } else {
            counter[blog.author] = blog.likes
        }
    } 

    const max = Math.max.apply(null, Object.values(counter))
    for (key in counter) {
        if (counter[key] === max) {
            return {
                [key]: max
            }
        }
    }
}


module.exports = {
dummy,
totalLikes,
favoriteBlog,
mostBlogs, 
mostLikes
}