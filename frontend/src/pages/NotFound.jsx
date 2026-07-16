import notFoundImage from '../assets/404-D_FLHmTM.svg'

const NotFound = () => {
  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src={notFoundImage}></img>
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p>Но вы можете перейти <a href="/">на главную страницу</a></p>
    </div>
  )
}

export default NotFound