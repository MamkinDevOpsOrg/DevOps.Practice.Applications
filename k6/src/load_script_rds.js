import http from 'k6/http';
import { check, sleep } from 'k6';
import { getPageHitBody, getPageClickBody } from './getTestData.js';

const APP_URL =
  'https://igh1spny91.execute-api.us-west-2.amazonaws.com/dev/analytics';

const SLEEP = 1;

export const options = {
  startVUs: 0,
  stages: [
    { duration: '5s', target: 3 }, // ramp up
    { duration: '20s', target: 3 }, // load
    { duration: '10s', target: 0 }, // ramp down
  ],
  gracefulRampDown: '2s',
};

export default function () {
  // post hit action
  const post_hit_response = http.post(
    APP_URL,
    JSON.stringify(getPageHitBody())
  );
  check(post_hit_response, {
    'POST HIT status is 200': (res) => res.status === 200,
  });
  sleep(SLEEP);

  // get actions
  let get_response = http.get(APP_URL);
  check(get_response, { 'GET status is 200': (res) => res.status === 200 });
  sleep(SLEEP);

  // post click action
  const post_click_response = http.post(
    APP_URL,
    JSON.stringify(getPageClickBody())
  );
  check(post_click_response, {
    'POST CLICK status is 200': (res) => res.status === 200,
  });
  sleep(SLEEP);

  // get actions
  get_response = http.get(APP_URL);
  check(get_response, { 'GET status is 200': (res) => res.status === 200 });
  sleep(SLEEP);
}
