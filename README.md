# Romoj😂
The minimalistic and open-source social media. It may not be the best (and even quite buggy!), but it was my first major project. Credits to [Lama Dev](https://www.youtube.com/@LamaDev) for the backend API tutorial and some frontend help!

Feel free to fork and add your own changes. I am not planning to work on this project from now on, but I may still go through pull requests if there are any.

![02 05 2023_22 38 59_REC](https://user-images.githubusercontent.com/57310936/235736691-870d6b82-3d32-46f3-bd34-3f2d26211aa2.gif)

## How to run:
### Installation

Clone the repo:
```
https://github.com/OishikGuha/romoj.git
```

Install modules for the frontend website:
```
cd app
npm install
```

Install modules for the backend API:
```
cd ... (if in app directory)
cd api
npm install
```
### Usage

1. Open two terminals
2. In one of the terminals, execute the command 
```
cd api
npx yarn start
```
3. In the other terminal,
```
cd app
npm run dev
```
4. After running `npm run dev`, the out put should give an IP address. Do not visit it! Instead, go to your desired browser and go to `http://localhost:5173`. And that's how you visit the website.

Note: Due to security reasons, you need to create your own mongodb cluster and put its connection link inside the .env file in the api folder.
