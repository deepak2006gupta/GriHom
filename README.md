# GriHom

GriHom is split into two deployable apps:

- `frontEnd`: React app
- `backend`: Spring Boot REST API

## Run Locally

Backend:

```bash
cd backend
copy .env.example .env
./mvnw spring-boot:run
```

Frontend:

```bash
cd frontEnd
copy .env.example .env
npm install
npm start
```

The local frontend uses `REACT_APP_API_URL=http://localhost:8080/api`.

## Frontend Deployment

Deploy the `frontEnd` folder to Vercel, Netlify, Render Static Site, or any static hosting platform.

Build command:

```bash
npm run build
```

Publish directory:

```bash
build
```

Set these frontend environment variables:

```bash
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

## Backend Deployment

Deploy the `backend` folder to Render, Railway, Fly.io, or any Java/Docker hosting platform.

Build command:

```bash
./mvnw -DskipTests package
```

Start command:

```bash
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

Set these backend environment variables:

```bash
PORT=8080
DATABASE_URL=jdbc:mysql://your-host:3306/grihom
DATABASE_USERNAME=your_database_user
DATABASE_PASSWORD=your_database_password
JWT_SECRET=use_a_long_random_secret_at_least_32_chars
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
DEFAULT_ADMIN_EMAIL=admin@homevalue.com
DEFAULT_ADMIN_PASSWORD=change_me_before_deploying
RECAPTCHA_ENABLED=true
RECAPTCHA_SECRET=your_recaptcha_secret
```

For local testing without reCAPTCHA, set `RECAPTCHA_ENABLED=false`.
