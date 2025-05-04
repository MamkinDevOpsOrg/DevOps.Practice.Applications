import http from 'k6/http';
import { check, sleep } from 'k6';
import { getPageHitBody, getPageClickBody } from './getTestData.js';

const APP_URL =
  'https://igh1spny91.execute-api.us-west-2.amazonaws.com/dev/analytics';

const SLEEP = 0.5;

export const options = {
  stages: [
    { duration: '120s', target: 300 }, // ramp up from 0 to 300 virtual users (VUs)
    { duration: '360s', target: 300 }, // load with 300 VUs
    { duration: '120s', target: 0 }, // ramp down from 300 to 0 VUs
  ],
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

  // post click action
  const post_click_response = http.post(
    APP_URL,
    JSON.stringify(getPageClickBody())
  );
  check(post_click_response, {
    'POST CLICK status is 200': (res) => res.status === 200,
  });
  sleep(SLEEP);

  // // get actions is performed only every 5th VU
  // if (__VU % 5 === 0) {
  //   const get_response = http.get(APP_URL);
  //   check(get_response, { 'GET status is 200': (res) => res.status === 200 });
  //   sleep(SLEEP * 3);
  // }
}
