import {
  Container,
  Grid,
  Button,
  Card,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import BasicTable from "./BasicTable";
import SearchIcon from "@mui/icons-material/Search";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PopupFormCreate from "./PopupCrear";

export const Principal = () => {
  const [codigoSucursal, setcodigoSucursal] = useState(0);
  const [open, setOpen] = useState(false);
  const [renderTable, setrenderTable] = useState(false);

  const changeCodigoSucursal = (event) => {
    setcodigoSucursal(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const validateForm = () => {
    setrenderTable(true);
  };
  return (
    <>
      <Container>
        <Card>
          <Container>
            <h1>
              Bienvenido al Administrador de sucursales <ApartmentIcon />
            </h1>
            <p>
              Aqui podras crear, editar, eliminar y buscar sucursales. Puedes
              buscar las sucursales por el codigo o si desea que te muestre
              todas solo haz clic en el boton buscar sin colocar ningun codigo.
            </p>
            <Grid container>
              <Grid item xs={8} margin={"auto"}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel value htmlFor="outlined-adornment-codigoSucursal">
                    Codigo Sucursal
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-codigoSucursal"
                    label="Codigo Sucursal"
                    value={codigoSucursal}
                    onChange={changeCodigoSucursal}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3} margin={"auto"}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={validateForm}
                >
                  Buscar
                  <SearchIcon />
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Card>
        <br></br>
        {renderTable ? (
          <>
            <BasicTable codigoSucursal={codigoSucursal}></BasicTable>
            <br></br>
          </>
        ) : null}
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Crear Sucursal
        </Button>
        <PopupFormCreate open={open} onClose={handleClose} />
      </Container>
    </>
  );
};
