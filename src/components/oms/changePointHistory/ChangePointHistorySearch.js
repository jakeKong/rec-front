import React, { Component, Fragment } from 'react';

// layout
import '@vaadin/vaadin-ordered-layout';

// component
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-icons'
import '@vaadin/vaadin-date-picker'

import '@vaadin/vaadin-select'
import '@vaadin/vaadin-list-box'
import '@vaadin/vaadin-item'

class ChangePointHistorySearch extends Component {

    constructor(props) {
        super(props);
        this.state ={
            search: {
                odrNo: null,
                purchaseNo: null,
                fromDt: null,
                toDt: null,
                changeType: null
            },
            hide: true,
        }
    }

    componentDidMount() {
        // search parameter default setting
        const { search } = this.state;

        // date set --> Common DateUtil로 변경 필요
        let date = new Date(), 
        weekBeforeDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() - 7),
        currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        // Oms UtilType으로 변경 필요
        const changeTypeItems = [
            {value: 'PURCHASE', textContent: '구매'},
            {value: 'SUBSTRACT', textContent: '차감'}
        ];

        // search label set
        document.querySelector('#lbChangeType').innerHTML = '변동 유형';
        document.querySelector('#lbDate').innerHTML = '기간';
        document.querySelector('#lbPunct').innerHTML = '~';
        
        // status Box set
        const slChangeType = document.querySelector('#slChangeType')
        // default status Select set
        slChangeType.value = 'ALL';
        search.changeType = slChangeType.value;
        slChangeType.renderer = function(root) {
            if (root.firstChild) {
                return;
            }
            const listBox = document.createElement('vaadin-list-box');
            const select = document.createElement('vaadin-item');

            select.textContent = '전체';
            select.setAttribute('value', 'ALL');
            listBox.appendChild(select);

            const divider = document.createElement('hr');
            listBox.appendChild(divider);

            changeTypeItems.forEach(function(row){
                const item = document.createElement('vaadin-item');
                item.textContent = row.textContent;
                if (row.value) {
                    item.setAttribute('value', row.value);
                }
                listBox.appendChild(item);
            });
            root.appendChild(listBox);

        }
        // 상태 콤보박스의 값 변경 시 SearchParameter에 선택한 값으로 변경
        slChangeType.addEventListener('value-changed', function(e) {
            search.changeType = slChangeType.value;
            if (slChangeType.value === 'ALL') {
                document.querySelector('#lbSearch').innerHTML = null;
                tfSearch.hidden = true;
            } else if (slChangeType.value === 'PURCHASE') {
                tfSearch.hidden = false;
                document.querySelector('#lbSearch').innerHTML = '구매번호';
                tfSearch.placeholder = '검색어를 입력해주세요.';
                tfSearch.addEventListener('input', function() {
                    search.purchaseNo = tfSearch.value;
                })
            } else {
                tfSearch.hidden = false;
                document.querySelector('#lbSearch').innerHTML = '주문번호';
                tfSearch.addEventListener('input', function() {
                    search.odrNo = tfSearch.value;
                })
            }
        })

        // Start date-picker set
        const dpStart = document.querySelector('#dpStart')
        // default before Week date set
        dpStart.value = weekBeforeDate;
        search.fromDt = dpStart.value;
        dpStart.addEventListener('value-changed', function() {
            search.fromDt = dpStart.value;
        })

        // End date-picker set
        const dpEnd = document.querySelector('#dpEnd')
        // default today
        dpEnd.value = currentDate;
        search.toDt = dpEnd.value;
        dpEnd.addEventListener('value-changed', function() {
            search.toDt = dpEnd.value;
        })

        // Search text-field set
        const tfSearch = document.querySelector('#tfSearch')
        tfSearch.maxlength = '15';

        // Search button set
        const { searchCallback } = this.props;
        const btnSearch = document.querySelector('#btnSearch')
        btnSearch.innerHTML = '조회';
        btnSearch.addEventListener('click', function() {
          searchCallback(search);
          search.odrNo = null;
          search.purchaseNo = null;
          tfSearch.value = null;
        })
    }

    render() {
        const { hide } = this.state;
        return (
            <Fragment>
                <vaadin-horizontal-layout id="searchLayout" theme="spacing">
                    <label className="label-center" id="lbChangeType" />
                        <vaadin-select id="slChangeType" />

                    <label className="label-center" id="lbDate" />
                        <vaadin-date-picker id="dpStart" />
                            <label className="label-center" id="lbPunct" />
                        <vaadin-date-picker id="dpEnd" />

                    <label className="label-center" id="lbSearch"/>
                        <vaadin-text-field id="tfSearch" hidden={ hide }>
                            <iron-icon icon="vaadin:search" slot="prefix" />
                        </vaadin-text-field>

                    <vaadin-button id="btnSearch" />
                </vaadin-horizontal-layout>
            </Fragment>
        );
    }
}
export default ChangePointHistorySearch ;