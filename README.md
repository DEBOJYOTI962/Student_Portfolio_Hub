## Development setup

1. Install Node.js 18+ and MongoDB Community Server.
2. In this folder, create a `.env` file with:

```
MONGODB_URI=mongodb://127.0.0.1:27017/skillhub
PORT=3000
JWT_SECRET=replace-with-a-long-random-string
```

3. Install dependencies:

```
npm install
```

4. Run the backend server:

```
npm run dev
```

5. Open `signup.html` and `login.html` in the browser. Forms will call `http://localhost:3000/api/auth/*`.


