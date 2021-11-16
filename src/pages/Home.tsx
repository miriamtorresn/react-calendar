import siteConfigurations from '../configs/site_configurations';
import Header from '../components/header/Header';
import Login from '../components/login/Login';

const Home = () => (
  <article>
    <Header siteName={siteConfigurations.siteName} siteCreator={siteConfigurations.siteCreator} />
    <Login />
  </article>
)

export default Home;
