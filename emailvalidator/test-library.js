// function ValidateEmail(mail) {
//     return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) // regular expression, matching patterns
// }
// console.log(ValidateEmail('testtest.com'))

const email_validator = require('email-validator')

console.log(email_validator.validate('testtest.com'))
