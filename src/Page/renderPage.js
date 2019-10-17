import React from 'react';
import preloaders from '../images/preloader.gif';
import api from '../api';
import Group from './group';
import Controllers from '../components/contollers';
class RenderPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      indexes: [],
      isSaveProgress: false
    }
  }
  changePage = (e) => {
    let classItem = e.target;
    let page = this.props.page;
    let sendObject = JSON.stringify({
      data: this.props.apiPage.data,
      type: 'section',
      method: 'save',
      page: page
    });
    this.setState({
      isSaveProgress: true
    })
    if (!classItem.classList.contains('back_button')) {
      let response = api.saveData(sendObject);
      response.then((res) => {
        res.errors ? this.props.setRedux({
          isError: true,
          typeError: res.errors
        }) : this.props.setRedux({
          isError: false
        })
        this.setState({
          isSaveProgress: false
        })
        console.log(res)
      })
      .then(() => {
        if (!this.props.isError) {
          classItem.classList.contains('back_button') ? (page -= 1) : (page < 2 ? page += 1 : page = 0);
          api.fetchData(page, () => { this.setState({ isLoad: true }) }).then((res) => {
            this.props.setRedux({ apiPage: res });
            this.setState({ isLoad: false });
            this.props.setRedux({ page });
            this.setState({
              isSaveProgress: false
            })
          })
          api.getClearObject(page);
        }
      })
    }
  }
  render() {
    return (
      <React.Fragment>
        {!this.state.isLoad &&
          <div className="form_page flex_center">
            <h1 className="form__title">Регистрация проектов</h1>
            <div className="form_block">
              {this.props.isError &&
                <span className="error_message">Не все поля заполнены</span>
              }
              {this.props.apiPage.data.map((item, index) => {
                if (item && item.type !== 'hidden') {
                  return (
                    <React.Fragment key={index + 'fragment'} >
                      <Group path={[index]} key={index} indexGroup={index} data={item} />
                      <Controllers fields={item.data} type={item.type} key={item} dataApi={this.props.apiPage} index={index} />
                    </React.Fragment>
                  )
                }
                else {
                  return false;
                }
              })
              }
            </div>
            {this.props.page === 0 && !this.state.isSaveProgress &&
              <div onClick={this.changePage} className="button next_button" variant="contained">
                Далее
              </div>
            }
            {this.props.page === 0 && this.state.isSaveProgress &&
              <img src={preloaders} alt="btn_loader" className="loader_button" />
            }
            {this.props.page === 1 && !this.state.isSaveProgress &&
              <div className="flex mg_top_btns">
                <div onClick={this.changePage} className="button next_button" variant="contained">
                  Далее
                </div>
                <div onClick={this.changePage} className="button left_btn_margin back_button " variant="contained">
                  Назад
                </div>
              </div>
            }
            {this.props.page === 1 && this.state.isSaveProgress &&
              <img src={preloaders} alt="btn_loader" className="loader_button" />
            }
            {this.props.page === 2 && !this.state.isSaveProgress &&
              <div className="flex mg_top_btns">
                <div onClick={this.changePage} className="button next_button" variant="contained">
                  Отправить
             </div>
                <div onClick={this.changePage} className="button left_btn_margin back_button " variant="contained">
                  Назад
             </div>
              </div>
            }
            {this.props.page === 2 && this.state.isSaveProgress &&
              <img src={preloaders} alt="btn_loader" className="loader_button" />
            }
          </div>
        }
        {this.state.isLoad &&
          <div className="flex wrapper_loader">
            <img src={preloaders} alt="preloader" className="preloader" />
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
