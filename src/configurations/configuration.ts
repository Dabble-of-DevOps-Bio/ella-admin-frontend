const apiDomain = 'localhost:8000';
// const apiDomain = 'api.ella.ronasit.com';
const apiURL = 'http://' + apiDomain;

export const configuration = {
  production: false,
  language: {
    available: ['en'],
    default: 'en'
  },
  api: {
    url: apiURL + '/api',
    unauthorized_routes: [
      apiURL + '/api/token/',
      apiURL + '/api/token/refresh/'
    ],
    whitelisted_domains: [
      apiDomain
    ]
  },
  notifications: {
    positionClass: 'inline',
    tapToDismiss: true,
    timeOut: 3000
  }
};
