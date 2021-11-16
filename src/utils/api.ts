import axios from 'axios';
import siteConfigurations from '../configs/site_configurations';

axios.defaults.baseURL = siteConfigurations.apiEndpoint;
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const post = (path: string, request: any) => {
    return axios.post(
        `/${path}`,
        request
    ).catch(error => {
      console.error(error);
      throw error;
    });
};

const get = (path: string) => {
    return axios.get(
        `/${path}`,
    ).catch(error => {
      console.error(error);
      throw error;
    });
};

export default {
    post,
    get
};