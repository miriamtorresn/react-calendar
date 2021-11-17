import { IMonthDay, IDate } from '../interfaces/IDates';

const getMonthDays = (today: IDate) => {
    return {
        lastDayofCurrentMonth: new Date(today.year, today.month + 1, 0),
        firstDayofCurrentMonth: new Date(today.year, today.month, 1),
        lastDayofPreviousMonth: new Date(today.year, today.month, 0),
        firstDayofNextMonth: new Date(today.year, today.month + 1, 1)
    }
};

const getDay = (year: number, month: number, day: number, today: IDate): IMonthDay  => {
    const date = new Date(year, month, day);
    return {
        date: getDateDetails(date),
        isToday: date.getDate() === today.date,
        isWeekend: date.getDay() === 0 || date.getDay() === 6
    };
};

export const getDateDetails = (date: Date) => {
    return {
        month: date.getMonth(),
        year: date.getFullYear(),
        date: date.getDate()
    }
};

export const getCalendarDays = () => {
// Getting initial variables needed
const days: IMonthDay[] = [];
const today = getDateDetails(new Date());
const monthDays = getMonthDays(today);

// Getting Days from prev month to complete first days of calendar
for (let i = 0; i < monthDays.firstDayofCurrentMonth.getDay(); i ++) {
    // Get downcount from last day of the previous month
    const monthDay = monthDays.lastDayofPreviousMonth.getDate() - i;
    const day = getDay(today.year, today.month - 1, monthDay, today);
    day.month = 'previous';
    days.unshift(day);
}

// Getting current month days
for (let i = 1; i <= monthDays.lastDayofCurrentMonth.getDate(); i ++) {
    // Pushing month days to the array.
    const day = getDay(today.year, today.month, i, today);
    day.month = 'current';
    days.push(day);
}

// Getting Days of month to complete last days of calendar
for (let i = 0; i < 6 - monthDays.lastDayofCurrentMonth.getDay(); i ++) {
    const monthDay = monthDays.firstDayofNextMonth.getDate() + i;
    const day = getDay(today.year, today.month + 1, monthDay, today);
    day.month = 'current';
    days.push(day);
}

return days;
};