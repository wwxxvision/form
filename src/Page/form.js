import React from 'react';
import RenderPage from './renderPage';
import preloaders from '../images/preloader.gif';
import api from '../api';

class Form extends React.Component {
  componentDidMount() {
    api.fetchData(this.props.page).then((res) => {
      this.props.setRedux({ apiPage: res, empty: res });
    });
    api.getClearObject(this.props.page);
  }
  render() {
    if (!this.props.apiPage.status) {
      return (
        <div className="wrapper">
          <div className="flex wrapper_loader">
            <img src={!api.preloaderUrl ? preloaders : api.preloaderUrl} alt="preloader" className="preloader" />
            {this.props.apiPage.error &&
              <>
                <p className="preloader_text">Ошибка на сервере</p>
                <p className="preloader_text">{this.props.apiPage.error}</p>
              </>
            }
          </div>
        </div>
      )
    }
    else {
      return (
        <section className="form_page_wrapper full_screen flex_center">
          <RenderPage />
        </section>
      )
    }
  }
}
export default api.connect(Form);
