import InputDetailsForm from "./InputDetailsForm"
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('<InputDetailsForm />', () => {
    beforeEach(() => {
      documentBody = render(<InputDetailsForm />);
    });
    it('shows QUIZ', () => {
      expect(documentBody.getByText('QUIZ')).toBeInTheDocument();
    });
  });