function Footer() {
  return (
    <div className="bg-dark text-light p-5">
      <div className="container-xxl">
        <div className="row">
          <div className="col">
            <div className="p-5 footer-element">
              CryptoAcademy logo</div>
          </div>
          <div className="col">
            <div className="p-5 footer-element">
              <a className="link" href="https://www.github.com/tigeryant" >
                <i className="bi bi-github" id="github-logo"></i>
              </a>
            </div>
          </div>
          <div className="col">
            <div className="p-5 footer-element">
              <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} />2022 John Davies
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer