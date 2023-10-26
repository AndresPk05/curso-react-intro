import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Update } from "../Actions/SucursalAction";
import { Get } from "../Actions/MonedaAction";

const PopupForm = ({ open, onClose, object, onEdit }) => {
  const [formData, setFormData] = useState({
    codigo: object.codigo || 0,
    descripcion: object.descripcion || "",
    direccion: object.direccion || "",
    identificacion: object.identificacion || "",
    fechaCreacion: object.fechaCreacion || "",
    monedaId: object.monedaId || 0,
  });

  const [monedas, setMonedas] = useState([]);

  React.useEffect(() => {
    setFormData(object);
  }, [object]);

  React.useEffect(() => {
    handleGetMonedas();
  }, []);

  const handleGetMonedas = async () => {
    Get()
      .then((result) => {
        setMonedas(result.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    console.log(formData);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fechtData();
  };

  const fechtData = async () => {
    let resultValidation = ValidateForm();
    if (resultValidation) {
      return;
    }

    Update(formData)
      .then((result) => {
        console.log(result);
        setFormData({});
        onEdit();
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ValidateForm = () => {
    if (
      formData.codigo === 0 ||
      formData.descripcion === "" ||
      formData.descripcion.length > 250 ||
      formData.direccion === "" ||
      formData.descripcion.length > 250 ||
      formData.identificacion === "" ||
      formData.descripcion.length > 50 ||
      formData.monedaId === 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const validateDescripcion = () => {
    if (formData.descripcion === "" && formData.descripcion.length < 250) {
      return false;
    }
    return true;
  };

  const validateDireccion = () => {
    if (formData.direccion === "" && formData.direccion.length < 250) {
      return false;
    }
    return true;
  };

  const validateIdentificacion = () => {
    if (formData.identificacion === "" && formData.identificacion.length < 50) {
      return false;
    }
    return true;
  };

  const validateCodigo = () => {
    if (formData.codigo === 0) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Codigo"
              name="codigo"
              type="number"
              value={formData.codigo || 0}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
              error={!validateCodigo()}
              helperText={
                !validateCodigo() ? "El codigo no puede estar vacio" : ""
              }
            />
            <TextField
              label="Descripcion"
              name="descripcion"
              value={formData.descripcion || ""}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
              error={!validateDescripcion()}
              helperText={
                !validateDescripcion()
                  ? "La descripcion no puede estar vacia"
                  : ""
              }
            />
            <TextField
              label="Direccion"
              name="direccion"
              value={formData.direccion || ""}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
              error={!validateDireccion()}
              helperText={
                !validateDireccion() ? "La direccion no puede estar vacia" : ""
              }
            />
            <TextField
              label="Identificacion"
              name="identificacion"
              value={formData.identificacion || ""}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
              error={!validateIdentificacion()}
              helperText={
                !validateIdentificacion()
                  ? "La identificacion no puede estar vacia"
                  : ""
              }
            />
            <FormControl fullWidth>
              <InputLabel id="select-monedas-label">Moneda</InputLabel>
              <Select
                labelId="select-monedas-label"
                id="select-monedas"
                name="monedaId"
                value={formData.monedaId || 0}
                label="Moneda"
                onChange={handleChange}
              >
                {monedas.map((moneda) => (
                  <MenuItem key={moneda.id} value={moneda.id}>
                    {moneda.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PopupForm;
