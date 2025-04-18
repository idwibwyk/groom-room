const { Builder, By } = require('selenium-webdriver');

async function imageDisplayTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    const pages = [
        { name: 'Главная', url: 'https://idwibwyk.github.io/groom-room/' },
        { name: 'Прайс-лист', url: 'https://idwibwyk.github.io/groom-room/price.html' },
        { name: 'Форма', url: 'https://idwibwyk.github.io/groom-room/form.html' }
    ];

    let allOk = true;

    try {
        for (const page of pages) {
            console.log(`\n Проверка изображений на странице: ${page.name}`);
            await driver.get(page.url);
            await driver.sleep(1000);

            // Прокрутка вниз для полной загрузки
            await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
            await driver.sleep(1000);

            const images = await driver.findElements(By.css('img'));
            console.log(`Найдено изображений: ${images.length}`);

            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                const src = await img.getAttribute('src');

                // Проверка: изображение отображается на экране
                const isDisplayed = await img.isDisplayed();

                // Проверка: изображение успешно загружено (JS проверка)
                const isLoaded = await driver.executeScript(
                    "return arguments[0].complete && arguments[0].naturalWidth > 0;", img
                );

                if (!isDisplayed || !isLoaded) {
                    console.error(` Проблема с изображением: ${src} (на странице: ${page.name})`);
                    if (!isDisplayed) console.warn("↳ Причина: не отображается на странице");
                    if (!isLoaded) console.warn("↳ Причина: не загружено или src повреждён");
                    allOk = false;
                }
            }
        }

        console.assert(allOk, ' Обнаружены изображения, которые не отображаются или не загружены');
        if (allOk) console.log('\n Все изображения загружены и отображаются корректно');

    } finally {
        await driver.quit();
    }
}

module.exports = imageDisplayTest;
