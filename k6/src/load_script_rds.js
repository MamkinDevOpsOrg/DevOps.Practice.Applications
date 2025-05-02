import http from 'k6/http';
import { check, sleep } from 'k6';
import { getPageHitBody, getPageClickBody } from './getTestData.js';

const APP_URL =
  'https://igh1spny91.execute-api.us-west-2.amazonaws.com/dev/analytics';

const SLEEP = 0.5;

export const options = {
  startVUs: 0,
  stages: [
    // { duration: '20s', target: 10 }, // ramp up
    // { duration: '150s', target: 10 }, // load
    // { duration: '20s', target: 0 }, // ramp down

    { duration: '90s', target: 500 }, // ramp up
    { duration: '300s', target: 500 }, // load
    { duration: '90s', target: 0 }, // ramp down
  ],
};

export default function () {
  // // ------------------------------------------------------
  // // post hit action
  // const post_hit_response = http.post(
  //   APP_URL,
  //   JSON.stringify(getPageHitBody())
  // );
  // check(post_hit_response, {
  //   'POST HIT status is 200': (res) => res.status === 200,
  // });
  // sleep(SLEEP);
  // // post click action
  // const post_click_response = http.post(
  //   APP_URL,
  //   JSON.stringify(getPageClickBody())
  // );
  // check(post_click_response, {
  //   'POST CLICK status is 200': (res) => res.status === 200,
  // });
  // sleep(SLEEP);
  // // ------------------------------------------------------
  //
  // get actions
  const get_response = http.get(APP_URL);
  // check(get_response, { 'GET status is 200': (res) => res.status === 200 });
  sleep(SLEEP);
}
