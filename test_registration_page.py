from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from .pages.login_page import LoginPage
import pytest

link='example_link'

@pytest.mark.parametrize('link',link)
def test_registration_with_valid_login_and_password(browser,link):
    page=LoginPage(browser,link)
    page.open()
    page.fill_login("correct login")
    page.fill_password("correct password")
    page.click_registration_button

