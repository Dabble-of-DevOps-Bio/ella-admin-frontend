const apiDomain = 'api.ella.ronasit.com';
const apiURL = 'https://' + apiDomain;

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
  },
  dateFormat: 'yyyy-LL-dd',
  frontendUrl: 'http://localhost:5001'
};
