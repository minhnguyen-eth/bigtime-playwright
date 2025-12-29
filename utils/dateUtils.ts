import { Page } from '@playwright/test';

export async function selectDateOffset(
    page: Page,
    offsetDays: number
) {
    const today = new Date();
    const target = new Date();
    target.setDate(today.getDate() + offsetDays);

    const day = target.getDate().toString();
    await page.locator(
        `//div[contains(@class,'dp__cell_inner') and contains(@class,'dp__pointer') and normalize-space()='${day}']`
    ).click();
}
