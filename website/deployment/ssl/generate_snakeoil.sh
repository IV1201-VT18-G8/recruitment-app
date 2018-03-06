#!/bin/bash
openssl req -x509 -newkey rsa:4096 -keyout recruitmentapp.key -out recruitmentapp.crt -days 365 -nodes
