# URL Shortener Microservice
### FCC
User Story: I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
    
User Story: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

User Story: When I visit that shortened URL, it will redirect me to my original link.
        
## Example creation usage:
https://jamaurzurlshortener.herokuapp.com/new/https://www.google.com
                
## Example creation output:
{"original_url":"https://www.google.com","short_url":"https://jamaurzurlshortener.herokuapp.com/F289B0"}
                
## Usage: 
[https://jamaurzurlshortener.herokuapp.com/F289B0](https://jamaurzurlshortener.herokuapp.com/F289B0)
                    
## Will redirect to:
https://www.google.com