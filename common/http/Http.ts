import axios from 'axios';

const API = axios.create({
  baseURL: 'http://academico3.rj.senac.br/api/',
});

export { API };
