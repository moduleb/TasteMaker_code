from selenium.common.exceptions import *
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
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

        
        
    def quit_browser(self):
        """method for close browser page
        """                
        self.browser.quit()




