# Dossier

An Express.js Backend Baked with MongoDB and GraphQL.

## Setup & Usage

clone or download the project and configure your `mongodb` connection url, by either following these 2 defined approaches ...

### .env

create a `.env` file in the root of your project folder and add the following ...

```env
MONGODB = <Your MongoDB Connection URL>
```

### app.js

replace the `mongodb` connection url in the `app.js` file ...

```javascript
// replace the `process.env.MONGODB` with your connection url
mongoose
    .connect(process.env.MONGODB, {
        promiseLibrary: require('bluebird'),
        useNewUrlParser: true
    }).then();
```

## Run

run the `server` using the following command from the root of the project folder ...

```shell
nodemon
```