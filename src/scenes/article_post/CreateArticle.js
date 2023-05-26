import React from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Divider, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useNavigate } from "react-router-dom";
// const validationSchema = Yup.object().shape({
//   // Định nghĩa các trường và các quy tắc xác thực tương ứng
//   // Ví dụ:
//   name: Yup.string().required("Please enter your name"),
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Please enter your email address"),

// });
// const initialValues = {
//   name: "",
//   email: "",
//   dynamicFields: [], // Mảng rỗng là giá trị mặc định
//   dynamicFields2: [{ description: "", image: null }],
// };
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  cookingTime: Yup.number("Time must be a number").min(1, "Cooking Time must be greater than or equal to 1").required(
    "Cooking time is required"
  ),
  serves: Yup.number("Serves must be a number").min(1, "Serves must be greater than or equal to 1").required("Serves is required"),
  ingredients: Yup.array().of(Yup.string().required("Ingredient is required")),
  steps: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().required("Description is required")   
    })
  ),
});

const CreateArticle = () => {
  const navigate = useNavigate()
  return (
    <Container fixed>
      <Typography variant="h2" sx={{mb:5, textAlign:"center"}}>CREATE A NEW POST</Typography>
    <Formik
      initialValues={{
        title: "",
        content: "",
        mainImage:null,
        cookingTime: 1,
        serves: 1,
        ingredients: [],
        steps: [{ description: "", image: null }],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Xử lý submit form
        console.log(values);
        navigate("/posts")

      }}
    >
      {({ values }) => (
        <Form>
          <Field name="title">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Title"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                
              />
            )}
          </Field>

          <Field name="content">
            {({ field, meta }) => (
              <TextField
                {...field}
                multiline
                rows={5}
                label="Content"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                sx={{mt:5}}
              />
            )}
          </Field>
          <Box sx={{mt:3}}>
                    <label htmlFor="mainImage" style={{fontSize:"16px", marginRight:"10px"}}>Image</label>
                    <Field name="mainImage">
                      {({ field, form, meta }) => (
                        <>
                          <input
                          multiple
                            type="file"
                            id="mainImage"
                            onChange={(event) =>
                              form.setFieldValue(
                                field.name,
                                event.currentTarget.files[0]
                              )
                            }
                          />
                          {meta.touched && meta.error && (
                            <div>{meta.error}</div>
                          )}
                        </>
                      )}
                    </Field>
                    </Box>
          <Stack direction="row">
          <Field name="cookingTime">
            {({ field, meta }) => (
              <TextField
                {...field}
                sx={{mt:5, mr: 10}}
                label="Cooking Time"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon />
                    </InputAdornment>
                  ),
                  endAdornment: <InputAdornment position="end">mins</InputAdornment>,
                }}
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
          <Field name="serves">
            {({ field, meta }) => (
              <TextField
                {...field}
                sx={{mt:5, mb: 4}}
                label="Serves"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityOutlinedIcon />
                    </InputAdornment>
                   
                  ),
                  // endAdornment: <InputAdornment position="end">peoples</InputAdornment>,
                }}
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
          </Stack>
          <Divider/>
          <Typography variant="h4" sx={{mt:2}}>Ingredients</Typography>
          <FieldArray name="ingredients">
            {({ push, remove }) => (
              <div>
                {values.ingredients.map((ingredient, index) => (
                  <div key={index}>
                    {/* <Field
                      name={`ingredients[${index}]`}
                      as={TextField}
                      label="Ingredients"

                    /> */}
                    <Field name={`ingredients[${index}]`}>
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          sx={{mt:5}}
                          size="small"
                          label="Ingredients"
                          error={meta.touched && !!meta.error}
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                        />
                      )}
                    </Field>
                    <Button startIcon={<DeleteForeverOutlinedIcon/>} type="button" variant="outlined" onClick={() => remove(index)} sx={{mt:5, ml:5}}>
                      Remove ingredient
                    </Button>
                  </div>
                ))}
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => push("")}
                  sx={{mt:3, mb:5}}
                >
                  More ingredient
                </Button>
              </div>
            )}
          </FieldArray>
          <Divider/>
          <Typography variant="h4" sx={{mt:2, mb:3}}>Steps</Typography>
          <FieldArray name="steps">
            {({ push, remove }) => (
              <div>
                {values.steps.map((phoneNumber, index) => (
                  <div key={index}>
                    {/* <Field
                      name={`steps.${index}.description`}
                      as={TextField}
                      label="Description"
                    /> */}
                    <Field name={`steps.${index}.description`}>
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          multiline
                          rows={3}
                          fullWidth
                          label="Description"
                          error={meta.touched && !!meta.error}
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                        />
                      )}
                    </Field>
                    
                    <Box sx={{mt:3}}>
                    <label htmlFor={`steps.${index}.image`} style={{fontSize:"16px", marginRight:"10px"}}>Images</label>
                    <Field name={`steps.${index}.image`}>
                      {({ field, form, meta }) => (
                        <>
                          <input
                          multiple
                            type="file"
                            id={`steps.${index}.image`}
                            onChange={(event) =>
                              form.setFieldValue(
                                field.name,
                                event.currentTarget.files
                              )
                            }
                          />
                          {meta.touched && meta.error && (
                            <div>{meta.error}</div>
                          )}
                        </>
                      )}
                    </Field>
                    </Box>
                    <Button startIcon={<DeleteForeverOutlinedIcon/>} type="button" variant="outlined" onClick={() => remove(index)} sx={{mt:2,mb:5}}>
                      Remove step
                    </Button>
                   
                  </div>
                  
                ))}
                <Button type="button" variant="contained" onClick={() => push("")}>
                  More step
                </Button>
              </div>
            )}
          </FieldArray>

          <Button fullWidth type="submit" variant="contained" sx={{mt:5}} >Post</Button>
        </Form>
      )}
    </Formik>
    </Container>
  );

  //   const handleSubmit = (values) => {
  //     // Xử lý submit form
  //     console.log(values);
  //   };

  //   return (
  //     <div>
  //       <h1>Create a new post</h1>
  //       <Formik
  //         initialValues={initialValues}
  //         validationSchema={validationSchema}
  //         onSubmit={handleSubmit}
  //       >
  //         {({ values, errors, touched }) => (
  //           <Form>
  //              <div>
  //               <label htmlFor="name">Coook time</label>
  //               <Field type="text" id="name" name="name" />
  //               {errors.name && touched.name && <div>{errors.name}</div>}
  //             </div>

  //             <div>
  //               <label htmlFor="email">Serves</label>
  //               <Field type="text" id="email" name="email" />
  //               {errors.email && touched.email && <div>{errors.email}</div>}
  //             </div>

  //             {/* FieldArray để quản lý mảng các trường form */}
  //             <FieldArray name="dynamicFields">
  //               {({ push, remove }) => (
  //                 <>
  //                   {/* Lặp qua các phần tử trong mảng dynamicFields */}
  //                   {values.dynamicFields.map((field, index) => (
  //                     <div key={index}>
  //                       <label htmlFor={`dynamicFields.${index}`}>
  //                         Ingredient {index + 1}
  //                       </label>
  //                       <Field
  //                         type="text"
  //                         id={`dynamicFields.${index}`}
  //                         name={`dynamicFields.${index}`}
  //                       />
  //                       {/* <FileInput name={`images.${index}`} label="Chọn hình ảnh" /> */}
  //                       <button type="button" onClick={() => remove(index)}>
  //                         Remove this ingredient
  //                       </button>
  //                     </div>
  //                   ))}

  //                   {/* Nút "Add" để thêm một trường form mới */}
  //                   <button type="button" onClick={() => push("")}>
  //                     Add more ingredient
  //                   </button>
  //                 </>
  //               )}
  //             </FieldArray>
  //             <FieldArray name="dynamicFields2">
  //               {({ push, remove }) => (
  //                 <>
  //                   {values.dynamicFields2.map((field, index) => (
  //                     <div key={index}>
  //                       <label htmlFor={`dynamicFields2.${index}.description`}>
  //                         Step {index + 1}
  //                       </label>
  //                       <Field
  //                         type="text"
  //                         id={`dynamicFields2.${index}.description`}
  //                         name={`dynamicFields2.${index}.description`}
  //                       />

  //                       <label htmlFor={`dynamicFields2.${index}.image`}>
  //                         Image
  //                       </label>
  //                       <Field name={`dynamicFields2.${index}.image`}>
  //                         {({ field, form, meta }) => (
  //                           <>
  //                             <input
  //                               type="file"
  //                               id={`dynamicFields2.${index}.image`}
  //                               onChange={(event) =>
  //                                 form.setFieldValue(
  //                                   field.name,
  //                                   event.currentTarget.files[0]
  //                                 )
  //                               }
  //                             />
  //                             {meta.touched && meta.error && (
  //                               <div>{meta.error}</div>
  //                             )}
  //                           </>
  //                         )}
  //                       </Field>

  //                       <button type="button" onClick={() => remove(index)}>
  //                         Remove step
  //                       </button>
  //                     </div>
  //                   ))}
  //                   <button
  //                     type="button"
  //                     onClick={() => push({ description: "", image: null })}
  //                   >
  //                     Add step
  //                   </button>
  //                 </>
  //               )}
  //             </FieldArray>

  //             <Button variant="contained" type="submit">Submit</Button>
  //           </Form>
  //         )}
  //       </Formik>
  //     </div>
  //   );
};

export default CreateArticle;
