import axios from 'axios'


export const apiClient = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzFjZGVhOTJhMjFhOTUyNDlmNjY5YSIsInVzZXJuYW1lIjoic3RlcGgiLCJlbWFpbCI6InN0ZXBoQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzY0OTU2MjkyLCJleHAiOjE3NjQ5NjM0OTJ9.CVqExvmd16H1HdCBvxfpWR99psVcRmIWjVMrzYjkOm0'
    }
});