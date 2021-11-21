import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as scheduleActions from "../../redux/actions/scheduleActions";
import { IMonthDay } from "../../interfaces/IDates";
import Modal from "../modal/Modal";
import DayDetails from "../day-details/DayDetails";

import './styles.scss';

class Calendar extends React.Component<any> {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    state = {
        days: [],
        selectedDay: null
    };

    componentDidMount() {        
        const { user, history, loadCalendar } = this.props;
        if (!user.id) {
            history.push('/');
        } else {
            loadCalendar(user.id);
        }
    }

    getDayClass = (day: IMonthDay) => {
        let classes = `calendar__day calendar__${day.month} calendar__item `;
        if (day.isToday) classes += `calendar__today `;
        if (day.isWeekend) classes += `calendar__weekend `;
        if (this.dayHasEvents(day)) classes += `calendar__has-event`;
        return classes;
    }

    getIndicatorClass = (day: IMonthDay) => {
        let classes = `calendar__indicator `;
        if (this.dayHasEvents(day)) classes += `calendar__indicator--on`;
        return classes;
    }

    dayHasEvents(day: IMonthDay) {
        return day.events && day.events.length > 0;
    }

    closeModal = () => {
        this.setState({selectedDay: null});
    }

    selectDay = (day: IMonthDay) => {
        this.setState({selectedDay: day});
    }

    render() {
        const { calendarDays } = this.props;
        return (
            <>
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
                            <div key={index} className={this.getDayClass(day)} onClick={() => this.selectDay(day)}>
                                <span className="calendar__number">{day.date.day}</span>
                                <span className={this.getIndicatorClass(day)}></span>
                            </div>
                        ))}
                    </div>
                </section>

                { this.state.selectedDay && (
                    <Modal
                        show={!!this.state.selectedDay}
                        closeAction={this.closeModal}
                        content={
                            <DayDetails
                                day={this.state.selectedDay}
                            />
                        }
                    />
                )}
            </>
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
