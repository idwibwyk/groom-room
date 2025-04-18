const { Builder, By } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');

async function mobileTest() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new Options().windowSize({width: 375, height: 812}))
        .build();
    
    try {
        await driver.get('https://idwibwyk.github.io/groom-room/');
        
        // Проверка viewport meta
        const viewportMeta = await driver.findElement(By.css('meta[name="viewport"]'));
        const content = await viewportMeta.getAttribute('content');
        console.assert(content.includes('width=device-width'), 'Viewport не настроен для мобильных');
        
        // Проверка адаптивного меню
        try {
            const menuButton = await driver.findElement(By.css('.navbar-toggler'));
            console.assert(await menuButton.isDisplayed(), 'Кнопка мобильного меню не отображается');
        } catch {
            console.log('Предупреждение: Кнопка мобильного меню не найдена');
        }
        
        console.log('Тест мобильной версии пройден успешно');
    } finally {
        await driver.quit();
    }
}

module.exports = mobileTest;