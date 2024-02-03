from .base_page import BasePage
from selenium.webdriver.common.by import By
from ..locators.locators import RegistrationPageLocators
from ..variables.variables import RegistrationPageVariables
from selenium.webdriver.support import expected_conditions as EC
from ..locators.locators import AuthorizationPageLocators

class RegistrationPage(BasePage):

       
    def fill_login(self ,login_text):
        """fill text in login  field

        Args:
            login_text (str): text which will be pasted in the field
        """ 

        login=self.enter_text(*RegistrationPageLocators.LOGIN,f"{login_text}")

        login=self.is_element_present(*RegistrationPageLocators.LOGIN)

        login_value = login.get_attribute('value')

        assert login_value==login_text, f"Registration is shown like {login_value}, but must be {login_text}"

    def fill_password(self,password_text):
    
    
        password=self.enter_text(*RegistrationPageLocators.PASSWORD,f"{password_text}")

        password=self.is_element_present(*RegistrationPageLocators.PASSWORD)

        password_value = password.get_attribute('value')

        assert password_value==password_text, f"password is shown like {password_value}, but must be {password_text}"

    def click_registration_button(self):
        """click to registration button
        """        
        self.click_element(*RegistrationPageLocators.BUTTON)


    def check_is_it_auth_page(self):
        """check is the current page is authorization page
        """        

        auth_button = self.browser.WebDriverWait(self.browser, 10).until(
    EC.visibility_of_element_located(*AuthorizationPageLocators.BUTTON))

        current_url=self.browser.current_url()

        key_word="authorization"

        assert key_word in current_url, f"Expected {key_word} in URL, but got: {current_url}"


    def check_login_password_warnings(self):
        """check if there are some warnings during filling login or password
        """        
        warning=self.is_element_present(*RegistrationPageLocators.WARNING)
        warning=self.browser.find_element(*RegistrationPageLocators.WARNING)

        warning_value=warning.value()
        
        

        assert "Error message" in warning_value, f"Expected Error message in warning, but got {warning_value}"




