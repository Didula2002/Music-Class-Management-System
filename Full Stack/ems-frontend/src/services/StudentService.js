import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/student';

export const listStudent = () => axios.get(REST_API_BASE_URL);
export const createStudent = (student) => axios.post(REST_API_BASE_URL, student);

export const getStudent = (studentId) =>axios.get(REST_API_BASE_URL + '/'+ studentId);

export const updateStudent = (studentId, student) => axios.put(REST_API_BASE_URL + '/' + studentId,student)

export const deleteStudent = (studentId) => axios.delete(REST_API_BASE_URL + '/' + studentId)



export const deleteAllStudents = () => axios.delete(REST_API_BASE_URL);


export const resetPaidStatus = () => {

    return axios.get(REST_API_BASE_URL)
        .then(response => {
            const students = response.data;
            
            const updatedStudents = students.map(student => ({ ...student, paymentStatus: false }));

            const promises = updatedStudents.map(updatedStudent =>
                axios.put(REST_API_BASE_URL + '/' + updatedStudent.id, updatedStudent)
            );
            
            return Promise.all(promises);
        });
};
