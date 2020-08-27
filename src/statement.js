const {createStatementData} = require('../src/createStatementData');

const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
}).format;

function printResult(customer, array, totalAmount, volumeCredits) {
    let performances_print = '';
    array.forEach(function(performances) {
        performances_print +=  ` ${performances.play.name}: ${format(performances.amount / 100)} (${performances.perf.audience} seats)\n`;
    })

    let result = `Statement for ${customer}\n`
    + performances_print
    + `Amount owed is ${format(totalAmount / 100)}\n`
    + `You earned ${volumeCredits} credits \n`;
    return result;
}


function printResultInHTML(customer, array, totalAmount, volumeCredits) {
    let performances_print = '';
        array.forEach(function(performances) {
            performances_print +=   ` <tr><td>${performances.play.name}</td><td>${performances.perf.audience}</td><td>${format(performances.amount / 100)}</td></tr>\n`;
    })
    let result = `<h1>Statement for ${customer}</h1>\n` +
                     `<table>\n` +
                     `<tr><th>play</th><th>seats</th><th>cost</th></tr>`
                      + performances_print
                      +`</table>\n`
                     +`<p>Amount owed is <em>${format(totalAmount / 100)}</em></p>\n`
                    +`<p>You earned <em>${volumeCredits}</em> credits</p>\n`
    return result;
}


function statement (invoice, plays) {
  const data = createStatementData(invoice,plays);
  return printResult(invoice.customer, data.array, data.totalAmount, data.volumeCredits);
}

function statementInHTML (invoice, plays) {
  const data = createStatementData(invoice,plays);
  return printResultInHTML(invoice.customer, data.array, data.totalAmount, data.volumeCredits);
}

module.exports = {
  statement,
  statementInHTML
};
