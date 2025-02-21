const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.post('/payment', (req, res) => {
    const transaction_id = req.body.tr_id;
    const transaction_amount = req.body.tr_amount;
    const transaction_status = req.body.tr_status;
    fs.appendFile('transactions.txt', `${transaction_id};${transaction_amount};${transaction_status}\n`, (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.send('TRUE');
});

app.get('/transactions', (req, res) => {
    fs.readFile('transactions.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        const transactions = data.split('\n').filter((transaction) => transaction.length > 0);
        res.send(transactions);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
