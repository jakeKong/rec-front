import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@vaadin/vaadin-button';
import Autosuggest from 'react-autosuggest';

import config from '../../../config';

//suggestion이 단순 String 이면 상관없으나 DTO(JSON)이면 화면에 표출해줄 특정 필드를 선택해야 된다.
const getSuggestionValue = suggestion => suggestion.jibunAddr;

//선택대상 목록을 표출하는 형태 정의 하나의 아이템이 여러줄로 나오는 형태로 변경 가능함
function renderSuggestion(suggestion) {
  return (
    <div>도로명 : {suggestion.roadAddr} <br/>
    지번명 : {suggestion.jibunAddr}</div>
  );
}

const url = `${config.commonService}/juso/list/`;
let selectedSuggestion = null;
class AddressSearch extends Component {
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
    };
  }
  onSearchClick = async (selectedSuggestion) => { 
    const { onSearchClick } = this.props;
    onSearchClick && onSearchClick();
    
    this.onSuggestionsClearRequested();
  }
  onComplete  = async (selectedSuggestion) => {   
  }
  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    //2글자 이상 입력해야 검색하기
    if(inputValue.length >= 2) {
      fetch(url + value)
            .then(res => res.json())
            .then((data) => {     
              if(data.length >= 1 && data[0].roadAddr !== null) {       
                this.setState({suggestions: data});              
              }
              else {this.setState({suggestions: []});}
            }).catch(console.log);  
      }
  };

  onChange = (event, { newValue }) => {

    this.setState({
      value: newValue
    });
  };

  componentDidMount() {
      const btnSearch = document.querySelector('#btnSearch');
      btnSearch.innerHTML = '정보조회';
      const {btnClassName} = this.props;
      btnSearch.className = btnClassName;

      btnSearch.addEventListener('click',this.onSearchClick);
  }
  //자동완성 제안 주소 중 하나를 선택한 경우 발생하는 이벤트
  //이벤트 발생 시 현재 선택한 suggestion을 기록
  /**
   * suggestion - the selected suggestion
   * suggestionValue - the value of the selected suggestion (equivalent to getSuggestionValue(suggestion))
   * suggestionIndex - the index of the selected suggestion in the suggestions array
   * sectionIndex - when rendering multiple sections, this will be the section index (in suggestions) of the selected suggestion. Otherwise, it will be null.
   * method - string describing how user selected the suggestion. The possible values are:
   * 'click' - user clicked (or tapped) on the suggestion
   * 'enter' - user selected the suggestion using enter key
   */
  onSuggestionSelected =(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    selectedSuggestion = suggestion;    
    const {onComplete} = this.props;
    this.onComplete(selectedSuggestion);
    onComplete(selectedSuggestion);
  }
  onSuggestionsFetchRequested = ({ value }) => {
    this.getSuggestions(value);
    selectedSuggestion = null;
  };

  //This function will be called every time you need to clear suggestions.
  //When alwaysRenderSuggestions={true}, you don't have to implement this function.
  onSuggestionsClearRequested = () => {//(required unless alwaysRenderSuggestions={true})
    this.setState({
      suggestions: []
    });
    selectedSuggestion = null;
  };

  //This function is called when the highlighted suggestion changes.
  onSuggestionHighlighted = ({ suggestion  }) => {//(optional)
  };

  //By default, suggestions are rendered when the input isn't blank. Feel free to override this behaviour.
  //This function gets the current value of the input, and it should return a boolean.
  shouldRenderSuggestions = ({value}) => {//(optional)
    //입력문자열이 3개 이상인경우에만 보이도록 하기?
    //return inputValue.trim().length > 2;
  };
  
  render() {
    const { value, suggestions } = this.state;
    const showButton = this.prop;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: '주소를 입력하세요',
      value,                              // usually comes from the application state
      // onBlur,                             // called when the input loses focus, e.g. when user presses Tab
      // type: 'search',                     //usually means that user typed something, but can also be that they pressed Backspace, pasted something into the input, etc.
      onChange: this.onChange             //called every time the input value changes
    };

    return (
        <div style={{textAlign: 'center'}}>
          <div style={{ display: 'inline-block'}}>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionSelected={this.onSuggestionSelected}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
          </div>
          <div style={{ display: 'inline-block'}}>
            <vaadin-button id="btnSearch"/>
          </div>
        </div>
    );
  }
}
export default AddressSearch ;