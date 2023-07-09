import { Formik, Form, Field } from "formik";
import { TextField, Button, Box } from "@mui/material";
import * as Yup from "yup";
import axiosClient from "../../utils/axiosCustomize";
import { toast } from "react-toastify";
import { format } from "date-fns";
const CreateRecipeTypeForm = ({
  onClose,
  onCreate,
  loading,
  setRecipeTypes,
}) => {
  const initialValues = {
    name: "",
    image: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image);
    console.log("Values: ", values);
    try {
      const response = await axiosClient.post("/RecipeTypes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Recipe Type created successfully.");

      setSubmitting(false);
      resetForm();
      // onCreate(response.data);
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
      toast.error(error.response.data.Message[0].DescriptionError[0]);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
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
                  style={{marginTop:"20px"}}
                  onChange={(event) =>
                    form.setFieldValue(field.name, event.currentTarget.files[0])
                  }
                />
                {meta.touched && meta.error && (
                  <div style={{ color: "red" }}>{meta.error}</div>
                )}
              </>
            )}
          </Field>
          <Box sx={{mt: 3}}>
          <Button
            type="submit"
            fullWidth={true}
            variant="contained"
            color="primary"
            disabled={isSubmitting || loading}
          >
            Create
          </Button></Box>
        </Form>
      )}
    </Formik>
  );
};

export default CreateRecipeTypeForm;
