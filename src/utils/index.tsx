export const getBase64 = (file: any) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export const downloadFileInFlow = (fileUrl: string) => {
  const a = document.createElement('a');
  a.download = '';
  a.href = fileUrl;
  a.click();
};
