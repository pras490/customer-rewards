import React, { useState } from 'react';
import { Button, TextField, LinearProgress } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from "react-router-dom";

export const ProductList = () => {
  const history = useHistory();
  const [transactionDto, setTransactionDto] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setTransactionDto({
      price: event.target.value
    })
  };

  const addToList = () => {
    axios.post(`http://localhost:8080/rewards/transaction`, transactionDto)
      .catch(() => {
        console.log('error')
      }).finally(() => {
        setIsLoading(false);
        setTransactionDto({});
        alert('Product Has Been Ordered Succesfully');
      })
  }

  return (
    <div>
      {isLoading && <LinearProgress />}
      <div style={{ marginTop: '40px' }}>
        <form>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField style={{ paddingRight: '10px' }} id="outlined-basic" label="Enter Product Price" variant="outlined" onChange={handleChange} />
            <Button variant="contained" color="primary" onClick={addToList}>
              Add to transaction List
            </Button>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={() => history.push("/transactionList")}>
              Get All Transactions
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}