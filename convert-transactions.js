/* eslint-disable */
const csvtojson = require('csvtojson');
const fs = require('fs');

function getWallets(walletsData) {
  return walletsData.map((w) => ({
    amount: {
      currency: w['Валюта'],
      value: w['Текущее значение'],
    },
    icon: w['Иконка'],
    name: w['Название'],
  }));
}

function getIncomes(data) {
  return data.map((income) => ({
    amount: {
      currency: income['Валюта'],
      value: 0,
    },
    icon: income['Иконка'],
    name: income['Название'],
  }));
}

function getExpenses(data) {
  return data.map((income) => ({
    amount: {
      currency: income['Валюта'],
      value: 0,
    },
    icon: income['Иконка'],
    name: income['Название'],
  }));
}

function parseCsv(fileData) {
  const list = fileData.split(/\n\n\n/);

  return list.map((data, index) => {
    if (index === 1) {
      return csvtojson()
        .fromString(data)
        .then((result) => getIncomes(result));
    }
    if (index === 2) {
      return csvtojson()
        .fromString(data)
        .then((result) => getWallets(result));
    }
    if (index === 3) {
      return csvtojson()
        .fromString(data)
        .then((result) => getExpenses(result));
    }
    return Promise.resolve(null);
  });
}

fs.readFile('./CoinKeeper_export.csv', (err, data) => {
  Promise.all(parseCsv(data.toString()))
    .then((result) => ({
      expenses: result[3],
      incomes: result[2],
      wallets: result[1],
    }))
    .then((res) => console.log(res));
});

// fs.readFile('./CoinKeeper_export.csv', (err, data) => {
//   const fileData = data.toString();
//   const list = fileData.split(/\n\n\n/);

//   // list[0] - list of transactions
//   // list[1] - total income
//   // list[2] - final wallets state
//   // list[3] - total expenses
//   // list[4] - total tags expenses

//   list.map((data, index) => {
//     if (index === 1) {
//       return csvtojson()
//         .fromString(data)
//         .then((result) => getIncomes(result));
//     }
//     if (index === 2) {
//       return csvtojson()
//         .fromString(data)
//         .then((result) => getWallets(result));
//     }
//   });
// });

// // TODO: integrate into App
// //       проверь корректность данных: сначла посчитай транзакции, потом сравни с финальным результатом, покажи разницу и сделай новую транзакццию, покрывающую разницу - должна быть техническая метка

// // const incomes = {};
// // const wallets = {};
// // const expenses = {};

// // const tags = {};

// function add(v1, v2) {
//   if (!v1) {
//     return Number(v2);
//   }

//   return ((v1 * 100) + (Number(v2) * 100)) / 100;
// }

// function parseTransaction(transaction) {
//   const [
//     date,
//     type,
//     source,
//     target,
//     tag,
//     _2, _3,
//     value,
//     currency,
//   ] = transaction;

//   return {
//     currency,
//     date,
//     source,
//     tag,
//     target,
//     type,
//     value,
//   };
// }

// function getWallets(transactions) {
//   return transactions.reduce((memo, transaction) => {
//     const {
//       currency,
//       date,
//       source,
//       tag,
//       target,
//       type,
//       value,
//     } = parseTransaction(transaction);

//     if (type === 'Расход') {
//       memo.wallets[source] = add(memo.wallets[source], value);
//       memo.expenses[target] = true;
//     }

//     if (type === 'Перевод') {
//       memo.wallets[target] = add(memo.wallets[source], value);
//     }

//     return memo;
//   }, { expenses: {}, wallets: {} });
// }

// function getIncomes(transactions, wallets) {
//   return transactions.reduce((memo, transaction) => {
//     const {
//       currency,
//       date,
//       source,
//       tag,
//       target,
//       type,
//       value,
//     } = parseTransaction(transaction);

//     if (type === 'Перевод' && !wallets[source]) {
//       memo.incomes[source] = add(memo.incomes[source], value);
//     }

//     return memo;
//   }, { incomes: {} });
// }

// // transactions.forEach((transaction) => {
// //   const [
// //     date,
// //     type,
// //     source,
// //     target,
// //     tag,
// //     _2, _3,
// //     value,
// //     currency,
// //   ] = transaction;

// //   if (type === 'Расход') {
// //     wallets[source] = add(wallets[source], value);
// //     expenses[target] = true;
// //   }
// //   if (type === 'Перевод') {
// //     // NOTE: перевод - это перевод с банка в банк в том числе, и он никак не отличается
// //     //       можно сделать два прохода: сначала посчитать расходы и wallets
// //     //       потом доходы, исключая переводы между wallet и wallet
// //     // TODO: 175563 получились неучтенными, но и история началась с трат. Скорее всего, это первоначальная сумма
// //     incomes[source] = add(incomes[source], value);
// //     wallets[target] = add(wallets[source], value);
// //   }
// //   tags[tag] = true;
// // });

// const { wallets } = getWallets(trnsctns);
// const { incomes } = getIncomes(trnsctns, wallets);
// console.log(incomes, wallets);

// // const mapped = transactions.map(([
// //   date,
// //   type,
// //   source,
// //   target,
// //   tags,
// //   _2, _3,
// //   value,
// //   currency,
// //   ..._4
// // ]) => ({
// //   currency,
// //   date,
// //   source,
// //   tags,
// //   target,
// //   type,
// //   value,
// // }));

// // const incs = Object.keys(incomes)
// //   .sort((incomeA, incomeB) => incomes[incomeA] - incomes[incomeB])
// //   .reduce((memo, income) => ({
// //     [income]: incomes[income],
// //     ...memo,
// //   }), {});

// // console.log(incs);
