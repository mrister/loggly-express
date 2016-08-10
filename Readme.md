# Loggly-express

## Description
A simple, almost boilerplate, express-jade-loggly powered web app with custom errors and logging. 
Done for demonstration purposes for a blog post.

### License
MIT

### Usage
You will need a Loggly token and subdomain as environment vars. Copy .env.tpl to .env file in root and fill in this information.
 
### 404 errors
Hit `<host>/bla` or something like that and this will cause a 404 error that will get logged with Loggly (should be seen on web interface)

### 500 Error
Hit `<host>/errors/500` to give a 500 error (also gets logged on Loggly). Hitting it a couple of times will trigger an alert on Loggly if you have set it up (and if you set up a webhook will send data to a '<host>/webhook/500' route). If you are trying this on your local machine, use [ngrok](https://ngrok.com).
 
### Outro

Share, fork, use, reuse.