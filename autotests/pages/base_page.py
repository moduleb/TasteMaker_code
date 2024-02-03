from selenium.common.exceptions import *
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from ..locators.locators import AuthorizationPageLocators
from ..locators.locators import RegistrationPageLocators
class BasePage():
    
    def __init__(self,browser,url,timeout=10):
        """initialize constructor of class, which will allow to interact with web page
        set implicit wait =10 to open web page  

        Args:

        browser (WebDriver): An instance of the WebDriver representing the web browser.
        
        url (str): The URL of the web page to be opened.
        
        timeout (int, optional): The implicit wait timeout in seconds. Defaults to 10.
        """
        self.browser=browser
        self.url=url
        self.browser.implicitly_wait(timeout)
    


    def open(self):
        """method to open web page        
        """        
        self.browser.get(self.url)
    
   

    def is_element_present(self, locator_type, locator):
        """method for checking is element visible and present on html DOM on web page

        Args:
            locator_type (str): it's type of locator for example By.ID , By.CSS_SELECTOR etc
            locator (str): string to identify element ex. //div[@class='example']
    

        Returns:
            True: if element is visible and present on html DOM
            False: if one of the conditions isn't true
        """        
        try:
            self.browser.WebDriverWait(self.browser, 10).until(
                EC.visibility_of_element_located((locator_type, locator))
            )
            return True
        except TimeoutException:
            print(f"Element {locator} not present within 10 seconds")
            return False
        
        except NoSuchElementException:
            print(f"Element {locator} not found: {locator_type}, {locator}")
            return False
    
    
    def click_element(self, locator_type, locator):
        """method for clicking on element

        Args:
            locator_type (str): it's type of locator for example By.ID , By.CSS_SELECTOR etc
            locator (str): string to identify element ex. //div[@class='example']
        """        
        if self.is_element_present(locator_type, locator):

            self.browser.find_element(locator_type, locator).click()

    
    

   
        
    def enter_text(self,locator_type,locator,text):
        """method for fill text in element 

        Args:
            locator_type (str): it's type of locator for example By.ID , By.CSS_SELECTOR etc
            locator (str): string to identify element ex. //div[@class='example']
            text (str): text which will be paste in element
        """       
        if self.is_element_present(locator_type,locator):
            element=self.browser.find_element(locator_type, locator)
            element.clear()
            element.send_keys(text)

    def fill_login_base(self ,page, login_text):
        """fill login and checks its value in different pages

        Args:
            page (str): registration or authorization page to choose locators
            login_text (text): text to fill in field
        """        
        if "reg" in page:
            page_locator= RegistrationPageLocators.LOGIN
        if "auth" in page:
            page_locator=AuthorizationPageLocators.LOGIN
            
        assert "req" not in page or "auth" not in page, f"expect page consist of 'reg' or 'auth', page is {page}"

        self.enter_text(*page_locator,f"{login_text}")

        login=self.browser.find_element(*page_locator)

        login_value = login.get_attribute('value')

        assert login_value==login_text, f"Login is shown like {login_value}, but must be {login_text}"

    def fill_password_base(self ,page, password_text):
        """fill password in field and checks it's value on different pages
          

        Args:
            page (str): registration or authorization page to choose locators
            password_text (text): text to fill in field
        """       
        if "reg" in page:
            page_locator= RegistrationPageLocators.PASSWORD
        if "auth" in page:
            page_locator=AuthorizationPageLocators.PASSWORD
            
        assert "req" not in page or "auth" not in page, f"expect page consist of 'reg' or 'auth', page is {page}"

        self.enter_text(*page_locator,f"{password_text}")

        password=self.browser.find_element(*page_locator)

        password_value = password.get_attribute('value')

        assert password_value==password_text, f"password is shown like {password_value}, but must be {password_text}"


    def check_login_password_warnings_base(self, page):
        """check if there are some warnings during filling login or password
        """   

        if "reg" in page:
            page_locator= RegistrationPageLocators.WARNING
        if "auth" in page:
            page_locator=AuthorizationPageLocators.WARNING     
        
        warning=self.is_element_present(*page_locator)
        warning=self.browser.find_element(*page_locator)

        warning_value=warning.value()
        
        key_word = "Неправильный логин или пароль"
        assert key_word == warning_value, f"Expected {key_word} in warning, but got {warning_value}"

        

        


    def fill_login_or_password(self, field_type, text):
        """fill text in login or password field

        Args:
            text (str): text which will be pasted in the field
        """ 

        if field_type=="login":
            locators=RegistrationPageLocators.LOGIN
        if field_type=="password":
            locators=RegistrationPageLocators.LOGIN

        assert field_type != "login" or "password", f"field type isn't login or password, it's {field_type}"

        element=self.enter_text(*locators,f"{text}")

        element=self.browser.find_element(*locators)

        element_value = element.get_attribute('value')

        assert element_value==text, f"Registration is shown like {element_value}, but must be {text}"

        
        
    def quit_browser(self):
        """method for close browser page
        """                
        self.browser.quit()




