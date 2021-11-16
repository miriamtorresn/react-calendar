import siteConfigurations from '../configs/site_configurations';
import Header from '../components/header/Header';
import Calendar from '../components/calendar/Calendar';

const Dashboard = () => (
  <article>
    <Header siteName={siteConfigurations.siteName} siteCreator={siteConfigurations.siteCreator} />
    <Calendar />
  </article>
)

export default Dashboard;
