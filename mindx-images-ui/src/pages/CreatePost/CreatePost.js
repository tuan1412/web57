import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import request from '../../api/request';

function CreatePost() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  // const [file, setFile] = React.useState();

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await request({
        url: '/api/upload',
        method: 'POST',
        data: formData,
      });
      return res.data;
    } catch (err) {
      return '';
    }
  }
  // const onSubmit = async values => {
  //   if (file) {
  //     const imageUrl = await uploadFile(file);
  //     try {
  //       const res = await request({
  //         url: '/api/posts',
  //         method: 'POST',
  //         data: {
  //           imageUrl,
  //           title: values.title,
  //           description: values.description
  //         }
  //       })
  //       if (res.success) {
  //         alert('Success');
  //       }
  //     } catch (err) {

  //     }
  //   }
  // };

  const onSubmit = async values => {
    if (values.imageUrl) {
      try {
        const res = await request({
          url: '/api/posts',
          method: 'POST',
          data: {
            imageUrl: values.imageUrl,
            title: values.title,
            description: values.description
          }
        })
        if (res.success) {
          alert('Success');
        }
      } catch (err) {

      }
    }
  };

  const onChangeFile = async e => {
    const files = e.target.files;
    if (files.length) {
      const imageUrl = await uploadFile(files[0]);
      setValue('imageUrl', imageUrl)
    }
  }
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control type="text" placeholder="title" {...field} />
            )}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control as="textarea" rows={3} {...field} />
            )}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image</Form.Label>
          {/* <Controller
            name="image"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Control type="file" {...field}/>
              // <Form.Control as="textarea" rows={3} {...field} />
            )}
          /> */}
          <Form.Control type="file" onChange={onChangeFile} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreatePost;
