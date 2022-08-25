
import React, { useEffect, useState } from "react";
import './App.css';
import Axios from "axios";
import Card from "./components/cards/card";
import Pedidos from "./components/Pedidos";





function App() {
  const [values, setValues] = useState();
  const [listProdutos, setListProdutos] = useState();
  const [ListPedidos, setListPedidos] = useState([]);
  const [ValorTotal, setValorTotal] = useState(0);



  const handleChangerValeus = value =>{
    //console.log(value.target.value);
    setValues(prevValue=>({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  }

  const handleFinalizarCompra = () => {
    Axios.post("http://localhost:3001/finalizar", {
      ValorTotal:ValorTotal
    })

  }
  
  

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
    nme_produto: values.nme_produto,
    dsc_produto: values.dsc_produto,
    preco: values.preco,
    
    }).then(() =>{
      setListProdutos([
        ...listProdutos, 
        {
          nme_produto: values.nme_produto,
          dsc_produto: values.dsc_produto,
          preco: values.preco,
        

        },
      ]);
      
    });
  };

  useEffect(()=>{
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListProdutos(response.data);
    });
  }, []);


  return (
    
      <div className="app--container">
        <div className="div--produtos">
        <div className='register--container'>
          <h1 className='register--title'>Cadastrar do Produto</h1>

          <input type="text" 
          name="nme_produto" 
          placeholder="Nome do produto" 
          className="register--input"
          onChange={handleChangerValeus}
          />

          <input type="text" 
          name="dsc_produto" 
          placeholder="Descrição do produto" 
          className="register--input"
          onChange={handleChangerValeus}
          />

          <input type="text" 
          name="preco" 
          placeholder="Preço do produto" 
          className="register--input"
          onChange={handleChangerValeus}
          />

      


      <button className='register--button' 
      onClick={() => handleClickButton()}
      >Cadastrar</button>
        </div>
        <div className="register--titleprod">
          <h2>Produtos Disponiveis</h2>
        </div>
        <div className="card">
        { typeof listProdutos !== "undefined" && 
        listProdutos.map((value) => {
          return (
          <Card 
          key={value.id} 
          listProdutos={listProdutos}
          setListProdutos={setListProdutos}
          id={value.idprodutos}
          nme_produto={value.nme_produto}
          dsc_produto={value.dsc_produto}
          preco={value.preco}
          ListPedidos={ListPedidos}
          setListPedidos = {setListPedidos}
          ></Card>);
        })}
    
        </div>
        </div>
        <div className="div--pedidos">
          <div className="div--nota">
          <h1 className="title--nota">Carrinho</h1>

            
            <Pedidos ListPedidos={ListPedidos} setValorTotal={setValorTotal} ValorTotal={ValorTotal}/>
            { ListPedidos.length>0 ? (
              <div className="valorfinal">
               <h2>total: {ListPedidos.map(item => item.preco).reduce((prev,next) => prev + next)}</h2>
               <button type="button" className="button--pedidos" onClick={handleFinalizarCompra}>Finalizar Compra</button>
               </div>
            ):(<h3>Sem nenhum produto</h3>)} 
           
            </div>
           
         
        </div>
        
    

      </div>
  );
}

export default App;
