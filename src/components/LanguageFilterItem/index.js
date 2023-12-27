// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, filterDetails, updatedFilterLanguage} = props
  const {id, language} = filterDetails
  const buttonClassName = isActive
    ? 'language-name active-language-btn'
    : 'language-name'

  const filterLanguage = () => {
    updatedFilterLanguage(id)
    console.log(id)
  }

  return (
    <li className="list-item">
      <button
        type="button"
        className={`${buttonClassName}`}
        onClick={filterLanguage}
      >
        {' '}
        {language}{' '}
      </button>
    </li>
  )
}

export default LanguageFilterItem
