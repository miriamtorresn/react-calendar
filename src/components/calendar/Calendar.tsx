import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as scheduleActions from "../../redux/actions/scheduleActions";

import './styles.scss';

interface IMonthDay {
    month: string;
    date: Date;
    isWeekend: boolean;
    isToday: boolean;
};

class Calendar extends React.Component<any> {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    state = {
        days: []
    };
    componentDidMount() {
        const { user, loadSchedule } = this.props;
        loadSchedule(user.id);
    }

    getCalendarDays = () => {
        // Getting initial variables needed
        const days: IMonthDay[] = [];
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        const lastDayofCurrentMonth = new Date(year, month + 1, 0);
        const firstDayofCurrentMonth = new Date(year, month, 1);
        const lastDayofPreviousMonth = new Date(year, month, 0);
        const firstDayofNextMonth = new Date(year, month + 1, 1);

        // Getting Days from prev month to complete first days of calendar
        for (let i = 0; i < firstDayofCurrentMonth.getDay(); i ++) {
            // Get downcount from last day of the previous month
            const monthDay = lastDayofPreviousMonth.getDate() - i;
            const date = new Date(year, month - 1, monthDay);
            const day = {
                month: 'previous',
                date,
                isToday: false,
                isWeekend: date.getDay() === 0 || date.getDay() === 6
            };
            days.unshift(day);
        }

        // Getting current month days
        for (let i = 1; i <= lastDayofCurrentMonth.getDate(); i ++) {
            // Pushing month days to the array.
            const date = new Date(year, month, i);
            const day = {
                month: 'current',
                date,
                isToday: date.getDate() === today.getDate(),
                isWeekend: date.getDay() === 0 || date.getDay() === 6
            };
            days.push(day);
        }

        // Getting Days of month to complete last days of calendar
        for (let i = 0; i < 6 - lastDayofCurrentMonth.getDay(); i ++) {
            const monthDay = firstDayofNextMonth.getDate() + i;
            const date = new Date(year, month + 1, monthDay);
            const day = {
                month: 'next',
                date,
                isToday: false,
                isWeekend: date.getDay() === 0 || date.getDay() === 6
            };
            days.push(day);
        }

        return days;
    };

    getDayClass(day: IMonthDay) {
        let classes = `calendar__day calendar__${day.month}`;
        if (day.isToday) classes += `calendar__today`;
        if (day.isWeekend) classes += `calendar__weekend`;
        return classes;
    }

    render() {
        return (
        <section className="calendar">
            <div className="Calendar__heading">Sunday</div>
            <div className="Calendar__heading">Monday</div>
            <div className="Calendar__heading">Tuesday</div>
            <div className="Calendar__heading">Wednesday</div>
            <div className="Calendar__heading">Thursday</div>
            <div className="Calendar__heading">Friday</div>
            <div className="Calendar__heading">Saturday</div>
            {this.getCalendarDays().map((day: IMonthDay, index: number) => (
                <div key={index} className={this.getDayClass(day)}>
                    {day.date.getDate()}
                </div>
            ))}
        </section>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
      user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadSchedule: bindActionCreators(scheduleActions.loadSchedule, dispatch),
  };
};

const DecoratedCalendar = withRouter(Calendar);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DecoratedCalendar);
