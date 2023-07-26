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
cp .env.example .env
```

**3. Create database and update the `.env` file**

**4. Install dependencies**

```sh
composer install
```

```sh
npm install
```

**5. Generate application key**

```sh
php artisan key:generate
```

**5. Run migrations and seed database**

```sh
php artisan migrate:fresh --seed
```

**6. Run the project**

```sh
php artisan serve
```

Application : http://localhost:8000
