
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddPosts from './AddPosts';



const Postpanel
  = () => {
    const [author, setauthor] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    const handleDelete = (id) => {
      if(window.confirm('Are you sure you want to delete this post?')) {
        axios.delete(`${process.env.REACT_APP_API_URL}/post/deletepost/${id}`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then((res) => {
          setauthor(author.filter(post => (post._id || post.id) !== id));
        })
        .catch((err) => console.error(err));
      }
    };

    const columns = [
      { field: 'title', headerName: 'Title Name', width: 150 },
      { field: 'description', headerName: 'Description', width: 450 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row._id || params.row.id)}
          >
            Delete
          </Button>
        ),
      },
    ];

    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/post/posts`, { headers: { token: localStorage.getItem('token') } })
        .then((response) => {
          console.log(response.data)
          setauthor(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);

    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <h2>Post</h2>
        {!isAdding && (
          <>
            <div style={{ margin: '40px', cellspacing: '30px' }}>
              <Button onClick={() => setIsAdding(true)} variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
                Add
              </Button>
            </div>
            <DataGrid
              rows={author}
              columns={columns}
              getRowId={(row) => row._id || row.id || Math.random().toString()}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </>
        )}
        {isAdding && (
          <AddPosts
            setPost={setauthor}
            setIsAdding={setIsAdding}
          />
        )}
      </Box>
    );
  };

export default Postpanel;
