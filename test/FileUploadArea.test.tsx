import React from 'react';
import FileUploadArea from '../src/components/FileUploadArea';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('FileUploadArea', async () => {
  it('test1', () => {
    // render
    const mockOnDropHandler = jest.fn();
    const ui = (<FileUploadArea onDropHandler={mockOnDropHandler}/>);
    let container;
    let rerender;
    act(() => {
      const renderResult = render(ui);
      container = renderResult.container;
      rerender = renderResult.rerender;
    });

    // Drag & Drop
    const file = new File(['abcdefg'], 'test.png');
    const data = mockData([file]);
    const dropzone = container.querySelector('div');
    dispatchEvt(dropzone, 'dragenter', data);

    // Assertion
    expect(mockOnDropHandler).toHaveBeenCalled();

  });
});

function dispatchEvt(node: Node, type: string, data: any) {
  const event = new Event(type, { bubbles: true });
  Object.assign(event, data);
  fireEvent(node, event);
}

function mockData(files: File[]) {
  return {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        kind: 'file',
        type: file.type,
        getAsFile: () => file,
      })),
      types: ['Files'],
    },
  };
}
