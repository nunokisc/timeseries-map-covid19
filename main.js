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

app.get('/:country/confirmed', function (req, res) {
    if (req.params.country == "all") {
        res.json(confirmed);
    }
    else {
        let result = []
        confirmed.forEach(line => {
            if (line.country.toLowerCase() == req.params.country.toLowerCase()) {
                result.push(line);
            }
        });
        if (result.length > 0) {
            res.json(result);
        }
        else {
            res.json({ error: "country doesnt exists" });
        }
    }
});
app.get('/:country/confirmed/:date/', function (req, res) {
    let confirmed_tmp = JSON.parse(JSON.stringify(confirmed));
    let result = []
    if (req.params.country == "all") {
        if (dates.includes(req.params.date.replace(/-/g, "/") + "")) {
            confirmed_tmp.forEach(line => {
                line.data = line.data[req.params.date.replace(/-/g, "/")]
                result.push(line);
            });
            res.json(result);
        }
        else {
            res.json({ error: "date out of range" });
        }
    }
    else {
        if (dates.includes(req.params.date.replace(/-/g, "/") + "")) {
            confirmed_tmp.forEach(line => {
                if (line.country.toLowerCase() == req.params.country.toLowerCase()) {
                    line.data = line.data[req.params.date.replace(/-/g, "/")]
                    result.push(line);
                }
            });
            if (result.length > 0) {
                res.json(result);
            }
            else {
                res.json({ error: "country doesnt exists" });
            }
        }
        else {
            res.json({ error: "date out of range" });
        }
    }

});

app.get('/:country/deaths', function (req, res) {
    if (req.params.country == "all") {
        res.json(deaths);
    }
    else {
        let result = []
        deaths.forEach(line => {
            if (line.country.toLowerCase() == req.params.country.toLowerCase()) {
                result.push(line);
            }
        });
        if (result.length > 0) {
            res.json(result);
        }
        else {
            res.json({ error: "country doesnt exists" });
        }
    }
});


app.get('/:country/deaths/:date/', function (req, res) {
    let deaths_tmp = JSON.parse(JSON.stringify(deaths));
    let result = []
    if (req.params.country == "all") {
        if (dates.includes(req.params.date.replace(/-/g, "/") + "")) {
            deaths_tmp.forEach(line => {
                line.data = line.data[req.params.date.replace(/-/g, "/")]
                result.push(line);
            });
            res.json(result);
        }
        else {
            res.json({ error: "date out of range" });
        }
    }
    else {
        if (dates.includes(req.params.date.replace(/-/g, "/") + "")) {
            deaths_tmp.forEach(line => {
                if (line.country.toLowerCase() == req.params.country.toLowerCase()) {
                    line.data = line.data[req.params.date.replace(/-/g, "/")]
                    result.push(line);
                }
            });
            if (result.length > 0) {
                res.json(result);
            }
            else {
                res.json({ error: "country doesnt exists" });
            }
        }
        else {
            res.json({ error: "date out of range" });
        }
    }

});

app.get('/:country/recovered', function (req, res) {
    if (req.params.country == "all") {
        res.json(recovered);
    }
    else {
        let result = []
        recovered.forEach(line => {
            if (line.country.toLowerCase() == req.params.country.toLowerCase()) {
                result.push(line);
            }
        });
        if (result.length > 0) {
            res.json(result);
        }
        else {
            res.json({ error: "country doesnt exists" });
        }
    }
});
app.get('/:country/recovered/:date/', function (req, res) {
    let recovered_tmp = JSON.parse(JSON.stringify(recovered));
    let result = []
    if (req.params.country == "all") {
        if (dates.includes(req.params.date.replace(/-/g, "/") + "")) {
            recovered_tmp.forEach(line => {
                line.data = line.data[req.params.date.replace(/-/g, "/")]
                result.push(line);
            });
            res.json(result);
        }
        else {
            res.json({ error: "date out of range" });
        }
    }
    else {
        if (dates.includes(req.params.date.replace(/-/g, "/") + "")) {
            recovered_tmp.forEach(line => {
                if (line.country.toLowerCase() == req.params.country.toLowerCase()) {
                    line.data = line.data[req.params.date.replace(/-/g, "/")]
                    result.push(line);
                }
            });
            if (result.length > 0) {
                res.json(result);
            }
            else {
                res.json({ error: "country doesnt exists" });
            }
        }
        else {
            res.json({ error: "date out of range" });
        }
    }
});

app.get('/:country/aggregate/', function (req, res) {
    if (req.params.country == "all") {
        res.json(results);
    }
    else {
        let result = []
        results.forEach(line => {
            if (line.country.toLowerCase() == req.params.country.toLowerCase()) {
                result.push(line);
            }
        });
        if (result.length > 0) {
            res.json(result);
        }
        else {
            res.json({ error: "country doesnt exists" });
        }
    }
});
app.get('/:country/aggregate/:date/', function (req, res) {
    let results_tmp = JSON.parse(JSON.stringify(results));
    let result = []
    if (req.params.country == "all") {
        if (dates.includes(req.params.date.replace(/-/g, "/") + "")) {
            results_tmp.forEach(line => {
                line.data = line.data[req.params.date.replace(/-/g, "/")]
                result.push(line);
            });
            res.json(result);
        }
        else {
            res.json({ error: "date out of range" });
        }
    }
    else {
        if (dates.includes(req.params.date.replace(/-/g, "/") + "")) {
            results_tmp.forEach(line => {
                if (line.country.toLowerCase() == req.params.country.toLowerCase()) {
                    line.data = line.data[req.params.date.replace(/-/g, "/")]
                    result.push(line);
                }
            });
            if (result.length > 0) {
                res.json(result);
            }
            else {
                res.json({ error: "country doesnt exists" });
            }
        }
        else {
            res.json({ error: "date out of range" });
        }
    }
});
app.get('/dates', function (req, res) {
    res.json(dates);
});




io.on('connection', function (socket) {
    console.log('a user connected');
    socket.join(socket.handshake.query.token);

    io.to(socket.handshake.query.token).emit("data", { dates: dates, results: results });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});


function extract(filename) {
    const csv = fs.readFileSync(__dirname + filename);
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
    results[index] = JSON.parse(JSON.stringify(confirmed[index]));
    //results[index] = confirmed[index];
    dates.forEach(date => {
        results[index].data[date] = {
            confirmed: confirmed[index].data[date],
            deaths: deaths[index].data[date],
            recovered: recovered[index].data[date]
        }
    })
    results[index].data
}
