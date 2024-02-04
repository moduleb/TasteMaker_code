from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from ..pages.registration_page import RegistrationPage
import pytest
from ..variables.variables import correct_data
from .test_auth_page import test_authorization_with_existing_login_and_password

link='example_link'
auth_page_link=""
@pytest.mark.parametrize('link',[link], "auth_page_link",[auth_page_link])

def test_registration_with_valid_login_and_password(browser,link,login,password):
    login=correct_data["LOGIN"]
    password=correct_data["PASSWORD"]
    page=RegistrationPage(browser,link)
    page.open()
    page.fill_login(login)
    page.fill_password(password)
    page.click_registration_button()
    page.check_is_it_auth_page()

    
    test_authorization_with_existing_login_and_password(auth_page_link,login,password)

    assert page.check_is_it_auth_page(), "Registration did not lead to the expected authorization page"

def test_registration_with_not_valid_login_and_correct_password(browser,link):

    page=RegistrationPage(browser,link)
    page.open()
    page.fill_login("correct login")
    page.fill_password("correct password")
    page.click_registration_button()
