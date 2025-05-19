# Weather Notify

A weather notification application that allows users to check current weather conditions and subscribe to daily weather updates.

## Features

- Search for cities and get current weather information
- View temperature, humidity, and weather description
- Subscribe to daily weather updates via email
- Email confirmation system for subscriptions
- Unsubscribe option

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Knex.js (SQL query builder)
- Nodemailer (for email notifications)

### Frontend
- React
- React Router
- Bootstrap
- Vite

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── App.jsx       # Main application component
│   └── package.json
│
├── src/                   # Backend application
│   ├── controllers/      # Route controllers
│   ├── db/              # Database configuration
│   ├── repositories/    # Data access layer
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── app.js         # Application entry point
│
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weather-notify.git
cd weather-notify
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

4. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
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

5. Run database migrations:
```bash
npm run migrate
```
6. Run database seeds:
```bash
npm run seed
```

7. Start the backend server:
```bash
npm run dev
```

8. Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## API Endpoints

- `GET /api/cities?q={query}` - Search for cities
- `GET /api/weather?city={city}` - Get weather for a city
- `POST /api/subscribe` - Subscribe to weather updates
- `POST /api/confirm` - Confirm subscription
- `POST /api/unsubscribe` - Unsubscribe from updates

## Docker Support

### Prerequisites
- Docker
- Docker Compose

### Running with Docker

1. Build and start the containers:
```bash
docker-compose up --build
```

2. Run database migrations:
```bash
docker-compose exec api npm run migrate
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- PostgreSQL: localhost:5432

## License

This project is licensed under the MIT License.

## Future Plans

### Backend Improvements

1. **Event Manager for Email Notifications**
   - Implement a simplified event manager in SubscriptionService
   - Make email sending asynchronous to improve performance
   - Add email queue management
   - Implement retry mechanism for failed email attempts

2. **City Views Enhancement**
   - Utilize the "city_views" database table
   - Support multiple representations of the same city
   - Add city name variations and aliases
   - Improve city search accuracy with different name formats

3. **Response Caching**
   - Implement caching weather data
   - Cache city search results
   - Add cache headers for API responses
