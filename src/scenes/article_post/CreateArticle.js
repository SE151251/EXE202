import React, { useEffect, useState } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Divider,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import FormData from "form-data";
import { toast } from "react-toastify";
import axiosClient from "../../utils/axiosCustomize";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  mainImage: Yup.mixed().required("Recipe main image is required"),
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
      image: Yup.mixed().required("Image of step is required"),
    })
  ),
});

const CreateArticle = () => {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState(["Type 1", "Type 2"]);
  const [selectedType, setSelectedType] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/RecipeTypes");
        if (response.value) {
          setData(response.value.map((t) => ({ Id: t.Id, Name: t.Name })));
          if (response.value.length > 0) {
            setSelectedType(response.value[0].Id);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <Container fixed>
      <Typography variant="h2" sx={{ mb: 5, textAlign: "center" }}>
      ꧁༺CREATE A NEW POST༻꧂
      </Typography>
      <Formik
        initialValues={{
          title: "",
          content: "",
          mainImage: null,
          cookingTime: 1,
          serves: 1,
          price: 0,
          ingredients: [""],
          steps: [{ description: "", image: null }],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setIsLoading(true);
          console.log(selectedType);
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
          //
          for (let i = 0; i < values.steps.length; i++) {
            var listInstructionImages = [];
            for (let z = 0; z < values.steps[i].image.length; z++) {
              listInstructionImages.push(values.steps[i].image[z]);
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
          formData.append("RecipeTypeId", selectedType);
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
          try {
            const data = await axiosClient.post("/Recipes", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            setIsLoading(false);
            toast.success("Create post successfully");
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
                    {meta.touched && meta.error && (
                      <div style={{ color: "red" }}>{meta.error}</div>
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
            <Box  sx={{ mt: 1, mb: 4 }}>
                <InputLabel htmlFor="recipeType">Recipe Type</InputLabel>
                <Select
                  id="recipeType"
                  // label="Recipe Type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  sx={{ width: "15vw" }}
                >
                  {data.map((item) => (
                    <MenuItem key={item.Id} value={item.Id}>
                      {item.Name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            <Divider />
            <Typography variant="h4" sx={{ mt: 2 }}>
              Ingredients
            </Typography>
            <FieldArray name="ingredients">
              {({ push, remove }) => (
                <div>
                  {values.ingredients.map((ingredient, index) => (
                    <div key={index}>
                      <Typography sx={{mt:2}}>Ingredient {index + 1}</Typography>
                      <Field name={`ingredients[${index}]`}>
                        {({ field, meta }) => (
                          <TextField
                            {...field}
                            sx={{ mt: 2 }}
                            size="small"
                            label="Ingredient"
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
                        sx={{backgroundColor: `${colors.redAccent[800]}`, mt: 2, ml: 5,
                        ":hover": {
                          bgcolor: `${colors.redAccent[700]}`,
                          color: "white"
                        } }}
                      >
                        Remove ingredient
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="contained"
                    type="button"
                    onClick={() => push("")}
                    sx={{backgroundColor: `${colors.greenAccent[600]}`, mt: 3, mb: 5, ":hover": {
                      bgcolor: `${colors.greenAccent[400]}`,
                      color: "white"
                    } }}
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
                  {values.steps.map((st, index) => (
                    <div key={index}>
                      <Typography sx={{mb: 1}}>Step {index + 1} </Typography>
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
                                <div style={{ color: "red" }}>{meta.error}</div>
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
                        sx={{backgroundColor: `${colors.redAccent[800]}`, mt: 2, mb: 5,
                        ":hover": {
                          bgcolor: `${colors.redAccent[700]}`,
                          color: "white"
                        } }}

                      >
                        Remove step
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="contained"              
                    onClick={() => push({ description: "", image: null })}
                    sx={{backgroundColor: `${colors.greenAccent[600]}`,
                    ":hover": {
                      bgcolor: `${colors.greenAccent[400]}`,
                      color: "white"
                    }}}
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
              sx={{backgroundColor: `${colors.greenAccent[600]}`, mt: 5, mb: 5,":hover": {
                bgcolor: `${colors.greenAccent[400]}`,
                color: "white"
              } }}
              disabled={loading}          
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
