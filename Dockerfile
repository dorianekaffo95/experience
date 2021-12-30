FROM node:10.16.3-alpine

# Copy application files
COPY ./build /usr/src/app
WORKDIR /usr/src/app

EXPOSE 443

# Database settings
ENV DATABASE_URL = mysql://my_cellar:my_cellar@localhost/visit_my_cellar
ENV DATABASE_USER = mycellar
ENV DATABASE_PASSWORD = mycellar
ENV DATABASE_NAME = visit_my_cellar
ENV DATABASE_HOST = localhost

# SMTP
ENV SMTP_HOST = smtp.sendgrid.net
ENV SMTP_LOGIN_PASSWORD = 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

# Facebook
ENV FACEBOOK_APP_ID = 2705830689656966
ENV FACEBOOK_APP_SECRET = 31198bfad771ce075e91832da191921f

# Google
ENV GOOGLE_CLIENT_ID = 473360401577-fpvjvvep68bq1mpslbt489bka34ie4je.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET = zq-Ytjpxa57SdOokiyBDxvuO

# PayPal
ENV PAYPAL_APP_EMAIL = redhoodcool-business@gmail.com
ENV PAYPAL_APP_CLIENT_ID = Abax6FHO5FW8ausREpc182FX6Jwgq7ICYyUF6IBf_Pfi8-40CIXHMZL4l2TkMrVUznVG_2Q8yQLUb860
ENV PAYPAL_APP_SECRET = EG6BrUaD-nArhcjJT3CDzCPeM-ENANATVbsXvTC-y-CMIVCccjP0ehkIX6Q5Vh9wC2HRInzxRsPfyFQZ

# Stripe
ENV STRIPE_SECRET = sk_test_51JAsRrDAimeVY3c2XdnV05CYfPEFu7OmO829tX2cnjHttHsbTO3K8OTUL4RVA1hoCsqK7GgWCtwtJ8vM0tvH0HLu00ykk209LI
ENV STRIPE_PUBLISHABLE = pk_test_51JAsRrDAimeVY3c2B3WR8G4YPCEjGN0Zc0DKXUDnFaXdAE9dtLs1zdcwO2906CxDKLJr3uNpNSU2sftXqziccr8200Vxi9Mfzp

# Twilio
ENV TWILIO_ACCOUNTSID = ACcd400137b32ab6a7243cc324929c51fd
ENV TWILIO_AUTHTOKEN = 599880fe92a1e012e74b7f1ceb036fe0
ENV TWILIO_PHONENUMBER = +15103984916

ENV JWT_SECRET = Rent ALL

ENV SITENAME = Visit My Cellar

# Deepl
ENV DEEPL_AUTH_KEY = 1b2fac03-b600-a641-caad-8550b179dbff:fx

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

RUN apk add g++ make

# Install Yarn and Node.js dependencies
RUN npm install yarn --global --no-progress --silent --depth 0 && \
    yarn install --production --no-progress

RUN npm install --save --unsafe-perm node-sass@^4.5.0
RUN npm install --save body-parser@^1.16.0
RUN npm install --save prop-types@^15.6.2
RUN npm install

CMD [ "node", "server.js" ]
