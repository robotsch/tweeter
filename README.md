# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

It was built off of a starter repository, and then filled out with to practice HTML, CSS, JS, jQuery and AJAX front-end skills, and Node + Express back-end skills.

## Tweeter

Visiting the page on a screen width smaller than 1024px will display a mobile-optimized page

!["Screenshot of mobile page"](https://github.com/robotsch/tweeter/blob/master/docs/tweeter_mobile_noform.PNG?raw=true)

Visiting the page on any larger screen will display a desktop-optimized page

!["Screenshot of desktop page"](https://github.com/robotsch/tweeter/blob/master/docs/desktop.PNG?raw=true)

Using this site, users can click on the Write a new tweet button to display the new tweet submission box, and submit text to the server to be displayed. These tweets will be timestamped and include a randomly generated avatar, name, and handle.

Newly created tweets will be displayed at the top of the page, and all tweets are sorted in reverse-chronological order.

The server accepts any tweets that contain content of 1 to 140 characters in length, and will display an error message on the page

!["Screenshot of error message"](https://github.com/robotsch/tweeter/blob/master/docs/error.PNG?raw=true)

While scrolling the list of tweets, a red 'scroll-to-top' button will appear in the bottom right, allowing users to quickly navigate back to the top of the page with a smooth animation.

!["Screenshot of the scroll-to-top button"](https://github.com/robotsch/tweeter/blob/master/docs/redbox.PNG?raw=true)

## Features

- Memory-persistent message/tweet storage
- Automatically generated Tweeter users
- Responsive design with mobile and desktop layouts
- Lightweight scroll detection for displaying or hiding buttons on the page
  - Achieved with the Interaction Observer API (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- timeago (https://timeago.yarp.com/) 