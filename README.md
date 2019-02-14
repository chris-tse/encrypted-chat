# Totally Secure Chat

### CS 4173 Final Project
Christopher Tse, Charlie Liu, Zachary Connor

This is an application which allows users which share the same password to exchange 56-bit encrypted messages. This application assumes no secure connections from the time the message is sent to when it's received by the intended receipient and therefore all encryption/decryption is performed on the client with the server playing no part in the security or storing keys in the event that it is compromised.

[Live Demo](https://cs4173chat.herokuapp.com)

## Requirements
* Node.js 8.11.4 or newer
* Chrome 70+ (older versions may work; not tested)

## Development

### Setting up the Project

Clone the project to your computer by downloading the zip or using git and install the required packages.

Change to the `pw-only` branch since the approach we chose is implemented in that branch. Then the server can be started:  
```
$ git clone https://github.com/chris-tse/encrypted-chat
$ cd encrypted-chat
$ npm install
$ git checkout pw-only
$ npm start
```

### Using the Application

Users can join the chat application by entering a nickname to identify themselves and a password which would be the shared password between Alice and Bob. Text messages can be sent by typing into the input box and pressing Enter. Images can be sent by clicking the plus sign and opening a file from the file browser or dragging an image from the desktop onto the plus sign. 