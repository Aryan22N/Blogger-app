import React, { useState, useEffect } from 'react';
import { TextField, InputLabel, Button, InputAdornment, FormLabel, Radio, FormControl, RadioGroup, FormControlLabel } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';

const AddPosts = (props) => {
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    status: '',
    created: '',
    cat_id: '',
  });
  const [catList, setCatList] = useState([]);

  useEffect(()=>{
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/category/catlist`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then(function (response) {
        console.log('get cat list-----------------');
        console.log(response);
        setCatList(response.data);
      }).catch((err)=>{
        console.log(err);
      });
  }, []);



  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(newPost);
    // return true;
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/post/addpost`,
      data: newPost,
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        console.log(response)
        console.log('Added successfully');
        props.setIsAdding(false);
        // Reload the posts after adding
        axios
          .get(`${process.env.REACT_APP_API_URL}/post/posts`, {
             headers: { token: localStorage.getItem('token') }
          })
          .then((response) => {
            props.setPost(response.data);
          })
          .catch(function (error) {
            console.error('Error fetching data:', error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const cancelHandler = () => {
    props.setIsAdding(false);
  };



  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}> Add Post</h2>
        <TextField
          id="title"
          name="title"
          label="Title"
          value={newPost.title}
          placeholder="Title"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <TextField
          required
          id="description"
          name="description"
          label="Description"
          value={newPost.desc}
          placeholder="Description"
          fullWidth
          multiline
          rows={4}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
          onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
        />
        <FormControl sx={{ m: 1, minWidth: '100%' }}>
          <FormLabel id="status">Status</FormLabel>
          <RadioGroup
            aria-labelledby="status"
            defaultValue="0"
            name="radio-buttons-group"
            id="status" 
            row 
            onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}
          >
            <FormControlLabel value="1" control={<Radio />} label="Active" />
            <FormControlLabel value="0" control={<Radio />} label="InActive" />
         
          </RadioGroup>
        </FormControl>
        
        <TextField
      
          id="created"
          name="created"
          label="Date"
          type="date"
          value={newPost.created}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
          onChange={(e) => setNewPost({ ...newPost, created: e.target.value })}
        />
       <FormControl sx={{ m: 1, minWidth: '100%' }}>
        <InputLabel id="cat_id" sx={{ mt: 1 }}>Select Category</InputLabel>
        <Select
          labelId="cat_id"
          label="Select Category"
          id="cat_id"
          onChange={(e) => setNewPost({ ...newPost, cat_id: e.target.value })}
        >
          {catList.map((data) => (
            <MenuItem key={data._id || data.id} value={data._id || data.id}>
              {data.category_name || data.cat_name || "Unnamed Category"}
            </MenuItem>
          ))}
        </Select>

        </FormControl>



        <Button variant="outlined" color="secondary" type="submit">
          Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={cancelHandler}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default AddPosts;
