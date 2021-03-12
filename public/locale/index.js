// export * from './header.json'
// export * from './banner.json'

var header = require('./header');
var banner = require('./banner.js');

module.exports = function(){
    return{
        header: header,
        banner: banner
    }
}