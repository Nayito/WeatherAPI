///------load your variables for all to use-------//

let getW = document.getElementById('loadWeather');
let getF = document.getElementById('loadForecast');
let input = document.getElementById('userInput');
let del = document.getElementById('deleteStorage');

let url_pt1 = "https://api.openweathermap.org/data/2.5/weather?q=";
let url_fore = "https://api.openweathermap.org/data/2.5/forecast?q=";
let url_city_pt2 = "";
let url_temp_pt3 = "&units=imperial";
let url_key_pt4 = "&appid=99649a8b829f6ea98a24e0ef1fd6b301";

let fullURL = "";
let forecastURL = "";

let cityIndex = 0;
let listCities = [];
let btnNext = document.getElementById('btnNext');
let btnLast = document.getElementById('btnLast');

btnNext.addEventListener('click', function () {
    if (cityIndex == listCities.length - 1) {
        cityIndex = 0;
    } else {
        cityIndex++;
    }

    dataD1.innerText = listCities[cityIndex].name;
    dataD2.innerText = " Current: " + parseInt(listCities[cityIndex].main.temp) + "°F High: " + parseInt(listCities[cityIndex].main.temp_max) + "°F Low: " + parseInt(listCities[cityIndex].main.temp_min) + "°F";

    console.log(listCities);
    // cityN1.innerText = listCities[cityIndex].name;
    // cityD1.innerText = parseInt(listCities[cityIndex].main.temp) + "°F";
    // cityN2.innerText = listCities[cityIndex].name;
    // cityD2.innerText = parseInt(listCities[cityIndex].main.temp) + "°F";
    // cityN3.innerText = listCities[cityIndex].name;
    // cityD3.innerText = parseInt(listCities[cityIndex].main.temp) + "°F";
    // cityN4.innerText = listCities[cityIndex].name;
    // cityD4.innerText = parseInt(listCities[cityIndex].main.temp) + "°F";
    // cityN5.innerText = listCities[cityIndex].name;
    // cityD5.innerText = parseInt(listCities[cityIndex].main.temp) + "°F";

     
})

btnLast.addEventListener('click', function () {
    if (cityIndex == 0) {
        cityIndex = listCities.length - 1;
    } else {
        cityIndex--;
    }
    dataD1.innerText = listCities[cityIndex].name;
    dataD2.innerText = " Current: " + parseInt(listCities[cityIndex].main.temp) + "°F High: " + parseInt(listCities[cityIndex].main.temp_max) + "°F Low: " + parseInt(listCities[cityIndex].main.temp_min) + "°F";

})

let exData = [];
if (localStorage.getItem('localArrayKey')) {
    console.log('LocalStorage Exists and has been loaded');
    let loadedCities = JSON.parse(localStorage.getItem('localArrayKey'));
    console.log(loadedCities);
    for (let i = 0; i < loadedCities.length; i++) {
        fullURL = loadedCities[i].weather;
        forecastURL = loadedCities[i].forecast;
        input.value = loadedCities[i].title;
        loadJSON();
        loadForecast();
        console.log(JSON.parse(localStorage.getItem('localArrayKey')));
        newList();
    }

} else {
    console.log('LocalStorage does not exist and we are starting with no data');
}
console.log(exData);
////-------------------------------------------//
//-------------Add Event Listeners------------//
del.addEventListener('click', function () {
    localStorage.clear();
});

input.addEventListener('keypress', function (e) {
    if (e.keycode === 13) {
        url_city_pt2 = input.value;
        fullURL = url_pt1 + url_city_pt2 + url_temp_pt3 + url_key_pt4;
        forecastURL = url_fore + url_city_pt2 + url_temp_pt3 + url_key_pt4;
        loadJSON();
        loadForecast();
        console.log(url_city_pt2);
        console.log(fullURL);
        console.log(forecastURL);
        console.log(JSON.parse(localStorage.getItem('localArrayKey')));
        newList();
    }
});

getW.addEventListener('click', function (e) {
    url_city_pt2 = input.value;
    fullURL = url_pt1 + url_city_pt2 + url_temp_pt3 + url_key_pt4;
    forecastURL = url_fore + url_city_pt2 + url_temp_pt3 + url_key_pt4;
    loadJSON();
    loadForecast();
    console.log(url_city_pt2);
    console.log(fullURL);
    console.log(forecastURL);
    console.log(JSON.parse(localStorage.getItem('localArrayKey')));
    newList();
});

//Create a new object
function newList() {
    let obj = {
        title: input.value,
        weather: fullURL,
        forecast: forecastURL,
    }
    exData.push(obj);
    saveData();
    input.value = '';
}

function saveData() {
    localStorage.setItem('localArrayKey', JSON.stringify(exData));
}

//---------Load Your JSON Weather File--------//

function loadJSON() {
    let xml = new XMLHttpRequest();
    //Put your weather API URL and KEY here
    //let url = "";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            cityID = myArr.id;
            getWeather(myArr);
            dataD1.innerText = myArr.name;
            dataD2.innerText = " Current: " + parseInt(myArr.main.temp) + "°F High: " + parseInt(myArr.main.temp_max) + "°F Low: " + parseInt(myArr.main.temp_min) + "°F";
            listCities.push(myArr);
        }
    };
    xml.open("GET", fullURL, true);
    xml.send();
}

function loadForecast() {
    let xml = new XMLHttpRequest();
    //Put your weather API URL and KEY here
    //let url = "";

    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            cityID = myArr.id;
            getWeather(myArr);
            // dataDump.innerText = " Current " + parseInt(myArr.main.temp) + " Max: " + parseInt(myArr.main.temp_max) + " Min: " + parseInt(myArr.main.temp_min);
            //for (let i = 0; i < myArr.list.length; i++) {
            cityN1.innerText = myArr.city.name + " " + JSON.stringify(myArr.list[0].dt_txt);
            cityD1.innerText = parseInt(myArr.list[0].main.temp) + "°F";
            cityN2.innerText = myArr.city.name + " " + JSON.stringify(myArr.list[8].dt_txt);
            cityD2.innerText = parseInt(myArr.list[8].main.temp) + "°F";
            cityN3.innerText = myArr.city.name + " " + JSON.stringify(myArr.list[16].dt_txt);
            cityD3.innerText = parseInt(myArr.list[16].main.temp) + "°F";
            cityN4.innerText = myArr.city.name + " " + JSON.stringify(myArr.list[24].dt_txt);
            cityD4.innerText = parseInt(myArr.list[24].main.temp) + "°F";
            cityN5.innerText = myArr.city.name + " " + JSON.stringify(myArr.list[32].dt_txt);
            cityD5.innerText = parseInt(myArr.list[32].main.temp) + "°F";
            // }
        }
    };
    xml.open("GET", forecastURL, true);
    xml.send();
}

function getWeather(info) {
    console.log(info);
}