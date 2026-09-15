from playwright.sync_api import sync_playwright

def test_valid_login():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://www.saucedemo.com/")
        page.get_by_placeholder("Username").fill("standard_user")
        page.get_by_placeholder("Password").fill("secret_sauce")
        page.get_by_role("button", name="Login").click()
        assert "inventory" in page.url
        assert page.get_by_text("Products").is_visible()
        browser.close()

def test_invalid_login():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://www.saucedemo.com/")
        page.get_by_placeholder("Username").fill("standard_user")
        page.get_by_placeholder("Password").fill("incorrect_password")
        page.get_by_role("button", name="Login").click()
        assert "Username and password do not match" in page.locator('[data-test="error"]').inner_text()
        assert page.url == "https://www.saucedemo.com/"
        browser.close()

def test_locked_out_user():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://www.saucedemo.com/")
        page.get_by_placeholder("Username").fill("locked_out_user")
        page.get_by_placeholder("Password").fill("secret_sauce")
        page.get_by_role("button", name="Login").click()
        assert "Epic sadface: Sorry, this user has been locked out." in page.locator('[data-test="error"]').inner_text()
        assert page.url == "https://www.saucedemo.com/"
        browser.close()