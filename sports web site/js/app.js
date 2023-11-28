// Check if local storage has existing scores
let scoreData = JSON.parse(localStorage.getItem('scoreData')) || [];
let filteredData = scoreData;
const InitialPageSize = 10;

// detect url
const url = window.location.search;
const searchParams = new URLSearchParams(url);
const filter = searchParams.get('country')
let sortOrder = true

// Render the score table
function renderScores(scores) {
    const scoresTable = document.getElementById('scoresTable').getElementsByTagName('tbody')[0];
    scoresTable.innerHTML = '';

    scores.forEach(score => {
        const row = document.createElement('tr');
        row.id = score.countryInput
        row.innerHTML = `
            <td>${score.nameInput}</td>
            <td>${score.timeInput}</td>
            <td><a href="index.html?country=${score.countryInput}">${score.countryInput}</a></td>
            <td>${score.vehicleInput}</td>
            <td>${score.raceTimeHourInput} Hr, ${score.raceTimeMinsInput} Mins, ${score.raceTimeSecondsInput} Sec</td>
        `;
        scoresTable.appendChild(row);
    })
}
renderScores(scoreData)

// reset all filters
const resetFilterButton = document.getElementById('resetFiltersButton')
resetFilterButton.addEventListener('click', function () {
    filteredData = scoreData
    renderScores(filteredData)
    paginateScores(filteredData, 1, InitialPageSize)
    switchDateFilterStatus("")
    switchVehicleFilterStatus("None")
    window.location.href = 'index.html'
})


// display by country
function filterByCountry() {
    const countryTitle = document.getElementById('countryTitle')
    countryTitle.innerHTML = '';
    if(!filter) {
        countryTitle.innerHTML = `<span>All Countries</span>`
    } else {
        countryTitle.innerHTML = `<span>${filter}</span>`
    }

    const filteredCountry = filter ? scoreData.filter(score => score.countryInput === filter) : scoreData;
    filteredData = filteredCountry;
    renderScores(filteredData)
    paginateScores(filteredData, 1, InitialPageSize)
    switchDateFilterStatus("")
    switchVehicleFilterStatus("None")
}
filterByCountry()



// Filter by Date
const filtereByDateButton = document.getElementById('filterByDateButton');
filtereByDateButton.addEventListener('click', function () {
    const filterDate = document.getElementById('filterDateInput').value;
    filterScoresByDate(filterDate);
})

function filterScoresByDate(date) {
    const filteredScores = date ? filteredData.filter(score => score.timeInput === date) : scoreData;
    filteredData = filteredScores;
    renderScores(filteredData)
    paginateScores(filteredData, 1, InitialPageSize)
    switchDateFilterStatus(date)
    // switchVehicleFilterStatus("None")
}

function switchDateFilterStatus(date) {
    const dateStatus = document.getElementById('dateStatus')
    dateStatus.innerHTML = '';
    if(date) {
        dateStatus.innerHTML = `<span id="dateStatus" class="tag is-success">Applied!</span>`
    } else {
        dateStatus.innerHTML = `<span id="dateStatus" class="tag is-danger">Not Applied!</span>`
    }
}


// Filter by Vehicle
const filtereByVehicleButton = document.getElementById('filterByVehicleButton');
filtereByVehicleButton.addEventListener('click', function () {
    const filterVehicle = document.getElementById('filterVehicleInput').value;
    filterScoresByVehicle(filterVehicle);
})

function filterScoresByVehicle(vehicle) {
    const filteredVehicle = vehicle !== "None" ? filteredData.filter(score => score.vehicleInput === vehicle) : scoreData;
    filteredData = filteredVehicle;
    renderScores(filteredData)
    paginateScores(filteredData, 1, InitialPageSize)
    switchVehicleFilterStatus(vehicle)
    // switchDateFilterStatus("")
}

