'use strict';

const ListOfCountries = [
            {
                Country: 'Sweden',
                Capital: 'Stockholm',
                Nationalsport: 'Hockey',
                Democracy: 'yes',
                Language: 'Swedish',
                Flag: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg'
            },
            {
                Country: 'Norway',
                Capital: 'Oslo',
                Population: '7 Million',
                Democracy: 'yes',
                Language: 'Norwegian',
                Flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/1200px-Flag_of_Norway.svg.png'
            },
    
            {
                Country: 'Usa',
                Capital: 'Washington DC',
                Population: '360 million',
                Democracy: 'yes',
                Language: 'English',
                Flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'
            },
            {
                Country: 'Nordkorea',
                Capital: 'Pyongyang',
                Population: '25 million',
                Democracy: 'no',
                Language: 'Korean',
                Flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Flag_of_North_Korea.svg/1200px-Flag_of_North_Korea.svg.png'
            },
]
    
let i = - 1;
let d = 0;
let NextButton = document.querySelector("#NextButton")
let PrevButton = document.querySelector('#PrevButton')
let Counter = document.querySelector("#CountryNumber")
// ------------- Denna funktionen gör så att knapparna inte fungerar länge, så att man inte ska kunna fortsätta trycka. Tex om du nått sista landen så stängs Next knappen av------
function resetNextPrev() {
    if(i == 0){
        document.querySelector("#PrevButton").disabled = true;
    } else {
        document.querySelector("#PrevButton").disabled = false;
    }
    
    if(i == ListOfCountries.length - 1){
        document.querySelector("#NextButton").disabled = true;
    } else {
        document.querySelector("#NextButton").disabled = false;
    }
}

NextButton.onclick = function () {
    i++;
    ChangeCountry()
}
PrevButton.onclick = function () {
    i--;
    ChangeCountry()
}
// ----------en enkel funktion som skickar in värderna till li taggarna------------
function ChangeCountry () {
    for(const [key, value] of Object.entries(ListOfCountries[i])) {
        let listElement = document.querySelectorAll("li");
        listElement[d].innerText = `${key}: ${value}`;
        d++;
        if (key === "Language") {
            break;
        }
        let ChangeFlag = document.querySelector("#Flag");
        ChangeFlag.setAttribute("src", ListOfCountries[i].Flag);
    }
    d = 0;
    Counter.innerText = `${i + 1} / ${ListOfCountries.length}`
    resetNextPrev()
}
// ------------------ Här under kallar vi funktionen add country och rensar det vi skrivit in i input för att lättare kunna lägga till fler länder-----
let AddCountryButton = document.querySelector('#AddCountry')
AddCountryButton.onclick = function () {
    AddNewCountry()
    for (let i = 0; i < 5; i++) {
        let InputElements = document.querySelectorAll("input")
        InputElements[i].value = ''
    }
    document.querySelector("#NextButton").disabled = false;
}
let NewCountry = {
 
}
let c = 0;
//-------------------- En funktion som pushar in värderna av mina inputs till en key, och sedan in i ListOfCountries---------
function AddNewCountry() {
    for(let [key, value] of Object.entries(ListOfCountries[1])) {
        let InputElements = document.querySelectorAll("input")
        let InputValue = InputElements[c].value 
        c++;
        NewCountry[key] = InputValue
        if (key == "Language") {
            break;
        }
        console.log(key)
    }
    NewCountry.Flag = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSia5Ghd39TkC4c9RzEkAW0oGMvprc07z9kKg&usqp=CAU'
    ListOfCountries.push(NewCountry)
    c = 0;
    NewCountry = {}
    
}
//---------------- Här tar vi knappvärderna och använder dem för att ändra värdet på key som sedan används för att visa landet som har likvärdigt värde------------
let infoButtons = document.querySelectorAll(".InfoButtons")
for (const key of infoButtons.keys()) {
    infoButtons[key].onclick = function() {
        InfoAboutCountry(key)
        Counter.innerText = `${key + 1} / ${ListOfCountries.length}`
   }
 }
 //---------------- Infon om landet beroende på vilken knapp som trycks------------
function InfoAboutCountry(index) {
    for(const [key, value] of Object.entries(ListOfCountries[index])) {
        let listElement = document.querySelectorAll("li");
        listElement[d].innerText = `${key}: ${value}`;
        d++;

        if (key === "Language") {
            break;
        }
        
        let ChangeFlag = document.querySelector("#Flag");
        ChangeFlag.setAttribute("src", ListOfCountries[index].Flag);
    }
    d = 0;
    i = index
    resetNextPrev()
}

// --------------- Söker på landet via input ruta---------------
let SearchCountry = document.querySelector("#SearchCountry");
let SearchButton = document.querySelector("#SearchButton")
SearchButton.onclick = function() {
    if (SearchCountry.value.toLowerCase() === "sweden") {
        InfoAboutCountry(0)
        Counter.innerText = `${1} / ${ListOfCountries.length}`
    }
    if (SearchCountry.value.toLowerCase() === "norway") {
        InfoAboutCountry(1)
        Counter.innerText = `${2} / ${ListOfCountries.length}`
    }
    if (SearchCountry.value.toLowerCase() === "usa") {
        InfoAboutCountry(2)
        Counter.innerText = `${3} / ${ListOfCountries.length}`
    }
    if (SearchCountry.value.toLowerCase() === "northkorea") {
        InfoAboutCountry(3)
        Counter.innerText = `${4} / ${ListOfCountries.length}`
    }
    SearchCountry.value = '';
}
// ------------------- tar bort ett land via sökning, använder mig av .splice. Hårdkodad på vilken den ska ta bort så lite problem med den!-------------------------
let RemoveCountryButton = document.querySelector("#Remove")
let RemoveCountryValue = document.querySelector("#RemoveCountry")
RemoveCountryButton.onclick = function () {
    if (RemoveCountryValue.value === "sweden") {
        ListOfCountries.splice(0, 1); 
    }
    if (RemoveCountryValue.value === "norway") {
        ListOfCountries.splice(1, 1);
    }
    if (RemoveCountryValue.value === "usa") {
        ListOfCountries.splice(2, 1);
    }
    if (RemoveCountryValue.value === "northkorea") {
        ListOfCountries.splice(3, 1);
    }
    RemoveCountryValue.value = ''
    
}
// ------------- Väldigt lätt filter för att ta bort land som har "no" i Democracy propertyn! 
const Filter = document.querySelector("#FilterCountry")
Filter.addEventListener("click", FilterCountry );
function FilterCountry () {

for (let i = 0; i < ListOfCountries.length; i++) {
if (ListOfCountries[i].Democracy.toLowerCase() === "no") {
    ListOfCountries.splice([i], [1])
}
}
}
