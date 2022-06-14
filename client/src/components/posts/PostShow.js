import { useEffect, useState } from 'react'
import axios from 'axios'

// Import params
import { useParams, Link } from 'react-router-dom'

// Import React Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'

const PostShow = () => {

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

  return (
    <Container className="border">
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
                <p>
                  <h6>Category:</h6>
                  {post.categories.map((cat) => {
                    const { id } = cat
                    return (
                      <Link key={id} to={'/posts'}><Badge className="m-1">{cat.name}</Badge></Link>
                    )
                  })
                  }
                </p>
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
              <p>
                <Button variant="primary">Edit</Button>
                <Button variant="secondary">Delete</Button>
              </p>
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
