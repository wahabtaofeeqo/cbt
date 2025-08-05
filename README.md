# Web-based CTB

## Setup

1. Clone the repository.
2. Install Composer dependencies:
    ```bash
    composer install
    ```
3. Install npm packages:
    ```bash
    npm install
    ```

## Database Setup

1. Create a new database.
2. Copy `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```
3. Update `DB_DATABASE` in `.env` with your database name.
4. Generate the application key:
    ```bash
    php artisan key:generate
    ```

## Running the Application

1. Start the backend server:
    ```bash
    php artisan serve
    ```
2. Start the frontend development server:
    ```bash
    npm run dev
    ```