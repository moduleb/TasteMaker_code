from .base_page import BasePage
from selenium.webdriver.common.by import By
from .locators import LoginPageLocators
from .variables import LoginPageVariables

class LoginPage(BasePage):

        def fill_login(self):
            login=self.enter_text(*LoginPageLocators.LOGIN,f"{LoginPageVariables.LOGIN}")

        def fill_password(self):

            password=self.enter_text(*LoginPageLocators.PASSWORD,f"{LoginPageVariables.PASSWORD}")

        def click_registration_button(self):

            button=self.click_element(*LoginPageLocators.BUTTON)


