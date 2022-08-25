import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";


export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    nme_produto: props.nme_produto,
    dsc_produto: props.dsc_produto,
    preco: props.preco,
  });




  const handleEditProduto = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      nme_produto: editValues.nme_produto,
      dsc_produto: editValues.dsc_produto,
      preco: editValues.preco,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.id === editValues.id
            ? {
                id: editValues.id,
                nme_produto: editValues.nme_produto,
                dsc_produto: editValues.dsc_produto,
                preco: editValues.preco,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteProduto = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
    handleClose();
  };

  // eslint-disable-next-line no-unused-vars
  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };


  const handleChangeValues = (value) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [value.target.id]: value.target.value,
    }));
  };

  return (
    
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nme_produto"
            label="Nome do produto"
            defaultValue={props.nme_produto}
            onChange={handleChangeValues}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="dsc_produto"
            label="descrição"
            defaultValue={props.dsc_produto}
            onChange={handleChangeValues}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="preco"
            label="preço"
            defaultValue={props.preco}
            onChange={handleChangeValues}
            type="text"
            fullWidth
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(handleDeleteProduto)} color="primary">
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditProduto()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
  );
}
