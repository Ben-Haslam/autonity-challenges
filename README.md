# autonity-challenges

Typescript code for automations for the incentive game.

Will automatically deploy 25 contracts and send 50,000 Tx in different blocks, in a loop forever.

- Build: `npm run build`
- Run: `npm run start`

## Run with docker

- Build docker image: `docker build -t challenges-bot .`
- Run with docker: `docker run -d --restart always --name autonity-challenge-bot  challenges-bot`

## Setup cron for scheduling

- Install cron
- Edit crontab: `crontab -e`
- Add the following line:

```bash
0 12 * * * docker run -d --rm --name autonity-challenge-bot  challenges-bot
```

Cron will now start a container running the bot at 12 am every day.
