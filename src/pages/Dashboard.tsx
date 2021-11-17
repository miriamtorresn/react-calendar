import siteConfigurations from '../configs/site_configurations';
import Header from '../components/header/Header';
import Navigation from '../components/navigation/Navigation';
import Calendar from '../components/calendar/Calendar';

const Dashboard = () => (
  <article>
    <Header siteName={siteConfigurations.siteName} siteCreator={siteConfigurations.siteCreator} />
    <Navigation />
    <Calendar />
  </article>
)

export default Dashboard;
