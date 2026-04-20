const transactions = [
  {
    transaction_id: "1",
    transaction_date: "2026-01-04",
    transaction_amount: 100.0,
    transaction_type: "debit",
    transaction_description: "Payment for groceries",
    merchant_name: "SuperMart",
    card_type: "Visa",
  },
  {
    transaction_id: "2",
    transaction_date: "2026-02-06",
    transaction_amount: 250.0,
    transaction_type: "credit",
    transaction_description: "Salary payment",
    merchant_name: "Company Inc",
    card_type: "MasterCard",
  },
  {
    transaction_id: "3",
    transaction_date: "2026-01-05",
    transaction_amount: 50.0,
    transaction_type: "debit",
    transaction_description: "Coffee shop purchase",
    merchant_name: "CoffeeHouse",
    card_type: "Visa",
  },
  {
    transaction_id: "4",
    transaction_date: "2026-01-10",
    transaction_amount: 120.0,
    transaction_type: "debit",
    transaction_description: "Online shopping",
    merchant_name: "ShopOnline",
    card_type: "MasterCard",
  },
  {
    transaction_id: "5",
    transaction_date: "2026-01-15",
    transaction_amount: 500.0,
    transaction_type: "credit",
    transaction_description: "Freelance project payment",
    merchant_name: "FreelanceClient",
    card_type: "Visa",
  }
];

//1
/**
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {string[]} Массив уникальных типов транзакций
 * Возвращает массив уникальных типов транзакций.
 */
function getUniqueTransactionTypes(transactions) { //
  const typesSet = new Set(); // тип коллекции - множество уникальных значений; new - создание новый экземпляр объекта.

  for (let transaction of transactions) {
    typesSet.add(transaction.transaction_type);
  }

  const uniqueTypes = [];

  for (let type of typesSet) {
    uniqueTypes.push(type);
  }

  return uniqueTypes;
}

//2
/**
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {number} Сумма всех транзакций
 * Возвращает сумму всех транзакций.
 */
function calculateTotalAmount(transactions) {
  let totalAmount = 0;

  for (let transaction of transactions) {
    totalAmount += transaction.transaction_amount;
  }

  return totalAmount;
}

//3
/**
 * Параметры year, month и day необязательны.
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {number} [year] - Год (например, 2023)
 * @param {number} [month] - Месяц (1-12)
 * @param {number} [day] - День (1-31)
 * @returns {number} Общая сумма транзакций за указанный период
 * Возвращает сумму транзакций за указанный год, месяц и день.
 */
function calculateTotalAmountByDate(transactions, year, month, day) { //вычисл сумму транзакций за указанный год, месяц и день
  let totalAmount = 0;

  for (let transaction of transactions) {
    const date = new Date(transaction.transaction_date); //преобразование строки даты в объект даты

    if (year !== undefined && date.getFullYear() !== year) continue;//если параметр year задан и год транзакции не совпадает
    if (month !== undefined && date.getMonth() + 1 !== month) continue;
    if (day !== undefined && date.getDate() !== day) continue;

    totalAmount += transaction.transaction_amount;
  }

  return totalAmount;
}

//4
/**
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} type - Тип транзакции: "debit" или "credit"
 * @returns {Transaction[]} Массив транзакций указанного типа
 * Возвращает массив транзакций указанного типа.
 */
function getTransactionByType(transactions, type) {
  const filteredTransactions = []; 

  for (let transaction of transactions) {
    if (transaction.transaction_type === type) {
      filteredTransactions.push(transaction); 
    }
  }

  return filteredTransactions; 
}

//5
/**
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} startDate - Начальная дата в формате "YYYY-MM-DD"
 * @param {string} endDate - Конечная дата в формате "YYYY-MM-DD"
 * @returns {Transaction[]} Массив транзакций в указанном диапазоне дат
 * Возвращает массив транзакций, совершенных в диапазоне дат.
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  const filteredTransactions = []; 

  const start = new Date(startDate); // преобразуем startDate в объект Date
  const end = new Date(endDate);//строка endDate превращается в объект Date  

  for (let transaction of transactions) {
    const transactionDate = new Date(transaction.transaction_date);

    if (transactionDate >= start && transactionDate <= end) { // проверяем, попадает ли дата транзакции в указанный диапазон
      filteredTransactions.push(transaction); 
    }
  }

  return filteredTransactions;
}

//6
/**
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} merchantName - Название магазина/сервиса
 * @returns {Transaction[]} Массив транзакций по merchantName
 * Возвращает транзакции для конкретного магазина/сервиса.
 */
function getTransactionsByMerchant(transactions, merchantName) {
  const filteredTransactions = [];

  for (let transaction of transactions) { 
    if (transaction.merchant_name === merchantName) { 
      filteredTransactions.push(transaction); 
    }
  }
  return filteredTransactions;
}

//7
/**
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {number} Средняя сумма транзакции
 * Возвращает среднюю сумму транзакций.
 */
function calculateAverageTransactionAmount(transactions) {
  let totalAmount = 0; 

  for (let transaction of transactions) { 
    totalAmount += transaction.transaction_amount;
  }

  const average = totalAmount / transactions.length; 
  return average;
}

