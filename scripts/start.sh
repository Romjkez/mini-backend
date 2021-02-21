#!/bin/sh

if [ "$NODE_ENV" == "production" ] ; then
  yarn run start:prod
else
  yarn run start:dev
fi
