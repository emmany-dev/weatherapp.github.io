const renderWeatherData = data =>{
    
    const errCode =data.cod;
    if(errCode !==200){
        renderErrorMsg(data.message)
    }else{
        const docFrag = document.createDocumentFragment();

        const place = data['name']
            const placeElm = document.createElement('h4');
                    placeElm.textContent = place;
                    placeElm.className = "place";
                    docFrag.appendChild(placeElm)
        const temp = data['main']['temp']
        const tempElm = document.createElement('h4');
                    tempElm.textContent = temp+"K";
                    tempElm.className = "temperature";
                    docFrag.appendChild(tempElm)
        const description = data['weather'][0]['description']
        const descElm = document.createElement('p');
                    descElm.textContent = description;
                    descElm.className = "desc";
                    docFrag.appendChild(descElm)
        const icon = data['weather'][0]['icon'];
        const iconUrl =`http://openweathermap.org/img/wn/${icon}@2x.png`;
        const iconElm = document.createElement('img');
                    iconElm.src = iconUrl;
                    iconElm.alt = description;
                    placeElm.className = "icon";
                    docFrag.appendChild(iconElm);
                    const result = document.getElementById('result');
                    result.innerHTML="";
                    result.appendChild(docFrag);


    }
}

const renderErrorMsg = err =>{
    document.getElementById('errMsg').innerHTML=err;
}
const callWeatherAPI = (inputValue)=>{
    const ApibaseUrl ="http://api.openweathermap.org/data/2.5/weather?q=";
    const APIKey ="f82197458f800835d94deef823984ea7";
    const realApiUrl=`${ApibaseUrl}${inputValue}&appid=${APIKey}`
    fetch(realApiUrl)
    .then(res=>res.json())
    .then(renderWeatherData)
    .catch(error=>{
        const err = `Kasala don burst, this one na gbege, original gbege \n Technical details:${error}`
        renderErrorMsg(err);
    })
}

const getWeather = (e)=>{
    e.preventDefault();
    input = document.getElementById('userValue');
    inputValue = input.value;
    if(inputValue===''){
        renderErrorMsg("You need to Provide a Location")
        input.style.border ="1px solid red";
       
    }else{
        callWeatherAPI(inputValue)
    }
}

const form = document.getElementById('getWeatherForm');
        form.addEventListener('submit',getWeather,false);