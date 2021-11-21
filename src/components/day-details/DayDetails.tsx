import { IMonthDay } from "../../interfaces/IDates";
import { getFullDate } from "../../utils/calendarHandler";
import { useHistory } from 'react-router-dom';
import { IScheduleEvent } from "../../interfaces/ISchedule";
import { useDispatch } from "react-redux";
import * as scheduleActions from "../../redux/actions/scheduleActions";


interface IDayDetailsProps {
    day: IMonthDay;
};

const DayDetails = (props: IDayDetailsProps) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const edit = (event: IScheduleEvent) => {
        dispatch(scheduleActions.updateMeetingToEdit(event));
        history.push(`/edit-meeting/${event.id}`);
    };

    return (
        <div className="day-details">
            <div className="day-details__header">
                <h3>{getFullDate(props.day)}</h3>
            </div>
            <div className="day-details__content">
                {props.day.events?.map((event, index) => (
                    <div
                        key={`event-${index}`}>
                        <p><b>Name: </b> {event.name}</p>
                        <p><b>Description: </b> {event.description}</p>
                        {event.attendees && (
                            <>
                                <h4>Attendees</h4>
                                <ul>
                                    {event.attendees.map((attendee, index) => (
                                        <li key={`attendee-${index}`}>{attendee}</li>
                                    ))}
                                </ul>
                                <button
                                    className="button button__secondary"
                                    onClick={() => edit(event)}
                                >Edit</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            
            
            
        </div>
    )
};

export default DayDetails;