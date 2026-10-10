// src/components/ui/LinkButton.jsx

import Button from "./Button";

export default function LinkButton({ href, children, ...props }) {
  return (
    <Button href={href} {...props}>
      {children}
    </Button>
  );
}

export { LinkButton };
