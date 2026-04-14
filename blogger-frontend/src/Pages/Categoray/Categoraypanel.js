import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Addcategory from './Addcategory';

const Categoraypanel = () => {
  const [categories, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const fetchCategories = () => {
    const token = localStorage.getItem('token');
    axios
      .get(`${process.env.REACT_APP_API_URL}/category/catlist`, {
        headers: { token: token }
      })
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          alert('You are not authorized! Your session may have expired or you logged in with invalid credentials. Please log out and log in again.');
        }
      });
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this category?')) {
      axios.delete(`${process.env.REACT_APP_API_URL}/category/deletecat/${id}`, {
        headers: { token: localStorage.getItem('token') }
      })
      .then((res) => {
        setCategories(categories.filter(cat => (cat._id || cat.id) !== id));
      })
      .catch((err) => console.error(err));
    }
  };

  const dynamicColumns = [
    { field: 'category_name', headerName: 'Category Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'created', headerName: 'Date', width: 200 },
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
    }
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
    <h2>Categoray</h2>
    {!isAdding && (
      <>
        <div style={{ margin: '40px', cellspacing: '30px' }}>
            <Button variant="outlined" color="secondary" sx={{ marginRight: '2%' }} onClick={() => setIsAdding(true)}>
              Add
            </Button>
        </div>
        <DataGrid
          rows={categories}
          columns={dynamicColumns}
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
      <Addcategory setIsAdding={setIsAdding} setCategories={setCategories} fetchCategories={fetchCategories} />
    )}
    </Box>
  );
};

export default Categoraypanel;
