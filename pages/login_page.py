from .base_page import BasePage
from selenium.webdriver.common.by import By
from .locators import LoginPageLocators
from .variables import LoginPageVariables

class LoginPage(BasePage):
    def test_fill_login(self):
    
        login=self.enter_text(*LoginPageLocators.LOGIN,f"{LoginPageVariables.LOGIN}")

        login=self.is_element_present(*LoginPageLocators.LOGIN)

        login_value=login.getattribute('value')

        assert login_value==LoginPageVariables.LOGIN, f"Login is shown like {login_value}, but must be {LoginPageVariables.LOGIN}"

    def test_fill_password(self):
    
        

        password=self.enter_text(*LoginPageLocators.PASSWORD,f"{LoginPageVariables.PASSWORD}")

        password=self.is_element_present(*LoginPageLocators.PASSWORD)

        password_value=password.getattribute('value')

        assert password_value==LoginPageVariables.PASSWORD, f"password is shown like {password_value}, but must be {LoginPageVariables.PASSWORD}"

    def click_registration_button(self):

        button=self.click_element(*LoginPageLocators.BUTTON)

        

