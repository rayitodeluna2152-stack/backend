const Stripe = require('stripe');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ------------------ RUTA DE PAGO ------------------
app.post("/crear-pago", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [
                {
                    price: "price_1U90nFFHtQxvFihYsZf6ExoF",
                    quantity: 1
                }
            ],
            success_url: "https://TU-FRONTEND.vercel.app/success.html",
            cancel_url: "https://TU-FRONTEND.vercel.app/cancel.html"
        });

        res.json({ url: session.url });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error creando pago" });
    }
});

// ------------------ CHAT DE MATEMÁTICAS ------------------
app.post('/api/chat/matematicas', (req, res) => {
    const msg = req.body.message;

    let respuesta = "Soy tu profesor de Matemáticas. Vamos a resolverlo paso a paso.\n\n";

    if (msg.includes("ecuación")) {
        respuesta += "Para resolver una ecuación, primero aislamos la incógnita. ¿Qué ecuación quieres resolver exactamente?";
    } else if (msg.includes("derivada")) {
        respuesta += "Una derivada mide cómo cambia una función. ¿Qué función necesitas derivar?";
    } else if (msg.includes("integral")) {
        respuesta += "Las integrales representan áreas bajo la curva. Dime la integral y te la resuelvo.";
    } else if (msg.includes("pitagoras")) {
        respuesta += "El teorema de Pitágoras dice: a² + b² = c². ¿Qué valores tienes?";
    } else {
        respuesta += "Explícame tu duda y te ayudo con gusto.";
    }

    res.json({ reply: respuesta });
});

// ------------------ PUERTO PARA RAILWAY ------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Backend funcionando en el puerto " + PORT);
});
