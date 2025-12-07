import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NotebookPage } from './types';

export async function generatePDF(previewElement: HTMLElement, notebookPage: NotebookPage): Promise<void> {
  try {
    // Convert mm to points (1mm = 2.83465 points)
    const mmToPoints = (mm: number) => mm * 2.83465;
    const pageWidth = mmToPoints(notebookPage.pageSize.width);
    const pageHeight = mmToPoints(notebookPage.pageSize.height);

    // Store original styles to restore later
    const originalStyles = {
      display: previewElement.style.display,
      visibility: previewElement.style.visibility,
      opacity: previewElement.style.opacity,
      transform: previewElement.style.transform,
      position: previewElement.style.position,
      left: previewElement.style.left,
      top: previewElement.style.top,
      zIndex: previewElement.style.zIndex,
    };
    
    // Temporarily modify styles for capture (minimal changes)
    previewElement.style.display = previewElement.style.display || 'block';
    previewElement.style.visibility = previewElement.style.visibility || 'visible';
    previewElement.style.opacity = previewElement.style.opacity || '1';
    
    // Store parent transform states to restore later
    const parentTransforms: Array<{ element: HTMLElement; originalTransform: string }> = [];
    let parent = previewElement.parentElement;
    while (parent && parent !== document.body) {
      const computedStyle = getComputedStyle(parent);
      if (computedStyle.transform && computedStyle.transform !== 'none') {
        parentTransforms.push({
          element: parent,
          originalTransform: parent.style.transform,
        });
        parent.style.transform = 'none';
      }
      parent = parent.parentElement;
    }

    // Store scroll positions to restore later
    const scrollPositions: Array<{ element: HTMLElement; scrollTop: number }> = [];
    let currentParent: HTMLElement | null = previewElement.parentElement;
    while (currentParent) {
      if (currentParent.scrollTop !== undefined && currentParent.scrollTop !== 0) {
        scrollPositions.push({
          element: currentParent,
          scrollTop: currentParent.scrollTop,
        });
        currentParent.scrollTop = 0;
      }
      currentParent = currentParent.parentElement;
    }
    if (previewElement.scrollTop !== 0) {
      const originalScrollTop = previewElement.scrollTop;
      previewElement.scrollTop = 0;
      scrollPositions.push({
        element: previewElement,
        scrollTop: originalScrollTop,
      });
    }

    // Wait for fonts to load and rendering to complete
    await document.fonts.ready;
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create canvas - let html2canvas determine dimensions automatically
    // Using 'any' type to bypass TypeScript type issues with html2canvas options
    const canvas = await html2canvas(previewElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      removeContainer: true,
      onclone: (clonedDoc: Document) => {
        // Fix font rendering and text positioning in cloned document
        const style = clonedDoc.createElement('style');
        style.textContent = `
          * {
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
            text-rendering: optimizeLegibility !important;
            transform: none !important;
            will-change: auto !important;
          }
          body, html {
            margin: 0 !important;
            padding: 0 !important;
          }
        `;
        clonedDoc.head.appendChild(style);
        
        // Ensure all text elements maintain their line-height to prevent shifting
        const allElements = clonedDoc.querySelectorAll('*');
        allElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl) {
            const computedStyle = window.getComputedStyle(htmlEl);
            // Preserve line-height to prevent text shifting
            if (computedStyle.lineHeight && computedStyle.lineHeight !== 'normal') {
              htmlEl.style.lineHeight = computedStyle.lineHeight;
            }
            // Remove any transforms that might affect positioning
            if (computedStyle.transform && computedStyle.transform !== 'none') {
              htmlEl.style.transform = 'none';
            }
          }
        });
      },
    } as any);

    // Restore original styles immediately
    Object.assign(previewElement.style, originalStyles);
    
    // Restore parent transforms
    parentTransforms.forEach(({ element, originalTransform }) => {
      element.style.transform = originalTransform;
    });
    
    // Restore scroll positions
    scrollPositions.forEach(({ element, scrollTop }) => {
      element.scrollTop = scrollTop;
    });

    console.log('Canvas dimensions:', { width: canvas.width, height: canvas.height });

    // Check if canvas is empty
    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas is empty. Element might not be visible or has zero dimensions.');
    }

    // Verify canvas has content by checking a few pixels
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const imageData = ctx.getImageData(0, 0, Math.min(10, canvas.width), Math.min(10, canvas.height));
      const hasContent = imageData.data.some((val, idx) => idx % 4 !== 3 && val !== 255); // Check if not all white
      if (!hasContent) {
        console.warn('Canvas appears to be blank (all white). Proceeding anyway...');
      }
    }

    // Create PDF with exact notebook dimensions
    const pdf = new jsPDF({
      orientation: pageWidth > pageHeight ? 'landscape' : 'portrait',
      unit: 'pt',
      format: [pageWidth, pageHeight],
    });

    // Calculate scaling to fit canvas width in PDF
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    console.log('PDF dimensions:', { imgWidth, imgHeight, pageHeight, totalPages: Math.ceil(imgHeight / pageHeight) });

    // Handle multi-page PDF if content exceeds page height
    const totalPages = Math.ceil(imgHeight / pageHeight);
    
    for (let i = 0; i < totalPages; i++) {
      if (i > 0) {
        pdf.addPage([pageWidth, pageHeight]);
      }

      // Calculate the portion of the image to show on this page
      const sourceY = i * pageHeight * (canvas.height / imgHeight);
      const sourceHeight = Math.min(
        pageHeight * (canvas.height / imgHeight),
        canvas.height - sourceY
      );

      if (sourceHeight <= 0) break;

      // Create a temporary canvas for this page
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.ceil(sourceHeight);
      const pageCtx = pageCanvas.getContext('2d');
      
      if (pageCtx) {
        // Draw the portion of the image for this page
        pageCtx.drawImage(
          canvas,
          0, Math.floor(sourceY), canvas.width, Math.ceil(sourceHeight),
          0, 0, canvas.width, Math.ceil(sourceHeight)
        );

        const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
        const pageImgHeight = (Math.ceil(sourceHeight) * imgWidth) / canvas.width;
        
        pdf.addImage(pageImgData, 'PNG', 0, 0, imgWidth, pageImgHeight);
      }
    }

    // Generate filename
    const filename = `fitness-notebook-${Date.now()}.pdf`;

    // Save PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

