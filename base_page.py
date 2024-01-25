from selenium.common.exceptions import *
from selenium import webdriver

class BasePage():
    def __init__(self,browser,url,timeout=10):
        self.browser=browser
        self.url=url
        self.browser.implicitly_wait(timeout)
    
    def open(self):
        self.browser.get(self.url)
    
    def is_element_present(self,locator_type,locator):
        try:
            self.browser.find_element(locator_type,locator)
        except NoSuchElementException:
            print (f"there are not {locator} in {locator_type}")
            return False
        return True
    
    def click_element (self,locator_type, locator):
        if self.is_element_present(locator_type,locator):
            self.browser.find_element(self,locator_type, locator).click()
    
        
    def enter_text(self,locator_type,locator,text):
        if self.is_element_present(locator_type,locator):
            element=self.browser.find_element(locator_type, locator)
            element.clear()
            element.send_keys(text)

    def quite_browser(self):
        self.browser.quite()



