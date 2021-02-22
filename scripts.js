let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

let calendarMaxDate = 0;

showCalendar(currentMonth, currentYear);


function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;

    // creating all cells
    let date = 1;
    let finished = false
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");
            if (i === 0 && j < firstDay) {
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth && j === 0) {
                finished = true;
                break;
            }

            else {
                let day = date
                if (date > daysInMonth ){
                    day = date - daysInMonth;
                }

                let cellText = document.createTextNode(day);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bold");
                } // color today's date
                cell.setAttribute('id', date)

                if (date > daysInMonth ){
                    cell.classList.add("gray");
                }


                calendarMaxDate = date

                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
        if(finished){
            break
        }
    }

}

function previousColor(color){
    if(color === 'red'){
        return 'yellow';
    }else if(color === 'green'){
        return 'red';
    }
    return 'green';
}

function nextColor(color){
    if(color === 'red'){
        return 'green';
    }else if(color === 'green'){
        return 'yellow';
    }
    return 'red';
}

function removeClases(id){
    document.getElementById(id).classList.remove('red')
    document.getElementById(id).classList.remove('yellow')
    document.getElementById(id).classList.remove('green')
}

function colorize(firstColar) {
    let color = firstColar;

    for (let i = 1; i <= calendarMaxDate; i++) {
        removeClases(i)
        document.getElementById(i).classList.add(color)
        color = nextColor(color)
    }
}

function todayWater(status){
    let color = status;
    for(let i = today.getDay(); i >= 2; i--){
        color = previousColor(color);
    }
    colorize(color)
}