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
        {text: 'Прайс-лист', url: 'price.html'},
        {text: 'Наши работы', url: '#gallery'},
        {text: 'О нас', url: '#about'},
        {text: 'Запись на стрижку', url: 'form.html'}
    ];

    for (const pageUrl of urls) {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            console.log(` Проверка страницы: ${pageUrl}`);
            await driver.get(pageUrl);

            for (const item of menuItems) {
                const link = await driver.findElement(By.linkText(item.text));
                await link.click();
                await driver.sleep(1000);

                if (item.url.startsWith('#')) {
                    const id = item.url.substring(1);
                    const elements = await driver.findElements(By.id(id));
                    if (elements.length === 0) {
                        throw new Error(` Ошибка: На странице ${pageUrl} нет элемента с id="${id}" (для меню "${item.text}")`);
                    } else {
                        console.log(` Якорная ссылка "${item.text}" найдена (#${id})`);
                    }
                } else {
                    const currentUrl = await driver.getCurrentUrl();
                    if (!currentUrl.includes(item.url)) {
                        throw new Error(` Ошибка: Ссылка '${item.text}' не работает с ${pageUrl}. Ожидали ${item.url}, получили ${currentUrl}`);
                    } else {
                        console.log(` Ссылка "${item.text}" перешла на ${item.url}`);
                    }
                }

                if (item.text !== 'Главная') {
                    await driver.navigate().back();
                    await driver.sleep(500);
                }
            }
        } catch (err) {
            console.error(err.message);
        } finally {
            await driver.quit();
        }
    }

    console.log('🏁 Тест навигации завершён');
}

module.exports = navigationTest;
