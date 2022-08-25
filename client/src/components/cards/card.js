import React from "react";
import "./card.css";
import  FormDialog  from "../dialog/dialog";
import { FiEdit } from "react-icons/fi";


export default function Card(props) {
  const {ListPedidos, setListPedidos} = props
  const [open, setOpen] = React.useState(false);

  const handleClickCard = () => {
    setOpen(true);
  };

  const handleAdicionaCarrinho = () => {
    setListPedidos([...ListPedidos, {nme_produto:props.nme_produto, preco:props.preco}

    ])
    console.log(ListPedidos)
  };

  return (
    
    <>
    <FormDialog open = {open} setOpen={setOpen} 
    nme_produto={props.nme_produto} 
    dsc_produto={props.dsc_produto} 
    preco={props.preco}
    listCard = {props.listCard}
    setListCard = {props.setListCard}
    id={props.id}
    />
    <div className="teste">
      <div className="card--container">
      <FiEdit onClick={() => handleClickCard()} className="icon--edit"/>
        <h3 className="card--title">{props.nme_produto}</h3>
        <p className="card--dsc">{props.dsc_produto}</p>
        <p className="card--preco">R$: {props.preco}</p>
        
        
            <button type="button" class="button--card" onClick={handleAdicionaCarrinho}>
            Adicionar ao Carrinho
            </button>

      </div>
    </div>
    </>
  );
}
