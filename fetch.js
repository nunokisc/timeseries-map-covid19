const fs = require("fs");
const fetch = require('node-fetch');
const path = require("path");

const PATH_GITHUB = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/"
const CONFIRMED_SOURCE = PATH_GITHUB + "time_series_19-covid-Confirmed.csv";
const DEATHS_SOURCE = PATH_GITHUB + "time_series_19-covid-Deaths.csv";
const RECOVERED_SOURCE = PATH_GITHUB + "time_series_19-covid-Recovered.csv";

fetch(CONFIRMED_SOURCE)
    .then(res => res.text())
    .then(body => {
        console.log(body)
        fs.writeFileSync(__dirname  + "/confirmed.csv", body);
    });
fetch(DEATHS_SOURCE)
    .then(res => res.text())
    .then(body => {
        console.log(body)
        fs.writeFileSync(__dirname  + "/deaths.csv", body);
    });
fetch(RECOVERED_SOURCE)
    .then(res => res.text())
    .then(body => {
        console.log(body)
        fs.writeFileSync(__dirname  + "/recovered.csv", body);
    });