# API-Server

StockKnowledge LMS REST Server.


## Set-up a local copy


### Install NodeJS First

Head over to [NodeJS official website](https://nodejs.org).

### Clone this repo.
If you are running macOS or Ubuntu, you can clone this repository by opening terminal and run

    git clone git@github.com:Stock-Knowledge-Engineering/API-Server.git
  
and if your on windows, open command prompt and run

    git clone git@github.com:Stock-Knowledge-Engineering/API-Server.git
    
### Change directory!!
Don't forget to change directory to the cloned repository.
MacOS/Linus, use terminal and command prompt for windows.

    cd /to/cloned/repo    
    
### Install depedencies..
For this project, I am using ExpressJS, MySQL, AWS SDK, etc as my dependency.

Again, for MacOS and Linux user use your terminal and for Windows user use your command prompt,
then run.

    npm install
    
### Run your local development server
You want to test a development build or contribute to the project. Try opening your terminal if your on MacOS/Linux
and Command Prompt for Windows then run

    node index.js
