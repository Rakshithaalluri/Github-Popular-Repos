// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    avatarUrl,
    forksCount,
    name,
    issuesCount,
    starsCount,
  } = repositoryDetails

  return (
    <li className="repository-item">
      <img src={avatarUrl} className="avatar-repo" alt={name} />
      <h1 className="repo-name"> {name} </h1>
      <div className="repos-counters">
        <div className="repo-counting">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="repo-star"
          />
          <p className="star-count"> {starsCount} stars </p>
        </div>
        <div className="repo-counting">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="repo-star"
          />
          <p className="star-count"> {forksCount} forks </p>
        </div>
        <div className="repo-counting">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="repo-star"
          />
          <p className="star-count"> {issuesCount} open issues </p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
