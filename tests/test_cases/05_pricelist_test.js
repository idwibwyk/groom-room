const { Builder, By } = require('selenium-webdriver');

async function pricelistTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        await driver.get('https://idwibwyk.github.io/groom-room/price.html');
        
        // Проверка таблиц
        const tables = await driver.findElements(By.css('table'));
        console.assert(tables.length >= 2, 'Не найдены таблицы с ценами');
        
        // Проверка заголовков таблиц
        const headers = await driver.findElements(By.css('h2'));
        let hasCats = false, hasDogs = false;
        
        for (const header of headers) {
            const text = await header.getText();
            if (text.includes('кош')) hasCats = true;
            if (text.includes('собак')) hasDogs = true;
        }
        
        console.assert(hasCats && hasDogs, 'Не найдены разделы для кошек и собак');
        
        console.log('Тест прайс-листа пройден успешно');
    } finally {
        await driver.quit();
    }
}

module.exports = pricelistTest;