from selenium.common.exceptions import *
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
class BasePage():
    """
    initialize constructor of class, 
    which will allow to interact with web page
    set implicit wait =10 to open web page

    Parameters:

    url = string
    timeout = int

    Return:


    """
    def __init__(self,browser,url,timeout=10):
        self.browser=browser
        self.url=url
        self.browser.implicitly_wait(timeout)
    
    """
    method to open web page

    Parameters:

    Return:

    """

    def open(self):
        self.browser.get(self.url)
    
    """
    method for checking is element visible and present on html DOM on web page
    
    Parameters:
    locator_type - (str) By.ID , By.CSS_SELECTOR etc
    locator - (str)
    
    Return:
    True, False
    """

    def is_element_present(self, locator_type, locator):
        try:
            self.WebDriverWait(self.browser, 10).until(
                EC.visibility_of_element_located((locator_type, locator))
            )
            return True
        except TimeoutException:
            print(f"Element {locator} not present within 10 seconds")
            return False
        
        except NoSuchElementException:
            print(f"Element {locator} not found: {locator_type}, {locator}")
            return False
    
    """
    method for clicking on element 

    Parameters:
    locator_type - (str) By.ID , By.CSS_SELECTOR etc
    locator - (str)

    Return:
    """
    def click_element(self, locator_type, locator):

        if self.is_element_present(locator_type, locator):

            self.browser.find_element(locator_type, locator).click()

    """
    method for fill text in element 

    Parameters:
    locator_type - (str) By.ID , By.CSS_SELECTOR etc
    locator - (str)

    Return:

    """
        
    def enter_text(self,locator_type,locator,text):
        if self.is_element_present(locator_type,locator):
            element=self.browser.find_element(locator_type, locator)
            element.clear()
            element.send_keys(text)

    """
    method for close browser page

    Parameters:
    

    Return:
    """

    def quit_browser(self):
        self.browser.quit()




