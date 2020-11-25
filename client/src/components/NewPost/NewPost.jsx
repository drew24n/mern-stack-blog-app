import React, {useState} from 'react';
import styles from './NewPost.module.scss';
import {Form, Input, Button, Upload} from 'antd';
import {newNote} from "../../redux/notesReducer";

export default function NewPost({dispatch, history}) {
    const [fileList, setFileList] = useState([])

    const handleForm = ({title, text, image}) => {
        const type = image[0].originFileObj.type
        new Promise(resolve => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(image[0].originFileObj)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
        })
            .then(async imgBase64Data => {
                const image = {
                    data: imgBase64Data.split(',')[1],
                    type: type
                }
                console.log({title, text, image})
                const res = await dispatch(newNote({title, text, image}))
                if (res.success === true) {
                    history.push(`/post?id=${res.data._id}`)
                }
            })
    }

    const validateFields = {
        required: 'Field is required!',
        max: {
            title: 'Title cannot be longer than 100 characters!',
            text: 'Text cannot be longer than 2000 characters!',
        }
    }

    const handleFile = (e) => {
        // console.log('Upload event:', e)
        if (Array.isArray(e)) {
            return e
        }
        setFileList(e.fileList)
        return e && e.fileList
    }

    return (
        <main className={styles.container}>
            <h1>Create New Post</h1>
            <Form onFinish={handleForm} validateMessages={validateFields}>
                <Form.Item label="Title" name="title" rules={[{required: true, max: 100}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Text" name="text" rules={[{required: true, max: 2000}]}>
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item label="Image" name="image" valuePropName="fileList" getValueFromEvent={handleFile}>
                    <Upload accept=".jpg, .png, .gif" beforeUpload={() => false} listType="picture">
                        <Button disabled={fileList.length >= 1}>Select image</Button>
                    </Upload>
                </Form.Item>
                <Button className={styles.saveBtn} type="primary" htmlType="submit">
                    Save
                </Button>
            </Form>
        </main>
    )
}
