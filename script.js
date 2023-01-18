document.querySelector('.search-btn').addEventListener('click', () => {
    let nameCity = document.querySelector('.inp-search').value
    serch_logic(nameCity)
    removeItem()
    drow_deys(xonavutyun, chnshum, aravot, or, ereko, nkar, bacatrutyun, date)
})

document.querySelector('.inp-search').addEventListener('keydown', (ev) => {
    if (ev.key == 'Enter') {
        let nameCity = document.querySelector('.inp-search').value
        serch_logic(nameCity)
        removeItem()
    }
})

function serch_logic(nameCity) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&lang=en&appid=3bad709d0b8b493242d8517df9c5aa89&units=metric`)
        .then(res => res.json())
        .then(res => {
            let lat = res.coord.lat
            let lon = res.coord.lon
            let city = res.name
            getAllDeys(lat, lon, city)
        })

    function getAllDeys(lat, lon, city) {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=en&exclude=hourly&appid=3bad709d0b8b493242d8517df9c5aa89&units=metric`)
            .then(res => res.json())
            .then(res => {

                const date = new Date(res.daily[0].dt * 1000)

                let temp = Math.round(res.current.temp)
                let desc = res.current.weather[0].description
                let tempMax = Math.round(res.daily[0].temp.max)
                let tempMin = Math.round(res.daily[0].temp.min)
                let icon = `https://openweathermap.org/img/wn/${res.current.weather[0].icon}.png`

                get_weder(city, date, temp, desc, icon, tempMax, tempMin)

                console.log(res.daily)

                for (let i = 1; i < 7; i++) {
                    let days = res.daily[i]
                    const date = new Date(days.dt * 1000)

                    let xonavutyun = Math.round(days.humidity)
                    let chnshum = Math.round(days.pressure)
                    let aravot = Math.round(days.temp.morn)
                    let or = Math.round(days.temp.day)
                    let ereko = Math.round(days.temp.night)
                    let nkar = `https://openweathermap.org/img/wn/${days.weather[0].icon}.png`
                    let bacatrutyun = days.weather[0].description

                    drow_deys(xonavutyun, chnshum, aravot, or, ereko, nkar, bacatrutyun, date)
                }
            })
    }


    function get_weder(city, date, temp, desc, icon, tempMax, tempMin) {
        let cont = document.querySelector('.cont-today')
        cont.innerHTML = `
    <h3 class="country">${city}</h3>
    <h3>${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</h3>
    <span class = 'now'>today</span>
    <img class='images' src='${icon}'>
    <div class='flex-cont'>
        <p class="main">${desc}</p>
        <p class="temp">${temp}°C</p>
    </div>
    <div class='minMax-temp'>
        <div class='minTemp-cont'>
            <p class='temp-max'>${tempMin}°C</p>
            <span class='smallText'>min<span>
        </div>
        <div class='maxTemp-cont'>
            <p class='temp-min'>${tempMax}°C</p>
            <span class='smallText'>max<span>
        </div>
    </div>`
    }

    function drow_deys(xonavutyun, chnshum, aravot, or, ereko, nkar, bacatrutyun, date) {
        let week_cont = document.querySelector('.week')
        let div = document.createElement('div')
        div.className = 'days'
        div.innerHTML = `
            <div class="date-cont">
            <h3 class="date">${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</h3>
        </div>
        <div class="icon-decript">
            <img class="icon" src="${nkar}" alt="icon" />
            <p class="description">${bacatrutyun}</p>
        </div>
        <div class="temp">
        <div class='temp-cont'><span>morn: </span><p class="morning"> ${aravot}</p></div>
        <div class='temp-cont'><span>day: </span><p class="day"> ${or}</p></div>
        <div class='temp-cont'><span>night: </span> <p class="night"> ${ereko}</p></div>
        </div>
        <div class="wind-humidity">
        <div class='temp-cont'><div class="chnshum"><span>pressure: </span>${chnshum}</div></div>
        <div class='temp-cont'><span>humidity: </span> <div class="humidity">${xonavutyun}</div></div>
        </div>
    `
        week_cont.appendChild(div)
    }
}

function removeItem() {
    document.querySelector('.cont-today').innerHTML = ''
    document.querySelector('.week').innerHTML = ''
}
//ynenec sarkel vor skzbum cuc ta erevani tesutyny