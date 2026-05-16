let accounts = [
    {
        id: "ACC001",
        customerId: "CUST1001",
        bankId: "BANK_A",
        balance: 5000
    },
    {
        id: "ACC002",
        customerId: "CUST1001",
        bankId: "BANK_B",
        balance: 12000
    },
    {
        id: "ACC003",
        customerId: "CUST2001",
        bankId: "BANK_C",
        balance: 8000
    }
];

function createAccount(account) {
    accounts.push(account);
    return account;
}

function getAllAccounts() {
    return accounts;
}

function getAccountById(id) {
    return accounts.find(acc => acc.id === id);
}

function getAccountsByCustomerId(customerId) {
    return accounts.filter(
        acc => acc.customerId === customerId
    );
}

function updateAccountBalance(id, amount) {
    const account = accounts.find(acc => acc.id === id);

    if (account) {
        account.balance += amount;
    }

    return account;
}

module.exports = {
    createAccount,
    getAllAccounts,
    getAccountById,
    getAccountsByCustomerId,
    updateAccountBalance
};