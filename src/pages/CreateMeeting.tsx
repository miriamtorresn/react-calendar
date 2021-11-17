import siteConfigurations from '../configs/site_configurations';
import Header from '../components/header/Header';
import MeetingForm from '../components/meeting-form/MeetingForm';
import Navigation from '../components/navigation/Navigation';

const CreateMeeting = () => (
  <article>
    <Header siteName={siteConfigurations.siteName} siteCreator={siteConfigurations.siteCreator} />
    <Navigation />   
    <MeetingForm />
  </article>
)

export default CreateMeeting;
