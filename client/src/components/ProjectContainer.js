import { useState } from 'react'


import ProjectTextPopUp from './ProjectTextPopUp'
import SwiperContainer from './SwiperContainer'

const ProjectContainer = ({ project }) => {
  const { id, assets, client_name, project_title, project_type, description } = project

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='project__container' key={id}>
        <SwiperContainer assets={assets} />
      <button className={`project__title ${project.id === 0 || project.id === 12 ? 'special black' : ''}`} onClick={toggleOpen}>
        {client_name}
      </button>
      <ProjectTextPopUp isOpen={isOpen} toggleOpen={toggleOpen} clientName={client_name} projectTitle={project_title} description={description} projectType={project_type} />
    </div>
  )
}

export default ProjectContainer
