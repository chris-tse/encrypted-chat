# Totally Secure Chat

### CS 4173 Final Project
Christopher Tse, Charlie Liu, Zachary Connor

This is an application which allows users which share the same password to exchange encrypted messages. 

[Live Demo](https://cs4173chat.herokuapp.com)

## Requirements
* Node.js 8.11.4 or newer
* Chrome 70+ (older versions may work; not tested)

## Development

### Setting up the Project

Clone the project to your computer by downloading the zip or using git and install the required packages. Then the server can be started:  
```
$ git clone https://github.com/chris-tse/encrypted-chat
$ cd encrypted-chat
$ npm install
$ npm start
```

### Using the Application

Users can join the chat application by entering a nickname to identify themselves and a password which would be the shared password between Alice and Bob. Text messages can be sent by typing into the input box and pressing Enter. Images can be sent by clicking the plus sign and opening a file from the file browser or dragging an image from the desktop onto the plus sign. 