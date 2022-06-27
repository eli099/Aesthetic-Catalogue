import React, { useEffect, useState } from 'react'

// Need user auth to access info on this page
import { getTokenFromLocalStorage, userIsAuthenticated } from './helpers/auth'

import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

// Import React Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/esm/Spinner'
import Card from 'react-bootstrap/Card'


// Import axios
import axios from 'axios'

// Masonry
import Masonry from 'react-masonry-css'


const ProfilePage = () => {

  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)

  // State for posts that user has added
  const [usersPosts, setUsersPosts] = useState([])

  const [errors, setErrors] = useState(false)

  // ! Get profile using localStorage
  // useEffect(() => {k
  //   const getProfile = () => {
  //     if (!userIsAuthenticated) {
  //       navigate('/login')
  //     } else {
  //       const userString = window.localStorage.getItem('aesthetic-user')
  //       setProfile(JSON.parse(userString))
  //       console.log('profile from local storage ->', profile)
  //       console.log('type of ->', typeof (profile))
  //     }
  //   }
  //   getProfile()
  // }, [])

  // ! Get profile with get request
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/prof/', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        console.log('profile ->', data)
        setProfile(data)
      } catch (error) {
        console.log('error ->', error)
      }
    }
    getProfile()
  }, [])

  // Retrieve posts
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/posts/')
        const newArray = []
        // console.log('posts ->', data)
        data.map((post) => {
          if (post.owner === profile.id) {
            newArray.push(post)
          } else {
            return
          }
        })
        setUsersPosts(newArray)
        console.log('userPosts ->', usersPosts)
      } catch (error) {
        console.log('errors ->', errors)
        setErrors(true)
      }
    }
    getData()
  }, [profile])

  // User posts masonry
  const ownedPosts = usersPosts.map((post) => {
    const { id, image, title, artist, categories, tags, year } = post
    return (
      <Card key={id} className="post border rounded-0 shadow">
        <Link to={`/posts/${id}`}>
          <Card.Img src={image} className="rounded-0" />
        </Link>
      </Card>
    )
  })

  // Masonry dimensions
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  }

  return (
    <>
      <Container>

        {/* User information */}
        {profile ?
          <>
            <Row className="mt-5 mb-5">
              <Col lg={{ span: 6, offset: 3 }}>
                <Row>
                  <Col className="" xs={4} md={4} lg={4}>
                    <Card className="p-3 border-0">
                      <Image roundedCircle="true" className="border" src={profile.profile_pic} fluid="true" />
                    </Card>
                  </Col>
                  <Col className="my-auto" xs={8} md={8} lg={8}>
                    <Card className="p-3 border-start rounded-0">
                      <Card.Title className="border-info border-opacity-50">@{profile.username}</Card.Title>
                      <Card.Body>
                        <p><em><span className="border-bottom">{profile.first_name} {profile.last_name}</span></em></p>
                        <Card.Text>
                          {profile.bio}
                        </Card.Text>
                      </Card.Body>

                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mt-2">
              {/* Posts by user and posts favourited by user here */}
              <Col className="border-end">
                <h3 className="p-2 border-bottom">Favourites</h3>
              </Col>
              <Col>
                <h3 className="p-2 border-bottom">Your Posts</h3>
                <Row>
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {ownedPosts}
                  </Masonry>
                </Row>
              </Col>
            </Row>
          </>
          :
          'Need to log in'
        }
      </Container>
    </>
  )
}

export default ProfilePage