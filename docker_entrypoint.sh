#!/bin/sh
set +e

cd /app

yarn install

# node --inspect-brk --no-lazy node_modules/gatsby/dist/bin/gatsby develop
yarn gatsby build
# yarn gatsby develop -H 0.0.0.0 --verbose
# yarn gatsby serve -H 0.0.0.0 -p 4455 #host flag doesn't seem to work :(
