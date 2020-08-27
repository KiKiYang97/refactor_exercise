const test = require('ava');
const {statementInHTML} = require('../src/statement');
const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
    'as-like': {
      'name': 'As You Like It',
      'type': 'comedy',
    },
    'othello': {
      'name': 'Othello',
      'type': 'tragedy',
    },
};
test('HTML Amount should be  when performances were comedy and  audience was 2 ', t => {
    const invoice = {
        'customer' : 'Kiki',
        'performances': [
              {
                'playID': 'hamlet',
                'audience': 5,
              },
              {
                'playID': 'as-like',
                'audience': 2,
              },
              {
                'playID': 'othello',
                'audience': 1,
              },
        ],
    }
    const expectedResult = statementInHTML(invoice, plays)
    const result = '<h1>Statement for Kiki</h1>\n' +
                       '<table>\n' +
                       '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
                       ' <tr><td>Hamlet</td><td>5</td><td>$400.00</td></tr>\n' +
                       ' <tr><td>As You Like It</td><td>2</td><td>$306.00</td></tr>\n' +
                       ' <tr><td>Othello</td><td>1</td><td>$400.00</td></tr>\n' +
                       '</table>\n' +
                       '<p>Amount owed is <em>$1,106.00</em></p>\n' +
                       '<p>You earned <em>0</em> credits</p>\n'
    t.is(result, expectedResult)
});