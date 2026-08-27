import { Link } from 'react-router-dom'
import notFoundImage from '../assets/404-D_FLHmTM.svg'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <img alt={t('notFoundPage.avatarAlt')} className="img-fluid h-25" src={notFoundImage}></img>
      <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
      <p>{t('notFoundPage.adviceSentence')} <Link to="/">{t('notFoundPage.mainPageLink')}</Link></p>
    </div>
  )
}

export default NotFound