import './App.css';
import 'date-fns';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField, Select, MenuItem } from "@material-ui/core"
import { Delete } from '@material-ui/icons'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import { green } from '@material-ui/core/colors'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import LoadingSpinner from "./LoadingSpinner"
import { Alert } from '@material-ui/lab';


const baseUrl = "http://127.0.0.1:8000/api"

function App(){
  const[isLoading, setIsLoading] = useState(false)
  const[isAlert, setIsAlert] = useState(false)
  const[selectedDate, setSelectedDate] = useState(new Date())
  const[data, setData] = useState([])
  const[title, setTitle] = useState('')
  const[stateId, setStateId] = useState(0)
  const[stateIdAdd, setStateIdAdd] = useState(0)
  const[token, setToken] = useState('')
  const[states, setStates] = useState([]);
  const[modalInsert, setModalInsert] = useState(false)
  const[modalDelete, setModalDelete] = useState(false)
  const[formAdd, setFormAdd] = useState({
    id: '',
    title: '',
    description: '',
    name_creator: '',
    likes: 0,
    likeDisabled: false
  })
  const[alertContent, setAlertContent] = useState({
    severity: '',
    message: ''
  })

  const handleCharge = e => {
    const {name, value} = e.target
    if(name === 'state_id'){
      setStateIdAdd(value)
    }
    setFormAdd(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleDateCreation = e => {
    console.log(e)
    setSelectedDate(new Date(e))
  }

  function handleInputChange(e) {
    (e.target.name === 'state_id') ? setStateId(e.target.value) : setTitle(e.target.value)
  }

  const openCloseModalInsert = () => {
    setModalInsert(!modalInsert)
  }

  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete)
  }


  const deleteTask = (task) => {
    setFormAdd(task)
    openCloseModalDelete()
  }

  const searchFilter = async() => {
    setIsLoading(true)
    await actionList()
  }

  const tokenGet = async() => {
    console.log('tokenGet')
    //const post = { title:title, state_id:stateId }
    await axios.get(baseUrl+'/token')
    .then(response => {
      localStorage.setItem('token', response.data.token)
      setToken(response.data.token)
    })
  }

  const actionList = async() => {
    console.log('actionList')
    const post = { title:title, state_id:stateId }
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    await axios.post(baseUrl+'/tasks', post, config)
    .then(response => {
      console.log(response.data)
      setData(response.data.tasks)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    })
  }

  const actionPost = async() => {
    console.log('actionPost')
    setIsLoading(true)
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const post = { title:formAdd.title, description:formAdd.description, date_creation:selectedDate, state_id:stateIdAdd, name_creator:formAdd.name_creator, likes:formAdd.likes}
    await axios.post(baseUrl+'/tasks/create', post, config)
    .then(response => {
      if(response.status === 200){
        setData(data.concat(response.data.task))
        alertActive('success', response.data.message)
      } else {
        alertActive('error', response.data.message)
      }
      openCloseModalInsert()
      setIsLoading(false)
    })
  }

  const actionLike = async(task) => {
    console.log('actionLike')
    setIsLoading(true)
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    await axios.put(baseUrl+'/tasks/like/'+task.id, [], config)
    .then(response => {
      if(response.status === 200){
        setData(data.map(item => {
          if (item.id === task.id) {
            // Crea un *nuevo* objeto con cambios
            return { ...item,
              likes: item.likes+1,
              likeDisabled: true
            }
          } else {
             // No cambia
            return item
          }
        }))
        alertActive('success', response.data.message)
      } else {
        alertActive('error', response.data.message)
      }
      setIsLoading(false)
    })
  }

  const actionDelete = async() => {
    console.log('actionDelete')
    setIsLoading(true)
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    await axios.delete(baseUrl+'/tasks/'+formAdd.id, config)
    .then(response => {
      if(response.status === 200){
        setData(data.filter(task => task.id !== formAdd.id))
        alertActive('success', response.data.message)
      } else {
        alertActive('error', response.data.message)
      }
      openCloseModalDelete()
      setIsLoading(false)
    })
  }

  useEffect(async() => {
    setIsLoading(true)
    if(!localStorage.getItem('token')){
      localStorage.setItem('token', '')
      await tokenGet()
    } else {
      setToken(localStorage.getItem('token'))
      if(token != ''){
        await actionList()
        await listStates()
      }
    }
	}, [token])

  const listStates = async() => {
    console.log('listStates')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    await axios.get(baseUrl+'/states', config)
    .then(response => {
      setStates(data.concat(response.data))
    })
  }

  const alertActive = (severity, message) => {
    console.log('alertActive')
    setAlertContent(prevState => ({
      ...prevState,
      severity: severity,
      message: message
    }))
    setIsAlert(true)
    setTimeout(() => {
      setIsAlert(false)
    }, 3000)
  }

  const bodyInsert = (
    <div className="modal modalAdd">
      <h3>Agregar nueva tarea</h3>
      <TextField name="title" className="input" label="Título" onChange={handleCharge}/>
      <TextField name="description" className="input" label="Descripción" onChange={handleCharge}/>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          name="date_creation"
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Fecha de Creación"
          value={selectedDate}
          onChange={handleDateCreation}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <Select
        name="state_id"
        value={stateIdAdd}
        onChange={handleCharge}
      >
        <MenuItem value={0} key="0">Seleccione</MenuItem>
        {states.map((option) => {
          return (
            <MenuItem value={option.id} key={option.id}>{option.name}</MenuItem>
          );
        })}
      </Select>
      <TextField name="name_creator" className="input" label="Nombre del Creador" onChange={handleCharge}/>
      <div align="right" className="btnModal">
        <Button color="primary" onClick={() => actionPost()}>Insertar</Button>
        <Button onClick={() => openCloseModalInsert()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyDelete = (
    <div className="modal">
      <h3>Eliminar tarea</h3>
      <p>¿Estás seguro que deseas eliminar la tarea <b>{formAdd && formAdd.title}</b>?</p>
      <div align="right" className="btnModal">
        <Button color="primary" onClick={() => actionDelete()}>Eliminar</Button>
        <Button onClick={() => openCloseModalDelete()}>Cancelar</Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      {isLoading && <LoadingSpinner /> }
      {isAlert && <Alert severity={alertContent.severity}>{alertContent.message}</Alert>}
      <h2>Listado de Tareas</h2>
      <Button onClick={() => openCloseModalInsert()}>Agregar</Button>
      <form className="form-filters">
        <TextField  name="title" label="Título" onChange={handleInputChange}/>
        <Select
          name="state_id"
          value={stateId}
          onChange={handleInputChange}
        >
          <MenuItem value={0} key="0">Seleccione</MenuItem>
          {states.map((option) => {
            return (
              <MenuItem value={option.id} key={option.id}>{option.name}</MenuItem>
            );
          })}
        </Select>
        <Button onClick={() => searchFilter()}>Filtrar</Button>
      </form>
      <TableContainer className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha Creación</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Creador</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.date_creation}</TableCell>
                <TableCell>{task.state_name}</TableCell>
                <TableCell>{task.name_creator}</TableCell>
                <TableCell>{task.likes}</TableCell>
                <TableCell className="btn-actions">
                  {!task.likeDisabled && <ThumbUpAltIcon style={{ color: green[500] }} onClick={() => actionLike(task)}/>}
                  {task.likes === 0 && <Delete color="error" onClick={() => deleteTask(task)}/>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open = {modalInsert}
        onClose = {openCloseModalInsert}>
        {bodyInsert}
      </Modal>

      <Modal
        open = {modalDelete}
        onClose = {openCloseModalDelete}>
        {bodyDelete}
      </Modal>
    </div>
  )
}
export default App;