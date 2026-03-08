import { AsyncLocalStorage } from 'node:async_hooks';

import { poolPromise, sql } from './db.js';

export { poolPromise, sql };

export const transactionStorage = new AsyncLocalStorage();

export const getExecutor = async () => {
  const store = transactionStorage.getStore();
  if ( store && store.transaction ) return store.transaction;
  return await poolPromise;
};

export const withTransaction = async work => {
  const pool = await poolPromise;
  const transaction = new sql.Transaction( pool );

  return await transactionStorage.run( { transaction }, async () => {
    try {
      await transaction.begin();
      const result = await work();
      await transaction.commit();
      return result;
    } catch ( error ) {
      if ( transaction._aborted === false ) await transaction.rollback();
      throw error;
    }
  } );
};