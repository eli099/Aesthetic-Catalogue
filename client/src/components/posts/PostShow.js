import { useEffect, useState } from 'react'
import axios from 'axios'

// Import params
import { useParams, Link, useNavigate } from 'react-router-dom'

// Import React Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'
import { getPayload, getTokenFromLocalStorage, userIsAuthenticated } from '../helpers/auth'

const PostShow = () => {

  // Navigate
  const navigate = useNavigate()

  // Parameters from url
  const { id } = useParams()
  console.log('params ->', id)

  // Post state
  const [post, setPost] = useState(false)

  // State to track error
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${id}`)
        console.log('data ->', data)
        setPost(data)
      } catch (error) {
        console.log('error ->', error)
      }
    }
    getPost()
  }, id)

  // Funtion to delete post from database
  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.delete(`/api/posts/${id}/`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log('data ->', data)
      navigate('/posts')
    } catch (error) {
      console.log('error ->', error)
    }
  }

  // Function to edit a post
  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.delete(`/api/posts/${id}/`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log('data ->', data)
      navigate('/posts')
    } catch (error) {
      console.log('error ->', error)
    }
  }

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
    <Container className="border mt-5">
      <Row>
        {post ?
          <>
            <Col md="6">
              <Image fluid="true" src={post.image} />
              {/* <img src={post.image} alt={post.title} /> */}
            </Col>
            <Col md="6" className="p-2">
              <h5>{post.title}({post.year}), {post.artist}</h5>
              <hr />
              {post.description ?
                <p>{post.description}</p>
                :
                <></>
              }

              {post.source ?
                <p><a href={post.source} target="_blank" rel="noreferrer">Source</a><br /></p>
                :
                <></>
              }
              <hr />
              {post.categories ?
                <section>
                  <h6>Category:</h6>
                  {post.categories.map((cat) => {
                    const { id } = cat
                    return (
                      <Link key={id} to={'/posts'}><Badge className="m-1">{cat.name}</Badge></Link>
                    )
                  })
                  }
                </section>
                :
                <></>
              }
              {post.tags ?
                <>
                  <h6>Tags:</h6>
                  {post.tags.map((tag, i) => {
                    return (
                      <Link key={i} to={'/posts'}><Badge className="m-1">{tag}</Badge></Link>
                    )
                  })
                  }
                </>
                :
                <></>
              }
              <hr />
              {userIsOwner() ?
                <p>
                  <Button variant="primary" as={Link} to={`/posts/${id}/edit`}>Edit</Button>
                  <Button variant="secondary" onClick={handleDelete}>Delete</Button>
                </p>
                :
                <>
                </>
              }
              <p><Button variant="secondary" as={Link} to={'/posts/'}>Home</Button></p>

            </Col>
          </>
          :
          <h5>
            {errors ?
              'Something went wrong! Please try again later.'
              :
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>}
          </h5>
        }
      </Row>
    </Container>
  )
}

export default PostShow
