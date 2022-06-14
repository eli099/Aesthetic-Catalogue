import React, { useState } from 'react'

import axios from 'axios'

// Import bootstrap
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/esm/Button'


const Register = () => {

  // Form data passed by user
  const [ formData, setFormData ] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
  })

  // State to send errors back
  const [ errors, setErrors ] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
  })
  
  // Update the formData
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log('form data ->', formData)
  }

  // Submit formData object with input fields to the register endpoint
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/register/', formData)
      console.log('response ->', response)
    } catch (error) {
      console.log('error ->', error)
      console.log('error response ->', error.response)
      console.log('error response data ->', error.response.data)
      setErrors(error.response.data)
    }
  }

  return (
    <section className="form-page m-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingInput" label="Username">
            <Form.Control name="username" type="username" placeholder="Username" onChange={handleChange} />
            {errors.username && <Form.Text className="text-info">{errors.username}</Form.Text>}
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingInput" label="Email">
            <Form.Control name="email" type="email" placeholder="Email" onChange={handleChange} />
            {errors.email && <Form.Text className="text-info">{errors.email}</Form.Text>}
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingInput" label="First name">
            <Form.Control name="first_name" type="text" placeholder="First name" onChange={handleChange} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingInput" label="Last name">
            <Form.Control name="last_name" type="text" placeholder="Last name" onChange={handleChange} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingInput" label="Password">
            <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingInput" label="Password confirmation">
            <Form.Control name="password_confirmation" type="password" placeholder="Password confirmation" onChange={handleChange} />
          </FloatingLabel>
        </Form.Group>
        <Button type="submit">
          Register
        </Button>
      </Form>
    </section>
  )
}

export default Register