'use strict';

module.exports = {
  'verbose': true,
  'testMatch': [ `**/${process.env.TEST_DIR || '*'}/?(*.)test.js?(x)` ],
  //'testRunner': 'jest-circus/runner',
  'reporters': ['default',
    [ require.resolve('jest-html-reporter'), {
      'pageTitle': `Store ${(process.env.DIRECTORIES || '')} Tests`,
      'outputPath': './reports/test-report.html',
      'includeFailureMsg': true
    } ]
  ]
};
