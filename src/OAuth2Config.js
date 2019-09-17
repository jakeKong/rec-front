import config from './config';
const ClientOAuth2 = require('client-oauth2')

// export const jwt = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmOHGvF+HJXmcR2InYw1DaYbCtiu7tAhdAE5UrG1+vu80hb3mSs/AKNLcImiW+lIPy9UoTxeLuKWkRIdBMrwoPEEcZ4t833M/Ij+FYjk73kMc/Spf9v48IoeLoHFoTsDhtwoldEhXdaBKckjbXrBiLw0gtNmFFpE9NP2mkSbdXryJo7yX5gVZNNThzbUl6zjcbh2LFIncDDYp4YdAnxHYbsVYwwAwDqNv9H3+VDO9UZhoBszfMcxyHt6PQKkg0hB24ZynCIKxS4mQe8MEmLlVx1YNL4yr0zc7Fm7yDQpR7QxNdML+ClPfU6lHRS2H15onYKv4ucC/ivCoEIt6sQ4FjwIDAQAB';
// export const oauth_scm = new ClientOAuth2({
//   body: {
//     grant_type: 'client_credentials',
//   },
//   clientId: 'scm',
//   clientSecret: 'scmsecret',
//   accessTokenUri: `${config.authService}/oauth/token`,
//   scopes: ['create', 'read', 'update', 'delete'],
// });

export const oauth_web = new ClientOAuth2({
  clientId: 'web',
  clientSecret: 'websecret',
  accessTokenUri: `${config.authService}/oauth/token`,
  scopes: ['create', 'read', 'update', 'delete'],
  body: {
    grant_type: 'password',
  },
  // scopes: 'read',
  // authorizationUri: 'https://github.com/login/oauth/authorize',
  // redirectUri: 'http://localhost:3000/#/login',
})