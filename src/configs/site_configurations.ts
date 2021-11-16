import apiConfigurations from './api_configurations';

const configurations = {
  siteName: 'React Calendar',
  apiEndpoint: `${apiConfigurations.protocol}${apiConfigurations.server}:${apiConfigurations.port}/${apiConfigurations.basePath}`,
  siteCreator: 'Miriam Torres'
};

export default configurations;
