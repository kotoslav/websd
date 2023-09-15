#!/bin/bash
cd /home
git pull
npm install
pm2 restart index.js
