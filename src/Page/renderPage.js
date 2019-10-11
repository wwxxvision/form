import React from 'react';
import preloaders from '../images/preloader.gif';
import api from '../api';
import Group from './group';


class RenderPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      indexes: []
    }
  }
  changePage = (e) => {
    let page = this.props.page;
    e.target.classList.contains('back_button') ? (page -= 1) : (page += 1);
    api.fetchData(page, () => { this.setState({ isLoad: true }) }).then((res) => {
      this.props.setRedux({ apiPage: res });
      this.setState({ isLoad: false });
      this.props.setRedux({ page });
    })
  }
  render() {
    return (
      <React.Fragment>
        {!this.state.isLoad &&
          <div className="form_page flex_center">
            <h1 className="form__title">Регистрация проектов</h1>
            <div className="form_block">
              {this.props.apiPage.data.map((item, index) => (<Group path={[index]} key={index} indexGroup={index} data={item} />))}
            </div>
            {this.props.page === 0 &&
              <div onClick={this.changePage} className="button next_button" variant="contained">
                Далее
            </div>
            }
            {this.props.page === 1 &&
              <div className="flex mg_top_btns">
                <div onClick={this.changePage} className="button next_button" variant="contained">
                  Далее
                </div>
                <div onClick={this.changePage} className="button left_btn_margin back_button " variant="contained">
                  Назад
                </div>
              </div>
            }
            {this.props.page === 2 &&
              <div onClick={this.changePage} className="button back_button" variant="contained">
                Назад
              </div>
            }
          </div>
        }
        {this.state.isLoad &&
          <div className="flex wrapper_loader">
            <img src={preloaders} alt="preloader" className="preloader" />
            {!this.props.apiPage.error &&
              <>
                <p className="preloader_text">Загрузка</p>
              </>}
            {this.props.apiPage.error &&
              <>
                <p className="preloader_text">Ошибка на сервере</p>
                <p className="preloader_text">{this.props.apiPage.error}</p>
              </>
            }
          </div>
        }
      </React.Fragment>
    )
  }
}
export default api.connect(RenderPages);
