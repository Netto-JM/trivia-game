import tokenResponse from '../tests/helpers/tokenData';

const mockFetchToken = () => Promise.resolve({
  json: () => Promise.resolve(tokenResponse),
});

export default mockFetchToken;
