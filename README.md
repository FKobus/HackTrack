# HackTrack

## Installation
```
sudo apt-get install git
// http://wiringpi.com/
git clone git://git.drogon.net/wiringPi
cd wiringPi
./build
git clone https://github.com/FKobus/HackTrack.git
cd HackTrack
npm install
```

## Fix the wifi

```
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```

Go to the bottom
```
network={
    ssid="ESSID"
    psk="THE_PASSWORD"
}
```

## Run as a service (on startup and restart on crash)

```
sudo npm -g install forever
cd /etc/init.d
sudo nano hacktrack

```

Paste this:

```
#!/bin/sh
#/etc/init.d/hacktrack
export PATH=$PATH:/usr/bin
export NODE_PATH=$NODE_PATH:/usr/bin

case "$1" in
start)
exec forever --sourceDir=/home/pi/HackTrack -p /home/pi/HackTrack index.js
;;
stop)
exec forever stop --sourceDir=/home/pi/HackTrack index.js
;;
*)
echo "Usage: /etc/init.d/hacktrack {start|stop}"
exit 1
;;
esac
exit 0
```
```
chmod 755 hacktrack
update-rc.d nodeup hacktrack
```