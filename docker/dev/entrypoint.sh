#!/bin/ash

cat << EOF > dproxy.conf.js
const PROXY_CONFIG = [
  {
    context: [
      "/auth",
      "/api"
      ],
    target: "$SERVER_ADDRESS",
    secure: false
  }
];
module.exports = PROXY_CONFIG;
EOF

$(npm bin)/ng serve --proxy-config dproxy.conf.js --host 0.0.0.0 --port 80
