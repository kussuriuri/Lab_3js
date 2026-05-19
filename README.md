# Лабораторная работа № 3
 
## Тема: Основы работы с массивами, функциями и объектами
 
---
 
## Задача
 
Изучить основы работы с массивами и функциями в JavaScript, применяя их для обработки и анализа транзакций.
 
---
 
## Шаг 1. Создание массива транзакций
 
Необходимо было создать основной массив данных, который будет использоваться в дальнейшей обработке. Он должен содержать объекты транзакций с заранее заданной структурой, включающей идентификатор, дату, сумму, тип операции, описание, название магазина или сервиса и тип карты.
 
Я создала массив `transactions`, состоящий из нескольких объектов, каждый из которых представляет отдельную финансовую транзакцию. Все объекты имеют одинаковую структуру и содержат следующие поля: `transaction_id`, `transaction_date`, `transaction_amount`, `transaction_type`, `transaction_description`, `merchant_name`, `card_type`.
 
**Рис. 1. Пример одного из объектов.**
 
```javascript
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
  // ...
];
```
 
---
 
## Шаг 2. Реализация функций для анализа транзакций
 
### getUniqueTransactionTypes
 
Первая из реализованных мной функций: `getUniqueTransactionTypes(transactions)`, которая принимает массив транзакций в качестве аргумента. Для этого используется `Set`, который автоматически удаляет дубликаты. Сначала все типы транзакций добавляются в `Set`, затем они переносятся в обычный массив `uniqueTypes`, который и возвращается из функции.
 
```javascript
function getUniqueTransactionTypes(transactions) {
  const typesSet = new Set();
 
  for (let transaction of transactions) {
    typesSet.add(transaction.transaction_type);
  }
 
  const uniqueTypes = [];
 
  for (let type of typesSet) {
    uniqueTypes.push(type);
  }
 
  return uniqueTypes;
}
```
 
### calculateTotalAmount
 
Следующей я реализовала функцию `calculateTotalAmount(transactions)`, которая принимает массив транзакций и возвращает суммарное значение всех операций.
 
Внутри функции создается переменная `totalAmount`, изначально равная 0. Затем с помощью цикла `for...of` происходит обход массива транзакций, и значение `transaction_amount` каждой транзакции добавляется к общей сумме. После завершения цикла функция возвращает итоговое значение `totalAmount`.
 
```javascript
function calculateTotalAmount(transactions) {
  let totalAmount = 0;
 
  for (let transaction of transactions) {
    totalAmount += transaction.transaction_amount;
  }
 
  return totalAmount;
}
```
 
### calculateTotalAmountByDate
 
Далее была реализована функция `calculateTotalAmountByDate(transactions, year, month, day)`, принимающая массив транзакций и необязательные параметры даты.
 
Внутри функции создается переменная `totalAmount`. Далее происходит перебор массива транзакций. Для каждой транзакции строка даты преобразуется в объект `Date`. Затем выполняется проверка: если передан год, месяц или день, транзакция учитывается только при совпадении соответствующих значений. Если хотя бы одно условие не выполняется, используется `continue` и транзакция пропускается. В конце функция возвращает итоговую сумму.
 
```javascript
function calculateTotalAmountByDate(transactions, year, month, day) {
  let totalAmount = 0;
 
  for (let transaction of transactions) {
    const date = new Date(transaction.transaction_date);
 
    if (year !== undefined && date.getFullYear() !== year) continue;
    if (month !== undefined && date.getMonth() + 1 !== month) continue;
    if (day !== undefined && date.getDate() !== day) continue;
 
    totalAmount += transaction.transaction_amount;
  }
 
  return totalAmount;
}
```
 
### getTransactionByType
 
Потом я реализовала функцию `getTransactionByType(transactions, type)`, которая принимает массив транзакций и тип операции.
 
Внутри функции создается пустой массив `filteredTransactions`. Затем с помощью цикла перебираются все транзакции. Для каждой транзакции выполняется проверка: если значение `transaction_type` совпадает с переданным параметром `type`, то эта транзакция добавляется в массив. В конце функция возвращает отфильтрованный массив.
 
```javascript
function getTransactionByType(transactions, type) {
  const filteredTransactions = [];
 
  for (let transaction of transactions) {
    if (transaction.transaction_type === type) {
      filteredTransactions.push(transaction);
    }
  }
 
  return filteredTransactions;
}
```
 
### getTransactionsInDateRange
 
Следующая функция — `getTransactionsInDateRange(transactions, startDate, endDate)`, которая принимает массив транзакций и две строки с датами начала и конца диапазона.
 
Внутри функции создается пустой массив `filteredTransactions`. Затем строки `startDate` и `endDate` преобразуются в объекты `Date`. Далее перебираются все транзакции, и дата каждой транзакции тоже преобразуется в объект `Date`. Если дата транзакции находится в диапазоне от начальной до конечной, транзакция добавляется в результирующий массив.
 
