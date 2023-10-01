import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
import axios from "axios";

export const List = () => {
    const [users, setUsers] = useState( [] )
    const endpoint = "http://localhost:8080/user"
    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const data = response.data
            console.log(data)
            setUsers(data)
        })
    }

    useEffect( () => {
        getData()
    }, [])

    const columns = [
        {
            name: "id",
            label: "ID"
        },
        {
            name: "name",
            label: "NOMBRE"
        },
        {
            name: "email",
            label: "CORREO ELECTRÓNICO"
        },
        {
            name: "password",
            label: "CONTRASEÑA"
        },
        {
            name: "Delete",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <button onClick={() => {
                            const { data } = this.state;
                            data.shift();
                            this.setState({ data });
                        }}>
                            Delete
                        </button>
                    );
                }
            }
        },
        {
            name: "Edit",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <button onClick={() => window.alert(`Clicked "Edit" for row ${tableMeta.rowIndex}`)}>
                        Edit
                        </button>
                    );
                }
            }
        },
    ]

    const defaultMaterialTheme = createTheme();

    return(
        <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
                title = {"Listado de Usuarios"}
                data = {users}
                columns = {columns}
                actions = {[
                    {
                        icon: 'edit',
                        tooltip: 'Editar Usuario',
                        onclick: (event, rowData) => alert('Has presionado editar al artista: '+rowData.name)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar Usuario',
                        onclick: (event, rowData) => window.confirm('Estas seguro que deseas eliminar el usuario: '+rowData.name)
                    },
                ]}
                options = {{
                    actionsColumnIndex: -1
                }}
            />
        </ThemeProvider>
    )
}