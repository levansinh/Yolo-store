import instance from "../configs/config";

export const getAllCategory = (dispatch, navigate, accessToken) => {
  try {
    const res = instance.get("/category", {
      headers: { token: `Bearer ${accessToken}`},
    });
    return res
  } catch (error) {
    console.log(error);
    navigate("/admin");
  }
};
export const createCategory = (formData, navigate, accessToken) => {
  try {
    const res = instance.post("/category",formData, {
      headers: { token: `Bearer ${accessToken}`},
    });
    return res
  } catch (error) {
    console.log(error);
    navigate("/admin/category");
  }
};
export const updateCategory = (id,formData, navigate, accessToken) => {
  try {
    const res = instance.put(`/category/edit/${id}`,formData, {
      headers: { token: `Bearer ${accessToken}`},
    });
    return res
  } catch (error) {
    console.log(error);
    navigate("/admin/category");
  }
};
export const deleteCategory = (id, navigate, accessToken) => {
  try {
    const res = instance.delete(`/category/${id}`, {
      headers: { token: `Bearer ${accessToken}`},
    });
    return res
  } catch (error) {
    console.log(error);
    navigate("/admin/category");
  }
};
