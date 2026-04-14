const posts = require('../schemas/posts-schema');
const Category = require('../schemas/category-schema');

const getPostDetails = async () => {
  try {
    const postData = await posts.find()
    .populate('category', '_id category_name description')
    .populate('author', '_id first_name last_name email phone');

    console.log(postData);
    return postData;
    const formattedPosts = postData.map(post => ({
      _id: post._id,
      title: post.title,
      description: post.description,
      status: post.status,
      category_id: post.category._id,
      category: {
        _id: post.category._id,
        category_name: post.category.category_name,
        description: post.description
      },
      author_id: post.author._id,
      author: {
        _id: post.author._id,
        first_name: post.author.first_name,
        last_name: post.author.last_name,
        email: post.email,
        phone: post.author.phone
      }
    }));

    console.log('All Posts:', formattedPosts);
    return formattedPosts;
  } catch (error) {
    console.error(error);
  }
};



const addPostDetails = async (postData) => {
  try {
    const newPost = new posts(postData);
    const insertResult = await newPost.save();

    //const updateResult = await Category.updateOne({ _id: insertResult.category }, { $set: { post.push(insertResult._id) } });
    console.log('Inserted post:', insertResult);
    return insertResult;
  } catch (err) {
    console.error(err);
  }
};

const updatePostDetails = async (idpost, data) => {
  try {
    const updateResult = await posts.updateOne({ _id: idpost }, { $set: { ...data } });
    console.log('Update result:', updateResult);
    return updateResult;
  } catch (err) {
    console.error(err);
  }
};

const deletePostDetails = async (idpost) => {
  try {
    const deleteResult = await posts.deleteOne({ _id: idpost });
    console.log('Delete result:', deleteResult);
    return deleteResult;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getPostDetails, addPostDetails, updatePostDetails, deletePostDetails };
