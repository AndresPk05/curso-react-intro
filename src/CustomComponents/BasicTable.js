import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableFooter, TablePagination } from "@mui/material";
import PopupForm from "./PopupEditar";
import { Delete, Get } from "../Actions/SucursalAction";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


export default function BasicTable(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [object, setObject] = useState({
    codigo: "",
    descripcion: "",
    direccion: "",
    identificacion: "",
    fechaCreacion: "",
    monedaId: 0,
  });

  const handleOpen = (sucursal) => {
    setObject(sucursal);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const fetchData = async () => {
    Get({ codigoSucursal: props.codigoSucursal, page, rowsPerPage })
      .then((result) => {
        setData(result.result);
        setCount(result.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowEditDelete = () => {
    fetchData();
  };

  const deleteRow = async (id) => {
    Delete(id)
      .then((result) => {
        console.log(result);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length);

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Codigo</TableCell>
              <TableCell align="right">Descripcion</TableCell>
              <TableCell align="right">Direccion</TableCell>
              <TableCell align="right">Identificacion</TableCell>
              <TableCell align="right">FechaCreacion</TableCell>
              <TableCell align="right">EditarRow</TableCell>
              <TableCell align="right">EliminarRow</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((sucursal) => (
              <TableRow key={sucursal.id}>
                <TableCell component="th" scope="row">
                  {sucursal.codigo}
                </TableCell>
                <TableCell align="right">{sucursal.descripcion}</TableCell>
                <TableCell align="right">{sucursal.direccion}</TableCell>
                <TableCell align="right">{sucursal.identificacion}</TableCell>
                <TableCell align="right">
                  {new Date(sucursal.fechaCreacion).toLocaleDateString(
                    "es-ES",
                    {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }
                  )}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      handleOpen(sucursal);
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      deleteRow(sucursal.id);
                    }}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <PopupForm
        open={open}
        onClose={handleClose}
        object={object}
        onEdit={handleChangeRowEditDelete}
      />
    </>
  );
}
