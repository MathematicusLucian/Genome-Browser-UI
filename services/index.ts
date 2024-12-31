export function generateQueryString(params) {
    const isEmpty = Object.values(params).every((value) => value === "");
    if (isEmpty) {
      return "";
    }
  
    const queryString = Object.entries(params)
        .filter(
            ([_key, value]) => value !== "" && value !== null && value !== undefined,
        )
        .map(
            ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
        )
        .join("&");
  
    return `?${queryString}`;
  }
  
  export function sanitizeParams(params) {
    const sanitizedObj = {};
    for (const key in params) {
      if (params[key]) {
        sanitizedObj[key] = params[key];
      }
    }
    return sanitizedObj;
  }
  
  export function transformCategories(data) {
    if (data?.length === 0) {
      return [];
    }
  
    return data.map((category) => {
      const transformedCategory = { ...category };
    transformedCategory.key = category.id;
      if (
        Array.isArray(category.sub_categories) &&
        category.sub_categories.length > 0
      ) {
        transformedCategory.children = transformCategories(
          category.sub_categories,
        );
      }
      delete transformedCategory.sub_categories;
      return transformedCategory;
    });
}