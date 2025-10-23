describe('Popover взаимодействие', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:3000');
    });

    beforeEach(async () => {
        await page.reload();
    });

    test('Страница должна загрузиться с кнопкой', async () => {
        await page.waitForSelector('.btn');
        const buttonText = await page.$eval('.btn', el => el.textContent);
        expect(buttonText).toBe('Click to toggle popover');
    });

    test('Popover должен появиться при клике на кнопку', async () => {
        // Кликаем на кнопку
        await page.click('.btn');

        // Ждем появления popover
        await page.waitForSelector('.popover', { visible: true });

        // Проверяем наличие popover
        const popover = await page.$('.popover');
        expect(popover).toBeTruthy();
    });

    test('Popover должен закрыться при повторном клике на кнопку', async () => {
        // Открываем popover
        await page.click('.btn');
        await page.waitForSelector('.popover', { visible: true });

        // Закрываем popover
        await page.click('.btn');

        // Ждем, пока popover исчезнет
        await page.waitForSelector('.popover', { hidden: true, timeout: 1000 });

        // Проверяем, что popover исчез
        const popover = await page.$('.popover');
        expect(popover).toBeNull();
    });
});