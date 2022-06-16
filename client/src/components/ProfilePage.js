import React, { useEffect, useState } from 'react'

// Need user auth to access info on this page
import { getTokenFromLocalStorage, userIsAuthenticated } from './helpers/auth'

import { useNavigate } from 'react-router-dom'

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


const ProfilePage = () => {

  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)

  // ! Get profile using localStorage
  // useEffect(() => {
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
        console.log('data ->', data)
        setProfile(data)
      } catch (error) {
        console.log('error ->', error)
      }
    }
    getProfile()
  }, [])

  return (
    <>
      <Container>

        {/* User information */}
        {profile ?
          <>
            <Row className="border">
              <Col className="border" lg="3">
                <Card className="m-3 p-3">
                  <Image roundedCircle="true" src={profile.profile_pic} fluid="true" />
                </Card>
              </Col>
              <Col className="border my-auto" lg="9">
                <Card className="m-3 p-3">
                  <h5>@{profile.username}</h5>
                  <p><strong><em>{profile.first_name} {profile.last_name}</em></strong></p>
                  <p>{profile.bio}</p>
                </Card>
              </Col>
            </Row>
            <Row className="border mt-2">
              {/* Posts by user and posts favourited by user here */}
              <Col className="border-end">
                <p>TEST</p>
              </Col>
              <Col>
                <p>TEST</p>
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