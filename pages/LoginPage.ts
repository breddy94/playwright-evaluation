import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  public constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.oxd-alert-content-text');
  }

  public async goto(): Promise<void> {
    await this.page.goto('https://opensource-demo.orangehrmlive.com');
  }


public async login(username: string, password: string): Promise<void> {
  await this.page.waitForLoadState('domcontentloaded');

  await this.usernameInput.waitFor({ state: 'visible' });

  await this.usernameInput.fill('');
  await this.usernameInput.fill(username);

  await this.passwordInput.fill('');
  await this.passwordInput.fill(password);

  await this.loginButton.click();

  // ✅ Wait until either success OR error
  await Promise.race([
    this.page.waitForURL(/dashboard/, { timeout: 10000 }),
    this.errorMessage.waitFor({ state: 'visible', timeout: 10000 })
  ]);
}

  public async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }

  public async loginWithRetry(
  username: string,
  password: string,
  maxRetries: number = 2
): Promise<void> {

  for (let attempt: number = 1; attempt <= maxRetries; attempt++) {
    try {
      await this.page.waitForLoadState('domcontentloaded');

      
await this.usernameInput.click();
await this.usernameInput.fill('');
await this.usernameInput.fill(username);

await this.passwordInput.click();
await this.passwordInput.fill('');
await this.passwordInput.fill(password);


      await this.loginButton.click();

      // ✅ Wait for success or failure
      await Promise.race([
        this.page.waitForURL(/dashboard/, { timeout: 8000 }),
        this.errorMessage.waitFor({ state: 'visible', timeout: 8000 })
      ]);

      // ✅ Check if success
      if (this.page.url().includes('dashboard')) {
        console.log(`✅ Login success on attempt ${attempt}`);
        return;
        
      }

      console.log(`⚠️ Login failed on attempt ${attempt}`);

    } catch (error) {
      console.log(`❌ Error on attempt ${attempt}:`, error);
    }

    // ✅ Retry if not last attempt
    if (attempt < maxRetries) {
      console.log('🔄 Retrying login...');
      await this.page.reload();
    }
    
await this.page.screenshot({
  path: `login-failure-attempt-${attempt}.png`
});

  }

  throw new Error('❌ Login failed after all retry attempts');
  
}

}