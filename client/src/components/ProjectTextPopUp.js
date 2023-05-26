
const ProjectTextPopUp = ({ isOpen, toggleOpen, clientName, projectTitle, description, projectType }) => {

  return (
    <div className={isOpen ? 'open project__info-container' : 'project__info-container'}>
      <button className="project__close" onClick={toggleOpen}></button>
      <h2>{clientName}</h2>
      <h3>{projectTitle}</h3>
      <p>{projectType}: {description}</p>
      <p></p>
    </div>
  )
}

export default ProjectTextPopUp