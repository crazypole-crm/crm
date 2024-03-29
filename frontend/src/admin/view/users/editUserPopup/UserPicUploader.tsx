import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

const props: UploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const style: React.CSSProperties = {
  border: 0, 
  marginLeft: -32, 
  background: 0,
}

function UserPicUploader() {                                                                                                                                                                                                                                                                                                                                                                                          
    return <Upload {...props}>
        <Button style={style} icon={<UploadOutlined />}></Button>
    </Upload>
}

export default UserPicUploader;