//8
/**
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {number} minAmount - Минимальная сумма
 * @param {number} maxAmount - Максимальная сумма
 * @returns {Transaction[]} Массив транзакций по сумме
 * Возвращает массив транзакций в указанном диапазоне сумм.
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(transaction => transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount
);
}

//9
/**
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {number} Сумма дебетовых транзакций
 * Возвращает сумму всех дебетовых транзакций.
 */
function calculateTotalDebitAmount(transactions) {
  let totalAmount = 0;

  for (let transaction of transactions) { // проходим по всем транзакциям
    if (transaction.transaction_type === "debit") { 
      totalAmount += transaction.transaction_amount; 
    }
  }

  return totalAmount;
}

//10
/**
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {number|null} Месяц (1-12) с максимальным количеством транзакций
 * Возвращает месяц с наибольшим количеством транзакций.
 */
function findMostTransactionsMonth(transactions) {
  const monthCounts = {}; 

  for (let transaction of transactions) {
    const date = new Date(transaction.transaction_date); 
    const month = date.getMonth() + 1; 

    if (monthCounts[month]) { //проверка есть ли месяц 
      monthCounts[month] += 1; 
    } else {
      monthCounts[month] = 1; 
    }
  }

  let maxMonth = null; //месяц с максимальным количеством транзакций
  let maxCount = 0; //количество транзакций в месяце

  for (let month in monthCounts) {
    if (monthCounts[month] > maxCount) {
      maxCount = monthCounts[month];
      maxMonth = month;
    }
  }

  return maxMonth;
}

//11
/**
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {number|null} Месяц (1-12) с максимальным количеством дебетовых транзакций
 * Возвращает месяц с наибольшим количеством дебетовых транзакций.
 */
function findMostDebitTransactionMonth(transactions) {
  const monthCounts = {}; 

  for (let transaction of transactions) {
    if (transaction.transaction_type !== 'debit') continue; 

    const date = new Date(transaction.transaction_date); 
    const month = date.getMonth() + 1; // получаем номер месяца (1-12)

    if (monthCounts[month]) {
      monthCounts[month] += 1; 
    } else {
      monthCounts[month] = 1; 
    }
  }

  let maxMonth = null;
  let maxCount = 0;

  for (let month in monthCounts) {
    if (monthCounts[month] > maxCount) {
      maxCount = monthCounts[month];
      maxMonth = month;
    }
  }

  return maxMonth;
}

//12
/**
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {string} 'debit', 'credit' или 'equal'
 * Возвращает тип транзакций, которых больше всего.
 */
function mostTransactionTypes(transactions) {
  let debitCount = 0; 
  let creditCount = 0; 

  for (let transaction of transactions) {
    if (transaction.transaction_type === 'debit') {
      debitCount += 1; 
    } else if (transaction.transaction_type === 'credit') {
      creditCount += 1; 
    }
  }

  if (debitCount > creditCount) {
    return 'debit';  
  } else if (creditCount > debitCount) {
    return 'credit'; 
  } else {
    return 'equal'; 
  }
}

//13
/**
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} date - Дата "YYYY-MM-DD"
 * @returns {Transaction[]} Массив транзакций до указанной даты
 * Возвращает транзакции, совершенные до указанной даты.
 */
function getTransactionsBeforeDate(transactions, date) {
  const targetDate = new Date(date);

  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.transaction_date);
    return transactionDate < targetDate;
  });
}

//14
/**
 * @param {Transaction[]} transactions - Массив транзакций
 * @param {string} id - Идентификатор транзакции
 * @returns {Transaction|null} Транзакция или null, если не найдена
 * Возвращает транзакцию по уникальному идентификатору.
 */
function findTransactionById(transactions, id) {
  return transactions.find(transaction => transaction.transaction_id === id) || null;
}

//15
/**
 * @param {Transaction[]} transactions - Массив транзакций
 * @returns {string[]} Массив описаний транзакций
 * Возвращает массив описаний всех транзакций.
 */
function mapTransactionDescriptions(transactions) {
    return transactions.map(transaction => transaction.transaction_description)
}

console.log("Unique transaction types:", getUniqueTransactionTypes(transactions));
console.log("Total transaction amount:", calculateTotalAmount(transactions));
console.log("Total for 2026-01:", calculateTotalAmountByDate(transactions, 2023, 1));
console.log("Debit transactions:", getTransactionByType(transactions, "debit"));
console.log("Transactions from 2026-01-10 to 2023-01-15:", getTransactionsInDateRange(transactions, "2023-01-01", "2023-01-31"));
console.log("Transactions at SuperMart:", getTransactionsByMerchant(transactions, "SuperMart"));
console.log("Average transaction amount:", calculateAverageTransactionAmount(transactions));
console.log("Transactions between 100 and 200:", getTransactionsByAmountRange(transactions, 50, 120));
console.log("Total debit amount:", calculateTotalDebitAmount(transactions));
console.log("Most transactions month:", findMostTransactionsMonth(transactions));
console.log("Most debit transactions month:", findMostDebitTransactionMonth(transactions));
console.log("Most transaction types:", mostTransactionTypes(transactions));
console.log("Transactions before 2026-02-06:", getTransactionsBeforeDate(transactions, "2023-02-01"));
console.log("Transaction with ID 2:", findTransactionById(transactions, "2"));
console.log("Transaction descriptions:", mapTransactionDescriptions(transactions));

