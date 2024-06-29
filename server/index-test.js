require('dotenv').config()
const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/checkout', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Batteries'
                    },
                    unit_amount: 200 * 100
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        shipping_address_collection: {
            allowed_countries:['IN']
        },
        success_url: `${process.env.BASE_DOMAIN}/complete?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_DOMAIN}/cancel`,
    })
    //console.log(session)
    res.redirect(session.url);
});

app.get('/complete', async (req, res) => {
    const result = Promise.all([
        stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
        stripe.checkout.sessions.listLineItems(req.query.session_id)
    ])

    console.log(JSON.stringify(await result))
    res.render('success.ejs')
})
app.get('/cancel1', (req, res) => {
    res.send(`
        <h2>Payment was cancelled</h2>
        <p>Redirecting to homepage in <span id="countdown">3</span> seconds...</p>
        <script>
            let countdown = 3;
            const countdownElement = document.getElementById('countdown');

            const interval = setInterval(() => {
                countdown--;
                countdownElement.textContent = countdown;
                if (countdown === 0) {
                    clearInterval(interval);
                    window.location.href = '/';
                }
            }, 1000);
        </script>
    `);
});
app.get('/cancel', (req, res) => {
    res.render('cancel.ejs')
})


app.listen(3000, () => console.log('Server is running on port 3000'))
