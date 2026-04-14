const Category = require('../schemas/category-schema');

const getCatDetails = async () => {
  try {
    //const categories = await Category.find();
    const categories = await Category.find()
    //.populate('posts', '_id title description');
    
    console.log('All Categories:', categories);
    return categories;
  } catch (error) { 
    console.error(error);
    
  }
}

const addCategory = async (categoryData) => {
  try {
    const insertResult = await Category.create(categoryData);
    console.log("Inserted:", insertResult);
    return insertResult;
  } catch (err) {
    console.error("Error inserting:", err);
    throw err;
  }
}

const updateCategory = async (catid, catPostData) => {
  try {
    console.log(catid);
    console.log(catPostData)
    const updateResult = await Category.updateOne({ _id: catid }, { $set: { description: catPostData.description, category_name: catPostData.category_name } });
    console.log(updateResult);
    return updateResult;
  } catch (err) {
    console.log(err);
  }
}


const deleteCatData = async (catid) => {
  try {
    const deleteResult = await Category.deleteMany({ _id: catid  });
    console.log(deleteResult);
    return deleteResult;
  } catch (err) {
    console.log(err);
   
  }
}

module.exports = { getCatDetails, addCategory, updateCategory, deleteCatData };
