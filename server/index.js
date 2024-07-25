require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/checkout', async (req, res) => {
    const { item, price, quantity } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item,
                        },
                        unit_amount: parseFloat(price) * 100,
                    },
                    quantity: parseInt(quantity),
                },
            ],
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['IN']
            },
            success_url: `${process.env.BASE_DOMAIN}/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_DOMAIN}/cancel`
        });

        res.redirect(session.url);
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/complete', async (req, res) => {
    try {
        const [session, lineItems] = await Promise.all([
            stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
            stripe.checkout.sessions.listLineItems(req.query.session_id),
        ]);

        console.log(JSON.stringify(session));
        console.log(JSON.stringify(lineItems));

        res.render('success.ejs')
    } catch (error) {
        console.error('Error retrieving session details:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/cancel', (req, res) => {
    res.render('cancel.ejs')
});

app.listen(3000, () => console.log('Server started on port 3000'));

