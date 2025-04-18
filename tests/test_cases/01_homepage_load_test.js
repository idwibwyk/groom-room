const { Builder, By } = require('selenium-webdriver');

async function homepageTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        await driver.get('https://idwibwyk.github.io/groom-room/');
        
        // Проверка заголовка
        const title = await driver.getTitle();
        console.assert(title.includes('Groom Room'), 'Неверный заголовок страницы');
        
        // Проверка навигационного меню
        const navItems = await driver.findElements(By.css('nav ul li a'));
        console.assert(navItems.length >= 5, 'Меню содержит недостаточно пунктов');
        
        console.log('Тест главной страницы пройден успешно');
    } finally {
        await driver.quit();
    }
}

module.exports = homepageTest;