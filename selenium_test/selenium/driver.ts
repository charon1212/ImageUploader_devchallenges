import { Builder, Capabilities } from 'selenium-webdriver'
const capabilities: Capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', {
  args: [
    // '--headless',
    '--disable-gpu',
    '--window-size=1024,768'
  ],
  w3c: false
});

/**
 * Driverを取得する。
 * API:https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html
 */
const getDriver = async () => {
  return await new Builder().withCapabilities(capabilities).build();
}

export default getDriver;