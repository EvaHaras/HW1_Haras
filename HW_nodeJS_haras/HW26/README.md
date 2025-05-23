# E-commerce API (MongoDB)

## Зміст

1. [Опис проєкту](#опис-проєкту)  
2. [Структура бази даних](#структура-бази-даних)  
3. [Опис API-інтерфейсів](#опис-api-інтерфейсів)  
4. [Інструкція по запуску](#інструкція-по-запуску)  
5. [Висновки](#висновки)

---

## Опис проєкту

Цей проєкт реалізує простий e-commerce API, що дозволяє:
- створювати категорії,
- додавати товари,
- переглядати список товарів та топ-продажів,
- оформлювати замовлення,
- підраховувати загальний прибуток.

### Використані технології

- **Node.js + Express** — серверна частина
- **MongoDB + Mongoose** — документоорієнтована база даних
- **Mongoose Aggregation** — для підрахунку прибутку

---

## Структура бази даних

### Модель `Category`

| Поле | Тип     | Опис               |
|------|---------|--------------------|
| name | String  | Назва категорії    |

### Модель `Product`

| Поле     | Тип      | Опис                              |
|----------|----------|-----------------------------------|
| name     | String   | Назва товару                      |
| price    | Number   | Ціна товару                       |
| stock    | Number   | Кількість товару на складі        |
| sold     | Number   | Кількість проданих одиниць       |
| category | ObjectId | Посилання на категорію (Category) |

### Модель `Order`

| Поле     | Тип      | Опис                                       |
|----------|----------|--------------------------------------------|
| products | Array    | Масив з productId та quantity              |
| total    | Number   | Загальна вартість замовлення               |

---

## Опис API-інтерфейсів

### `GET /products`

Повертає **всі товари**.

---

### `GET /products/smartphones`

Повертає **усі товари з категорії "Smartphones"**.

---

### `POST /categories`

Створює нову категорію.

#### Тіло запиту:
```json
{
  "name": "Smartphones"
}

POST /products
Додає новий товар до бази.

Тіло запиту:

{
  "name": "iPhone 15",
  "price": 50000,
  "stock": 10,
  "categoryId": "65e0a12b7afbe12abc123456"
}
POST /order
Створює замовлення та зменшує залишок на складі.

Тіло запиту:

{
  "items": [
    {
      "productId": "65e0a12b7afbe12abc123456",
      "quantity": 2
    },
    {
      "productId": "65e0a12b7afbe12abc123457",
      "quantity": 1
    }
  ]
}
GET /orders/total-profit
Повертає загальний прибуток зі всіх замовлень.

Приклад відповіді:

{
  "totalProfit": 125000
}
GET /products/top
Повертає топ-3 товарів, що найкраще продаються (за полем sold).
Інструкція по запуску
1. Клонування проєкту

git clone https://github.com/your-username/ecommerce-api-mongo.git
cd ecommerce-api-mongo
2. Встановлення залежностей
npm install

3. Налаштування MongoDB
Переконайтесь, що MongoDB запущено локально та доступне на:


mongodb://admin:admin123@localhost:27017/admin?authSource=admin
Або змініть рядок підключення в index.js:


mongoose.connect('mongodb://<user>:<password>@<host>:<port>/<database>?authSource=admin');
4. Запуск сервера

node index.js
Сервер буде доступний на http://localhost:3000.

Висновки
Цей API надає базовий функціонал для e-commerce системи з підтримкою категорій, товарів, замовлень і звітності. Можливе подальше розширення функціоналу: авторизація, фільтрація товарів, аналітика тощо.