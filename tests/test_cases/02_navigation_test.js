const { Builder, By } = require('selenium-webdriver');

async function navigationTest() {
    const urls = [
        'https://idwibwyk.github.io/groom-room/',
        'https://idwibwyk.github.io/groom-room/price.html',
        'https://idwibwyk.github.io/groom-room/form.html'
    ];

    const menuItems = [
        {text: 'Главная', url: 'index.html'},
        {text: 'Услуги', url: 'price.html'},
        {text: 'О нас', url: '#about'}
    ];

    for (const pageUrl of urls) {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get(pageUrl);

            for (const item of menuItems) {
                const element = await driver.findElement(By.linkText(item.text));
                await element.click();
                await driver.sleep(1000);

                const currentUrl = await driver.getCurrentUrl();
                console.assert(currentUrl.includes(item.url), 
                    `Навигация '${item.text}' не работает с ${pageUrl}`);

                if (item.text !== 'Главная') {
                    await driver.navigate().back();
                    await driver.sleep(500);
                }
            }
        } finally {
            await driver.quit();
        }
    }

    console.log('Тест навигации на всех страницах пройден успешно');
}

module.exports = navigationTest;
