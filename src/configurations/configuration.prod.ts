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
  },
  dateFormat: 'yyyy-LL-dd',
  frontendUrl: 'https://ella.ronasit.com'
};
