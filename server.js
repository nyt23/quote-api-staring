const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use(express.static('public'));


// task 1
app.get('/api/quotes/random', (req, res) => {
    res.send(getRandomElement(quotes))
});

// task 2
app.get('/api/quotes', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        res.status(200).send(quotes); // but it returns status 304 instead of 200
    } else if (req.query.person) {
        const filteredQuote = quotes.find(quote => quote.person.replace(/\s/g, '') === req.query.person);
        //console.log(filteredQuote);
        //console.log(req.query.person);
        const spacedPerson = req.query.person.replace(/([a-z])([A-Z])/g, '$1 $2');
        res.status(200).send(`Quote by ${spacedPerson} is: ${JSON.stringify(filteredQuote.quote)}`);
    } else if (!quotes.includes(req.query.person)) {
        res.send([]);
        // else if condition is not properly produced, for example when http://localhost:4001/api/quotes/?person=BillGate
    }
});



// task 3
app.post('/api/quotes' ,(req, res) => {
// for post endpoint, body-parser middleware is needed to parse to json format
    const { quote, person } = req.body;
    if (!quote || !person) {
        return res.status(400).send(`error: 'Both quote and person must be provided`);
    }
    // Add the new quote to the quotes array
    quotes.push({ quote, person });
    // Respond with a success message
    res.status(201).send(`message: 'Quote added successfully`);
});


app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
});
