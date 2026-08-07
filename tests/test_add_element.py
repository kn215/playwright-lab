from playwright.sync_api import (sync_playwright, expect)

def test_add_element():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://the-internet.herokuapp.com/add_remove_elements/")
        add_element = page.get_by_text("add Element")
        add_element.click()
        expect(page.get_by_text("Delete")).to_be_visible()
        browser.close()