import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    isLoading: false,
    apiStatus: apiStatusConstants.initial,
    activeFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositoryList()
  }

  getRepositoryList = async () => {
    const {activeFilterId} = this.state
    this.setState({
      isLoading: true,
      activeFilterId,
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`,
    )
    if (response.ok === true) {
      const responseData = await response.json()
      console.log(responseData)
      const updatedRepository = responseData.popular_repos.map(repository => ({
        avatarUrl: repository.avatar_url,
        forksCount: repository.forks_count,
        id: repository.id,
        issuesCount: repository.issues_count,
        name: repository.name,
        starsCount: repository.stars_count,
      }))
      this.setState({
        repositoryList: updatedRepository,
        apiStatus: apiStatusConstants.success,
        isLoading: false,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updatedFilterLanguage = activeFilterLanguage => {
    this.setState(
      {activeFilterId: activeFilterLanguage},
      this.getRepositoryList,
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositoryList = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repository-items-container">
        {repositoryList.map(eachRepo => (
          <RepositoryItem repositoryDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.progress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderCommonList = () => {
    const {activeFilterId} = this.state
    return (
      <ul className="filter-list-container">
        {languageFiltersData.map(eachFilter => (
          <LanguageFilterItem
            filterDetails={eachFilter}
            key={eachFilter.id}
            isActive={eachFilter.id === activeFilterId}
            updatedFilterLanguage={this.updatedFilterLanguage}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="github-repos-container">
        <h1 className="popular-heading"> Popular </h1>
        {this.renderCommonList()}
        {isLoading ? this.renderLoader() : this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
