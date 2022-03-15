<h1 align="center" style="display: block; font-size: 2.5em; font-weight: bold; margin-block-start: 1em; margin-block-end: 1em;"><strong>WTC Store</strong></h1>
<!-- Subscription based store for Waterloo Tennis Club -->



## Introduction
This is a subscription based store for Waterloo Tennis Club <br>[waterloo-tennis-club.herokuapp.com](https://waterloo-tennis-club.herokuapp.com/)

---

## Table of contents[![](./docs/img/pin.svg)](#table-of-contents)
- [Introduction](#introduction)
- [Table of contents![](#table-of-contents)](#table-of-contents)
- [Motivation![](#motivation)](#motivation)
- [What's done so far![](#whats-done-so-far)](#whats-done-so-far)
- [What has to be done![](#what-has-to-be-done)](#what-has-to-be-done)
- [Composition![](#composition)](#composition)
- [Requirements![](#requirements)](#requirements)
- [Dotenv file![](#dotenv-file)](#dotenv-file)
- [Build![](#build)](#build)
- [Development Server![](#development-server)](#development-server)

---

## Motivation[![](./docs/img/pin.svg)](#motivation)
Currently, club uses [jegysoft](https://www.jegysoft.com/public/home/readPage.do?id=43&history=clear) website to provide membership, court booking & store.
<br>Even though it has all the necessary tools for the club to work with, it has lack of user-friendly interface. 
<br>As it's essential, in my opinion, for all the modern websites, my goal is to achieve a better user interface by rewriting the whole website with an opportunity to learn new technologies.


## What's done so far[![](./docs/img/pin.svg)](#whats-done-so-far)
Right now this website has:
* Better UI/UX
* Opportunity to send a private message to a user
* Change profile image, contact info, hide/show email & phone to other users
* Subscription (allows to use store and see list of users)
* Store with item categories
* Payments (with a receipt to entered email address)
* Purchases (list of all recently bought/issued items)



## What has to be done[![](./docs/img/pin.svg)](#what-has-to-be-done)
* Improved mobile version
*  Admin panel for: 
   * grant/remove/update user subscription
   * create/update/delete store items & tags


## Composition[![](./docs/img/pin.svg)](#composition)
List of all used technologies: 
* Frontend: <img src="./docs/img/angular.svg" height="15px" style="position: relative; top: 3px;"> <img src="./docs/img/sass.svg" height="15px" style="position: relative; top: 3px;"> - <i>Angular, SASS</i> 
* Backend: <img src="./docs/img/nodejs.svg" height="15px" style="position: relative; top: 4px;"> <img src="./docs/img/typescript.svg" height="15px" style="position: relative; top: 4px;"> <img src="./docs/img/express.svg" height="14px;" style="position: relative; top: 4px;">  - <i>Node.js, TypeScript, Express.js</i>
* Database: <img src="./docs/img/mongodb.svg" height="22px" style="position: relative; top: 4px;"> - <i>MongoDB</i>

* Auth Type: <img src="./docs/img/jwt.svg" height="15px" style="position: relative; top: 3px;"> - <i>JWT</i>
* Mailing: <img src="./docs/img/sendgrid.svg" height="15px">
* Payments: <img src="./docs/img/stripe.svg" height="15px" style="position: relative; top: 3px">
* Cloud Storage: <img src="./docs/img/aws.svg" height="15px" style="position: relative; top: 5px"> <i>S3</i>
* Hosting: <img src="./docs/img/heroku.svg" height="17px" style="position: relative; top: 6px">



## Requirements[![](./docs/img/pin.svg)](#requirements)

```json
  {
    "@angular/cli": "~12.0.2",
    "node": "16.x",
    "npm": "7.x"
  }
```

## Dotenv file[![](./docs/img/pin.svg)](#dotenv-file)

```python
PORT=5000

JWT_SECRET=""

#mongodb dev and prod
DEV_MONGO_URI=""
PROD_MONGO_URI=""

#url for messages: dev and prod
DEV_URL="http://localhost:4200/#"
PROD_URL="https://waterloo-tennis-club.herokuapp.com/#"

#sendtrid service
SENDGRID_API_KEY=""
SENDGRID_VERIFIED_SENDER=""

#stripe private key
STRIPE_PRIVATE_KEY=""
STRIPE_WEBHOOK_SECRET_DEV=""
STRIPE_WEBHOOK_SECRET_PROD=""

#aws public & private keys
AWS_ACCESS_KEY_ID=""
AWS_SECRET_KEY=""

#bucket-name
AWS_S3_BUCKET_NAME=""
DEFAULT_USER_PICTURE_PATH=""
```


## Build[![](./docs/img/pin.svg)](#build)

Run `npm run heroku-postbuild` to build `dist` folders both for on the frontend and the backend

## Development Server[![](./docs/img/pin.svg)](#development-server)
Run `npm run heroku-prebuild` to install all modules both for the frontend and the backend<br>
Run `npm run dev` on the backend (server folder) and the frontend separately 


