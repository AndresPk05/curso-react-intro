export const Update = async (sucursal) => {
    const response = await fetch(`https://localhost:7160/sucursal/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sucursal),
        });

    const result = await response.json();
    return result;
}

export const Create = async (sucursal) => {
    const response = await fetch(`https://localhost:7160/sucursal/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sucursal),
        });

    const result = await response.json();
    return result;
}

export const Delete = async (id) => {
    const response = await fetch(`https://localhost:7160/sucursal/${id}`, {
        method: "DELETE",
      });

    const result = await response.json();
    return result;
}

export const Get = async (request) => {
    const response = await fetch(`https://localhost:7160/sucursal/?CodigoSucursal=${request.codigoSucursal}&PaginaActual=${request.page}&CantidadRegistros=${request.rowsPerPage}`);
    const result = await response.json();
    return result;
}