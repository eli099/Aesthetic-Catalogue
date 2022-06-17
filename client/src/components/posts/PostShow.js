import { useEffect, useState } from 'react'
import axios from 'axios'

import camelize from 'camelize'

// Import params
import { useParams, Link, useNavigate } from 'react-router-dom'

// Import React Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/esm/Spinner'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'

// Auth
import { getPayload, getTokenFromLocalStorage, userIsAuthenticated } from '../helpers/auth'

const PostShow = () => {

  // Navigate
  const navigate = useNavigate()

  // Parameters from url
  const { id } = useParams()
  console.log('params ->', id)

  // Post state
  const [post, setPost] = useState(false)

  // State to track comments
  // const [comments, setComments] = useState([])

  // State to track error
  const [errors, setErrors] = useState(false)

  const [ checkComment, setCheckComment ] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${id}`)
        const camelData = camelize(data)
        console.log('camel data ->', camelData)

        setPost(camelData)
      } catch (error) {
        console.log('error ->', error)
      }
    }
    getPost()
  }, [id, checkComment])

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

  // // Function to edit a post
  // const handleDelete = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const { data } = await axios.delete(`/api/posts/${id}/`, {
  //       headers: {
  //         Authorization: `Bearer ${getTokenFromLocalStorage()}`,
  //       },
  //     })
  //     console.log('data ->', data)
  //     navigate('/posts')
  //   } catch (error) {
  //     console.log('error ->', error)
  //   }
  // }

  // Check the logged in user is the owner
  const userIsOwner = () => {
    const payload = getPayload()
    if (!payload) return
    console.log('payload ->', payload)
    console.log('post owner ->', post.owner)
    return post.owner === payload.sub
  }
  userIsOwner()

  const [commentData, setCommentData] = useState({
    text: '',
    post: `${id}`,
  })

  

  // Update comment formdata
  const handleChange = (e) => {
    setCommentData({ ...commentData, text: e.target.value })
    console.log('comment data ->', commentData)
  }

  // Function to add comments to post
  const handleComment = async (e) => {
    setCheckComment(false)
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/comments/', commentData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log('comment request data ->', data)
      setCheckComment(true)
      // location.reload()
      // navigate(`/posts/${id}/`)
    } catch (error) {
      console.log('error ->', error.response)
    }
  }

  // get payload sub
  const getSub = () => {
    const payload = getPayload()
    if (!payload) return
    console.log('payload ->', payload)
    return post.owner === payload.sub
  }

  // console.log('sub --->', getPayload().sub)

  const handleCommentDelete = async (commentId) => {

    // console.log('commentId ->', commentId)
    setCheckComment(false)

    try {
      const { data } = await axios.delete(`/api/comments/${commentId}/`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log('comment request data ->', data)
      setCheckComment(true)
    } catch (error) {
      console.log('error ->', error.response)
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        {post ?
          <>
            <Col md="6" className="">
              <Image className="border-info shadow p-4" fluid="true" src={post.image} />
              {/* <img src={post.image} alt={post.title} /> */}
            </Col>
            <Col md="6" className="p-0 border-none">
              <Card className="border p-4 mb-3 rounded-0">
                <h5>{post.title}({post.year})</h5>
                {post.artist}<br />
                <hr />
                {post.description ?
                  <p>{post.description}</p>
                  :
                  <></>
                }

                {post.source ?
                  <ButtonGroup>
                    <Badge className="badge rounded-pill text-bg-success border bg-white"><a href={post.source} target="_blank" rel="noreferrer">Source</a><br /></Badge>
                  </ButtonGroup>
                  :
                  <></>
                }
              </Card>
              <Card className="border p-4 mb-3 rounded-0">

                <Row>
                  {post.categories ?
                    <Col className="p-2">
                      <Card className="border">
                        <Card.Body>
                          <Card.Title>Category</Card.Title>
                          {post.categories.map((cat) => {
                            const { id } = cat
                            return (
                              <Link key={id} to={'/posts'}><Badge className="m-1">{cat.name}</Badge></Link>
                            )
                          })
                          }
                        </Card.Body>
                      </Card>
                    </Col>
                    :
                    <></>
                  }
                  {post.tags ?
                    <Col className="p-2">
                      <Card className="border">
                        <Card.Body>
                          <Card.Title>Tags</Card.Title>
                          {post.tags.map((tag, i) => {
                            return (
                              <Link key={i} to={'/posts'}><Badge className="m-1">{tag}</Badge></Link>
                            )
                          })
                          }
                        </Card.Body>
                      </Card>
                    </Col>
                    :
                    <></>
                  }
                </Row>
                <hr />
                {userIsOwner() ?
                  <Container>
                    <ButtonGroup>
                      <Button className="m-1" variant="primary" as={Link} to={`/posts/${id}/edit`}>Edit</Button>
                      <Button className="m-1" variant="secondary" onClick={handleDelete}>Delete</Button>
                    </ButtonGroup>
                    <Button className="m-1 rounded-0 ms-4 bg-white btn-outline-secondary" as={Link} to={'/'}>Back To Index</Button>
                  </Container>
                  :
                  <>
                    <Container>
                      <ButtonGroup>
                        <Button className="m-1 rounded-0 ms-4 bg-white btn-outline-secondary" as={Link} to={'/'}>Back To Index</Button>
                      </ButtonGroup>
                    </Container>
                  </>
                }

              </Card>
              <Card className="border p-4 mb-3 rounded-0">
                {/* Comments */}
                <h5 className="comments-title"><span className="bg-secondary bg-opacity-25">Comments</span></h5>

                {post.comments.map((item, i) => {
                  const sub = getPayload().sub
                  const time = new Date(item.createdAt)
                  const { id, text, owner } = item
                  return (
                    <Card key={i} className="comments mt-2 mb-4 rounded-0 shadow-sm">
                      <Card.Header>
                        <ButtonGroup>
                          <span className="pe-2 ps-2 border-end bg-info bg-opacity-10">@</span> <span className="pe-2 ps-2 border border-start-0 rounded-end fs-6">{owner.username}</span>
                        </ButtonGroup>
                        {/* <span className="pe-2 ps-2 fw-lighter fs-6">at</span> */}
                        <ButtonGroup>
                          <span className="badge bg-none text-muted fs-6 fw-lighter border border-1 p-1 ms-2">{time.toUTCString()}</span>
                        </ButtonGroup>
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>
                          {text}
                        </Card.Text>
                      </Card.Body>
                      {sub === owner.id ?
                        <Card.Footer className="p-1 bg-white">
                          <Badge onClick={() => handleCommentDelete(id)} className="delete-comment bg-danger text-muted border-0 bg-opacity-50 float-end">Delete</Badge>
                        </Card.Footer>
                        :
                        <></>
                      }
                    </Card>
                  )
                })}
                {/* Add comment */}
                <Card className="comments m-2 rounded-0 shadow-sm p-1">
                  <Form className="m-1 rounded-0 pe-1" onSubmit={handleComment}>
                    <Form.Group>
                      <Form.Control className="m-1 rounded-0 p-1" as="textarea" rows={3} value={commentData.text} onChange={handleChange} />
                    </Form.Group>
                    <Button type="submit" className="bg-opacity-50 bg-info border-0 rounded-1 ms-1 m-2">Post</Button>
                  </Form>
                </Card>
              </Card>
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
      </Row >
    </Container >
  )
}

export default PostShow
