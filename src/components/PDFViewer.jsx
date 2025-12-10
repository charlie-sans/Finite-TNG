import { createPluginRegistration } from '@embedpdf/core';
import { EmbedPDF } from '@embedpdf/core/react';
import { usePdfiumEngine } from '@embedpdf/engines/react';
 

import { Viewport, ViewportPluginPackage } from '@embedpdf/plugin-viewport/react';
import { Scroller, ScrollPluginPackage } from '@embedpdf/plugin-scroll/react';
import { LoaderPluginPackage } from '@embedpdf/plugin-loader/react';
import { RenderLayer, RenderPluginPackage } from '@embedpdf/plugin-render/react';
 


export const PDFViewer = (name, url) => {
    const plugins = [
      createPluginRegistration(LoaderPluginPackage, {
        loadingOptions: {
          type: 'url',
          pdfFile: {
            id: name,
            url: url,
          },
        },
      }),
      createPluginRegistration(ViewportPluginPackage),
      createPluginRegistration(ScrollPluginPackage),
      createPluginRegistration(RenderPluginPackage),
    ];

  const { engine, isLoading } = usePdfiumEngine();
 
  if (isLoading || !engine) {
    return <div>Loading PDF Engine...</div>;
  }
 

  return (
    <div style={{ height: '500px' }}>
      <EmbedPDF engine={engine} plugins={plugins}>
        <Viewport
          style={{
            backgroundColor: '#f1f3f5',
          }}
        >
          <Scroller
            renderPage={({ width, height, pageIndex, scale }) => (
              <div style={{ width, height }}>
                {/* The RenderLayer is responsible for drawing the page */}
                <RenderLayer pageIndex={pageIndex} scale={scale} />
              </div>
            )}
          />
        </Viewport>
      </EmbedPDF>
    </div>
  );
};