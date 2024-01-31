import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

@pytest.fixture(scope='function')

def browser():
    print("\n start chrome browser for test..")

    browser=webdriver.Chrome()
    yield browser
    print("\n quit Chrome browser")

    browser.quit()

