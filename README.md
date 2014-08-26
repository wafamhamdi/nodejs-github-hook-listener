Nodejs Github Hook Listener
===========================

Simple Nodejs Express server that handle GitHub's Hook requests and update a folder that contains an GitHub project.

### Installing

- Install Forever using <code>npm install -g forever</code>.
- Clone this project and install it's dependencies using <code>npm install</code>.
- Launch the index.js file using <code>GIT_PATH={PATH_THAT_CONTAINS_A_GITHUB_PROJECT} GIT_BRANCH="origin master" forever start index.js</code>.

By default the server starts on port 3000, so make sure you have that port opened on your webserver configuration.
Go to https://github.com/{user}/{project}/settings/hooks. Register a new hook pointing to http://{yourwebserver}:3000/.

Profit.

### How it works

Every push sent to the repo, on the branch you specified (usually master), 
will trigger an CLI command with the following syntax: 

<code>cd GIT_PATH && git pull --rebase {GIT_BRANCH}</code> on the server.

That's it.

#### Notes 

If you're planning to use this on a private repository, your server must have an SSH key created and configured on the GitHub account.
