/**
 * 后端给的 PDF 链接有问题
 * 比如预览时 PDF 链接直接下载了，需要前端转成 blob 流，实现预览
 * 比如下载时 PDF 链接直接打开网页了，需要前端转成 blob 流，实现下载
 */

// 转成流
const getBlob = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
      reject(xhr.response);
    };
    xhr.send();
  });
};
// 预览
const previewAS = (blob) => {
  blob = new Blob([blob], {
    type: 'application/pdf;chartset=UTF-8',
  });
  return URL.createObjectURL(blob);
};
// pdf 链接实现直接预览
const pdfToBlobPreview = async (url, filename) => {
  const blobUrl = await getBlob(url);
  return previewAS(blobUrl, filename);
};

// 下载
const downloadAS = (blob, filename) => {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement('a');
    const body = document.querySelector('body');

    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    // fix Firefox
    link.style.display = 'none';
    body.appendChild(link);

    link.click();
    body.removeChild(link);

    window.URL.revokeObjectURL(link.href);
  }
};
// pdf 链接实现直接下载
const pdfToBlobDownload = async (url, filename) => {
  const blobUrl = await getBlob(url);
  return downloadAS(blobUrl, filename);
};

export { pdfToBlobPreview, pdfToBlobDownload };
