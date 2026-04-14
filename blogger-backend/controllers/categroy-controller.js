

let getcategory = (req, res) => {
    let query = "SELECT * FROM categories";
    
}

let addCategory = (req,res)=>{
    res.send("Added category");
}

let updateStatus = (req,res) =>{
    res.send('updated category status')
}

module.exports = { getcategory, addCategory, updateStatus }