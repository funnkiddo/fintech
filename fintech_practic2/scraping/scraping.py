from selenium import webdriver
driver = webdriver.Chrome('./chromedriver')
driver.get(
    'https://www.asiae.co.kr/article/2020072310375931267'
)
title = driver.find_element_by_xpath(
'//*[@id="container"]/div[3]/div[2]/div[2]/h3'
)
# print(title.text)
body = driver.find_element_by_xpath(
    '//*[@id="txt_area"]/p[2]'
)
print(body.text)