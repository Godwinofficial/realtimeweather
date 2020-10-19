const api = {
  key: '67130ab6b55395086ea477f952322fe2',
  base: 'https://api.openweathermap.org/data/2.5/'
}

const searchbox = document.querySelector('.search');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
  if(evt.keyCode == 13){
   getResults(searchbox.value)
  }
}

function getResults(query){
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  .then(weather =>{
    return weather.json()
  }).then(displayRusults)
}

function displayRusults(weather){
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  
  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);
  
  const temp = document.querySelector('.current .temp');
  temp.innerHTML  = `${Math.round(weather.main.temp)} <span>°c<span/>`
  
  
  const weatherBottom = document.querySelector('.current .weather');
  weatherBottom.innerText = weather.weather[0].main;
}

const dateBuilder = d =>{
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let days = ['Sun', 'Mon', 'Tue', 'wed', 'Thur', 'Fri'];
  
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  
  return `${day} ${date} ${month} ${year}`
}