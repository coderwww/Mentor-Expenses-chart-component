const chart = document.querySelector('.expenses-chart');

// get current weekday
const today = new Date();
//var weekday = today.toLocaleString("default", { weekday: "short" }).toLowerCase();
var weekday = today.toLocaleString("en-GB", { weekday: "short" }).toLowerCase();

// Apply json file
fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {
        let days = json.map(item => item["day"]);
        let amounts = json.map(item => item["amount"]);
        const maxAmount = Math.max(...amounts);
        let percentages = amounts.map(amount => Math.round(amount / maxAmount * 100));

        chart.querySelectorAll('.bar').forEach((element, i) => {
            element.style.flexBasis = percentages[i]+'%';
            element.querySelector('span').textContent = amounts[i];
        });
        chart.querySelectorAll('.days > div').forEach((element, i) => {
            element.textContent = days[i];
        })
        
        let weekdayIndex = days.indexOf(weekday) + 1; // (1-7)
        if (weekdayIndex == 0) // if no match - hope that week starts on monday
            weekdayIndex = today.getDay() == 0 ? 7 : today.getDay();

        chart.querySelector(`.column:nth-child(${weekdayIndex})`).classList.add('current');
    });