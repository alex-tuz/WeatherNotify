# Weather Notify API

Backend service for weather notifications with email subscription functionality.

## Features

- Weather data retrieval by city name
- Email subscription for weather updates
- Email confirmation system
- Weather data caching

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Knex.js (SQL query builder)
- Nodemailer (email service)
- Jest (testing)

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- SMTP server for email sending

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
APP_URL=http://localhost:3000
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=weather_notify
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

4. Run database migrations:
```bash
npm run migrate
```

5. Run database seeds:
```bash
npm run seed
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Weather
- `GET /weather?city={cityName}` - Get current weather for a city

### Subscription
- `POST /subscribe` - Subscribe to weather updates
  - Body: `{ email: string, city: string }`
- `GET /confirm/:token` - Confirm email subscription

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Docker Support

Build the image:
```bash
docker build -t weather-notify-api .
```

Run the container:
```bash
docker run -p 3000:3000 weather-notify-api
```

## License

MIT
