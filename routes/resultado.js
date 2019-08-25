var express = require('express');
var router = express.Router();

const request = require("request");


router.get('/printedData', function (req, res) {
    var options = { method: 'GET',
        url: 'https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones/',
        qs: { 'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZWxpYS5tYXJ0aW5lei45NEBnbWFpbC5jb20iLCJqdGkiOiI0NzRmMzJhNS03OTYzLTQ3NGUtOGNlZC0xZDAyNzAzODZiNzMiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTU2NjcxNDM0OCwidXNlcklkIjoiNDc0ZjMyYTUtNzk2My00NzRlLThjZWQtMWQwMjcwMzg2YjczIiwicm9sZSI6IiJ9.S1HHtBF2_-uG6EleZRcIm7CBDj88WuSloHmz8cYovwE' },
        headers:
            { 'cache-control': 'no-cache' }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        return body;
    });
});



module.exports = router;
