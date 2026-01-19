export function generateCredentials() {
    const now = new Date();
    const uniqueId = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`; //to generate unique identifier for account every execution
    return {
      email: `TestAccount${uniqueId}@mailinator.com`,
      password: `Test!${uniqueId}`
    };
  }
  