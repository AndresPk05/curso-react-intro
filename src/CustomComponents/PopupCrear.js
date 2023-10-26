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
import { Create} from "../Actions/SucursalAction";
import { Get } from "../Actions/MonedaAction";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';

const PopupFormCreate = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    codigo: 0,
    descripcion: "",
    direccion: "",
    identificacion: "",
    monedaId: 0,
    fechaCreacion: dayjs(new Date().toLocaleDateString(
        "en-CA",
        {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }
      )),
  });
  const [validarForm, setValidarForm] = useState(false);

  const [monedas, setMonedas] = useState([]);

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

  const handleChangefechaCreacion = (event) => {
    setFormData({
        ...formData,
        fechaCreacion: event,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fechtData();
  };

  const fechtData = async () => {

    let resultValidation = ValidateForm();
    if (resultValidation) {
      return;
    }

    formData.fechaCreacion = formData.fechaCreacion.format("YYYY-MM-DD");
    console.log(formData);

    Create(formData)
      .then((result) => {
        console.log(result);
        setFormData({});
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ValidateForm = () => {
    setValidarForm(true);
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

  const validateDate = () => {
    let currentDay = dayjs(new Date().toLocaleDateString(
        "en-CA",
        {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }
      ));
        debugger;
    if (formData.fechaCreacion < currentDay) {
        return false;
    }

    return true
  }
  const handleClose = () => {
    setValidarForm(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear</DialogTitle>
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
              error={!validateCodigo() && validarForm}
              helperText={
                !validateCodigo() && validarForm
                  ? "El codigo no puede estar vacio"
                  : ""
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
              error={!validateDescripcion() && validarForm}
              helperText={
                !validateDescripcion() && validarForm
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
              error={!validateDireccion() && validarForm}
              helperText={
                !validateDireccion() && validarForm
                  ? "La direccion no puede estar vacia"
                  : ""
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
              error={!validateIdentificacion() && validarForm}
              helperText={
                !validateIdentificacion() && validarForm
                  ? "La identificacion no puede estar vacia"
                  : ""
              }
            />
            <FormControl fullWidth margin="normal">
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
            <FormControl fullWidth margin="normal">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha Creacion"
                  value={formData.fechaCreacion || ""}
                  name="fechaCreacion"
                  onChange={handleChangefechaCreacion}
                  slotProps={{
                    textField: {
                      error: !validateDate() && validarForm,  
                      helperText: !validateDate() && validarForm ? "La fecha no puede ser menor a la actual" : "",
                    },
                  }}
                />
              </LocalizationProvider>
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

export default PopupFormCreate;
