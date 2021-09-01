import { axiosCreate } from './axiosCreate';

const basePath = '/rewards';

export const addProduct = (transactionDto) => {
  const API = axiosCreate(basePath);
  return API({
    method: 'POST',
    url: '/transaction',
    data: transactionDto
  });
}

export const getTransactionList = () => {
  const API = axiosCreate(basePath);
  return API.get('/transaction');
}

export const getTotalRewards = () => {
  const API = axiosCreate(basePath);
  return API.get('/total-rewards-earned');
}

export const getTotalRewardsPerMonth = () => {
  const API = axiosCreate(basePath);
  return API.get('/total-rewards-earned-per-month');
}