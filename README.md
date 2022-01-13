# Visit My Cellar
Experience section of the wider `Visit My Cellar` Project

# Configuration
To configure your project the following variables need to be set. This is done by the creation of a Node Environment File (`.env`) file and setting the following parameters.

## Database
- `DATABASE_URL` : Database URL to connect to the desired database. Database Management System is MySQL
- `DATABASE_USER` : Database user used to connect to the database. This is used when `DATABASE_URL` is not given to construct the database URL.
- `DATABASE_PASSWORD` : Password of `DATABASE_USER`. This is used when `DATABASE_URL` is not given to construct the database URL.
- `DATABASE_NAME` : Name of the database. This is used when `DATABASE_URL` is not given to construct the database URL.
- `DATABASE_HOST` : Database host. This is used when `DATABASE_URL` is not given to construct the database URL.

## SMTP Config
- `SMTP_HOST` : The SMTP host of the server.
- `SMTP_LOGIN_PASSWORD` : Password required to use the SMTP server given in `SMTP_HOST`.

## Facebook
- `FACEBOOK_APP_ID` : Facebook application ID. Needed when using Facebook APIs,
- `FACEBOOK_APP_SECRET` : Facebook app secret. Needed when using Facebook APIs.

## Google
- `GOOGLE_CLIENT_ID` : Google client ID. Needed when using Google APIs.
- `GOOGLE_CLIENT_SECRET` : Google client secret. Needed when using Google APIs.

## Paypal
- `PAYPAL_APP_EMAIL` : Email of the PayPal account associated to this application.
- `PAYPAL_APP_CLIENT_ID` : PayPal client ID required to use PayPal APIs.
- `PAYPAL_APP_SECRET` : Paypal secret required to use PayPal APIs

## Stripe
- `STRIPE_SECRET` : Stripe secret key used when consuming Stripe APIs for payment
- `STRIPE_PUBLISHABLE` : Stripe public key used when using Stripe APIs for payment

## Twilio
- `TWILIO_ACCOUNTSID` : Twilio account id required to use Twilio APIs.
- `TWILIO_AUTHTOKEN` : Twilio authentication token required to be authentified by Twilio APIs.
- `TWILIO_PHONENUMBER` : Phone number assigned by Twilio.

## Site parameters
- `JWT_SECRET` : JWT token
- `SITENAME` : Name of the website. This is defaulted to "Visit My Cellar".

## Deepl
- `DEEPL_AUTH_KEY` : Deepl API Key required to use their APIs.
