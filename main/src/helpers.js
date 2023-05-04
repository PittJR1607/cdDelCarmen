export const getDateObject = () => {
    const today = new Date()
        let yy = today.getFullYear()
        let dayNumber = today.getDate()
        let hh = today.getHours()
        let min = today.getMinutes()
        let sec = today.getSeconds()
        let monthNum = today.getMonth() + 1 
        let fullHour = ''

        const weekday = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
        const monthName = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
        const day = weekday[today.getDay()]
        const mm = monthName[today.getMonth()]
        if (dayNumber < 10) dayNumber = '0' + dayNumber;
        if (hh < 10) hh = '0' + hh;
        if (min < 10) min = '0' + min;
        if (sec < 10) sec = '0' + sec;
        if (monthNum < 10) monthNum = '0' + monthNum;

        
        fullHour = hh + ':' + min + ':' + sec 
        

        const lastUpd = {
            dayNumber: dayNumber,
            weekDay: day,
            month: mm,
            monthNumber: monthNum,
            year: yy,
            hour: hh,
            minutes: min,
            seconds: sec,
            fullHour: fullHour  
        }
        return lastUpd
}