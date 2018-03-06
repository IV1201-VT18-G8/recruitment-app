Deployment of Website
=====================

On the Development Machine
--------------------------

In `deployment/nginx/default.conf`, set `server_name` (2 occurrences) to the domain
name of your production server. Also check or remove the HTTPS port number on
the HTTP redirect statement (line 4, at the time of writing).

In `src/conts.js` set `API_HOST_ADDRESS` to the URL of the backend server.

Place your SSL certificate and private key in `deployment/ssl/`, in
files named `recruitmentapp.crt` and `recruitmentapp.key`, respectively.

For testing purposes there is a script `generate_snakeoil.sh` in said
directory, that generates a self-signed certificate and key.

Install dependencies.

    npm install

Build the website.

    npm run webpack

Create the Docker image.

    docker build -t recruitmentapp_website .

Save the image in a `.tar` file.

    docker save -o recruitmentapp-website-img-<version>.tar recruitmentapp_website

Move the newly created `.tar` file over to the production server.

On the Production Server
-------------------------

Load the image from the `.tar` file.

    docker load -i recruitmentapp-website-img-<version>.tar

Run the container

    docker run --name recruitmentapp_website -d -p 80:80 -p 443:443 recruitmentapp_website


Commands to Use in Development
------------------------------

Run container

    docker run --name recruitmentapp_website -d -p 8003:80 -p 8004:443 recruitmentapp_website
