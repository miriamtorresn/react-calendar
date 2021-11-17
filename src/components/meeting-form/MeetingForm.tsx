import React from "react";
import { connect } from "react-redux";
import { IMonthDay } from "../../interfaces/IDates";

class MeetingForm extends React.Component<any> {
    state = {
        meetingInfo: {
            title: '',
        }
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
    
    render() {
        return (
            <section className="meeting-form">
                <h3>Event</h3>
                <form className="row" onSubmit={this.saveEvent}>
                    <div className="col-md-3">
                        <input
                            type="text"
                            placeholder="Event title"
                            className="form-control"
                            name="title"
                            value={this.state.meetingInfo.title}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
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
