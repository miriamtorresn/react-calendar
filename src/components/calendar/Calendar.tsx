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
        loadCalendar(user.id);
    }

    getDayClass(day: IMonthDay) {
        let classes = `calendar__day calendar__${day.month}`;
        if (day.isToday) classes += `calendar__today`;
        if (day.isWeekend) classes += `calendar__weekend`;
        return classes;
    }

    render() {
        const { calendarDays } = this.props;
        return (
            <section className="calendar">
                <div className="Calendar__heading">Sunday</div>
                <div className="Calendar__heading">Monday</div>
                <div className="Calendar__heading">Tuesday</div>
                <div className="Calendar__heading">Wednesday</div>
                <div className="Calendar__heading">Thursday</div>
                <div className="Calendar__heading">Friday</div>
                <div className="Calendar__heading">Saturday</div>
                {calendarDays.map((day: IMonthDay, index: number) => (
                    <div key={index} className={this.getDayClass(day)}>
                        {day.date.date}
                    </div>
                ))}
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
