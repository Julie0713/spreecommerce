export function generateCredentials() {
    const now = new Date();
    const uniqueId = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
    return {
      email: `autTestAccount${uniqueId}@mailinator.com`,
      password: `Test!${uniqueId}`
    };
  }
  