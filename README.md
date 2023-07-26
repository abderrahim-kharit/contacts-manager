# Test Technique - Contacts manager

## Installation Steps

**1. Clone the repository**

```sh
git clone https://github.com/abderrahim-kharit/contacts-manager.git
```

Switch to cloned project

```sh
cd contacts-manager
```

**2. Copy `.env.example` to `.env`**

```sh
copy .env.example .env
```

**3. Install dependencies**

```sh
composer install
```

```sh
npm install
```

**4. Generate application key**

```sh
php artisan key:generate
```

**5. Run migrations and seed database**

```sh
php artisan migrate
```

**6. Seed database by importing the `db.sql` file**

**7. Run the project**

```sh
php artisan serve
```

```sh
npm run dev
```

Application : http://localhost:8000
