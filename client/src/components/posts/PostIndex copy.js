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

// Masonry
import Masonry from 'react-masonry-css'

const Test = () => {

  const [posts, setPosts] = useState([])

  const [errors, setErrors] = useState(false)

  const [filters, setFilters] = useState({
    searchTerm: '',
    categories: 'All',
  })

  // Dropdowns states
  // const [artists, setArtists] = useState([])

  const [categories, setCategories] = useState([])

  // Filtered posts
  const [filteredPosts, setFilteredPosts] = useState([])


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/posts/')
        setPosts(data)
        console.log(data)
      } catch (error) {
        console.log('errors ->', errors)
        setErrors(true)
      }
    }
    getData()
  }, [])

  // useEffect that creates dropdown options
  useEffect(() => {
    if (posts.length) {
      const categoriesList = []
      const finalList = []
      // posts.categories.forEach((post) => categoriesList.includes(post.name) ? '' : categoriesList.push(post.name))
      console.log('posts.categories', posts.forEach((post) => {
        categoriesList.push(post.categories[0])
        // console.log('one post category ->', post.categories)
      }))
      console.log('categories list ->', categoriesList)
      categoriesList.forEach((cat) => finalList.includes(cat.name) ? '' : finalList.push(cat.name))
      console.log('final list --->', finalList)
      setCategories(finalList)
    }
  }, [posts])

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
        return (regexSearch.test(post.title) || regexSearch.test(post.artist) || regexSearch.test(post.description) && (post.categories === filters.categories || filters.categories === 'All'))
      })
      setFilteredPosts(filtered)
      console.log('filtered posts ->', filteredPosts)
    }
  }, [filters, posts])

  // Masonry content
  const items = filteredPosts.map((post) => {
    console.log(post)
    const { id, artist, description, categories, image, source, tags, title, year } = post
    return (

      <Card key={id} className="post border rounded-0 shadow">
        <Link to={`/posts/${id}`}>
          <Card.Img src={image} className="rounded-0" />
        </Link>
        <Card.Body className="p-3">

          <Card.Title className="fw-normal text-muted">
            {title} {year ? `(${year})` : <></>}
            <span className="border-start border-success border-opacity-50 ps-2 ms-2 text-muted">{artist}</span><br />
          </Card.Title>

          <Card.Text>
            {categories.length ?
              <>
                {categories.map((cat) => {
                  const { id, name } = cat
                  return (
                    <>
                      <Link key={id} to={'/posts'}><Badge bg="primary" className="m-1 bg-opacity-75">{cat.name}</Badge></Link><br />
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
                    <Link key={i} to={'/'}><Badge pill bg="secondary" className="m-1 fw-light bg-opacity-75">{tag}</Badge></Link>
                  )
                })
                }
              </>
              :
              <></>
            }
          </Card.Text>
        </Card.Body>
      </Card>

    )
  })

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  return (
    <>
      <Container className="mt-5 search">
        {/* Filter dropdown and Searchbar */}
        <Form className="border ps-4 pe-4 pt-2 pb-2 shadow-sm">
          <Row>
            <Col lg="8" className="p-1">
              <Form.Group className="">
                <FormControl type="search" name="searchTerm" value={filters.searchTerm} placeholder="Search..." onChange={handleChange} />
              </Form.Group>
            </Col>
            {/* Dropdown one */}
            <Col lg="4" className="p-1">
              <Form.Group className="">

                <Form.Select name="artist" value={filters.categories} aria-label="categories select" onChange={handleChange}>
                  <option value="all">All</option>
                  {categories.map((cat, i) => {
                    console.log('test', cat)
                    return (
                      <option value={cat} key={i}>{cat}</option>
                    )
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
      {posts ?
        <Container className="mt-5">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {items}
          </Masonry>
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

export default Test
