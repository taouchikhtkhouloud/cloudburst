const wrapper = document.querySelector('.wrapper');
inputP = wrapper.querySelector(".input-part");
txt = inputP.querySelector(".info-txt");
field = inputP.querySelector("input");
button = inputP.querySelector('button');
wicon = document.querySelector(".weather-part img");
back = wrapper.querySelector("header i")
key="fa86cc1d1095811d07edb14c3960b774";
field.addEventListener("keyup", e =>{
    if(e.key == "Enter" && field.value!= ""){
        requestApi(field.value)
    }
})
button.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else{
        txt.innerText='Browser dont support geolocation ';
        txt.classList.add('error');
    }
})
function onSuccess(position){
    key="fa86cc1d1095811d07edb14c3960b774";
    txt.innerText='Getting weather details';
    txt.classList.add('pending');
    const {latitude, longitude} = position.coords;
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`
    fetch(api).then(res => res.json()).then(result => weather(result))

}
function onError(error){
    txt.innerText=error.message;
    txt.classList.add('error');
}

function requestApi(city){
    key="fa86cc1d1095811d07edb14c3960b774";

    txt.innerText='Getting weather details';
    txt.classList.add('pending');
    api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    fetch(api).then(res => res.json()).then(result => weather(result))
}

function weather(info){
    if(info.cod== '404'){
        txt.classList.remove("pending")
        txt.classList.add('error');
        txt.innerText=`${info.message}`;
    
    }
    else{
        txt.classList.remove("pending","error")
        const city=info.name;
        
        const tempmax=info.main.temp_max;
        const tempmin=info.main.temp_min;
        const humidity=info.main.humidity;
        const country= info.sys.country;
        const {description, id}=info.weather[0];
        const wind=info.wind.speed;
        wrapper.querySelector(".temp .numb1").innerText = Math.floor(tempmax);
        wrapper.querySelector(".temp .numb2").innerText = Math.floor(tempmin);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city} , ${country}`;
        wrapper.querySelector(".humidity span").innerText = humidity;
        wrapper.querySelector(".wind span").innerText = wind;
        if(id == 800){
            wicon.src="weather/1.png"
        }
        else if(id >= 200 && id <= 232){
            wicon.src="weather/5.png"
        }
        else if(id >= 600 && id <= 622){
            wicon.src="weather/4.png"
        }else if(id >= 701 && id <= 781){
            wicon.src="weather/6.png"
        }else if(id >= 801 && id <= 804){
            wicon.src="weather/2.png"
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 521)){
            wicon.src="weather/3.png"
        }
        wrapper.classList.add("active")
    }
  console.log(info)
}
back.addEventListener("click", ()=>{
    wrapper.classList.remove("active")
})