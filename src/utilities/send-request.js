import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, specifiy the method, etc.
  const options = { method };
  console.log('start sending request')
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    // Need to add an Authorization header
    // Use the Logical OR Assignment operator
    options.headers ||= {};
    // Older approach
    // options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }
  console.log(payload)
  const res = await fetch(url, options);
  console.log(res);
  // if res.ok is false then something went wrong
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}
console.log('end sending request')