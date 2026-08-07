from playwright.sync_api import sync_playwright
from playwright.sync_api import expect

def test_checkbox():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://the-internet.herokuapp.com/checkboxes")
        first_box = page.locator('input[type="checkbox"]').first
        first_box.check()
        expect(first_box).to_be_checked()
        browser.close()