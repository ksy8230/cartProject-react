const express = require('express');
const cors = require('cors');
const server = express();
const bodyParser = require('body-parser');

server.use(cors({
    origin : true,
    credentials : true,
}));
server.use(express.json());
server.use(bodyParser.json());

const productItemsDB = require('./source/productItems.js');
const couponsDB = require('./source/coupons.js');

server.get('/productlist', (req, res) => { // 상품리스트 로드 api
    //res.header("Access-Control-Allow-Origin", "*");
    console.log(productItemsDB)
    productItemsDB.sort((a,b) => {
        return a.score > b.score ? -1 : 1;
    })
    res.send(productItemsDB);
});

server.get('/coupon', (req, res) => { // 쿠폰 api
    //res.header("Access-Control-Allow-Origin", "*");
    console.log(couponsDB)
    res.send(couponsDB);
});

server.listen(3001, () => {
    console.log('express running on 3001');
});