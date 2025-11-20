import { Template } from "../types";

type CardProps = {
  template: Template;
  onPreview: (template: Template) => void;
};

export default function Card({ template, onPreview }: CardProps) {
  return (
    <div className="card">
      <div className="image-wrapper">
        <img src={template.image} alt={template.title} />
      </div>
      <h3>{template.title}</h3>
      <p>{template.shortDescription}</p>
      <p className="category-label">Category: {template.category}</p>
      <button onClick={() => onPreview(template)}>Preview</button>
    </div>
  );
}
