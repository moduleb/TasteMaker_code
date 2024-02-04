from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from ..pages.authorization_page import AuthorizationPage
import pytest
from ..variables.variables import correct_data, incorrect_data

link='example_link'

@pytest.mark.parametrize('link',[link])
def test_authorization_with_existing_login_and_password(browser,link,login,password):
    login=correct_data["LOGIN"]
    password=correct_data["PASSWORD"]
    page=AuthorizationPage(browser,link)
    page.open()
    page.fill_login(login)
    page.fill_password(password)
    page.click_authorization_button()
    page.check_is_it_main_page()

def test_authorization_with_not_existing_login_and_existing_password(browser,link):

    page=AuthorizationPage(browser,link)
    page.open()
    page.fill_login(incorrect_data["NOT_EXISTING_LOGIN"])
    page.fill_password(correct_data["PASSWORD"])
    page.click_authorization_button()
    page.check_login_password_warnings()