```javascript
function getTransactionsInDateRange(transactions, startDate, endDate) {
  const filteredTransactions = [];
 
  const start = new Date(startDate);
  const end = new Date(endDate);
 
  for (let transaction of transactions) {
    const transactionDate = new Date(transaction.transaction_date);
 
    if (transactionDate >= start && transactionDate <= end) {
      filteredTransactions.push(transaction);
    }
  }
 
  return filteredTransactions;
}
```
 
### getTransactionsByMerchant
 
Функция `getTransactionsByMerchant(transactions, merchantName)` принимает массив транзакций и название магазина.
 
Внутри функции создается пустой массив `filteredTransactions`. Затем перебираются все транзакции, и для каждой выполняется проверка: если значение `merchant_name` совпадает с переданным параметром `merchantName`, транзакция добавляется в результирующий массив.
 
```javascript
function getTransactionsByMerchant(transactions, merchantName) {
  const filteredTransactions = [];
 
  for (let transaction of transactions) {
    if (transaction.merchant_name === merchantName) {
      filteredTransactions.push(transaction);
    }
  }
 
  return filteredTransactions;
}
```
 
### calculateAverageTransactionAmount
 
Функция `calculateAverageTransactionAmount(transactions)` принимает массив транзакций и возвращает среднее значение их сумм.
 
Внутри функции создается переменная `totalAmount`. Далее перебираются элементы массива и значение `transaction_amount` каждой транзакции добавляется к общей сумме. После завершения цикла вычисляется среднее значение путем деления общей суммы на количество транзакций (`transactions.length`).
 
```javascript
function calculateAverageTransactionAmount(transactions) {
  let totalAmount = 0;
 
  for (let transaction of transactions) {
    totalAmount += transaction.transaction_amount;
  }
 
  const average = totalAmount / transactions.length;
  return average;
}
```
 
### getTransactionsByAmountRange
 
Функция `getTransactionsByAmountRange(transactions, minAmount, maxAmount)` принимает массив транзакций и границы диапазона суммы.
 
Для решения используется метод массива `filter`, который позволяет отобрать только те элементы, которые удовлетворяют условию. Внутри фильтра проверяется, что `transaction_amount` каждой транзакции больше либо равен `minAmount` и меньше либо равен `maxAmount`.
 
```javascript
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(
    transaction =>
      transaction.transaction_amount >= minAmount &&
      transaction.transaction_amount <= maxAmount
  );
}
```
 
### calculateTotalDebitAmount
 
Функция `calculateTotalDebitAmount(transactions)` принимает массив транзакций и возвращает сумму только дебетовых операций.
 
Внутри функции создается переменная `totalAmount`. Затем перебираются все транзакции, и для каждой выполняется проверка: если `transaction_type` равен `"debit"`, значение `transaction_amount` добавляется к общей сумме.
 
```javascript
function calculateTotalDebitAmount(transactions) {
  let totalAmount = 0;
 
  for (let transaction of transactions) {
    if (transaction.transaction_type === "debit") {
      totalAmount += transaction.transaction_amount;
    }
  }
 
  return totalAmount;
}
```
 
### findMostTransactionsMonth
 
Функция `findMostTransactionsMonth(transactions)` принимает массив транзакций и возвращает номер месяца (от 1 до 12) с наибольшим количеством операций.
 
Создается объект `monthCounts` для подсчета количества транзакций по каждому месяцу. Далее перебираются все транзакции, и дата каждой преобразуется в объект `Date`. Из него извлекается номер месяца с помощью `getMonth() + 1` (в JavaScript месяцы нумеруются с нуля). После формирования статистики по месяцам выполняется поиск максимального значения через цикл с обновлением переменных `maxCount` и `maxMonth`.
 
```javascript
function findMostTransactionsMonth(transactions) {
  const monthCounts = {};
 
  for (let transaction of transactions) {
    const date = new Date(transaction.transaction_date);
    const month = date.getMonth() + 1;
 
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
```
 
### findMostDebitTransactionMonth
 
Функция `findMostDebitTransactionMonth(transactions)` принимает массив транзакций и возвращает номер месяца (1–12) с максимальным количеством дебетовых операций.
 
Внутри функции создается объект `monthCounts` для подсчета количества дебетовых транзакций по месяцам. С помощью условия `if...continue` отбираются только дебетовые операции. У каждой подходящей транзакции дата преобразуется в объект `Date`, после чего извлекается номер месяца. После формирования данных выполняется поиск максимального значения.
 
```javascript
function findMostDebitTransactionMonth(transactions) {
  const monthCounts = {};
 
  for (let transaction of transactions) {
    if (transaction.transaction_type !== 'debit') continue;
 
    const date = new Date(transaction.transaction_date);
    const month = date.getMonth() + 1;
 
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
```
 
### mostTransactionTypes
 
Функция `mostTransactionTypes(transactions)` принимает массив транзакций и возвращает строку с результатом сравнения.
 
Внутри функции создаются две переменные: `debitCount` и `creditCount` для подсчета количества соответствующих типов транзакций. Для каждой транзакции проверяется значение `transaction_type` и увеличивается соответствующий счётчик. После завершения подсчета выполняется сравнение: если дебетовых транзакций больше — возвращается `'debit'`, если кредитных больше — `'credit'`, если одинаково — `'equal'`.
 
