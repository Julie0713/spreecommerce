import { test as base, expect } from '@playwright/test';
import { generateCredentials } from './credentials.js';

// generated credential from sign up to Cred that can be reused in log in
export const test = base.extend({
  creds: [
    async ({}, use) => {
      const credentials = generateCredentials();
      await use(credentials);
    },
    { scope: 'worker' } // ensures same creds across tests in one worker
  ],
});

export { expect };
