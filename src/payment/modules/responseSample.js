export const paymentRequest = {
  "code" : "Success",
  "message": "detail message(optional)",
  "body": {
    "paymentId": "20190530NP1043587746",
    "detail": {
      "productName": "상품명",
      "merchantId": "loginId",
      "merchantName": "가맹점명",
      "cardNo": "465887**********",
      "admissionYmdt": "20190530151722",
      "payHistId": "20190530NP1043587781",
      "primaryPayAmount": 1000,
      "npointPayAmount": 0,
      // "totalPayAmount": 1000,
      "totalPayAmount": '',
      "primaryPayMeans": "CARD",
      "merchantPayKey": "order-key",
      "merchantUserKey": "jenie",
      "cardCorpCode": "C0",
      "paymentId": "20190530NP1043587746",
      "admissionTypeCode": "01",
      "settleExpectAmount": 971,
      "payCommissionAmount": 29,
      "admissionState": "SUCCESS",
      "tradeConfirmYmdt": "20190530152510",
      "cardAuthNo": "17545616",
      "cardInstCount": 0,
      "bankCorpCode": "",
      "bankAccountNo": "",
      "settleExpected": false,
      "extraDeduction": false,
      "useCfmYmdt" : "20180703"
    }
  },
  "totalPoint": ''
}

export const paymentRequestFailSample = {
  "code" : "Failure",
  "message": "Failure message(optional)",
}

export const paymentHistory = {
  "code" : "Success",
  "message": "detail message(optional)",
  "body": {
    "responseCount": 1,
        "totalCount": 1,
        "totalPageCount": 1,
        "currentPageNumber": 1,
        "list": [
          {
            "cardAuthNo": "00000000",
            "bankAccountNo": "",
            "bankCorpCode": "",
            "paymentId": "20190531NP1000229665",
            "cardCorpCode": "C0",
            "cardInstCount": 0,
            "settleInfo": {
              "primaryCommissionAmount": 30,
              "npointCommissionAmount": 20,
              "primarySettleAmount": 470,
              "npointSettleAmount": 480,
              "totalSettleAmount": 850,
              "totalCommissionAmount": 50,
              "settleCreated": true
            },
            "merchantName": "나의가맹점",
            "productName": "나의상품",
            "payHistId": "20190531NP1000229668",
            "merchantId": "MID12345",
            "admissionYmdt": "20190531163930",
            "tradeConfirmYmdt": "20190531163956",
            "totalPayAmount": 1000,
            "merchantPayKey": "orderKey-91516397",
            "merchantUserKey": "ID12345",
            "admissionTypeCode": "01",
            "primaryPayMeans": "CARD",
            "admissionState": "SUCCESS",
            "primaryPayAmount": 500,
            "npointPayAmount": 500,
            "cardNo": "123456**********",
            "extraDeduction": false,
            "useCfmYmdt" : "20190531"
        },{
          "cardAuthNo": "00000001",
          "bankAccountNo": "",
          "bankCorpCode": "",
          "paymentId": "20190531NP1000229665",
          "cardCorpCode": "C0",
          "cardInstCount": 0,
          "settleInfo": {
            "primaryCommissionAmount": 30,
            "npointCommissionAmount": 20,
            "primarySettleAmount": 470,
            "npointSettleAmount": 480,
            "totalSettleAmount": 850,
            "totalCommissionAmount": 50,
            "settleCreated": true
          },
          "merchantName": "나의가맹점",
          "productName": "나의상품",
          "payHistId": "20190531NP1000229668",
          "merchantId": "MID12345",
          "admissionYmdt": "20190531163930",
          "tradeConfirmYmdt": "20190531163956",
          "totalPayAmount": 2000,
          "merchantPayKey": "orderKey-91516397",
          "merchantUserKey": "ID12345",
          "admissionTypeCode": "01",
          "primaryPayMeans": "CARD",
          "admissionState": "SUCCESS",
          "primaryPayAmount": 1000,
          "npointPayAmount": 1000,
          "cardNo": "123456**********",
          "extraDeduction": false,
          "useCfmYmdt" : "20190531"
        }
      ]
    }
}

export const paymentHistoryFailSample = { 
  "code" : "Failure",
  "message": "Failure message(optional)",
}