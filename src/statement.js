function calculateTragedyAmount(perf) {
    let thisAmount = 40000;
    if (perf.audience > 30) {
      thisAmount += 1000 * (perf.audience - 30);
    }
    return thisAmount;
}

function calculateComedyAmount(perf) {
    let thisAmount = 30000;
    if (perf.audience > 20) {
      thisAmount += 10000 + 500 * (perf.audience - 20);
    }
    return thisAmount += 300 * perf.audience;
}

function calculateAmount(play, perf) {
 let thisAmount = 0;
    switch (play.type) {
      case 'tragedy':
        thisAmount = calculateTragedyAmount(perf);
        break;
      case 'comedy':
        thisAmount = calculateComedyAmount(perf);
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    return thisAmount;
}

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
  let totalAmount = 0;
  let volumeCredits = 0;
  let performances_print = '';
  let array = [];
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = calculateAmount(play, perf);
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
    array.push({'play':play,'amount':thisAmount,'perf':perf})
    totalAmount += thisAmount;
  }
  return printResult(invoice.customer, array, totalAmount, volumeCredits);
}

function statementInHTML (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let performances_print = '';
  let array = [];
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = calculateAmount(play, perf);
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
    array.push({'play':play,'amount':thisAmount,'perf':perf})
//    performances_print += printPlayResultInHTML(play, thisAmount, perf);
    totalAmount += thisAmount;
  }
  return printResultInHTML(invoice.customer, array, totalAmount, volumeCredits);
}

module.exports = {
  statement,
  statementInHTML
};
