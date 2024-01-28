import axios from 'axios'

export const serverIP = "http://localhost:5000"

export const ApiService = axios.create({baseURL: serverIP})


