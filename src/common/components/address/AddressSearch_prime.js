import React, {SyntheticEvent, Component } from 'react';
import PropTypes from 'prop-types';
import '@vaadin/vaadin-button';
import AutoComplete from '../autocomplete/AutoComplete';

import config from '../../../config';

let getSearchValue;

const url = `${config.commonService}/juso/list/`;
let selectedSuggestion = null;
class AddressSearch_prime extends Component {
  static propTypes = {    
    onComplete: PropTypes.func,
    onSearchClick: PropTypes.func,
    btnClassName: PropTypes.string,
  }
 
  static defaultProps = {
    btnClassName: 'button-address-search',
  }
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      selected: false
    };
  }
//선택대상 목록을 표출하는 형태 정의 하나의 아이템이 여러줄로 나오는 형태로 변경 가능함
renderSuggestion(suggestion) {
  return (
    <div>지번명 : {suggestion.jibunAddr} <br/>
         도로명 : {suggestion.roadAddr} </div>
  );
}
  onSearchClick = async (selectedSuggestion) => { 
    const { onSearchClick } = this.props;
    if (getSearchValue !== undefined && getSearchValue.length === 1) {
      const {onComplete} = this.props;
      onComplete(getSearchValue[0]);
      getSearchValue = undefined;
      return;  
    }
    onSearchClick && onSearchClick();
  }
  onComplete  = async (selectedSuggestion) => {  
    console.log("onComplete Called"); 
    this.setState({selected: true})
  }
  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    console.log(value);
    const inputValue = value.trim().toLowerCase();
    //2글자 이상 입력해야 검색하기
    if(inputValue.length >= 2) {
      fetch(url + value)
            .then(res => res.json())
            .then((data) => {     
              if(data.length >= 1 && data[0].roadAddr !== null) {       
                this.setState({ suggestions: data });
                getSearchValue = data;     
              }
              else {this.setState({suggestions: []});}
            }).catch(console.log);  
      }
  };

  onChange = (event) => {
    //Prime React Auto Complete는
    //입력필드의 입력값이 변경될때도 onChange 메소드 호출
    //suggestion 항목을 선택해도 onChagne 메소드 호출
    //그래서 두개의 이벤트를 분리해 줘야 한다.

    if(event.originalEvent.constructor.name === 'SyntheticEvent') {
      this.setState({
        value: event.value
      });
      
      this.getSuggestions(event.value);
      selectedSuggestion = null;
      console.log(event.value)
    }
    else {
      if(event.value.jibunAddr) {
        this.setState({
          value: event.value.jibunAddr
        });
      }
      console.log(event.value);
    }
  };
  filterCountrySingle(event) {
  }
  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (this.state.suggestions.length === 1) {
        // console.log(this.state.suggestions[0]);
        const {onComplete} = this.props;
        onComplete(this.state.suggestions[0]);
        return;
      }
      if (this.state.selected === false) {
        window.alert('항목이 선택되지 않았습니다.\n조회할 주소를 선택 후 다시 시도해주세요.')
      } else {
        this.setState({selected: false})
      }
    }
  }
  componentDidMount() {
      const btnSearch = document.querySelector('#btnSearch');
      btnSearch.innerHTML = '시세조회';
      const {btnClassName} = this.props;
      btnSearch.className = btnClassName;

      btnSearch.addEventListener('click',this.onSearchClick);
  }
  //자동완성 제안 주소 중 하나를 선택한 경우 발생하는 이벤트
  //이벤트 발생 시 현재 선택한 suggestion을 기록
  onSuggestionSelected =(event) => {
    console.log("onSuggestionSelected called");
    selectedSuggestion = event.value;  
    const {onComplete} = this.props;  
    this.onComplete(selectedSuggestion);
    onComplete(selectedSuggestion);
  }

  
  render() {
    // const { value, suggestions } = this.state;

    return (
        <div style={{textAlign: 'center'}}>
          <div style={{ display: 'inline-block'}}>
            <AutoComplete itemTemplate={this.renderSuggestion} value={this.state.value}
              suggestions={this.state.suggestions} completeMethod={this.filterCountrySingle}
              onSelect={this.onSuggestionSelected} onChange={this.onChange} onKeyPress={this.onKeyPress}
              size={200} autoFocus={true} placeholder="주소를 입력하세요" minLength={2}  />
          </div>
          <div style={{ display: 'inline-block'}}>
            <vaadin-button id="btnSearch"/>
          </div>
        </div>
    );
  }
}
export default AddressSearch_prime ;