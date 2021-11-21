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

const cleanMeetingInfo = {
    name: '',
    description: '',
    meetingTime: '',
    attendees: [],
};

class MeetingForm extends React.Component<any> {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    state = {
        meetingInfo: cleanMeetingInfo,
        today: new Date(),
        lastDayofMonth: '',
        firstDayofMonth: '',
        editingId: null,
        isEditMode: false
    }

    componentDidMount() {
        const { user, history } = this.props;

        if (!user.id) {
            history.push('/');
        }
            
        const lastDayofMonth = this.getFormattedDateTime(new Date(this.state.today.getFullYear(), this.state.today.getMonth() + 1, 0));
        const firstDayofMonth = this.getFormattedDateTime(new Date(this.state.today.getFullYear(), this.state.today.getMonth(), 1));
        this.setState({ lastDayofMonth, firstDayofMonth});
        this.readPath();
    }

    componentDidUpdate(prevProps: any) {
        if (prevProps.match.path !== this.props.match.path) {
            this.readPath();
        }
    }

    getEditingMeetingInfo = () => {
        const { meetingToEdit } = this.props;
        if (meetingToEdit && meetingToEdit.attendees) {
  
            // Map attendees
            const attendees = meetingToEdit.attendees.map((attendee: string, index: number) => ({
                id: index,
                value: attendee
            }));

            const meetingTime = this.getFormattedDateTime(meetingToEdit.date.date);

            // Update meeting info
            const meetingInfo = {
                ...meetingToEdit,
                meetingTime,
                attendees
            }
            this.setState({meetingInfo})
        }
    };

    readPath = () => {
        const { match } = this.props;
        const isEditMode = match.path.includes('edit-meeting');
        this.setState({ isEditMode });

        if (isEditMode) {
            this.getEditingMeetingInfo();
        } else {
            this.setState({ meetingInfo: cleanMeetingInfo });
        }
    };

    handleInputChange = (event: any) => {
        this.setState({ meetingInfo: {
            ...this.state.meetingInfo,
            [event.target.name] : event.target.value
            }
        });
    };

    handleAttendeeChange = (event: any, attendee: IAttendee) => {
        event.preventDefault();
        let found = false;
        let attendees: IAttendee[] = this.state.meetingInfo.attendees.map((_attendee: IAttendee) => {
            if (_attendee.id === attendee.id) {
                found = true;
                attendee.value = event.target.value;
            }
            return _attendee;
        });

        this.setState({ meetingInfo: {
            ...this.state.meetingInfo,
            attendees
            }
        });
    };

    saveEvent = (event: React.FormEvent) => {
        event.preventDefault();

        const { addMeeting, editMeeting } = this.props;
        const meetingTime = new Date(this.state.meetingInfo.meetingTime);
        const meeting: IScheduleEvent = {
            // Hardcoded Id as we don't have a post web service that returns the id if meeting created
            id: this.state.isEditMode ? this.props.meetingToEdit.id : this.props.calendarDays.length,
            time: meetingTime.getTime(),
            name: this.state.meetingInfo.name,
            description: this.state.meetingInfo.description,
            attendees: this.state.meetingInfo.attendees
                .filter((attendee: IAttendee) => attendee.value !== '')
                .map((attendee: IAttendee) => attendee.value),
            date: getDateDetails(meetingTime)
        };

        if (this.state.isEditMode) {
            editMeeting(meeting);
        } else {
            addMeeting(meeting);
        }

        const { history } = this.props;
        history.push('/dashboard');
    };

    addAttendee = (event: React.FormEvent) => {
        event.preventDefault();
        const attendees: IAttendee[] = [...this.state.meetingInfo.attendees];
        attendees.push({
            id: attendees.length,
            value: ''
        });
        this.setState({
            meetingInfo: {
                ...this.state.meetingInfo,
                attendees
            }
        });
    };

    getFormattedDateTime = (date: Date) => (
        `${date.getFullYear()}-${this.getTwoDigitsValue(`${date.getMonth() +1}`)}-${this.getTwoDigitsValue(`${date.getDate()}`)}T${this.getTwoDigitsValue(`${date.getHours()}`)}:${this.getTwoDigitsValue(`${date.getMinutes()}`)}`
    );

    getTwoDigitsValue = (value: string) => (
        value.padStart(2, '0')
    );

    getTitle = () => {
        return this.state.isEditMode ? 'Edit event' : 'Add new event';
    };
    
    render() {
        return (
            <section className="meeting-form__wrapper">
                <form onSubmit={this.saveEvent} className="meeting-form">
                    <h2>{this.getTitle()}</h2>
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
                        min={this.state.firstDayofMonth}
                        max={this.state.lastDayofMonth}
                        value={this.state.meetingInfo.meetingTime}
                        onChange={this.handleInputChange}
                        required
                    />
                    <fieldset>
                        <legend>Attendees</legend>

                        {this.state.meetingInfo.attendees.map((attendee: IAttendee) => (
                            <input
                                key={`new-attendee-${attendee.id}`}
                                type="email"
                                placeholder="Add attendee email"
                                className="meeting-form__attendee"
                                name={`attendee-${attendee.id}`}
                                value={attendee.value}
                                onChange={(event) => this.handleAttendeeChange(event, attendee)}
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
      calendarDays: state.scheduleReducer.calendarDays,
      meetingToEdit: state.scheduleReducer.meetingToEdit
    }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addMeeting: bindActionCreators(scheduleActions.addMeeting, dispatch),
    editMeeting: bindActionCreators(scheduleActions.editMeeting, dispatch),
  };
};

const DecoratedMeetingForm = withRouter(MeetingForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DecoratedMeetingForm);
