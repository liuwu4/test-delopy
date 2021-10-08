import jsPDF from 'jspdf';
// // 导出页面为PDF格式
import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
import dayjs from 'dayjs';

export const capture = () => {
  const options = {
    unit: 'px',
    format: 'a4',
    hotfixes: ['px_scaling']
  };
  const pdf = new jsPDF(options);
  pdf.html(document.querySelector('.scroll-item'), {
    callback: function (doc) {
      doc.save(`${dayjs().valueOf()}--jsPdf.pdf`);
    },
    html2canvas: {
      scale: 0.4,
      backgroundColor: '#fff',
      useCORS: true
    },
    margin: [20, 20, 20, 20]
  });
};
export const caputreMultiple = (target = []) => {};

export const getPdf = (title) => {
  let target = document.querySelector('#charts');
  html2Canvas(target, {
    allowTaint: true,
    scale: 1.5
  }).then((canvas) => {
    let contentWidth = canvas.width;
    let contentHeight = canvas.height;
    let pageHeight = (contentWidth / 595.28) * 841.89;
    let leftHeight = contentHeight;
    let position = 0;
    let pageData = canvas.toDataURL('image/jpeg', 1.0);
    let imgWidth = 505;
    let imgHeight = (505 / contentWidth) * contentHeight;
    let PDF = new JsPDF('', 'pt', 'a4');

    if (leftHeight < pageHeight) {
      // 单页
      PDF.addImage(pageData, 'JPEG', 40, 60, imgWidth, imgHeight); // 45 left, 60 top
    } else {
      // 多页
      while (leftHeight > 0) {
        PDF.addImage(pageData, 'JPEG', 40, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89 - 10;
        if (leftHeight > 0) {
          PDF.addPage();
        }
      }
    }
    PDF.save(`${title}.pdf`);
  });
};
