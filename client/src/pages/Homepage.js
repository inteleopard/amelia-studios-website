import { useState, useEffect } from 'react'
import axios from 'axios'
import LazyLoad from "react-lazy-load";

import LoadingPage from './LoadingPage'
import Header from '../components/Header'
import ProjectContainer from '../components/ProjectContainer'


const Homepage = () => {

  // Set state: to access the projects selected to be on the homepage. The 'filter' method is used on the 'data' array to create a new array under 'filteredData', containing only the objects where the 'on_homepage' field value is '0'.
  const [currentProjects, setCurrentProjects] = useState([]) // This filtered array is then set as the value of 'currentProjects'.

  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(true)


  const DATA = [
    {
        "id": 1,
        "on_homepage": "0",
        "category_type": "3",
        "client_name": "The 1975",
        "project_title": "Being Funny in a Foreign Language",
        "project_type": "Creative Production",
        "description": "Production for album artwork and campaign imagery",
        "assets": [
            {
                "url": "https://static.vecteezy.com/system/resources/previews/009/667/949/original/rose-flower-bouquet-watercolor-for-valentine-free-png.png",
                "description": "The 1975 Photos 1"
            },
            {
                "url": "https://img.freepik.com/free-photo/close-up-delicate-pink-flower_23-2147623042.jpg?w=360",
                "description": "The 1975 Photos 2"
            },
            {
                "url": "https://store-images.s-microsoft.com/image/apps.15216.13510798887177572.50106407-be76-4eb4-92bb-11aa872bf4ee.c6c11702-97bf-421b-b64a-7dd58bc7a827",
                "description": "The 1975 Photos 3"
            },
            {
                "url": "https://media.istockphoto.com/id/1394440950/photo/natural-view-cosmos-filed-and-sunset-on-garden-background.jpg?b=1&s=170667a&w=0&k=20&c=kaVmrvvzBDZO5HdAoTP6jLNFSqx2ocPx66ySjF_j0OE=",
                "description": "The 1975 Photos 4"
            },
            {
                "url": "https://media.gettyimages.com/id/1295797184/photo/colorful-meadow.jpg?s=612x612&w=gi&k=20&c=-KPu77dlrnz5xLT3gG54NoBtxG0MxGsfyMJ3k5Rmhi8=",
                "description": "The 1975 Photos 5"
            },
            {
                "url": "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?cs=srgb&dl=pexels-pixabay-56866.jpg&fm=jpg",
                "description": "The 1975 Zine"
            },
            {
                "url": "https://cdn.pixabay.com/photo/2020/06/08/06/59/rose-5273370_1280.jpg",
                "description": "The 1975 Album Packaging"
            }
        ]
    },
    {
        "id": 2,
        "on_homepage": "0",
        "category_type": "3",
        "client_name": "Lewis Capaldi",
        "project_title": "Broken by Desire to Be Heavenly Sent",
        "project_type": "Creative Direction",
        "description": "Creative direction + production for album artwork and campaign imagery",
        "assets": [
            {
                "url": "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?cs=srgb&dl=pexels-jane-doan-1132047.jpg&fm=jpg",
                "description": "Lewis Capaldi Album Artwork 1"
            },
            {
                "url": "https://cdn.pixabay.com/photo/2013/01/08/01/43/kiwi-74363_960_720.jpg",
                "description": "Lewis Capaldi Album Artwork 2"
            },
            {
                "url": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
                "description": "Lewis Capaldi Album Artwork "
            },
            {
                "url": "https://media.istockphoto.com/id/153562656/photo/kiwi-or-lemon.jpg?s=612x612&w=0&k=20&c=OgfyaBuDaP7HwEIIB5OsAPkGZ3_AyxlJ4rzU2SUIo7k=",
                "description": "Lewis Capaldi Album Packaging "
            },
            {
                "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVKoSC1Id8BPASwJMPyNujD65ZEobITQSDYg&usqp=CAU",
                "description": "Lewis Capaldi Album Live Sessions "
            }
        ]
    },
    {
        "id": 3,
        "on_homepage": "0",
        "category_type": "3",
        "client_name": "Spotify",
        "project_title": "Our Generation playlist",
        "project_type": "Pop up",
        "description": "Pop up event",
        "assets": [
            {
                "url": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
                "description": "Spotify x Our Generation Poster"
            }
        ]
    },
    {
        "id": 4,
        "on_homepage": "0",
        "category_type": "3",
        "client_name": "Sam Smith",
        "project_title": "Gloria Tour",
        "project_type": "Video Production",
        "description": "Production for tour trailer",
        "assets": [
            {
                "url": "https://vimeo.com/817237668",
                "description": "Sam Smith Gloria Tour Trailer Video"
            }
        ]
    },
  ];

  const fetchData = async () => {
    try {
      // const { data } = await axios.get('/api/projects/')
      let data = DATA;
      console.log(data)
      const filteredData = data.filter((project) => project.on_homepage === '0')
      setCurrentProjects(filteredData)
      console.log(filteredData)
      setLoading(false);
    } catch (err) {
      setErrors(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData()
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])


  

  return (
    <main>
      <Header />
      {loading ?
        <LoadingPage />
        :
        errors ?
          <span>Sorry, we had trouble fetching the data! Please try again later.</span>
          :
          <div className='project__wrapper'>
            <LazyLoad>
              <div>
                {currentProjects.map(project => (
                  <ProjectContainer key={project.id} project={project} />
                ))}
              </div>
            </LazyLoad>
          </div>
      }
    </main>
  )
}

export default Homepage


// const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true) // Set to be true when fetching data begins
  //       const { data } = await axios.get('/api/projects/')
  //       console.log(data)
  //       const filteredData = data.filter((project) => project.on_homepage === '0') // '0' being the value: 'yes, show on homepage' (whilst '1' is no)
  //       console.log(filteredData)
  //       setCurrentProjects(filteredData)
  //       setLoading(false) // Set to false when fetching data has been fetched
  //     } catch (err) {
  //       console.log(err)
  //       setErrors(true)
  //       // setLoading(false)
  //     }
  //   }
  //   fetchData()
  // }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // })





// Infinite Scrolling: 
// import InfiniteScroll from 'react-infinite-scroll-component'

// const Homepage = () => {

//   // Set state: to access the projects selected to be on the homepage. The 'filter' method is used on the 'data' array to create a new array under 'filteredData', containing only the objects where the 'on_homepage' field value is '0'.
//   const [currentProjects, setCurrentProjects] = useState([]) // This filtered array is then set as the value of 'currentProjects'.

//   const [errors, setErrors] = useState(false)
//   const [loading, setLoading] = useState(true)

//   // const [page, setPage] = useState(1); // Track the current page number
//   const [hasMore, setHasMore] = useState(true); // Track whether there are more projects to load


//   const fetchData = async () => {
//     try {
//       const { data } = await axios.get('/api/projects/')
//       console.log(data)
//       const filteredData = data.filter((project) => project.on_homepage === '0')
//       setCurrentProjects(filteredData.slice(0,3))
//       console.log(filteredData)
//       if (filteredData.length <= 3) {
//         setHasMore(false); // No more projects to load
//       }
//       setLoading(false);
//     } catch (err) {
//       setErrors(true);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchData()
//       setLoading(false)
//     }, 3000)
//     return () => clearTimeout(timer)
//   }, [])


//   const fetchMoreData = () => {
//     const remainingProjects = currentProjects.slice(3); // Get the projects starting from the fourth one
//     if (remainingProjects.length > 0) {
//       setCurrentProjects((prevProjects) => [...prevProjects, ...remainingProjects]);
//     }
//     setHasMore(remainingProjects.length > 0); // Update hasMore based on whether there are more projects to load
//   };

  

//   return (
//     <main>
//       <Header />
//       {loading ?
//         <LoadingPage />
//         :
//         errors ?
//           <span>Sorry, we had trouble fetching the data! Please try again later.</span>
//           :
//           <div className='project__wrapper'>
//             <InfiniteScroll
//               dataLength={currentProjects.length}
//               next={fetchMoreData}
//               hasMore={hasMore}
//               loader={<h4>Loading...</h4>}
//               scrollThreshold={0.9} // Adjust the threshold value as desired
//               endMessage={<p>All projects have been loaded.</p>}
//             >
//               {currentProjects.map(project => (
//                 <ProjectContainer key={project.id} project={project} />
//               ))}
//             </InfiniteScroll>
//           </div>
//       }
//     </main>
//   )
// }

// export default Homepage



