// This is the code that was in the boilerplate

// require('module-alias/register');

// const fs = require('fs');

// module.exports = (app) => {
//   // require all API endpoints
//   fs.readdirSync(`${__dirname}/api/`).forEach((file) => {
//     require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
//   });
// };

const fs = require('fs');
const path = require('path');

module.exports = (app) => {
	fs.readdirSync('routes/api/').forEach((file) => {
		require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
	})
}