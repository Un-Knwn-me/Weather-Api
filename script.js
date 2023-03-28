let newelement1 = document.createElement("h1");
newelement1.setAttribute("id", "title");
newelement1.setAttribute("class", "text-center");
newelement1.innerText="Rest Countries";
document.body.appendChild(newelement1);

let newelement = document.createElement("div");
newelement.setAttribute("class", "container");
document.body.append(newelement);



let cards = document.createElement("div");
cards.setAttribute("class", "row");

fetch("https://restcountries.com/v3.1/all")
.then((response)=> response.json())
.then((data)=>{
    console.log(data);
    data.forEach(ele=>{
        const countrydetails = {
            ...ele,
            flag: ele.flags.png,
            name: ele.name.common,
            region: ele.region,
            capital: ele.capital,
            latitude: ele.latlng[0],
            longitude: ele.latlng[1],
            countrycode: ele.cca3
        }
        createcountry(countrydetails)
    })
})
.catch((err)=>console.log(err));

function createcountry({flag, name, region, capital, countrycode, latitude, longitude}) {
    cards.innerHTML += `<div class="row card-deck col-sm-6 col-md-4 col-lg-4 col-xl-4">
    <div class="card h-100">
    <div class="card-header text-center">
    ${name}
    </div>
    <img src="${flag}" alt="${name}" class="card-img-top"/>
    <div id="${name}" class="card-body sub mx-3">
    <div class= "card-text">
    <p><span class="font-weight-bold">Region: </span> ${region}</p>
    <p><span class="font-weight-bold">capital: </span> ${capital}</p>
    <p><span class="font-weight-bold">Country code: </span> ${countrycode}</p>

    <p><span class="font-weight-bold">Coordinate: </span> ${latitude}, ${longitude}</p>
    </div>
    </div>
    <button onclick="weather(${latitude}, ${longitude}, '${name}')" class="btn btn-primary">Click for Weather</button>
     </div>  
     </div>`  
};
newelement.appendChild(cards);

async function weather(latitude, longitude, id){

try {
    const API_key = "1dea7b633e8f62b90d63685e1d21e2e6";

    let element = document.getElementById(id);
    
    let API_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`;

    let weat_res = await fetch(API_url, {
        method:"GET"
    });

    let res = await weat_res.json();

    element.innerHTML += `
    <p><span class="font-weight-bold">Weather: </span> ${res.weather[0].description}</p>
    <p><span class="font-weight-bold">Temprature: </span> ${res.main.temp}</p>`
} catch (error) {
    console.log(error);
}
}