from selenium.common.exceptions import *
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
class BasePage():
    def __init__(self,browser,url,timeout=10):
        self.browser=browser
        self.url=url
        self.browser.implicitly_wait(timeout)
    
    def open(self):
        self.browser.get(self.url)
    
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
    
    def click_element(self, locator_type, locator):

        if self.is_element_present(locator_type, locator):

            self.browser.find_element(locator_type, locator).click()

    
        
    def enter_text(self,locator_type,locator,text):
        if self.is_element_present(locator_type,locator):
            element=self.browser.find_element(locator_type, locator)
            element.clear()
            element.send_keys(text)

    def quit_browser(self):
        self.browser.quit()




