import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from "react-router-dom";
import { Button, LinearProgress } from '@material-ui/core';
import axios from 'axios';

export const TransactionList = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionsList, setTransactionsList] = useState([]);
  const [totalRewards, setTotalRewards] = useState(0);
  const [lastMonthRewards, setlastMonthRewards] = useState(0);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
    },
    {
      field: 'rewards',
      headerName: 'rewards',
      width: 150,
    },
    {
      field: 'createdDate',
      headerName: 'Created Date',
      width: 250,
    }
  ]

  useEffect(() => {
		setIsLoading(true);
    axios.get(`http://localhost:8080/rewards/transaction`)
      .then((res) => {
        setTransactionsList(res.data);
      }).catch(() => {
        console.log('error')
      }).finally(() => {
        setIsLoading(false);
      })

    axios.get(`http://localhost:8080/rewards/total-rewards-earned`)
      .then((res) => {
        setTotalRewards(res.data);
      }).catch(() => {
        console.log('error')
      }).finally(() => {
        setIsLoading(false);
      })

    axios.get(`http://localhost:8080/rewards/total-rewards-earned-per-month`)
      .then((res) => {
        setlastMonthRewards(res.data);
      }).catch(() => {
        console.log('error')
      }).finally(() => {
        setIsLoading(false);
      })
	  }, [])

  return (
    <div style={{ height: 400, width: '100%' }}>
      {isLoading && <LinearProgress />}
      <DataGrid
        rows={transactionsList}
        columns={columns}
        pageSize={5}
      />
      <div>Total Rewards Earned: {totalRewards}</div>
      <div>Get Rewards Earned Last Month: {lastMonthRewards}</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
        variant="contained"
        color="secondary"
        onClick={() => history.goBack()}
      >
        Back
      </Button>
      </div>
    </div>
  )
}