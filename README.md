# Shotspot

### Deployment

Install the dependencies and devDependencies run tests and start the server.
Note: add a config.json into a config dir;

```sh
$ cd shotspot
$ npm install
$ npm test
$ npm start
```

### config.json

Example of config/config.json

``` json
{
	"server": {
		"host": "localhost",
		"port": 2525
	},
	"mongoose": {
		"uri": "mongodb://someurl"
	},
	"security": {
		"tokenLife" : 3600
	},
	"log": {
		"path": "/var/log/shotspot.log"
	}
}
```