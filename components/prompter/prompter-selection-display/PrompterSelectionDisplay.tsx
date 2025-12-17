import classnames from "classnames";
import React from "react";

interface PrompterSelectionDisplayProps {
  text: string;
  children?: React.ReactNode;
}

const PrompterSelectionDisplay: React.FC<PrompterSelectionDisplayProps> = ({
  text,
  children,
}) => {
  return (
    <div className={classnames("prompter-selection-display", {})}>
      <span className="prompter-selection-display__text">{text}</span>
      {children}
    </div>
  );
};

export default PrompterSelectionDisplay;
