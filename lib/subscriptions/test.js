const moment = require('moment');

const tenDaysFromNow = moment().add(10, 'days');
const tenHoursFromNow = moment().add(12, 'hours');
console.log(tenHoursFromNow.toLocaleString());
