import React from 'react';
import * as yup from 'yup'
import { useState, useEffect } from 'react'
import axios from 'axios';

const schema = yup.object().shape({
    name: yup.string().required('name is required'),
    email: yup.string().required('email is required'),
    password: yup.string().required('pssword is required'),
    agree: yup.boolean().oneOf([true], 'must accept the terms of service')
})

export default function Form (props) {
    const { form, setForm } = useState({ name: '', email: '', password: '', agree: false, button: '' })
    const { errors, setErrors } = useState({ name: '', email: '', password: '', agree: '', button: '' })
    const { disabled, setDisabled } = useState(true)

    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
        .then(() => setErrors({ ...errors, [name]: errors.errors[0] }))
    }

    const change = event => {
        const { checked, value, name, type } = event.target
        const valueToUse = type === 'checkbox' ? checked: value
        setFormErrors(name, valueToUse)
        setForm({ ...form, [name]: valueToUse })
    }

    const submit = event => {
        event.preventDefault()
        const newUser = { name: form.name.trim(), email: form.email, password: form.password, agree: form.agree, button: form.button }
        axios.post('https://reqres.in/api.users', newUser)
        .then(res => {
            setForm({ name: '', email: '', password: '', agree: false, button: '' })
        })
        .catch(err => {
            console.log('invalid ENTRY')
        })
    }

    useEffect(() => {
        schema.isValid(form).then(valid => setDisabled(!valid))
    }, [form])
    
    return (
        <div className = 'Form'>
            <div style ={{color: 'red'}}>
                <div>{errors.name}</div><div>{errors.email}</div><div>{errors.password}</div><div>{errors.agree}</div>
            </div>
            <form onSubmit = {submit}> 
              <label>Name 
                  <input onChange ={change} value={form.name} name ='name' type ='text' />
              </label>

              <label>Email
                  <input onChange ={change}  value={form.email} name ='email' type ='text'/>

              </label>

              <label>Password
              <input onChange ={change}  value={form.password} name ='password' type ='text'/>

              </label>

              <label>Terms of Service(TOS)
              <input onChange ={change}  value={form.agree} name ='agree' type ='text'/>

              </label>
              <button disabled ={disabled}>Submit</button>
            </form>
        </div>
    )

}