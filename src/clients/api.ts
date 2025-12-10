import axios from 'axios'


export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzFjZGVhOTJhMjFhOTUyNDlmNjY5YSIsInVzZXJuYW1lIjoic3RlcGgiLCJlbWFpbCI6InN0ZXBoQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzY1NDAzMzI1LCJleHAiOjE3NjU0ODk3MjV9.eM3rv3jISxfsSMA6F3RFiGRtj3kBNexEoQzvn1zM8eI'
    }
});