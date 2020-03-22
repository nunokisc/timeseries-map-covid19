const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const express = require('express');
const app = express();
var http = require('http').createServer(app);
var dateFormat = require('dateformat');
var async = require("async");

const FILENAME_CONFIRMED = "/confirmed.csv"
const FILENAME_DEATHS = "/deaths.csv"
const FILENAME_RECOVERED = "/recovered.csv"
const FILENAME_PORTUGAL = require("./portugal.json")
//start app 
const port = process.env.PORT || 3000;

http.listen(port, () => console.log(`listening on *: ${port}!`))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/:country/confirmed', function (req, res) {
    if (req.params.country == "all") {
        res.status(200).json(confirmed);
    }
    else {
        let result = []
        confirmed.forEach(line => {
            if (line.country.toLowerCase() == req.params.country.toLowerCase()) {
                result.push(line);
            }
        });
        if (result.length > 0) {
            res.status(200).json(result);
        }
        else {
            res.status(400).json({ error: "country doesnt exists" });
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
            res.status(200).json(result);
        }
        else {
            res.status(400).json({ error: "date out of range" });
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
                res.status(200).json(result);
            }
            else {
                res.status(400).json({ error: "country doesnt exists" });
            }
        }
        else {
            res.status(400).json({ error: "date out of range" });
        }
    }

});

app.get('/:country/deaths', function (req, res) {
    if (req.params.country == "all") {
        res.status(200).json(deaths);
    }
    else {
        let result = []
        deaths.forEach(line => {
            if (line.country.toLowerCase() == req.params.country.toLowerCase()) {
                result.push(line);
            }
        });
        if (result.length > 0) {
            res.status(200).json(result);
        }
        else {
            res.status(400).json({ error: "country doesnt exists" });
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
            res.status(200).json(result);
        }
        else {
            res.status(400).json({ error: "date out of range" });
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
                res.status(200).json(result);
            }
            else {
                res.status(400).json({ error: "country doesnt exists" });
            }
        }
        else {
            res.status(400).json({ error: "date out of range" });
        }
    }

});

app.get('/:country/recovered', function (req, res) {
    if (req.params.country == "all") {
        res.status(200).json(recovered);
    }
    else {
        let result = []
        recovered.forEach(line => {
            if (line.country.toLowerCase() == req.params.country.toLowerCase()) {
                result.push(line);
            }
        });
        if (result.length > 0) {
            res.status(200).json(result);
        }
        else {
            res.status(400).json({ error: "country doesnt exists" });
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
            res.status(200).json(result);
        }
        else {
            res.status(400).json({ error: "date out of range" });
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
                res.status(200).json(result);
            }
            else {
                res.status(400).json({ error: "country doesnt exists" });
            }
        }
        else {
            res.status(400).json({ error: "date out of range" });
        }
    }
});

app.get('/:country/aggregate/', function (req, res) {
    if (req.params.country == "all") {
        res.status(200).json(results);
    }
    else {
        let result = []
        results.forEach(line => {
            if (line.country.toLowerCase() == req.params.country.toLowerCase()) {
                result.push(line);
            }
        });
        if (result.length > 0) {
            res.status(200).json(result);
        }
        else {
            res.status(400).json({ error: "country doesnt exists" });
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
            res.status(200).json(result);
        }
        else {
            res.status(400).json({ error: "date out of range" });
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
                res.status(200).json(result);
            }
            else {
                res.status(400).json({ error: "country doesnt exists" });
            }
        }
        else {
            res.status(400).json({ error: "date out of range" });
        }
    }
});
app.get('/dates', function (req, res) {
    res.status(200).json(dates);
});

// https://services.arcgis.com/CCZiGSEQbAxxFVh3/arcgis/rest/services/COVID19Portugal_view/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=dist_casosconf%20asc

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
            if (country == "Portugal") {
                row["province"] = "Total"
                row["country"] = country
            }
            else {
                row["province"] = ""
                row["country"] = country
            }
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
    getPortugalData(filename, dates).forEach(row => {
        countList.push(row)
    })
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

function getPortugalData(type, dates) {
    var portugalData = JSON.parse(JSON.stringify(FILENAME_PORTUGAL));
    var codeNames = portugalData.fields[3].domain.codedValues
    var portugal_results = []

    codeNames.forEach(line => {
        let province = {}
        province.province = line.name
        province.country = "Portugal"
        let location = line.code.replace("_", " ").replace("+", "").split(" ")
        province.lat = location[0]
        province.lon = location[1]
        portugal_results.push(province)
    })

    portugal_results.forEach(function (province, i) {
        let data = {}
        dates.forEach((date, i) => {
            data[date] = 0
        });
        portugalData.features.forEach(feature => {
            //console.log(feature)
            if (feature.attributes.Distrito !== null) {
                if (feature.attributes.Distrito.includes("+")) {
                    if (province.province == codeNames[codeNames.findIndex(p => p.code == feature.attributes.Distrito)].name) {
                        if (type == "/confirmed.csv") {
                            data[dateFormat(new Date(feature.attributes.datarel), "m/d/yy")] = feature.attributes.dist_casosconf
                        }
                        else if (type == "/deaths.csv") {
                            data[dateFormat(new Date(feature.attributes.datarel), "m/d/yy")] = feature.attributes.dist_obitos
                        }
                        else if (type == "/recovered.csv") {
                            data[dateFormat(new Date(feature.attributes.datarel), "m/d/yy")] = feature.attributes.dist_recuperados
                        }
                    }
                }
                else {
                    if (province.province == feature.attributes.Distrito) {
                        if (type == "/confirmed.csv") {
                            data[dateFormat(new Date(feature.attributes.datarel), "m/d/yy")] = feature.attributes.dist_casosconf
                        }
                        else if (type == "/deaths.csv") {
                            data[dateFormat(new Date(feature.attributes.datarel), "m/d/yy")] = feature.attributes.dist_obitos
                        }
                        else if (type == "/recovered.csv") {
                            data[dateFormat(new Date(feature.attributes.datarel), "m/d/yy")] = feature.attributes.dist_recuperados
                        }
                    }
                }
            }
        })
        portugal_results[i].data = data
    })
    return portugal_results
}