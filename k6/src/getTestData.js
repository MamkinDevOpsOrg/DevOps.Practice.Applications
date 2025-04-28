import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export function getPageHitBody() {
  return {
    event_type: 'page_hit',
    hit_id: uuidv4(),
    user_id: `user-${faker.number.int({ min: 1, max: 999 })}`,
    session_id: `session-${faker.word.sample()}`,
    url: '/home',
    referrer: '/',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    timestamp: new Date().toISOString(),
  };
}

export function getPageClickBody() {
  return {
    event_type: 'page_click',
    click_id: uuidv4(),
    user_id: `user-${faker.number.int({ min: 1, max: 999 })}`,
    session_id: `session-${faker.word.sample()}`,
    url: '/home',
    element_id: 'signup-button',
    element_class: 'btn btn-primary',
    element_text: 'Sign Up',
    timestamp: new Date().toISOString(),
  };
}
