const apiDomain = 'localhost:5001/api/v1';
const apiURL = 'http://' + apiDomain;

export const configuration = {
  production: true,
  language: {
    available: ['en'],
    default: 'en'
  },
  api: {
    url: 'https://localhost:5001/api/v1',
    unauthorized_routes: [
      apiURL + '/users/actions/login/',
      apiURL + '/users/actions/forgot-password'
    ]
  }
};
