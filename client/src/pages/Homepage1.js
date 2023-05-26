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




  const fetchData = async () => {
    try {
      const { data } = await axios.get('/api/projects/')
      console.log('asdgads');
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



