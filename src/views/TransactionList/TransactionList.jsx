import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from "react-router-dom";
import { Button, LinearProgress } from '@material-ui/core';
import { getTransactionList, getTotalRewards, getTotalRewardsPerMonth } from '../../api/rewards';
import './TransactionList.css';

function TransactionList() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
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
      headerName: 'Rewards',
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

    getTransactionList()
      .then((res) => {
        setTransactionsList(res.data);
      }).catch(() => {
        console.log('error while finding transaction list')
      }).finally(() => {
        setIsLoading(false);
      })

    getTotalRewards()
      .then((res) => {
        setTotalRewards(res.data);
      }).catch(() => {
        console.log('error while getting total rewards')
      }).finally(() => {
        setIsLoading(false);
      })

    getTotalRewardsPerMonth()
      .then((res) => {
        setlastMonthRewards(res.data);
      }).catch(() => {
        console.log('error while getting total rewards per month')
      }).finally(() => {
        setIsLoading(false);
      })
  }, [])

  const handlePageSize = (newPageSize) => {
    setPageSize(newPageSize)
  }

  return (
    <div className="TransactionList">
      {isLoading && <LinearProgress />}
      <DataGrid
        rows={transactionsList}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={handlePageSize}
        rowsPerPageOptions={[5, 10]}
        pagination
        autoHeight
      />
      <div className="Rewards">
        <div>Total Rewards Earned: {totalRewards}</div>
        <div>Get Rewards Earned Last Month: {lastMonthRewards}</div>
      </div>
      <div className="Button">
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

export default TransactionList;