const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: 'cypress/report/cucumber-json',
    reportPath: 'cypress/report/cucumber-html',
    customData: {
        title: 'Test Report',
        data: [
            { label: 'Project', value: 'Cypress-Cucumber' },
            { label: 'Release', value: '1.2.3' },
            { label: 'Cycle', value: 'B11221.34321' }
        ]
    }
});