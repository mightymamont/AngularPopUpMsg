echo Y|rd libs /s
echo Y|rd node_modules /s

rem bower
rem http://bower.io/docs/config/
call bower install angular
call bower install angular-mocks
call bower install jasmine
rem npm
call npm init -f
call npm i grunt --save-dev
call npm i grunt-newer --save-dev
call npm i grunt-ngdocs --save-dev
call npm i grunt-karma --save-dev
call npm i grunt-contrib-watch --save-dev
call npm i grunt-contrib-less --save-dev
call npm i grunt-contrib-concat --save-dev
call npm i grunt-contrib-copy --save-dev
call npm i grunt-contrib-cssmin --save-dev
call npm i grunt-contrib-uglifyjs --save-dev
call npm i grunt-includes --save-dev
