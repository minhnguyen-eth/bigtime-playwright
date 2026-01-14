import { allure } from 'allure-playwright';

export async function step(name: string, action: () => Promise<void>) {
    console.log(`STEP: ${name}`);
    await allure.step(name, action);
}
