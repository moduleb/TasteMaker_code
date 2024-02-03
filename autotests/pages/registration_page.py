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
        self.fill_login_base(RegistrationPageLocators.LOGIN,login_text)
        
    def fill_password(self,password_text):
        """fill text in password field

        Args:
            password_text (str): text which will be pasted in password
        """        
        self.fill_password_base(*RegistrationPageLocators.PASSWORD,password_text)
        
    

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




