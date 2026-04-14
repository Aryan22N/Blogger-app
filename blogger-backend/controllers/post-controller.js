const postModel = require('../model/posts-model');

let getpostsdetails = async (req, res) => {
    try{
        let postData = await postModel.getPostDetails();
        res.send(postData)
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

let addPosts = async (req, res) => {
    let data = req.body;
    try{
        let postData = await postModel.addPostDetails(data);
        res.send(postData)
        console.log(postData)
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}

let updatePosts = async (req, res) => {
    let id = req.params.cid;
    let PostData = req.body;
    try{
        let postData = await postModel.updatePostDetails(id,PostData);
        res.send(postData)
    }catch(err){
        res.status(500).send(err);
    }
}

let deletePosts = async (req, res) => {
    try{
        let postData = await postModel.deletePostDetails(req.params.cid);
        res.send(postData)
    }catch(err){
        res.status(500).send(err);
    }
}

module.exports = { getpostsdetails,addPosts,updatePosts,deletePosts  }