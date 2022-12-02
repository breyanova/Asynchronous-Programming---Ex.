const enumIcon = {
    "Sunny": "&#x2600",
    "Partly sunny": "&#x26C5",
    "Overcast": "&#x2601",
    "Rain": "&#x2614",
    "Degrees": "&#176"
};

const forecastContainer = document.getElementById('forecast');

function attachEvents() {

    document.getElementById('submit').addEventListener('click', getWeather);
}

async function getWeather() {

    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    const townName = document.getElementById('location').value;

try {
    const response = await fetch(url);
    const data = await response.json();


    const info = data.find(x => x.name === townName)
    createForecaster(info.code);

    
    
} catch (error) {
    forecastContainer.style.display = 'block';
    forecastContainer.textContent = 'Error';
    
}


    

}

async function createForecaster(code) {
    const divElementCurrent = document.getElementById('current');
    const divElementUpcoming = document.getElementById('upcoming');
    
    const urlToday = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
    const urlUpcoming = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

    try {
        

    const responseToday = await fetch(urlToday);
    const dataToday = await responseToday.json();

    const responseUpcomig = await fetch(urlUpcoming);
    const dataUpcomig = await responseUpcomig.json();

    forecastContainer.style.display = 'block';

    const todayHTMLTemp = createToday(dataToday);
    divElementCurrent.appendChild(todayHTMLTemp);

    const upcomingHTMLTemp = createUpcomig(dataUpcomig);
    divElementUpcoming.appendChild(upcomingHTMLTemp);
        
    } catch (error) {
        forecastContainer.style.display = 'block';
        forecastContainer.textContent = 'Error';
        
    }


}

function createUpcomig(data) {
    const forecastArray = data.forecast;
    const divForecastInfo = document.createElement('div');
    divForecastInfo.classList.add('forecast-info');


    for (const data of forecastArray) {
        const spanUpcomming = document.createElement('span');
        spanUpcomming.classList.add('upcoming');

        let spanSymbol = document.createElement('span');
        spanSymbol.classList.add('symbol');
        spanSymbol.innerHTML = enumIcon[data.condition];

        let spanTemp = document.createElement('span');
        spanTemp.classList.add('forecast-data');
        spanTemp.innerHTML = `${data.low}${enumIcon.Degrees}/${data.high}${enumIcon.Degrees}`;

        let spanCondition = document.createElement('span');
        spanCondition.classList.add('forecast-data');
        spanCondition.textContent = data.condition;

        spanUpcomming.appendChild(spanSymbol);
        spanUpcomming.appendChild(spanTemp);
        spanUpcomming.appendChild(spanCondition);

        divForecastInfo.appendChild(spanUpcomming);
        






    }

return divForecastInfo;

};

function createToday(data) {
    const {
        condition,
        high,
        low
    } = data.forecast;
    const conditionContainer = document.createElement('div');
    conditionContainer.classList.add('forecasts');
    const conditionSpan = document.createElement('span');
    conditionSpan.classList.add('condition');



    const iconSpan = document.createElement('span');
    iconSpan.classList.add('condition');
    iconSpan.classList.add('symbol');
    iconSpan.innerHTML = enumIcon[condition];

    const nameSpan = document.createElement('span');
    nameSpan.classList.add('forecast-data');
    nameSpan.textContent = data.name;

    const tempSpan = document.createElement('span');
    tempSpan.classList.add('forecast-data');
    tempSpan.innerHTML = `${low}${enumIcon.Degrees}/${high}${enumIcon.Degrees}`;

    const conditionTxtSpan = document.createElement('span');
    conditionTxtSpan.classList.add('forecast-data');
    conditionTxtSpan.textContent = condition;

    conditionSpan.appendChild(nameSpan);
    conditionSpan.appendChild(tempSpan);
    conditionSpan.appendChild(conditionTxtSpan);

    conditionContainer.appendChild(iconSpan);
    conditionContainer.appendChild(conditionSpan);

    return conditionContainer;



}

attachEvents();