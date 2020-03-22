# timeseries-map-covid19
## Covid19 outbreak spread

- See the spread of the covid19 outbreak on a map day by day
https://covid19.nunocardoso.eu/
- Portugal have data by district/zone

## It's trustable?

- All the world wide information contained in the online website is updated every three hours with the data source provided by https://github.com/CSSEGISandData/COVID-19
- All the portugal detailed iformation contained in the online website is updated every three hours with the data source provided by https://esriportugal.maps.arcgis.com/apps/opsdashboard/index.html#/e9dd1dea8d1444b985d38e58076d197a

## API Reference

### AGGREG - Get all countries

```
https://covid19.nunocardoso.eu/all/aggregate
```

### AGGREG - Get all countries by one date (Date format for now "M-D-YY")

```
https://covid19.nunocardoso.eu/all/aggregate/:date
```

### AGGREG - Get one country

```
https://covid19.nunocardoso.eu/:country/aggregate
```

### AGGREG - Get one country by one date (Date format for now "M-D-YY")

```
https://covid19.nunocardoso.eu/:country/aggregate/:date
```

### SPLIT - Get all (confirmed/deaths/recovered) in every countries

```
https://covid19.nunocardoso.eu/all/(confirmed/deaths/recovered)
```

### SPLIT - Get all (confirmed/deaths/recovered) by one date (Date format for now "M-D-YY")

```
https://covid19.nunocardoso.eu/all/(confirmed/deaths/recovered)/:date
```

### SPLIT - Get (confirmed/deaths/recovered) by one contry 

```
https://covid19.nunocardoso.eu/:country/(confirmed/deaths/recovered)
```

### SPLIT - Get (confirmed/deaths/recovered) in one contry by date (Date format for now "M-D-YY")

```
https://covid19.nunocardoso.eu/:country/(confirmed/deaths/recovered)/:date
```

### Get available dates

```
https://covid19.nunocardoso.eu/dates
```


License
----

This project is licensed under the [GNU General Public License v3.0](https://github.com/rodrilima/corona-analytic-api/blob/master/LICENSE)

