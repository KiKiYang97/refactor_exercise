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

function createStatementData(invoice,plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let array = [];
    for (let perf of invoice.performances) {
      const play = plays[perf.playID];
      let thisAmount = calculateAmount(play, perf);
      volumeCredits += Math.max(perf.audience - 30, 0);
      if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
      array.push({'play':play,'amount':thisAmount,'perf':perf})
      totalAmount += thisAmount;
    }
    return {
    'totalAmount' : totalAmount,
    'volumeCredits' : volumeCredits,
    'array' : array
    }
}

module.exports = {
  createStatementData,
};
