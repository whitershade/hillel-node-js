# hillel-node-js

### Lesson 1 
Examples of different ways to export modules with Node.js and examples of async import;

### Hometask 1
Simple project whitch uses different ways to export modules with Node.js, parses provided arguments and shows colorized console output.

##### Dependencies
1. [chalk](https://github.com/chalk/chalk) to colorize console output
1. [minimist](https://github.com/substack/minimist) as argument parser
1. [cross-env](https://github.com/kentcdodds/cross-env) to have a single command without worrying about setting or using the environment variable properly for the platform

##### How to start
1. Clone the project `git clone https://github.com/whitershade/hillel-node-js.git`
1. Install dependencies with `npm i`
1. To run project use `npm run hometask1`

### Hometask 2
Simple project whitch uses Node.js events and listeners.

##### How to start
1. Clone the project `git clone https://github.com/whitershade/hillel-node-js.git`
1. Install dependencies with `npm i`
1. To run project use `npm run hometask2`

### Hometask 3
Give a large file using the stream to the root (GET /) route;
Set the response of the server with the data type that corresponds to the file (check using the file-type library);
Add to the other log file the start time of the file, the end time of the file return, the number of seconds spent, and the status (successfully or aborted by the client);
Every minute, write to the log file the number of requests that came to the server and their statuses.

##### How to start
1. Clone the project `git clone https://github.com/whitershade/hillel-node-js.git`
1. Install dependencies with `npm i`
1. To run project use `npm run hometask3`

##### NOTE:
Folder logs with log files commited just to easy check сorrectness of homework.

### Hometask 3
Learn how to create a web server using the http module.
Make a universal web server so that it can:

Return a html page;
Accept the POST request and store the received data in memory
Return a JSON object or an array of objects that it has stored in memory, depending on the parameters that came to the router.
Return a few pictures of different extensions with the correct 'content-type' using the stream
Log the time of the request, the response, the amount of time spent, the user-agent and the status code.

##### How to start
1. Clone the project `git clone https://github.com/whitershade/hillel-node-js.git`
1. Install dependencies with `npm i`
1. To run project use `npm run hometask4`