function switchVehicleFilterStatus(vehicle) {
    const vehicleStatus = document.getElementById('vehicleStatus')
    vehicleStatus.innerHTML = '';
    if(vehicle !== "None") {
        vehicleStatus.innerHTML = `<span id="vehicleStatus" class="tag is-success">Applied!</span>`
    } else {
        vehicleStatus.innerHTML = `<span id="vehicleStatus" class="tag is-danger">Not Applied!</span>`
    }
}


// Pagination
function paginateScores(scores, page = 1, pageSize = 10) {
    const totalScores = filteredData.length;
    const totalPages = Math.ceil(totalScores / pageSize)

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedScores = scores.slice(startIndex, endIndex)
    renderScores(paginatedScores)
    renderPagination(totalPages, page)
}

function renderPagination(totalPages, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li')
        li.innerHTML = `<a class="pagination-link${i === currentPage ? ' is-current' : ''}" 
        aria-label="Page ${i}" aria-current="page" data-page="${i}">${i}</a>`
        pagination.appendChild(li)
    }
}

paginateScores(filteredData, 1, InitialPageSize)

const pagination = document.getElementById('pagination')
pagination.addEventListener('click', function (event) {
    if (event.target.tagName == 'A') {
        const page = parseInt(event.target.dataset.page)
        paginateScores(filteredData, page)
    }
})


// Make the table header sortable
const tableHeaders = document.querySelectorAll('#scoresTable th');
tableHeaders.forEach(header => {
    header.addEventListener('click', function () {
        const column = this.innerText.toLowerCase().trim();
        // Call the function to re-render the table with sorted data
        sortTable(column);
    });
});

// Function to sort table by column
function sortTable(column) {
    // Implement sorting logic here based on the selected column
    if(column == "name"){
        if(sortOrder) {
            scoreData.sort((a,b)=>b.nameInput.localeCompare(a.nameInput))
        } else {
            scoreData.sort((a,b)=>a.nameInput.localeCompare(b.nameInput))
        }
    }else if(column == "date"){
        if(sortOrder) {
            scoreData.sort((a,b)=>b.timeInput.localeCompare(a.timeInput))
        } else {
            scoreData.sort((a,b)=>a.timeInput.localeCompare(b.timeInput))
        }
    }else if(column == "country"){
        if(sortOrder) {
            scoreData.sort((a,b)=>b.countryInput.localeCompare(a.countryInput))
        } else {
            scoreData.sort((a,b)=>a.countryInput.localeCompare(b.countryInput))
        }
    }else if(column == "vehicle"){
        if(sortOrder) {
            scoreData.sort((a,b)=>b.vehicleInput.localeCompare(a.vehicleInput))
        } else {
            scoreData.sort((a,b)=>a.vehicleInput.localeCompare(b.vehicleInput))
        }
    }else if(column == "race time"){
        if(sortOrder) {
            scoreData.sort((a,b)=> {
                b_sum = Number(b.raceTimeHourInput)*60*60 + Number(b.raceTimeMinsInput*60) + Number(b.raceTimeSecondsInput)
                a_sum = Number(a.raceTimeHourInput*60*60) + Number(a.raceTimeMinsInput*60) + Number(a.raceTimeSecondsInput)
                return b_sum - a_sum
            } )
        } else {
            scoreData.sort((a,b)=> {
                b_sum = Number(b.raceTimeHourInput)*60*60 + Number(b.raceTimeMinsInput*60) + Number(b.raceTimeSecondsInput)
                a_sum = Number(a.raceTimeHourInput*60*60) + Number(a.raceTimeMinsInput*60) + Number(a.raceTimeSecondsInput)
                return a_sum - b_sum
            })
        }
    }
    sortOrder = !sortOrder
    
    filteredData = scoreData;
    renderScores(filteredData)
    paginateScores(filteredData, 1, InitialPageSize)
    switchDateFilterStatus("")
    switchVehicleFilterStatus("None")
}
