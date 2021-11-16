import siteConfigurations from '../configs/site_configurations';
import Header from '../components/header/Header';
import MeetingForm from '../components/meeting-form/MeetingForm';

const CreateMeeting = () => (
  <article>
    <Header siteName={siteConfigurations.siteName} siteCreator={siteConfigurations.siteCreator} />
    <MeetingForm />
  </article>
)

export default CreateMeeting;
