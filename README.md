# MINI Study: backend
Backend for the MINI mobile app and admin panel

![GitHub top language](https://img.shields.io/github/languages/top/romjkez/mini-backend?style=flat-square)
![GitHub](https://img.shields.io/github/license/romjkez/mini-backend?style=flat-square)


# Starting app locally
1) Install Docker Desktop for you OS
2) Clone this repository
3) Run `docker-compose -f docker-compose.dev.yml up --build -d` in the project folder 
**OR** use launch buttons (if you are using Jetbrains IDE and have `Docker` plugin installed)
To launch both web service and database, click double-arrow button (line 3)
[![use launch buttons](https://i.imgur.com/5xFqifk.png "use launch buttons")](https://i.imgur.com/5xFqifk.png "use launch buttons")
4) Use `docker-compose stop` to stop containers
5) If you need to start the containers without rebuilding them, use `docker-compose start` 
