/* config file */

var fs=require('fs');
var config_obj;

switch(process.env.NODE_ENV.trim()){
	case "production":
		config_obj = JSON.parse(fs.readFileSync('./config/config-prod.json', 'utf8'));
		break;
	case "development":
		config_obj = JSON.parse(fs.readFileSync('./config/config-dev.json', 'utf8'));
		break;
	default:
		console.log("could not load node-configuration file");
} 

module.exports= config_obj;