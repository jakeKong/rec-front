// undefinded 에러 발생시
// callback method 바인딩 작업
// this.searchCallback = this.searchCallback.bind(this);

/*
// rendering 시 state값을 set 할 경우 loop 상태로 들어가는 문제 발생

  // 렌더링 이전 props or state값이 변경되었을 경우 shouldComponentUpdate 이후의 작업
  // callback lifecycle method
  // state값을 set할경우 state값이 계속 변경되므로 무한루프됨
  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
    console.log('componentWillUpdateThis= ' + JSON.stringify(this.state))
  }

  //rendering 이후의 작업 (다음 state값을 가지고 있음)
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate props: " + JSON.stringify(prevProps) + " state: " + JSON.stringify(prevState));
  }

  //현재 컴포넌트의 props or state값이 변경되었을 경우 rerendering 여부를 정하는 메소드
  // state값을 set할경우 state값이 계속 변경되므로 무한루프됨
  shouldComponentUpdate(nextprops, nextState) {
    console.log("shouldComponentUpdateprops: " + JSON.stringify(nextprops) + " state: " + JSON.stringify(nextState));
    console.log('shouldComponentThis= ' + JSON.stringify(this.state))
    console.log('nextStateSearch= ' + nextState.search)
    console.log('this.state.search= ' + this.state.search)
  }

  //마운트 직전 한번
  componentWillMount() {

  }
*/