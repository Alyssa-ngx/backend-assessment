# Backend Assessment

## Prerequisites
- Node.js v18+
- MySQL 8.0+

## Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
3. Setup MYSQL database and seed data:
    ```bash
    mysql -u root -p < seed/seed.sql
4. Start the server
    ```bash
    node src/server.js