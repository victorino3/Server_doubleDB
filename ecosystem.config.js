module.exports = {
  apps : [{
    name: "newApi",
    script: "./newApi.js",
    instances: "max",
    env: {
      NODE_ENV: "dev",
    },
    env_production: {
      NODE_ENV: "prod",
    }
  }]
}