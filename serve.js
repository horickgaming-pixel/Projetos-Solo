const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

let users = []; // simulação de banco de dados

// Registrar usuário
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // Cria hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ username, password: hashedPassword });
    res.json({ message: "Usuário registrado!" });
});

// Login do usuário
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: "Usuário não encontrado!" });

    const senhaOk = await bcrypt.compare(password, user.password);
    if (!senhaOk) return res.status(400).json({ message: "Senha incorreta!" });

    res.json({ message: "Login OK! " });
});