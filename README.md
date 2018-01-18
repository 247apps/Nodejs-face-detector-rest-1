## Nodejs-face-detector-rest-1

Express Nodejs App 

### Dependencies
==========

1. "express": "~4.14.1"
2. "clarify": "^2.2.0"
3. "body-parser": "~1.16.0"
4. "jade": "~1.11.0"

### ENVIRONMENT Variables Settings in .env
CLARIFAI_API_KEY=ADD-CLARIFAI-API-KEY-HERE (see Instruction below *)

PORT = 8081 (or default 8080 if not set in .env)

### REST API Details:

#### face_detector URL:
http://DETECTOR-SERVER.atbx.net:8081/detector/face_detector

#### Method:
POST
#### Header: 
No
#### Body: 
image = urlencode of BASE64-IMAGE-STRING

#### Response: JSON

{
	"status": {
		"code": 10000,
		"description": "Ok"
	},
	"faces": 2,
	"data": {
		"regions": [{
			"id": "xim9fidd7n34",
			"region_info": {
				"bounding_box": {
					"top_row": 0.43710598,
					"left_col": 0.7332351,
					"bottom_row": 0.6192386,
					"right_col": 0.8545874
				}
			}
		}, {
			"id": "y2f8i861gphb",
			"region_info": {
				"bounding_box": {
					"top_row": 0.18810849,
					"left_col": 0.8596386,
					"bottom_row": 0.38669994,
					"right_col": 0.9917106
				}
			}
		}]
	}
}

#### NOTE:
* Sign up a Clarifai account at https://clarifai.com. Create a new API Key with 2 scopes:

![image](https://github.com/247apps/Nodejs-face-detector-rest-1/blob/master/face-rest.png)

