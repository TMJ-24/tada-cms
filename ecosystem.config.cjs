module.exports = {
  apps: [
    {
      name: 'tada-cms',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/home/ubuntu/tada-cms',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--no-deprecation',
        PORT: 3000,
      },
    },
  ],
}
