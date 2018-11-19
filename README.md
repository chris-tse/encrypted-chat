# CS 4173 Final Project

Christopher Tse, Charlie Liu, Zachary Connor

## Development

### Setting up the project

1. Clone the project to your computer by downloading the zip or using git:  
```
$ git clone https://github.com/chris-tse/encrypted-chat
```

2. Install required packages
```
$ npm install
```

3. Start the server
```
$ npm start
```

### Setting a login password

The included `setpassword.js` script can be used to set the password that is checked by the server when a user wants to log in to the chat. It can be run as follows:

```
$ ./setpassword --pw <password>
```
If the path to the shebang is not correct on your system, either change it in the script or run it with the node command:

```
$ node setpassword --pw <password>
```

The salt and hash of the password will be written to `password.json` which the server will check against on login. If the password is changed, the server will need to be restarted.