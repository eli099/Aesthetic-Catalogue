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

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { userIsAuthenticated } from '../helpers/auth'

const PostIndex = () => {

  const [posts, setPosts] = useState([])

  const [errors, setErrors] = useState(false)

  const [filters, setFilters] = useState({
    searchTerm: '',
  })

  // Dropdowns states
  const [artists, setArtists] = useState([])

  const [categories, setCategories] = useState([])

  // Filtered posts
  const [filteredPosts, setFilteredPosts] = useState([])


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/posts/') // * <-- replace with your endpoint
        setPosts(data)
        console.log('data categories ->', data.categories[0])
      } catch (error) {
        console.log('errors ->', errors)
        setErrors(true)
      }
    }
    getData()
  }, [])

  // handle change for search and filter
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setFilters({ ...filters, [e.target.name]: e.target.value })
    console.log('filters list ->', filters)
  }

  // useEffect to filter art & add to
  useEffect(() => {
    if (posts.length) {
      const regexSearch = new RegExp(filters.searchTerm, 'i')
      console.log(regexSearch)
      const filtered = posts.filter(post => {
        return (regexSearch.test(post.title) || regexSearch.test(post.artist) || regexSearch.test(post.description))
      })
      setFilteredPosts(filtered)
      console.log('filtered posts ->', filteredPosts)
    }
  }, [filters, posts])

  // // populate dropdowns
  // useEffect(() => {

  //   // To populate Artist dropdown
  //   if (posts.length) {
  //     const artistList = []
  //     posts.forEach(art => artistList.includes(art.artist) ? '' : artistList.push(art.artist))
  //     // console.log('artist list ->',artistList )
  //     setArtists(artistList)
  //     // console.log('dropdown artists list ->',artistList )

  //   }
  //   // console.log('artists ->', artists)
  // }, [posts])

  return (
    <>
      <Container className="mt-5 search">
        {/* Filter dropdown and Searchbar */}
        <Form className="border p-3 shadow-sm">
          <Row>
            <Col lg="8">
              <Form.Group className="">
                <FormControl type="search" name="searchTerm" value={filters.searchTerm} placeholder="Search..." onChange={handleChange} />
              </Form.Group>
            </Col>
            {/* Dropdown one */}
            <Col lg="4">
              <Form.Group className="">
                <Form.Select name="artist" value={filters.categories} aria-label="artist select" onChange={handleChange}>
                  <option value="all">All</option>
                  {artists.map((artist) => {
                    // console.log('test', artist)
                    return <option value={artist} key={artist}>{artist}</option>
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
      {posts ?
        <Container className="mt-5">
          <Row>
            {filteredPosts.map((post) => {
              console.log(post)
              const { id, artist, description, categories, image, source, tags, title, year } = post
              return (
                <Col key={id} md="4" lg="3" className="post border">
                  <Card className="rounded-0">
                    <Link to={`/posts/${id}`}>
                      <Card.Img src={image} className="rounded-0" />
                    </Link>
                    <Card.Body className="p-3">
                      <Card.Title className="fs-6">{title}{year ? `(${year})` : <></>}, {artist}</Card.Title>
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
                      {categories.length ?
                        <>
                          {categories.map((cat) => {
                            const { id, name } = cat
                            return (
                              <>
                                <Link key={id} to={'/posts'}><Badge bg="primary" className="m-1">{cat.name}</Badge></Link><br />
                              </>
                            )
                          })}

                        </>
                        :
                        <></>
                      }
                      <hr className="border-success m-1" />
                      {tags ?
                        <>
                          {tags.map((tag, i) => {
                            return (
                              <>
                                <Link key={i} to={'/posts'}><Badge bg="secondary" className="m-1">{tag}</Badge></Link>
                              </>
                            )
                          })}
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
