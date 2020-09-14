import { action, decorate, observable } from 'mobx';
import { navigate } from '@reach/router';

import FormTransactionStore from './form-transaction';
import UnitsStore from './units';
import logger from '../log';
import { PATH_INDEX, PATH_TRANSACTION } from '../router/paths';
import { loadCurrencies } from '../xhr/currencies';
import { loadWorld } from '../xhr/app';
import { makeTransaction } from '../xhr/transactions';
import {
  Category,
  CurrencyRates,
  DbDocument,
  TransactionIntent,
  UnitType,
} from '../types';

class RootStore {
  empty = true;

  areIncomesExpanded = true;

  expenses = new UnitsStore();

  incomes = new UnitsStore();

  wallets = new UnitsStore();

  transactionForm = new FormTransactionStore();

  rates: CurrencyRates | null = null;

  lastId: string | null = null;

  getStoreByType(unitType: UnitType): UnitsStore {
    switch (unitType) {
      case UnitType.Expense:
        return this.expenses;
      case UnitType.Income:
        return this.incomes;
      case UnitType.Wallet:
        return this.wallets;
      default:
        throw new Error('Incorrect unitType');
    }
  }

  async load(): Promise<void> {
    if (!this.empty) {
      return;
    }

    this.empty = false;

    const data = await loadWorld();

    this.lastId = data.lastId;

    this.incomes.setDb(data.incomes);
    this.expenses.setDb(data.expenses);
    this.wallets.setDb(data.wallets);

    this.rates = await loadCurrencies();
  }

  earnIncome(income: DbDocument<Category>, wallet: DbDocument<Category>): void {
    // eslint-disable-next-line no-underscore-dangle
    navigate(PATH_TRANSACTION(income.id._id, wallet.id._id));

    this.transactionForm.openForm(income, wallet, () => {
      if (!this.rates) {
        throw new Error('Download currencies first');
      }

      const { value } = this.transactionForm;
      const isValueValid = value && Number(value) > 0;
      if (!isValueValid) {
        return;
      }

      const amount = {
        currency: income.amount.currency,
        value: Number(value),
      };
      const transactionIncome: TransactionIntent = {
        amount,
        target: income,
      };
      this.incomes.add(transactionIncome, this.rates);

      const transactionWallet: TransactionIntent = {
        amount,
        target: wallet,
      };
      this.wallets.add(transactionWallet, this.rates);

      makeTransaction(this.lastId, transactionIncome, income.unitType)
        .then((incomeTransaction) => {
          // eslint-disable-next-line no-underscore-dangle
          this.lastId = incomeTransaction.id._id;
          return incomeTransaction;
        })
        .then(() => makeTransaction(this.lastId, transactionWallet, wallet.unitType))
        .then((walletTransaction) => {
          // eslint-disable-next-line no-underscore-dangle
          this.lastId = walletTransaction.id._id;
          return walletTransaction;
        })
        .then(() => navigate(PATH_INDEX()))
        .catch((error) => logger.error(error));
    });
  }

  expandIncomes(areIncomesExpanded: boolean): void {
    this.areIncomesExpanded = areIncomesExpanded;
  }

  spendExpense(wallet: DbDocument<Category>, expense: DbDocument<Category>): void {
    // eslint-disable-next-line no-underscore-dangle
    navigate(PATH_TRANSACTION(wallet.id._id, expense.id._id));

    this.transactionForm.openForm(wallet, expense, () => {
      if (!this.rates) {
        throw new Error('Download currencies first');
      }

      const { value } = this.transactionForm;
      const isValueValid = value && Number(value) > 0;
      if (!isValueValid) {
        return;
      }

      const transaction: TransactionIntent = {
        amount: {
          currency: wallet.amount.currency,
          value: Number(value),
        },
        source: wallet,
        target: expense,
      };

      this.wallets.subtract(transaction, this.rates);
      this.expenses.add(transaction, this.rates);
      makeTransaction(this.lastId, transaction, expense.unitType, wallet.unitType)
        .then((expenseTransaction) => {
          // eslint-disable-next-line no-underscore-dangle
          this.lastId = expenseTransaction.id._id;
          return expenseTransaction;
        })
        .then(() => navigate(PATH_INDEX()))
        .catch((error) => logger.error(error));
    });
  }

  editValue(category: DbDocument<Category>, value: number): void {
    if (!this.rates) {
      throw new Error('Download currencies first');
    }

    const transaction: TransactionIntent = {
      amount: {
        currency: category.amount.currency,
        value: value - category.amount.value,
      },
      target: category,
    };

    const store = this.getStoreByType(category.unitType);
    store.add(transaction, this.rates);

    makeTransaction(this.lastId, transaction, category.unitType)
      .then((finishedTransaction) => {
        // eslint-disable-next-line no-underscore-dangle
        this.lastId = finishedTransaction.id._id;
        return finishedTransaction;
      })
      .then(() => navigate(PATH_INDEX()))
      .catch((error) => logger.error(error));
  }

  addIncome(): void {
    // eslint-disable-next-line no-alert
    const name = window.prompt('Name your income type');
    if (!name) {
      return;
    }
    this.incomes.create(UnitType.Income, name);
  }

  addExpense(): void {
    // eslint-disable-next-line no-alert
    const name = window.prompt('Name your expense type');
    if (!name) {
      return;
    }
    this.expenses.create(UnitType.Expense, name);
  }

  addWallet(): void {
    // eslint-disable-next-line no-alert
    const name = window.prompt('Name your wallet type');
    if (!name) {
      return;
    }
    this.wallets.create(UnitType.Wallet, name);
  }

  getCategory(id: string): DbDocument<Category>|null {
    const expense = this.expenses.getById(id);
    if (expense) {
      return expense;
    }

    const income = this.incomes.getById(id);
    if (income) {
      return income;
    }

    const wallet = this.wallets.getById(id);
    if (wallet) {
      return wallet;
    }

    return null;
  }
}

decorate(RootStore, {
  areIncomesExpanded: observable,
  expandIncomes: action,
});

export default RootStore;
