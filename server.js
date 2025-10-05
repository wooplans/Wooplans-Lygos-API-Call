const express = require('express');
const LYGOS = require('lygos'); // Install via npm install lygos
const app = express();
app.use(express.json());

const lygos = new LYGOS('YOUR_LYGOS_API_KEY');

app.post('/create-payment', async (req, res) => {
  const { id, title, description, price, image, specialOffer } = req.body;
  try {
    const payment = await lygos.initPayment({
      amount: price,
      shop_name: 'Your Brand',
      order_id: `ORDER-${id}-${Date.now()}`,

      success_url: 'https://your-framer-site.framer.app/success',
      failure_url: 'https://your-framer-site.framer.app/failure',
      title,
      description,
      message: specialOffer,
      // image: image // Add if Lygos supports image field
    });
    res.json({ checkout_url: payment.checkout_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment initiation failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

