## BACKEND

Go into `/coaching_conundrum_api` and run:

```bash
    rails db:create db:migrate db:seed
```

This will create test users for testing.

```bash
    rails s -p 3001
```

This exposes the API on ``localhost:3001`. 


## FRONTEND

In another terminal, run:

```bash
    npm install
```

Then run the client at `localhost:3000` by running:

```bash
    npm start
```