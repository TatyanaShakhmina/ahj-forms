const isCI = process.env.CI === 'true';

module.exports = {
    launch: {
        headless: isCI ? 'new' : false,
        slowMo: isCI ? 0 : 50,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-software-rasterizer',
            '--disable-extensions',
        ],
        dumpio: isCI,
    },
};