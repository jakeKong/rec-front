import axios from 'axios';
import config from '../../config';

export const uploadFile = (file) => axios({
  method: 'POST',
  url: `${config.fileService}/files/uploadFile`,
  headers: {
    // 'Content-Type': 'application/json; charset=UTF-8',
    'Content-Type': 'multipart/form-data; charset=UTF-8',
    'Accept': 'application/json'
  },
  // file
  responseType: 'file',
  // data: JSON.stringify(file)
  data: file
});

// uploadMultipleFiles

// downloadFile