# Web-based CTB

## Setup

1. **Clone the repository.**
2. **Install dependencies:**
    ```bash
    composer install
    npm install
    ```

## Database Setup

1. **Create a new database.**
2. **Copy and configure environment file:**
    ```bash
    cp .env.example .env
    ```
    - Edit `.env` and set `DB_DATABASE` to your database name.
3. **Generate application key:**
    ```bash
    php artisan key:generate
    ```
4. **Seed the database:**
    ```bash
    php artisan db:seed
    ```
5. **Default Admin Credentials:**
    - **Username:** `admin@cbt.com`
    - **Password:** `Password123#`

## Mail Server Setup

- If mail is configured, students and teachers receive login details via email after being added.
- If not:
    - **Student password:** Matric number
    - **Teacher password:** Randomly generated (see log file)

## Running the Application

1. **Start backend server:**
    ```bash
    php artisan serve
    ```
2. **Start frontend development server:**
    ```bash
    npm run dev
    ```