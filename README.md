# A stock market bar website created using the PERN stack

## This idea came to me after discovering bars that behave as stock markets, with prices that fluctuate as supply and demand differ. My goal for this project is to create an easy to use user interface for drink orders, a well documented API that is easy for developers to use, an intuitive and efficient website for employees to recieve and complete orders, and a secure website for developers and managers to see performance, efficiency, prices, etc.

Technologies used in the app:
* React & redux
* Express
* PostgreSQL
* Node

### inspiration for this app:
* https://www.tiktok.com/@stufftodointb/video/6883859886027853061
* https://www.tiktok.com/@sarahhands/video/7112453214980607275

# Model/database
## Testing
## Security


# View/client
## Testing
## Security


# Controller/server
## Testing
### For the REST API, this is the test coverage checklist for endpoints
* Verifying that the endpoint returns the correct HTTP status code (200 for success, 400 for bad request, 401 for unauthorized, etc.)
* Verifying that the endpoint returns the expected response format, in this case, JSON.
* Ensuring that the endpoint returns the expected data (menu, orders, etc.)
* Input validation (checking that required fields are present, validating data types and ranges)
* Verify that the endpoint has proper error handling and exceptional cases (e.g. when a required resource is not found)
* Ensure that the endpoint implements proper security measures (see [Security](##Security))

## Security
* TLS: The server uses TLS, to ensure traffic between the client and the server remains secure.
