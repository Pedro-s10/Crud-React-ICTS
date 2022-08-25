import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";

function Pedidos(props) {
    const { ListPedidos, setValorTotal } = props;
    let valor = 0;
    useEffect(() => {
        setValorTotal(valor);
        console.log(valor);
    }, [ListPedidos, setValorTotal, valor]);
    return (
        <>
            {ListPedidos.map((item) => {
                valor = valor + item.preco;
                return (
                    <div className="card--container2">
                        <FiEdit  class="editar"/>
                        <FiTrash  class="delete"/>
                        <br></br>
                        <span>
                            Nome do produto: {item.nme_produto}
                            <br></br>Preço: {item.preco}
                        </span>
                    </div>
                );
            })}
        </>
    );
}

export default Pedidos;
