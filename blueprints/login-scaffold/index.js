/*jshint node:true*/
var path = require('path');

module.exports = {
  description: 'Generates a Login scaffold in pod structure.',

  fileMapTokens: function() {
    return {
      __root__: function(options) {
        if (options.inAddon) {
          return path.join('tests', 'dummy');
        }
        return '/';
      }
    };
  }
};;
