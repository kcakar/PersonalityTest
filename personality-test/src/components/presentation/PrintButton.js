import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PulseButton from '../presentation/PulseButton';

const print=(id)=>{
  const input = document.getElementById(id);
  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      let pdf=jsPDF("p", "mm", "a4");
      let width = pdf.internal.pageSize.getWidth();
      let height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`${id}.pdf`);
    });
  ;
}

const PrintButton = ({printElementId,label}) => (
  <div className="pdf-btn">
      <PulseButton onClick={()=>print(printElementId)}>{label}</PulseButton>
  </div>);

export default PrintButton;