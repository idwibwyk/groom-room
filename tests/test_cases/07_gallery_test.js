const { Builder, By } = require('selenium-webdriver');

async function imageDisplayTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    const pages = [
        { name: 'Главная', url: 'https://idwibwyk.github.io/groom-room/' },
        { name: 'Прайс-лист', url: 'https://idwibwyk.github.io/groom-room/price.html' },
        { name: 'Форма', url: 'https://idwibwyk.github.io/groom-room/form.html' }
    ];

    let allVisible = true;

    try {
        for (const page of pages) {
            console.log(`\n🔍 Проверка изображений на странице: ${page.name}`);
            await driver.get(page.url);
            await driver.sleep(1000);

            // Прокрутка вниз для загрузки всех изображений
            await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
            await driver.sleep(1000);

            const images = await driver.findElements(By.css('img'));
            console.log(`Найдено изображений: ${images.length}`);

            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                const src = await img.getAttribute('src');
                const displayed = await img.isDisplayed();

                if (!displayed) {
                    console.warn(`❌ НЕ отображается: ${src} (на странице: ${page.name})`);
                    allVisible = false;
                }
            }
        }

        console.assert(allVisible, 'Некоторые изображения на сайте не отображаются');
        console.log('\n✅ Тест отображения изображений завершён');

    } finally {
        await driver.quit();
    }
}

module.exports = imageDisplayTest;
