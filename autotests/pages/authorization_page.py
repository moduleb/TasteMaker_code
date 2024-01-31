from .base_page import BasePage
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from .locators import AuthorizationPageLocators , MainPageLocators

class AuthorizationPage(BasePage):
    def fill_login(self,login_text):
        
        login=self.enter_text(*AuthorizationPageLocators.LOGIN,f"{login_text}")

        login=self.is_element_present(*AuthorizationPageLocators.LOGIN)

        login_value=login.getattribute('value')

        assert login_value==login_text, f"Authorization is shown like {login_value}, but must be {login_text}"


    def fill_password(self,password_text):
    
    
        password=self.enter_text(*AuthorizationPageLocators.PASSWORD,f"{password_text}")

        password=self.is_element_present(*AuthorizationPageLocators.PASSWORD)

        password_value=password.getattribute('value')

        assert password_value==password_text, f"password is shown like {password_value}, but must be {password_text}"

    def click_authorization_button(self):

        button=self.click_element(*AuthorizationPageLocators.BUTTON)

    def check_is_it_main_page(self):

       
        reciept_list= self.WebDriverWait(self.driver,10).until(
               EC.presence_of_element_located(*MainPageLocators.PRODUCT_LIST))

        current_url=self.driver.current_url()

        key_word="main"

        assert key_word in current_url, f"Expected {key_word} in URL, but got: {current_url}"

    def check_login_password_warnings(self):

        warning=self.is_element_present(*AuthorizationPageLocators.WARNING)

        warning_value=warning.value()
        
        key_word="Неправильный логин или пароль"

        assert key_word in warning_value, f"Expected {key_word} in warning, but got {warning_value}"