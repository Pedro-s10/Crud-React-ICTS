const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "crudloja",
});


// para puxar/pegar os valores (app.get)
// para enviar/fazer as solicitações (app.post)
// para deletar (app.delete)
// para editar (app.put)
// tudo que vai entrar é no request e tudo que vai sair é no result

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) =>{
    const { nme_produto } = req.body;
    const { preco } = req.body;
    const { dsc_produto } = req.body;
    const { dta_produto_cad } = req.body;
    const { dta_produto_mod } = req.body;

    let SQL = "INSERT INTO produtos (nme_produto, dsc_produto, preco,dta_produto_cad, dta_produto_mod) VALUES ( ?,?,?,NOW(),? )";

    db.query(SQL, [nme_produto, dsc_produto, preco, dta_produto_cad, dta_produto_mod], (err, result) =>{
        if(err) console.log(err);
        else res.send(result);
    });
});

app.get("/getCards", (req, res) =>{

    let SQL = "SELECT * FROM Produtos";

    db.query(SQL, (err, result) =>{
        if(err) console.log(err);
        else res.send(result);
    });
});

app.put("/edit", (req, res) => {
    const { id } = req.body;
    const { nme_produto } = req.body;
    const { dsc_produto } = req.body;
    const { preco } = req.body;
    const { dta_produto_cad } = req.body;
    const { dta_produto_mod } = req.body;

    let SQL = 
    "UPDATE produtos SET nme_produto = ?, dsc_produto = ?, preco = ?, dta_produto_cad = ?, dta_produto_mod = NOW() WHERE idprodutos = ? ";

    db.query(SQL, [nme_produto, dsc_produto, preco, dta_produto_cad, id], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});


app.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    let SQL = "DELETE FROM produtos where idprodutos = ?";
    db.query(SQL, [id], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });  
});


app.post("/finalizar", (req, res) => {
    const {ValorTotal} = req.body;
    
    let SQL = "INSERT INTO compras (valortotal, dta_compra_cad, tipo_pagamento, status) values ( ?, NOW(), 'Cartão', 'Aprovado' )";
    db.query(SQL, [ValorTotal], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});


app.listen(3001, () =>{
    console.log('rodando servidor');
});

