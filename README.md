---

# Payment Gateway with Stripe

This project is a simple payment gateway integration using Stripe, Node.js, and Express. Users can enter item details and proceed to checkout.

## Features

- Add items with name, price, and quantity.
- Dynamic checkout using Stripe.
- Success and cancel pages for transaction outcomes.

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript templates)
- Stripe API

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Bala-Vignesh-Reddy/Payment-Gateway-Stripe.git
   cd Payment-Gateway-Stripe
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file inside server directory and add your Stripe secret key and base URL:

   ```env
   STRIPE_SECRET_KEY=your_stripe_secret_key
   BASE_DOMAIN=http://localhost:5000
   ```

4. **Run the application**:

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`.

## Usage

1. Open your browser and navigate to `http://localhost:5000`.
2. Fill out the item details (name, price, quantity).
3. Click **Add Item** to add more items. **Not Included **
4. Click **Submit** to proceed to checkout.
5. Complete the payment on the Stripe checkout page.
6. Upon success, you will be redirected to the completion page. If canceled, you'll return to the home page.

## File Structure

- `server.js`: Main server file handling routes and Stripe integration.
- `views/index.ejs`: Frontend template for item input.

## Dependencies

- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `dotenv`: Loads environment variables from a `.env` file.
- `stripe`: Node.js library for the Stripe API.

---

