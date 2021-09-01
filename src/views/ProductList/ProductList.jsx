import React, { useState } from 'react';
import { Button, TextField, LinearProgress } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { addProduct } from '../../api/rewards';
import './ProductList.css'

function ProductList() {
  const history = useHistory();
  const [transactionDto, setTransactionDto] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setTransactionDto({
      price: event.target.value
    })
  };

  const addToList = () => {
    addProduct(transactionDto)
      .catch(() => {
        console.log('error while posting a transaction')
      }).finally(() => {
        setIsLoading(false);
        setTransactionDto({});
        if(!alert('Product Has Been Ordered Succesfully')){window.location.reload();}
      })
  }

  return (
    <div>
      {isLoading && <LinearProgress />}
      <div className = "ProductList">
        <form>
          <div className = "AddTransaction">
            <TextField div className = "Button" id="outlined-basic" label="Enter Product Price" variant="outlined" onChange={handleChange} />
            <Button variant="contained" color="primary" onClick={addToList}>
              Add to transaction List
            </Button>
          </div>
          <div className = "GetTransactions">
            <Button variant="contained" color="primary" onClick={() => history.push("/transactionList")}>
              Get All Transactions
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductList;