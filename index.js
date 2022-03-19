class Account {

  constructor(username) {
    this.username = username;
    this.balance = 0;
  }

}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
}

class Withdrawal extends Transaction {

  commit() {
    this.account.balance -= this.amount;
  }

}

class Deposit extends Transaction {

  commit() {
    this.account.balance += this.amount;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', JSON.stringify(t1));

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', JSON.stringify(t2));

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', JSON.stringify(t3));

console.log('Balance:', myAccount.balance);
