const express = require('express');
const next = require('next');
const cors = require('cors');
//const server = express();
const bodyParser = require('body-parser');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
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
        productItemsDB.sort((a,b) => {
            return a.score > b.score ? -1 : 1;
        })
        res.send(productItemsDB);
    });
    
    server.get('/coupon', (req, res) => { // 쿠폰 api
        //res.header("Access-Control-Allow-Origin", "*");
        res.send(couponsDB);
    });

    server.get('/product/:id', (req, res) => {
        return app.render(req, res, '/product', { id : req.params.id });
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });
    
    server.listen(3001, () => {
        console.log('express running on 3001');
    });
})
