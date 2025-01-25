export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(dateString);
  
  return date.toLocaleDateString("en-GB", options); // 'en-GB' สำหรับการใช้ format แบบอังกฤษ
};
