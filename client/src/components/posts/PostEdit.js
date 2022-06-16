import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

// Axios
import axios from 'axios'

// Import get token
import { getPayload, getTokenFromLocalStorage } from '../helpers/auth'

// Bootstrap
import Container from 'react-bootstrap/esm/Container'
import FormGroup from 'react-bootstrap/esm/FormGroup'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/esm/Row'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/esm/Button'


const PostEdit = () => {

  const { id } = useParams()

  const navigate = useNavigate()

  const [categories, setCategories] = useState([])

  const [ post, setPost ] = useState([])

  // Request Catgories
  useEffect(() => {
    const getCat = async () => {
      try {
        const { data } = await axios.get('/api/categories/')
        console.log('category data ->', data)
        setCategories(data)
      } catch (error) {
        console.log('cat error ->', error)
      }
    }
    getCat()
  }, [])

  // User's form data
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    artist: '',
    source: '',
    year: '',
  })

  // Errors
  const [errors, setErrors] = useState({
    image: '',
    title: '',
    description: '',
    artist: '',
    source: '',
    year: '',
    categories: '',
    tags: '',
  })

  // Update the form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log('form data ->', formData)
    setErrors({ ...errors, [e.target.name]: '' })
  }

  // Submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/posts/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log('data ->', data)
      navigate(`/posts/${data.id}`)
    } catch (error) {
      console.log('error ->', error.response.data)
      setErrors(error.response.data)
    }
  }

  const handleTags = (e) => {
    const array = e.target.value.split(',')
    console.log('generated array ->', array)
    formData.tags = array
    setFormData({ ...formData, [e.target.name]: e.target.value, tags: array })
    console.log('form data ->', formData)
  }

  const handleCategories = (e) => {
    const array = []
    console.log('value to int ->', parseInt(e.target.value))
    array.push(parseInt(e.target.value))
    console.log('generated array ->', array)
    formData.categories = array
    setFormData({ ...formData, categories: array })
    console.log('form data ->', formData)
  }

  const handleYear = (e) => {
    console.log('value to int ->', parseInt(e.target.value))
    const value = parseInt(e.target.value)
    formData.year = value
    setFormData({ ...formData, year: value })
    console.log('form data ->', formData)
  }

  useEffect(() => {
    console.log('params ->', id)
    const getPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${id}/`)
        console.log('data ->', data)
        setPost(data)
        setFormData(data)
        console.log('form --->', formData)
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  }, [id])

  // Check the logged in user is the owner
  const userIsOwner = () => {
    const payload = getPayload()
    if (!payload) return
    console.log('payload ->', payload)
    console.log('post owner ->', post.owner)
    return post.owner === payload.sub
  }
  userIsOwner()

  return (
    <Container className="mt-5">
      <Row>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FloatingLabel label="Image" className="mb-3">
              <Form.Control type="text" name="image" value={formData.image} placeholder="Image URL" onChange={handleChange} />
              {errors.image && <Form.Text className="text-info">{errors.image}</Form.Text>}
            </FloatingLabel>
          </FormGroup>
          <FormGroup>
            <FloatingLabel label="Title" className="mb-3">
              <Form.Control type="text" name="title" value={formData.title} placeholder="Title" onChange={handleChange} />
              {errors.title && <Form.Text className="text-info">{errors.title}</Form.Text>}
            </FloatingLabel>
          </FormGroup>
          <FormGroup>
            <FloatingLabel label="Description" className="mb-3">
              <Form.Control as="textarea" rows="3" name="description" value={formData.description} placeholder="Description" onChange={handleChange} />
              {errors.description && <Form.Text className="text-info">{errors.description}</Form.Text>}
            </FloatingLabel>
          </FormGroup>
          <FormGroup>
            <FloatingLabel label="Artist" className="mb-3">
              <Form.Control type="text" name="artist" value={formData.artist} placeholder="Artist" onChange={handleChange} />
              {errors.artist && <Form.Text className="text-info">{errors.artist}</Form.Text>}
            </FloatingLabel>
          </FormGroup>
          <FormGroup>
            <FloatingLabel label="Source" className="mb-3">
              <Form.Control type="text" name="source" value={formData.source} placeholder="Source" onChange={handleChange} />
              {errors.source && <Form.Text className="text-info">{errors.source}</Form.Text>}
            </FloatingLabel>
          </FormGroup>
          <FormGroup>
            <FloatingLabel label="Year" className="mb-3">
              <Form.Control type="text" name="year" value={formData.year} placeholder="Year" onChange={handleYear} />
              {errors.year && <Form.Text className="text-info">{errors.year}</Form.Text>}
            </FloatingLabel>
          </FormGroup>
          <FormGroup>
            <FloatingLabel label="Categories" className="mb-3">
              <Form.Select aria-label="Categories" name="categories" value={formData.categories} onChange={handleCategories} >
                <option>Select Category</option>
                {categories.map((cat) => {
                  const { id, name } = cat
                  return (
                    <option key={id} value={id}>{cat.name}</option>
                  )
                })}
              </Form.Select>
            </FloatingLabel>
            {errors.categories && <Form.Text className="text-info">{errors.categories}</Form.Text>}
          </FormGroup>
          <FormGroup>
            <FloatingLabel label="Tags (comma separated)" className="mb-3">
              <Form.Control type="text" name="tags" value={formData.tags} placeholder="Tags" onChange={handleTags} />
              {errors.tags && <Form.Text className="text-info">{errors.tags}</Form.Text>}
            </FloatingLabel>
          </FormGroup>
          <Button type="submit">
            Publish Changes
          </Button>
        </Form>
      </Row>
    </Container>
  )
}

export default PostEdit