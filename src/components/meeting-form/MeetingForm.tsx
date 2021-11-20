import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as scheduleActions from "../../redux/actions/scheduleActions";
import { IScheduleEvent } from "../../interfaces/ISchedule";
import { getDateDetails } from "../../utils/calendarHandler";
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import './styles.scss';

interface IAttendee {
    id: number;
    value: string;
};

class MeetingForm extends React.Component<any> {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    state = {
        meetingInfo: {
            name: '',
            description: '',
            meetingTime: '',
            attendees: [],
        },
        attendeesFields: 1,
        today: new Date(),
        lastDayofMonth: {},
        firstDayofMonth: {},
    }

    componentDidMount() {
        const { user, history } = this.props;

        if (!user.id) {
            history.push('/');
        }
            
        const today = this.state.today;
        const lastDayofMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const firstDayofMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        this.setState({ today, lastDayofMonth, firstDayofMonth});
       
    }

    handleInputChange = (event: any) => {
        this.setState({ meetingInfo: {
            ...this.state.meetingInfo,
            [event.target.name] : event.target.value
            }
        });
    };

    handleAttendeeChange = (event: any, item: number) => {
        event.preventDefault();
        let found = false;
        let attendees: IAttendee[] = this.state.meetingInfo.attendees.map((attendee: IAttendee) => {
            if (attendee.id === item) {
                found = true;
                attendee.value = event.target.value;
            }
            return attendee;
        });

        if (!found) {
            attendees = [...attendees, { id: item, value: event.target.value }];
        }

        this.setState({ meetingInfo: {
            ...this.state.meetingInfo,
            attendees
            }
        });
    };

    saveEvent = (event: React.FormEvent) => {
        event.preventDefault();

        const { addMeeting } = this.props;
        const meetingTime = new Date(this.state.meetingInfo.meetingTime);
        const meeting: IScheduleEvent = {
            time: meetingTime.getTime(),
            name: this.state.meetingInfo.name,
            description: this.state.meetingInfo.description,
            attendees: this.state.meetingInfo.attendees.map((attendee: IAttendee) => attendee.value),
            date: getDateDetails(meetingTime)
        };
        addMeeting(meeting);
        const { history } = this.props;
        history.push('/dashboard');
    };

    addAttendee = (event: React.FormEvent) => {
        event.preventDefault();
        this.setState({
            attendeesFields: this.state.attendeesFields + 1,
        });
    };
    
    render() {
        return (
            <section className="meeting-form__wrapper">
                <form onSubmit={this.saveEvent} className="meeting-form">
                    <h2>Event</h2>
                    <input
                        type="text"
                        placeholder="Add event name"
                        name="name"
                        value={this.state.meetingInfo.name}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Add event description"
                        name="description"
                        value={this.state.meetingInfo.description}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input
                        type="datetime-local"
                        name="meetingTime"
                        min={this.state.firstDayofMonth.toString()}
                        max={this.state.lastDayofMonth.toString()}
                        value={this.state.meetingInfo.meetingTime}
                        onChange={this.handleInputChange}
                        required
                    />
                    <fieldset>
                        <legend>Attendees</legend>

                        {[ ...Array(this.state.attendeesFields).keys()].map(item => (
                            <input
                                key={`new-attendee-${item}`}
                                type="email"
                                placeholder="Add attendee email"
                                className="meeting-form__attendee"
                                name={`attendee-${item}`}
                                onChange={(event) => this.handleAttendeeChange(event, item)}
                            />
                        ))}
                        
                        <button
                            className="button button__secondary"
                            onClick={this.addAttendee}
                        >Add Attendee</button>
                    </fieldset>

                    <input
                        type="submit"
                        value="Save"
                        className="button button__primary"
                    />
                </form>
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
    addMeeting: bindActionCreators(scheduleActions.addMeeting, dispatch),
  };
};

const DecoratedMeetingForm = withRouter(MeetingForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DecoratedMeetingForm);
