const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const webapckHotMiddleWare = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const app = express();
const complier = webpack(webpackConfig);

app.use(webpackDevMiddleWare(complier, {
    publicPath: '/__build__/',
    stats: {
        colors: true,
        chunks: false
    }
}))

app.use(webapckHotMiddleWare(complier));

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

router.get('/simple/get', function (req, res) {
    res.json({
        msg: 'hello world'
    })
})

router.get('/base/get', function (req, res) {
    res.json(req.query)
})

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
    console.log(`Server lintening on http://localhost:${port},
    Ctrl+C to stop`)
})
