from .base_page import BasePage
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from ..locators.locators import AuthorizationPageLocators , MainPageLocators

class AuthorizationPage(BasePage):
   

    def fill_login(self ,login_text):
        """fill text in login  field

        Args:
            login_text (str): text which will be pasted in the field
        """ 
        self.fill_login_base(*AuthorizationPageLocators.LOGIN,login_text)
        
    def fill_password(self,password_text):
        """fill text in password field

        Args:
            password_text (str): text which will be pasted in password
        """        
        self.fill_password_base(*AuthorizationPageLocators.PASSWORD,password_text)
        
    def click_authorization_button(self):
        """click on authorization button
        """        
        self.click_element(*AuthorizationPageLocators.BUTTON)

    def check_is_it_main_page(self):
        """check if the current page is main page
        """        
        receipt_list = self.browser.WebDriverWait(self.browser, 10).until(
            EC.visibility_of_element_located(*MainPageLocators.PRODUCT_LIST))
        current_url = self.browser.current_url

        key_word = "main"
        assert key_word in current_url, f"Expected {key_word} in URL, but got: {current_url}"

    def check_login_password_warnings(self):
        """check if there are some warnings during filling login or password
        """        
        warning = self.is_element_present(*AuthorizationPageLocators.WARNING)
        warning=self.browser.find_element(*AuthorizationPageLocators.WARNING)
        warning_value = warning.get_attribute('value')

        key_word = "Неправильный логин или пароль"
        assert key_word == warning_value, f"Expected {key_word} in warning, but got {warning_value}"
