import { Formik, Form, Field } from "formik";
import { TextField, Button, Box } from "@mui/material";
import * as Yup from "yup";
import axiosClient from "../../utils/axiosCustomize";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const UpdateRecipeTypeForm = ({
  recipeTypeForm,
  setRecipeTypeForm,
  onClose,
  onUpdate,
  open,
  loading,
  setRecipeTypes,
}) => {
  const [fetchRecipeDetail, selectRecipeDetail] = useState();
  useEffect(() => {
    const fetchRecipeTypeDetail = async () => {
      try {
        const response = await axiosClient.get(
          `/RecipeTypes/${recipeTypeForm.id}`
        );
        const data = response;
        console.log("Recipe Type: ", data);
        selectRecipeDetail(data);
      } catch (error) {
        console.error("Error fetching recipe types:", error);
      }
    };
    fetchRecipeTypeDetail();
  }, []);
  console.log("Data: ", recipeTypeForm);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    image: Yup.mixed(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image);
    console.log("image: ", values.image);
    try {
      const response = await axiosClient.put(
        `/RecipeTypes/${recipeTypeForm.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Recipe Type updated successfully.");
      setSubmitting(false);
      //resetForm();
      // onUpdate(response.data);

      try {
        const response = await axiosClient.get("/RecipeTypes");
        const data = response.value;
        console.log("response: ", data);
        const rows =
          data && data.length
            ? data.map((recipeType) => ({
                id: recipeType.Id,
                Name: recipeType.Name,
                ModifiedDate: format(
                  new Date(recipeType.ModifiedDate),
                  "dd/MM/yyyy"
                ),
              }))
            : [];
        setRecipeTypes(rows);
        onClose();
      } catch (error) {
        console.error("Error fetching recipe types:", error);
      }
    } catch (error) {
      console.error("Error updating recipe type:", error);
      setSubmitting(false);
      if (error.response.data.Message) {
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
        toast.error("Error update recipe type");
      }
    }
  };
  if (fetchRecipeDetail)
    return (
      <Formik
        initialValues={{
          name: fetchRecipeDetail.Name,
          image: fetchRecipeDetail.Image,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="name">
              {({ field, meta }) => (
                <TextField
                  {...field}
                  label="Name"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                  fullWidth
                  sx={{mb: 3, mt: 3}}
                />
              )}
            </Field>
            <Field name="image">
              {({ field, form, meta }) => (
                <>
                  <input
                    multiple
                    type="file"
                    id="image"
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
            <Box>
              <img
                style={{ width: "15vw", height: "25vh", objectFit: "cover", marginBottom: "20px", marginTop: "20px" }}
                src={fetchRecipeDetail.Image}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={isSubmitting || loading}
              fullWidth={true}
            >
              Update
            </Button>
          </Form>
        )}
      </Formik>
    );
  else return <div>loading</div>;
};

export default UpdateRecipeTypeForm;
