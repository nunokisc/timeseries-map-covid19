const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const express = require('express');
const cors = require('cors');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const FILENAME_CONFIRMED = "/confirmed.csv"
const FILENAME_DEATHS = "/deaths.csv"
const FILENAME_RECOVERED = "/recovered.csv"
//start app 
const port = process.env.PORT || 3000;

http.listen(port, () => console.log(`listening on *: ${port}!`))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.join(socket.handshake.query.token);

    io.to(socket.handshake.query.token).emit("data", {dates:dates, results: results});

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});


function extract(filename) {
    const csv = fs.readFileSync(__dirname  + filename);
    const [headers, ...rows] = parse(csv);
    const [province, country, lat, long, ...dates] = headers;
    const countList = []

    rows.forEach(([province, country, lat, long, ...counts]) => {
        let row = {}
        if (province) {
            //console.log(province +" - " + country)
            row["province"] = province
            row["country"] = country
        }
        else {
            //console.log(country)
            row["province"] = ""
            row["country"] = country
        }
        row["lat"] = lat;
        row["lon"] = long;
        data = {}
        dates.forEach((date, i) => {
            data[date] = counts[i]
        });
        row["data"] = data;
        countList.push(row)
    });
    return [countList, dates];
}

const [confirmed, dates] = extract(FILENAME_CONFIRMED);
const [deaths] = extract(FILENAME_DEATHS);
const [recovered] = extract(FILENAME_RECOVERED);;
const results = [];

for (let index = 0; index < confirmed.length; index++) {
    results[index] = confirmed[index];
    dates.forEach(date => {
        results[index].data[date] = {
            confirmed: confirmed[index].data[date],
            deaths: deaths[index].data[date],
            recovered: recovered[index].data[date]
        }
    })
    results[index].data
}
