import {useState} from "react";

function Calendar() {

    const [date, setDate] = useState((new Date()));

    enum Days {
        Monday = "MONDAY",
        Tuesday = "TUESDAY",
        Wednesday = "WEDNESDAY",
        Thursday = "THURSDAY",
        Friday = "FRIDAY",
        Saturday = "SATURDAY",
        Sunday = "SUNDAY"
    }

    const generateDates = () => {
        let monthIndex = date.getMonth();
        let year = date.getFullYear();
        let day = new Date(`${year}-${monthIndex + 1}-01`).getDay();
        day = day === 0 ? 6 : day-1;
        let daysDiv = Array(day).fill().map(() => <div />)
        let numberDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        console.log(numberDays);
        for (let i = 1; i <= numberDays ; i++) {
            daysDiv.push(<div className='calendar-date'>{i}</div>)
        }

        return daysDiv
    }

    const reduceMonth = () => {
        let dateCopy = new Date(date);
        dateCopy.setMonth(dateCopy.getMonth() - 1)
        setDate(dateCopy)
    }

    const increaseMonth = () => {
        let dateCopy = new Date(date);
        dateCopy.setMonth(dateCopy.getMonth() + 1);
        setDate(dateCopy);
    }

    return (
        <div className='calendar'>
            <div className='calendar-heading'>
                        <span onClick={reduceMonth} className="material-symbols-outlined">
                            chevron_left
                        </span>
                <div>{date.toLocaleDateString(undefined, {month: 'long'})} {date.getFullYear()}</div>
                <span onClick={increaseMonth} className="material-symbols-outlined">
                            chevron_right
                        </span>
            </div>

            <div className='calendar-content'>


                {
                    Object.keys(Days).map(day => {
                        return <div className='calendar-days' key={day}>{day}</div>
                    })

                }

                {
                    generateDates()
                }


            </div>




        </div>
    )
}

export default Calendar;