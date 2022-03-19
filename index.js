class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  isAllowed() {
    if (this.account.balance + this.value >= 0) {
      console.log("Transaction successful. Thank you for using this service.");
      return true;
    } else {
      console.log("This transaction is not allowed. Please check your account balance.");
      return false;
    }
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    }
  }
}

class Withdrawal extends Transaction {

  get value() {
    return - this.amount;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");
console.log(`myAccount created: ${JSON.stringify(myAccount)}`);
console.log(`Starting Balance of ${myAccount.username}: ${myAccount.balance}`);

const t1 = new Deposit(120.00, myAccount);
// console.log(`t1 stringified before commit: ${JSON.stringify(t1)}`);
// console.log('Transaction 1 before commit:', t1);
t1.commit();
// console.log(`t1 stringified after commit: ${JSON.stringify(t1)}`);
// t1 cannot be stringified after commit: account.transactions contains t1 itself
// when printed as object: transactions: [ [Circular] ]
// TypeError: Converting circular structure to JSON
//     --> starting at object with constructor 'Deposit'
//     |     property 'account' -> object with constructor 'Account'
//     |     property 'transactions' -> object with constructor 'Array'
//     --- index 0 closes the circle
console.log('Transaction 1 after commit:', t1);

const t2 = new Withdrawal(50.25, myAccount);
t2.commit();
console.log('Transaction 2 after commit:', t2);

const t3 = new Withdrawal(9.99, myAccount);
t3.commit();
console.log('Transaction 3 after commit:', t3);

// console.log(`myAccount when all 3 transactions done: ${myAccount}`);
console.log('Ending Balance when all 3 transactions done:', myAccount.balance);

const t4 = new Withdrawal(60, myAccount);
console.log('Transaction 4 before commit:', t4);
t4.commit();
console.log('Transaction 4 after commit:', t4);
console.log('Ending Balance when all 4 transactions done:', myAccount.balance);
console.log('Account Transaction History: ', myAccount.transactions);
