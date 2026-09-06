# Car Doctor

A modern car service website built with Next.js, MongoDB, and NextAuth. Users can explore automotive services, book services, manage their bookings, and securely access protected pages.

## Features

* Responsive car service website
* Service listing and details
* Service booking system
* User registration and login
* NextAuth authentication
* Protected booking and checkout routes
* My Bookings dashboard
* Update and delete bookings
* MongoDB data storage
* Password hashing with bcrypt
* Toast notifications
* Responsive UI

## Tech Stack

* Next.js 15
* React 19
* JavaScript
* Tailwind CSS
* daisyUI
* MongoDB
* NextAuth
* bcrypt
* React Hot Toast
* React Icons
* Heroicons

## Main Pages

* Home
* About
* Services
* Service Details
* Blog
* Contact
* Checkout
* My Bookings
* Login
* Registration

## Project Structure

```text
car-doctor/
├── public/
│   └── assets/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── providers/
│   └── middleware.js
├── package.json
├── next.config.mjs
├── postcss.config.mjs
└── README.md
```

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/mrshanshuvo/car-doctor.git
cd car-doctor
```

### Install Dependencies

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file and configure the required MongoDB and authentication environment variables.

### Run the Development Server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

## Database

The application uses MongoDB with separate collections for:

* Users
* Services
* Bookings

## Authentication

Authentication is handled with NextAuth, with protected access for:

* My Bookings
* Booking details
* Checkout

Passwords are securely hashed using bcrypt.

## License

MIT License

## Author

**Shahid Hasan Shuvo**

Full Stack Developer
