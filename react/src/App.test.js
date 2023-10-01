import axios from 'axios';

// Crea una instancia mockada de Axios
const mockAxios = jest.createMockFromModule('axios');

const baseUrl = "http://localhost:8080/user";

// Configura la respuesta simulada para una solicitud GET
const usersRows =[
  {id:3, name:"Vladimir Tagle Gonzalez", email:"vladitg@gmail.com", password:"1234vlad"}
];

const users = usersRows;

// Realiza una prueba utilizando Axios
test('Ejemplo de prueba Axios', async () => {
    const response = await axios.get(baseUrl);
    console.log(response.data);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(users);
    console.log('Listado de Usuarios');
    console.log(response.data);
});