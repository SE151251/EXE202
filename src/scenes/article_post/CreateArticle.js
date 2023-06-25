import React from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormData from "form-data";
import { toast } from "react-toastify";
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  cookingTime: Yup.number("Time must be a number")
    .min(1, "Cooking Time must be greater than or equal to 1")
    .required("Cooking time is required"),
  serves: Yup.number("Serves must be a number")
    .min(1, "Serves must be greater than or equal to 1")
    .required("Serves is required"),
  ingredients: Yup.array().of(Yup.string().required("Ingredient is required")),
  steps: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().required("Description is required"),
    })
  ),
});

const CreateArticle = () => {
  const navigate = useNavigate();
  return (
    <Container fixed>
      <Typography variant="h2" sx={{ mb: 5, textAlign: "center" }}>
        CREATE A NEW POST
      </Typography>
      <Formik
        initialValues={{
          title: "",
          content: "",
          mainImage: null,
          cookingTime: 1,
          serves: 1,
          ingredients: [],
          steps: [{ description: "", image: null }],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Xử lý submit form
          console.log("data submit: ", values);
          let listIngredients = [];
          let listInstructions = [];
          let listInstructionImages = [];
          for (let i = 0; i < values.ingredients.length; i++) {
            listIngredients.push({
              step: i + 1,
              content: values.ingredients[i],
            });
          }
          for (let i = 0; i < values.steps.length; i++) {
            for (let z = 0; z < values.steps[0].image.length; z++) {
              listInstructionImages.push(values.steps[0].image[z]);
            }
            listInstructions.push({
              step: i + 1,
              content: values.steps[i].description,
              InstructionImages: listInstructionImages,
            });
          }
          console.log(listInstructions);
          const formData = new FormData();
          formData.append("RecipeTitle", values.title);
          formData.append("RecipeDescription", values.content);
          formData.append("CookTimes", values.cookingTime);
          formData.append("Serving", values.serves);
          formData.append("IsFree", true);
          formData.append("UnitsPrice", 0);
          formData.append("RecipeImages", values.mainImage);
          for (let i = 0; i < listIngredients.length; i++) {
            const item = listIngredients[i];
            for (const key in item) {
              if (item.hasOwnProperty(key)) {
                const value = item[key];
                formData.append(`Ingredients[${i}].${key}`, value);
              }
            }
          }
          for (let i = 0; i < listInstructions.length; i++) {
            const item = listInstructions[i];          
            for (const key in item) {
              if (item.hasOwnProperty(key)) {
                const value = item[key];
          
                if (Array.isArray(value)) {
                  // Xử lý mảng các hình ảnh
                  for (let j = 0; j < value.length; j++) {
                    formData.append(`Instructions[${i}].${key}`, value[j]);
                  }
                } else {
                  // Xử lý các giá trị không phải mảng
                  formData.append(`Instructions[${i}].${key}`, value);
                }
              }
            }
          }
          console.log(formData);
          const access_token = localStorage.getItem('access_token');
          axios
            .post(
              "https://fresh-style.azurewebsites.net/odata/Recipes",
              formData,
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((response) => {
              // Xử lý phản hồi từ API
              console.log(response.data);
              toast.success("Create post successfully")
              navigate("/posts")
            })
            .catch((error) => {
              // Xử lý lỗi nếu có
              console.error(error);
              toast.error("Error in create post")
            });
         
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
                  sx={{ mt: 5 }}
                />
              )}
            </Field>
            <Box sx={{ mt: 3 }}>
              <label
                htmlFor="mainImage"
                style={{ fontSize: "16px", marginRight: "10px" }}
              >
                Image
              </label>
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
                    {meta.touched && meta.error && <div>{meta.error}</div>}
                  </>
                )}
              </Field>
            </Box>
            <Stack direction="row">
              <Field name="cookingTime">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    sx={{ mt: 5, mr: 10 }}
                    label="Cooking Time"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccessTimeIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">mins</InputAdornment>
                      ),
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
                    sx={{ mt: 5, mb: 4 }}
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
            <Divider />
            <Typography variant="h4" sx={{ mt: 2 }}>
              Ingredients
            </Typography>
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
                            sx={{ mt: 5 }}
                            size="small"
                            label="Ingredients"
                            error={meta.touched && !!meta.error}
                            helperText={
                              meta.touched && meta.error ? meta.error : ""
                            }
                          />
                        )}
                      </Field>
                      <Button
                        startIcon={<DeleteForeverOutlinedIcon />}
                        type="button"
                        variant="outlined"
                        onClick={() => remove(index)}
                        sx={{ mt: 5, ml: 5 }}
                      >
                        Remove ingredient
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="contained"
                    type="button"
                    onClick={() => push("")}
                    sx={{ mt: 3, mb: 5 }}
                  >
                    More ingredient
                  </Button>
                </div>
              )}
            </FieldArray>
            <Divider />
            <Typography variant="h4" sx={{ mt: 2, mb: 3 }}>
              Steps
            </Typography>
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

                      <Box sx={{ mt: 3 }}>
                        <label
                          htmlFor={`steps.${index}.image`}
                          style={{ fontSize: "16px", marginRight: "10px" }}
                        >
                          Images
                        </label>
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
                      <Button
                        startIcon={<DeleteForeverOutlinedIcon />}
                        type="button"
                        variant="outlined"
                        onClick={() => remove(index)}
                        sx={{ mt: 2, mb: 5 }}
                      >
                        Remove step
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => push("")}
                  >
                    More step
                  </Button>
                </div>
              )}
            </FieldArray>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 5, mb: 5 }}
            >
              Post
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateArticle;
