import React from "react";
import axios from "axios";
import { useForm, useWatch, useFormState } from 'react-hook-form';
import SlowRender from '../../components/SlowRender/SlowRender';
import "./Login.css";

// function SubmitButton({ control }) {
//   const { username, password } = useWatch({ control });

//   const disabled = !username || !password

//   return (
//     <button type="submit" className="btn btn-primary btn-block" disabled={disabled}>
//       Đăng nhập
//     </button>
//   )
// }

function SubmitButtonWithListenError({ isDirty, isValid, touchedFields }) {
  const touched = Object.keys(touchedFields).length > 0;
  const disabled = !isValid || !touched

  return (
    <button 
      type="submit" 
      className="btn btn-primary btn-block" disabled={disabled}>
      Đăng nhập
    </button>
  )
}
export default function Login() {
  const { 
    register, 
    formState: { errors, isDirty, isValid, touchedFields },
    control,
    handleSubmit } = useForm(
      {
        defaultValues: {
          username: '',
          password: '',
        },
        mode: 'onChange'
      },
    );


  console.log('fields', touchedFields)

  const onSubmit = (values) => {
    console.log(values)
  };

  console.log('render');
  console.log('errors', errors);

  return (
    <div className="Login container-fluid" style={{ background: "#fafafa" }}>
      <div className="vh-100 justify-content-md-center align-items-center row">
        <div className="col-md-4 col-12">
          <div className="card-wrapper p-4">
            <form className="" 
              onSubmit={handleSubmit(onSubmit)} 
              autoComplete="off"
            >
              <h4 className="mb-4">MindX Images</h4>
              <div className="mb-4">
                <div className="form-group">
                  <input
                    placeholder="Enter your email..."
                    className="form-control"
                    autoComplete="off"
                    {...register('username', { required: true })}
                  />
                  {errors?.username?.type === 'required' && <p>Username không được để trống</p>}
                </div>
                <div className="form-group">
                  <input
                    placeholder="Enter your password..."
                    type="password"
                    className="form-control"
                    autoComplete="off"
                    {...register('password', { required: true, minLength: 6 })}
                  />
                  {errors?.password?.type === 'required' && <p>Password không được để trống</p>}
                  {errors?.password?.type === 'minLength' && <p>Password phải lớn hơn 6 kí tự</p>}
                </div>
              
              </div>
              <SlowRender />
              {/* <SubmitButton control={control} /> */}
              <SubmitButtonWithListenError isDirty={isDirty} isValid={isValid} touchedFields={touchedFields} />
            </form>
          </div>
          <div className="card-wrapper mt-4 p-3">
            <div>
              No account? <a href="/signup">Sign up here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
