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

function printResult(customer, performances_print, totalAmount, volumeCredits) {
    let result = `Statement for ${customer}\n`
    + performances_print
    + `Amount owed is ${format(totalAmount / 100)}\n`
    + `You earned ${volumeCredits} credits \n`;
    return result;
}

function printPlayResult(play,amount, perf) {
    return ` ${play.name}: ${format(amount / 100)} (${perf.audience} seats)\n`;
}

function printResultInHTML(customer, performances_print, totalAmount, volumeCredits) {
    let result = `<h1>Statement for ${customer}</h1>\n` +
                     `<table>\n` +
                     `<tr><th>play</th><th>seats</th><th>cost</th></tr>`
                      + performances_print
                      +`</table>\n`
                     +`<p>Amount owed is <em>${format(totalAmount / 100)}</em></p>\n`
                    +`<p>You earned <em>${volumeCredits}</em> credits</p>\n`
    return result;
}

function printPlayResultInHTML(play,amount, perf) {
    return  ` <tr><td>${play.name}</td><td>${perf.audience}</td><td>${format(amount / 100)}</td></tr>\n`;
}

function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let performances_print = '';
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = calculateAmount(play, perf);
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

    performances_print += printPlayResult(play, thisAmount, perf);
    totalAmount += thisAmount;
  }
  return printResult(invoice.customer, performances_print, totalAmount, volumeCredits);
}

function statementInHTML (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let performances_print = '';
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = calculateAmount(play, perf);
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

    performances_print += printPlayResultInHTML(play, thisAmount, perf);
    totalAmount += thisAmount;
  }
  return printResultInHTML(invoice.customer, performances_print, totalAmount, volumeCredits);
}

module.exports = {
  statement,
  statementInHTML
};
