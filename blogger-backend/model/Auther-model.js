const Author = require('../schemas/auther-schema');

const getAuthorData = async () => {
  try {
    const authors = await Author.find();
    console.log('All Authors:', authors);
    return authors;
  } catch (error) {
    console.error(error);
   
  }
}

const addAuthor = async (authorData) => {
  try {
    const insertResult = await Author.create(authorData);
    console.log(insertResult);
    return insertResult;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const updateAuthor = async (authorData) => {
  try {
    for (const data of authorData) {
      const { first_name, email, phone } = data;
      const updateResult = await Author.updateOne({ first_name }, { $set: { email, phone } });
      console.log(`Author ${first_name} updated:`, updateResult);
    }
  } catch (err) {
    console.log(err);
  }
}

const deleteAuthor = async ( idpost ) => {
  try {
    const deleteResult = await Author.deleteMany({  _id: idpost  });
    console.log(deleteResult);
    return deleteResult;
  } catch (err) {
    console.log(err);
    
  }
}

module.exports = { getAuthorData, addAuthor, updateAuthor, deleteAuthor };
