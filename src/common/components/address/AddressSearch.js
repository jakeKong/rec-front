import React, { Component } from 'react';

import '@vaadin/vaadin-button';
import Autosuggest from 'react-autosuggest';

import config from '../../../config';

//suggestion이 단순 String 이면 상관없으나 DTO(JSON)이면 화면에 표출해줄 특정 필드를 선택해야 된다.
const getSuggestionValue = suggestion => suggestion.roadAddr;

//선택대상 목록을 표출하는 형태 정의 하나의 아이템이 여러줄로 나오는 형태로 변경 가능함
const renderSuggestion = suggestion => (
  <div>
    {suggestion.roadAddr}
  </div>
);

let url = `${config.commonService}juso/list/`;
let selectedSuggestion = null;

class AddressSearch extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
    };
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    fetch(url + value)
          .then(res => res.json())
          .then((data) => {     
            console.log(url + value);     
            //  console.log(data);      
            if(data.length >= 1 && data[0].roadAddr !== null) {              
              // console.log(data);
              this.setState({suggestions: data});              
            }
            else {this.setState({suggestions: []});}
          }).catch(console.log);  
  };

  onChange = (event, { newValue }) => {

    this.setState({
      value: newValue
    });
  };

  componentDidMount() {
    const btnSearch = document.querySelector('#btnSearch');
    btnSearch.innerHTML = '정보조회';
    const {onComplete, onSearchClick} = this.props;

    btnSearch.addEventListener('click',onSearchClick);

    // btnSearch.addEventListener('click', function() {
    //   //selectedSuggestion이 null이 아닌 경우에만 반환하도록 한다.
    //   if(selectedSuggestion !== null || selectedSuggestion !== undefined) {
        
    //     // this.props.onComplete(selectedSuggestion);
    //     onComplete(selectedSuggestion);
    //   }    
    // })
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
  }
  onSuggestionsFetchRequested = ({ value }) => {
    this.getSuggestions(value);
    selectedSuggestion = null;
  };

  //This function will be called every time you need to clear suggestions.
  //When alwaysRenderSuggestions={true}, you don't have to implement this function.
  onSuggestionsClearRequested = () => {//(required unless alwaysRenderSuggestions={true})
    // this.setState({
    //   suggestions: []
    // });
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

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: '검색어를 입력하세요',
      value,                              // usually comes from the application state
      // onBlur,                             // called when the input loses focus, e.g. when user presses Tab
      // type: 'search',                     //usually means that user typed something, but can also be that they pressed Backspace, pasted something into the input, etc.
      onChange: this.onChange             //called every time the input value changes
    };

    return (
        <div style={{textAlign: 'center'}}>
          <div style={{ display: 'inline-block', width: '70%'}}>
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
          <div style={{ display: 'inline-block',  marginLeft: 10}}>
            <vaadin-button id="btnSearch" />
          </div>
        </div>
    );
  }
}
export default AddressSearch ;