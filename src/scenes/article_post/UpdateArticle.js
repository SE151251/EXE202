import React, { useEffect, useState } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
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
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
import FormData from "form-data";
import { toast } from "react-toastify";
import axiosClient from "../../utils/axiosCustomize";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  cookingTime: Yup.number("Time must be a number")
    .min(1, "Cooking Time must be greater than or equal to 1")
    .required("Cooking time is required"),
  price: Yup.number("Price must be a number")
    .min(0, "Price must be greater than or equal to 0")
    .required("Price is required"),
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

const UpdateArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setIsLoading] = useState(false);
  const [initValue, setInitValue] = useState();
  const loadData = async () => {
    const data = await axiosClient.get(`/Recipes/${id}`)
    console.log(data);
    setInitValue(data)
  }
  useEffect(() => {
    loadData()
  }, []);
  if(initValue){
  let listIngredientsLoad = initValue.Ingredients.map((i)=> i.Content)
  let listInstructionsLoad = initValue.Instructions.map((i)=> ({description: i.Content, image: null, imageFetch: i.InstructionImages}))
  console.log(listInstructionsLoad);
  return (
    <Container fixed>
      <Typography variant="h2" sx={{ mb: 5, textAlign: "center" }}>
        UPDATE POST
      </Typography>
      <Formik
        initialValues={{
          title: `${initValue.RecipeTitle}`,
          content: `${initValue.RecipeDescription}`,
          mainImage: null,
          cookingTime: `${initValue.CookTimes}`,
          serves:`${initValue.Serving}`,
          price: `${initValue.UnitsPrice ? initValue.UnitsPrice : 0}`,
          ingredients: listIngredientsLoad,
          steps: listInstructionsLoad
          //[{ description: "", image: null }],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setIsLoading(true);
          // Xử lý submit form
          console.log("data submit: ", values);
          let listIngredients = [];
          let listInstructions = [];
          for (let i = 0; i < values.ingredients.length; i++) {
            listIngredients.push({
              step: i + 1,
              content: values.ingredients[i],
            });
          }
          for (let i = 0; i < values.steps.length; i++) {
            var listInstructionImages = [];
            if(values.steps[i].image === null){
              listInstructionImages.push(null)
            }else{
              for (let z = 0; z < values.steps[i].image.length; z++) {
                listInstructionImages.push(values.steps[i].image[z]);
              }
            }          
            listInstructions.push({
              step: i + 1,
              content: values.steps[i].description,
              InstructionImages: listInstructionImages,
            });
          }
          const formData = new FormData();
          formData.append("RecipeTitle", values.title);
          formData.append("RecipeDescription", values.content);
          formData.append("CookTimes", values.cookingTime);
          formData.append("Serving", values.serves);
          formData.append("IsFree", values.price === 0 ? true : false);
          formData.append("UnitsPrice", values.price);
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
                console.log(Array.isArray(value))
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
          console.log("stop here");
          try {
            const data = await axiosClient.put(`/Recipes/${id}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            setIsLoading(false);
            toast.success("Update post successfully");
            navigate("/posts");
          } catch (error) {
            if (error.response.data.Message) {
              setIsLoading(false);
              for (let x = 0; x < error.response.data.Message.length; x++) {
                for (
                  let i = 0;
                  i < error.response.data.Message[x].DescriptionError.length;
                  i++
                ) {
                  toast.error(
                    error.response.data.Message[x].DescriptionError[i]
                  );
                }
              }
            } else {
              setIsLoading(false);
              toast.error("Error in create post");
            }
          }
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
              <Box>
                <img style={{width:"30vw", height:"50vh", objectFit:"cover"}} src={initValue.RecipeImages[0].Source} />
              </Box>
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
                    sx={{ mt: 5, mb: 4, mr: 10 }}
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
              <Field name="price">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    sx={{ mt: 5, mb: 4 }}
                    label="Price"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon />
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
                  {values.steps.map((dataInstructions, index) => (
                    <div key={index}>
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
                      {dataInstructions.imageFetch.map((i) =>
                      ( <Box>
                        <img style={{width:"15vw", height:"25vh", objectFit:"cover"}} src={i.Source} />
                        </Box>)
                      )}
             
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
              disabled={loading}
            >
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
  }
  else return (
    <Box sx={{ ml: "35vw", mt: "40vh", height: "100vh" }}>
    <CircularProgress />
    Loading
  </Box>
  )
};

export default UpdateArticle;
