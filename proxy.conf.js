const PROXY_CONFIG = [
  {
    context: [
      "/auth",
      "/api"
    ],
    target: "http://localhost:9001",
    secure: false
  }
];

module.exports = PROXY_CONFIG;
