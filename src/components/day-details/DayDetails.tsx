import { IMonthDay } from "../../interfaces/IDates";
import { getFullDate } from "../../utils/calendarHandler";;

interface IDayDetailsProps {
    day: IMonthDay;
};

const DayDetails = (props: IDayDetailsProps) => {
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
                                <p><b>Attendees</b></p>
                                <ul>
                                    {event.attendees.map((attendee, index) => (
                                        <li key={`attendee-${index}`}>{attendee}</li>
                                    ))}
                                    
                                </ul>
                            </>
                        )}
                        
                    </div>
                ))}
            </div>
            
            
            
        </div>
    )
};

export default DayDetails;