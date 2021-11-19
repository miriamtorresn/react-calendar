import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as scheduleActions from "../../redux/actions/scheduleActions";
import { IMonthDay } from "../../interfaces/IDates";

import './styles.scss';

class Calendar extends React.Component<any> {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    state = {
        days: []
    };
    componentDidMount() {
        const { user, loadCalendar } = this.props;
        // loadCalendar(user.id);
        loadCalendar(1);
    }

    getDayClass(day: IMonthDay) {
        let classes = `calendar__day calendar__${day.month} calendar__item `;
        if (day.isToday) classes += `calendar__today`;
        if (day.isWeekend) classes += `calendar__weekend`;
        if (day.events && day.events.length > 0) classes += `calendar__has-event`;
        return classes;
    }

    getIndicatorClass(day: IMonthDay) {
        let classes = `calendar__indicator `;
        if (day.events && day.events.length > 0) classes += `calendar__indicator--on`;
        return classes;
    }

    render() {
        const { calendarDays } = this.props;
        return (
            <section className="calendar">
                <div className="calendar__wrapper">
                    <div className="calendar__heading calendar__item">Sun</div>
                    <div className="calendar__heading calendar__item">Mon</div>
                    <div className="calendar__heading calendar__item">Tue</div>
                    <div className="calendar__heading calendar__item">Wed</div>
                    <div className="calendar__heading calendar__item">Thu</div>
                    <div className="calendar__heading calendar__item">Fri</div>
                    <div className="calendar__heading calendar__item">Sat</div>
                    {calendarDays.map((day: IMonthDay, index: number) => (
                        <div key={index} className={this.getDayClass(day)}>
                            <span className="calendar__number">{day.date.date}</span>
                            <span className={this.getIndicatorClass(day)}></span>
                        </div>
                    ))}
                </div>
            </section>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
      user: state.userReducer.user,
      calendarDays: state.scheduleReducer.calendarDays
    }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadCalendar: bindActionCreators(scheduleActions.loadCalendar, dispatch),
  };
};

const DecoratedCalendar = withRouter(Calendar);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DecoratedCalendar);