```javascript
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
```
 
### getTransactionsBeforeDate
 
Функция `getTransactionsBeforeDate(transactions, date)` принимает массив транзакций и дату.
 
Внутри функции переданная строка `date` преобразуется в объект `Date` (`targetDate`). Далее используется метод `filter`, который перебирает все транзакции. Для каждой транзакции её дата тоже преобразуется в объект `Date`, после чего выполняется сравнение: если дата транзакции меньше `targetDate`, она включается в результирующий массив.
 
```javascript
function getTransactionsBeforeDate(transactions, date) {
  const targetDate = new Date(date);
 
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.transaction_date);
    return transactionDate < targetDate;
  });
}
```
 
### findTransactionById
 
Функция `findTransactionById(transactions, id)` принимает массив транзакций и `id`.
 
Для поиска используется метод `find`, который возвращает первый найденный элемент, удовлетворяющий условию `transaction_id === id`. Если транзакция не найдена, функция возвращает `null`, что обрабатывается с помощью оператора `||`.
 
```javascript
function findTransactionById(transactions, id) {
  return transactions.find(transaction => transaction.transaction_id === id) || null;
}
```
 
### mapTransactionDescriptions
 
Функция `mapTransactionDescriptions(transactions)` использует метод `map`, который перебирает массив транзакций и для каждой из них возвращает значение поля `transaction_description`. В результате функция возвращает новый массив, состоящий только из описаний транзакций.
 
```javascript
function mapTransactionDescriptions(transactions) {
  return transactions.map(transaction => transaction.transaction_description);
}
```
 
---
 
## Шаг 3. Тестирование функций
 
Последним шагом нужно было протестировать функции, и для этого я использовала вывод результатов в консоль с помощью `console.log`. Были вызваны все ранее реализованные функции с различными параметрами, что позволило проверить корректность их работы и убедиться, что они возвращают ожидаемые результаты.
 
Также функции проверялись на разных сценариях: с обычным массивом транзакций, с пустым массивом и с массивом, содержащим одну транзакцию. Это позволяет убедиться в устойчивости функций и их корректной работе в граничных случаях.
 
В результате тестирования было подтверждено, что все функции работают правильно и обрабатывают данные в соответствии с поставленными задачами.
 
---
 
## Вывод
 
В ходе лабораторной работы были реализованы функции для обработки и анализа массива транзакций. Все функции успешно протестированы и корректно работают как с обычными данными, так и с граничными случаями.
 
---
 
## Контрольные вопросы
 
### 1. Какие методы массивов можно использовать для обработки объектов в JavaScript?
 
Методы массивов в JavaScript позволяют удобно обрабатывать коллекции объектов, выполняя такие операции, как перебор, фильтрация, преобразование и поиск. Для этого чаще всего используются методы `forEach()`, `map()`, `filter()`, `find()` и `reduce()`.
 
- `forEach()` — применяется для перебора всех элементов массива и выполнения определённого действия для каждого из них; не возвращает новый массив.
- `map()` — используется для преобразования элементов и возвращает новый массив с изменёнными данными.
- `filter()` — позволяет отобрать только те элементы, которые удовлетворяют заданному условию.
- `find()` — ищет первый подходящий элемент и возвращает его, либо `undefined`, если такой элемент не найден.
- `reduce()` — используется для получения одного итогового значения на основе всех элементов массива, например для подсчёта суммы.
Таким образом, данные методы позволяют эффективно работать с массивами объектов и делают код более компактным и удобным для чтения.
 
### 2. Как сравнивать даты в строковом формате в JavaScript?
 
Даты в строковом формате можно сравнивать, предварительно преобразовав их в объект `Date`. Это связано с тем, что строки с датами напрямую сравнивать не всегда корректно, особенно если формат отличается или требуется учитывать реальную хронологию.
 
Для сравнения обычно используют конструктор `new Date()`, который преобразует строку формата `"YYYY-MM-DD"` в объект даты. После этого даты можно сравнивать с помощью операторов сравнения `<`, `>`, `<=` и `>=`, так как JavaScript автоматически приводит объекты `Date` к числовому значению времени в миллисекундах с начала эпохи.
 
### 3. В чём разница между `map()`, `filter()` и `reduce()` при работе с массивами объектов?
 
Методы `map()`, `filter()` и `reduce()` все используются для обработки массивов объектов, но выполняют разные задачи.
 
- `map()` — применяется для преобразования каждого элемента массива и возвращает новый массив той же длины, но с изменёнными значениями.
- `filter()` — используется для отбора элементов по условию и возвращает новый массив, содержащий только те объекты, которые соответствуют заданному критерию; исходный массив не изменяется.
- `reduce()` — отличается тем, что позволяет свести весь массив к одному итоговому значению, например к сумме или агрегированному результату.
Таким образом, `map()` преобразует данные, `filter()` отбирает их, а `reduce()` объединяет массив в одно значение.
