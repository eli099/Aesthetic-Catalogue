import { useEffect, useState } from 'react'
import axios from 'axios'

// Import Spinner icon
import SpinnerIcon from '../utilities/SpinnerIcon'

// Import Links
import { Link } from 'react-router-dom'

// Import bootstrap components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/esm/Spinner'

const PostIndex = () => {

  const [posts, setPosts] = useState([])

  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/posts/') // * <-- replace with your endpoint
        setPosts(data)
        console.log(data)
      } catch (error) {
        console.log('errors ->', errors)
        setErrors(true)
      }
    }
    getData()
  }, [])

  return (
    <>
      {posts ?
        <Container>
          <Row>
            {posts.map((post) => {
              console.log(post)
              const { id, artist, description, categories, image, source, tags, title, year } = post
              return (
                <Col key={id} md="4" lg="3" className="post border">
                  <Card>
                    <Link to={`/posts/${id}`}>
                      <Card.Img src={image} className="rounded-0" />
                    </Link>
                    <Card.Body className="p-3">
                      <Card.Title>{title}{year ? `(${year})` : <></>}, {artist}</Card.Title>
                      <Card.Text>
                        {description ?
                          <>{description}<br /></>
                          :
                          <></>
                        }

                        {source ?
                          <a href={source} target="_blank" rel="noreferrer">Source</a>
                          :
                          <></>
                        }
                        <br />

                      </Card.Text>
                      {tags ?
                        <>
                          {tags.map((tag, i) => {
                            return (
                              <Link key={i} to={'/posts'}><Badge className="m-1">{tag}</Badge></Link>
                            )
                          })
                          }
                        </>
                        :
                        <></>
                      }
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Container>
        :
        <h5>
          {errors ?
            'Something went wrong! Try again later.'
            :
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>}
        </h5>
      }
    </>
  )
}

export default PostIndex
