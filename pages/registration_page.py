from .base_page import BasePage
from selenium.webdriver.common.by import By
from .locators import RegistrationPageLocators
from .variables import RegistrationPageVariables
from selenium.webdriver.support import expected_conditions as EC
from .locators import AuthorizationPageLocators

class RegistrationPage(BasePage):
    def fill_login(self ,login_text):
    
        login=self.enter_text(*RegistrationPageLocators.LOGIN,f"{RegistrationPageVariables.LOGIN}")

        login=self.is_element_present(*RegistrationPageLocators.LOGIN)

        login_value=login.getattribute('value')

        assert login_value==RegistrationPageVariables.LOGIN, f"Registration is shown like {login_value}, but must be {RegistrationPageVariables.LOGIN}"

    def fill_password(self,password_text):
    
    
        password=self.enter_text(*RegistrationPageLocators.PASSWORD,f"{RegistrationPageVariables.PASSWORD}")

        password=self.is_element_present(*RegistrationPageLocators.PASSWORD)

        password_value=password.getattribute('value')

        assert password_value==RegistrationPageVariables.PASSWORD, f"password is shown like {password_value}, but must be {RegistrationPageVariables.PASSWORD}"

    def click_registration_button(self):

        button=self.click_element(*RegistrationPageLocators.BUTTON)


    def check_is_it_auth_page(self):

        auth_button = self.WebDriverWait(self.driver, 10).until(
    EC.visibility_of_element_located(*AuthorizationPageLocators.BUTTON))

        current_url=self.driver.current_url()

        assert "authorization" in current_url, f"Expected 'authorization' in URL, but got: {current_url}"


    def check_login_password_warnings(self):

        warning=self.is_element_present(*RegistrationPageLocators.WARNING)

        warning_value=warning.value()

        assert "Error message" in warning_value, f"Expected Error message in warning, but got {warning_value}"




