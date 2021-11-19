import React from "react";
import { connect } from "react-redux";

import './styles.scss';

class MeetingForm extends React.Component<any> {
    state = {
        meetingInfo: {
            name: '',
            description: '',
            meetingTime: '',
            attendees: []
        },
        attendeesFields: 1
    }

    handleInputChange = (event: any) => {
        this.setState({ meetingInfo: {
            ...this.state.meetingInfo,
            [event.target.name] : event.target.value
            }
        });
    }

    saveEvent = (event: React.FormEvent) => {
        event.preventDefault()
        console.log('saving event', this.state);
    }

    addAttendee = (event: React.FormEvent) => {
        event.preventDefault();
        this.setState({
            attendeesFields: this.state.attendeesFields + 1
        });
    }
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
                        value={this.state.meetingInfo.meetingTime}
                        onChange={this.handleInputChange}
                        required
                    />
                    <fieldset>
                        <legend>Attendees</legend>

                        {[ ...Array(this.state.attendeesFields).keys()].map(item => (
                            <input
                                type="email"
                                placeholder="Add attendee email"
                                className="meeting-form__attendee"
                                name={`attendee-${item}`}
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
    //loadCalendar: bindActionCreators(scheduleActions.loadCalendar, dispatch),
  };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MeetingForm);
