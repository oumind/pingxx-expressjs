# Using
clone this project 
    
    git clone git@github.com:oumind/pingxx-expressjs.git

install npm dependencies

    npm install

change src/app.js
    
    var pingpp = require('pingpp')('YOUR-KEY');//TODO YOUR-KEY like sk_test_XXXXXXXXXXXXXXXXXXXXXXXX or sk_live_XXXXXXXXXXXXXXXXXXXXXXXX
    
    app: {id: "YOUR-APP-ID"},//TODO YOUR-APP-ID like app_XXXXXXXXXXXXXXXX
 
start server
    
    npm start
