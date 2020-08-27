const test = require('ava');
const {statement} = require('../src/statement');
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

test('Sample test', t => {
  t.true(true);
  t.is(1, 1);
  t.deepEqual({a: 1}, {a: 1});
});

test('Amount should be 0 when performances were empty  ', t => {
    const invoice = {
        'customer' : 'Kiki',
        'performances' : []
    }
    const expectedResult = statement(invoice, plays)
    const result = `Statement for Kiki\n`
    +`Amount owed is $0.00\n`
    +`You earned 0 credits \n`

    t.is(result, expectedResult)
});

test('Amount should be  when performances were tragedy and  audience was 30 ', t => {
    const invoice = {
        'customer' : 'Kiki',
        'performances': [
              {
                'playID': 'hamlet',
                'audience': 30,
              }
        ]
    }
    const expectedResult = statement(invoice, plays)
    const result = `Statement for Kiki\n`
    +` Hamlet: $400.00 (30 seats)\n`
    +`Amount owed is $400.00\n`
    +`You earned 0 credits \n`

    t.is(result, expectedResult)
});

test('Amount should be  when performances were tragedy and  audience was 35 ', t => {
    const invoice = {
        'customer' : 'Kiki',
        'performances': [
              {
                'playID': 'hamlet',
                'audience': 35,
              }
        ]
    }
    const expectedResult = statement(invoice, plays)
    const result = `Statement for Kiki\n`
    +` Hamlet: $450.00 (35 seats)\n`
    +`Amount owed is $450.00\n`
    +`You earned 5 credits \n`

    t.is(result, expectedResult)
});

test('Amount should be  when performances were tragedy and  audience was 25 ', t => {
    const invoice = {
        'customer' : 'Kiki',
        'performances': [
              {
                'playID': 'hamlet',
                'audience': 25,
              }
        ]
    }
    const expectedResult = statement(invoice, plays)
    const result = `Statement for Kiki\n`
    +` Hamlet: $400.00 (25 seats)\n`
    +`Amount owed is $400.00\n`
    +`You earned 0 credits \n`

    t.is(result, expectedResult)
});

test('Amount should be  when performances were comedy and  audience was 20 ', t => {
    const invoice = {
        'customer' : 'Kiki',
        'performances': [
              {
                'playID': 'as-like',
                'audience': 20,
              }
        ]
    }
    const expectedResult = statement(invoice, plays)
    const result = `Statement for Kiki\n`
    +` As You Like It: $360.00 (20 seats)\n`
    +`Amount owed is $360.00\n`
    +`You earned 4 credits \n`

    t.is(result, expectedResult)
});

test('Amount should be  when performances were comedy and  audience was 25 ', t => {
    const invoice = {
        'customer' : 'Kiki',
        'performances': [
              {
                'playID': 'as-like',
                'audience': 25,
              }
        ]
    }
    const expectedResult = statement(invoice, plays)
    const result = `Statement for Kiki\n`
    +` As You Like It: $500.00 (25 seats)\n`
    +`Amount owed is $500.00\n`
    +`You earned 5 credits \n`

    t.is(result, expectedResult)
});

test('Amount should be  when performances were comedy and  audience was 10 ', t => {
    const invoice = {
        'customer' : 'Kiki',
        'performances': [
              {
                'playID': 'as-like',
                'audience': 10,
              }
        ]
    }
    const expectedResult = statement(invoice, plays)
    const result = `Statement for Kiki\n`
    +` As You Like It: $330.00 (10 seats)\n`
    +`Amount owed is $330.00\n`
    +`You earned 2 credits \n`

    t.is(result, expectedResult)
});

test('Amount should be  when performances were comedy and  audience was 2 ', t => {
    const invoice = {
        'customer' : 'Kiki',
        'performances': [
              {
                'playID': 'as-like',
                'audience': 2,
              }
        ]
    }
    const expectedResult = statement(invoice, plays)
    const result = `Statement for Kiki\n`
    +` As You Like It: $306.00 (2 seats)\n`
    +`Amount owed is $306.00\n`
    +`You earned 0 credits \n`

    t.is(result, expectedResult)
});

test('Amount should be  when performances were comedy and  audience was 2 ', t => {
    const invoice = {
        'customer' : 'Kiki',
        'performances': [
              {
                'playID': 'hamlet',
                'audience': 55,
              },
              {
                'playID': 'as-like',
                'audience': 35,
              },
              {
                'playID': 'othello',
                'audience': 40,
              },
        ],
    }
    const expectedResult = statement(invoice, plays)
    const result = `Statement for Kiki\n`
    +` Hamlet: $650.00 (55 seats)\n`
    +` As You Like It: $580.00 (35 seats)\n`
    +` Othello: $500.00 (40 seats)\n`
    +`Amount owed is $1,730.00\n`
    +`You earned 47 credits \n`

    t.is(result, expectedResult)
});

test('Amount should be  when performances were comedy and  audience was 2 ', t => {
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
    const expectedResult = statement(invoice, plays)
    const result = `Statement for Kiki\n`
    +` Hamlet: $400.00 (5 seats)\n`
    +` As You Like It: $306.00 (2 seats)\n`
    +` Othello: $400.00 (1 seats)\n`
    +`Amount owed is $1,106.00\n`
    +`You earned 0 credits \n`

    t.is(result, expectedResult)
});

test('Amount should be 0 when performances were empty  ', t => {
    const invoice = {
        'customer' : 'Kiki',
        'performances': [
                      {
                        'playID': 'hamlet1',
                        'audience': 30,
                      }
         ]
    }
    const plays = {
        'hamlet1': {
          'name': 'Hamlet',
          'type': 'tragedy1',
        }
    };
    try {
      statement(invoice, plays)
      t.fail()
    }
    catch(e) {
        t.is('unknown type: tragedy1', e.message)
    }
});





